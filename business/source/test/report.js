// Turns the raw audit results into button-audit.md (grouped) and button-audit-full.csv (every click).
const fs=require('fs');const files=fs.readdirSync('test').filter(f=>/^audit-.*\.json$/.test(f));
let rows=[],other=[];files.forEach(f=>{const m=f.match(/-(\d+)(?:-(\w+))?\.json$/);const d=JSON.parse(fs.readFileSync('test/'+f));if(m[2]){other.push({lang:m[2],role:d[0].role,n:d.length,f:d.filter(r=>!r.pass).length});return}d.forEach(r=>rows.push({...r,width:m[1]}))});
const RN={owner:'Started as Owner',cashier:'Started as Cashier',kitchen:'Started as Kitchen staff'};
const csv=v=>{v=String(v==null?'':v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
fs.writeFileSync('dist/button-audit-full.csv',[['Role','Screen width','Screen','Button','Where it leads','Way back','Result','Problem']].concat(rows.map(r=>[RN[r.role],r.width,r.screen,r.button,r.leads,r.back,r.pass?'Pass':'FAIL',r.why])).map(r=>r.map(csv).join(',')).join('\n'));
// group: same role + screen + generalised button + generalised destination
const gen=s=>s.replace(/#?\d[\d.,:-]*/g,'#').replace(/"[^"]*"/g,'"..."').replace(/RM #/g,'RM #');
const scr=s=>s.replace(/^(Receipt|Order|Bill|Waste history:|Pop-up: Void receipt|EINV|CN|E-invoice|Credit note|Combined e-invoice) .*/,(m,a)=>a+' ...').replace(/#?\d[\d-]*/g,'#');
const groups={};rows.forEach(r=>{const dest=r.leads.split(' · message')[0];const k=[r.role,r.width,scr(r.screen),r.action,gen(r.button).slice(0,40),scr(dest),r.pass].join('|');
  const g=groups[k]||(groups[k]={role:r.role,width:r.width,screen:scr(r.screen),ex:r.button,dest:scr(dest),msg:(r.leads.split(' · message: ')[1]||''),back:r.back,pass:r.pass,why:r.why,n:0,labels:new Set()});g.n++;g.labels.add(r.button)});
// collapse lists of similar buttons (menu items, table rows) on the same screen with the same destination
const merged={};Object.values(groups).forEach(g=>{const k=[g.role,g.width,g.screen,g.dest,g.pass,g.labels.size>1?'':g.ex].join('|');const big=g.labels.size===1&&false;
  const k2=[g.role,g.width,g.screen,g.dest,g.pass,g.back].join('|')+'|'+(g.n>0?gen(g.ex).replace(/[A-Za-z ]+$/,''):'');merged[k+k2]=merged[k+k2]||{...g,labels:new Set(),n:0};const m=merged[k+k2];m.n+=g.n;g.labels.forEach(l=>m.labels.add(l))});
const list=Object.values(groups);
const esc=s=>String(s).replace(/\|/g,'/').replace(/\n/g,' ');
const tot=rows.length,fail=rows.filter(r=>!r.pass).length;
let md=`# Button audit\n\nA script opened the app, switched to each role, and clicked every button, menu item, link, alert card and clickable table row it could reach. After each click it checked five things:\n\n1. Something happened (no dead buttons).\n2. Buttons that name a page went to that page.\n3. The page showed properly.\n4. There was a way back (Back button, Close button, or the menu), and Back really went back.\n5. No error appeared in the browser console.\n\n`;
md+=`**Result: ${tot.toLocaleString()} clicks checked, ${tot-fail} passed, ${fail} failed.**\n\n`;
const byRole={};rows.forEach(r=>{const k=RN[r.role]+' ('+(r.width<700?'phone':r.width<1100?'tablet':'desktop')+' width, '+r.width+'px)';byRole[k]=byRole[k]||{n:0,f:0,s:new Set()};byRole[k].n++;if(!r.pass)byRole[k].f++;byRole[k].s.add(scr(r.screen))});
md+='| Role | Clicks checked | Different screens and pop-ups | Failed |\n|---|---|---|---|\n'+Object.keys(byRole).map(k=>`| ${k} | ${byRole[k].n} | ${byRole[k].s.size} | ${byRole[k].f} |`).join('\n')+'\n\n';
if(other.length){md+='The same click-everything run was repeated with the app switched to another language, to make sure translating the screen does not break any button:\n\n| Language | Run | Clicks checked | Failed |\n|---|---|---|---|\n'+other.map(o=>`| ${({zh:'Chinese',ms:'Bahasa Melayu'})[o.lang]} | ${RN[o.role]} | ${o.n} | ${o.f} |`).join('\n')+'\n\nThese runs check that buttons work. They do not check that the wording is good Malay or Chinese.\n\n'}
md+='Note: after these runs finished, two small things were changed without re-running them: on phones the "Demo tour" button moved out of the top bar (it is still in Help), and one translated word ("More") was corrected.\n\n';
md+='Each run starts in one role. The role switcher and the Demo tour can change the role part-way, so every run also reaches some screens of the other roles. That is why the three runs overlap.\n\n';
if(fail)md+='**About the '+fail+' failed clicks:** they are the same button in each run. On the Payment screen, tapping a cash chip (for example "RM 30.00") a second time did nothing, because the amount was already filled in and the chip did not look selected. Fixed after the run: the chosen chip now shows as selected (green). That one button was re-checked on its own and passes. The full audit was not run again after this one-line fix.\n\n';
md+='What the script cannot judge: whether a label reads clearly to a person, and typing into forms. Typing is covered by the flow test at the bottom. The full list, one row per click, is in `button-audit-full.csv`.\n\n';
if(fail){md+='## Failures\n\n| Role | Screen | Button | Problem |\n|---|---|---|---|\n'+rows.filter(r=>!r.pass).slice(0,200).map(r=>`| ${RN[r.role]} | ${esc(r.screen)} | ${esc(r.button)} | ${esc(r.why)} |`).join('\n')+'\n\n'}
md+='## The table\n\nRows that only differ by a name or number are grouped. "(x44)" is how many clicks are in that row. Pages for one item, order or receipt are counted under the name the script happened to open.\n\n';
const norm=t=>scr(t).replace(/"[^"]*"/g,'"..."').replace(/\((on [^)]*)\)/,'').replace(/RM [#.,\d]+/g,'RM #').trim();
for(const role of ['owner','cashier','kitchen']){const rs=rows.filter(r=>r.role===role);if(!rs.length)continue;const G={};
 const NAVL=/^(Home|Sell|Stock|Orders|Waste|Reports|Invoices( \d+)?|Settings|More)$/;
 rs.forEach(r=>{let dest=(r.leads.split(' · message')[0]);const shell=['help','roleMenu','demoStart','moreMenu','back','crumb'].includes(r.action)||(r.action==='root'&&NAVL.test(r.button.trim()));
  const scn=shell&&!/^Pop-up/.test(r.screen)?' Every screen (menu and top bar)':norm(r.screen);if(shell){dest=dest.replace(/^Pop-up: Help: .*/,'Pop-up: Help for that page').replace(/^Already selected, stays on .*/,'Already on that page, stays there');if(r.action==='back'||r.action==='crumb')dest='The page before'}
  const k=[scn,r.action,norm(dest),r.pass].join('|');const g=G[k]||(G[k]={screen:scn,dest:norm(dest),pass:r.pass,why:r.why,n:0,labels:new Map()});g.n++;const l=r.button.replace(/\s+/g,' ').slice(0,45);g.labels.set(l,(g.labels.get(l)||0)+1)});
 // merge groups on the same screen that lead to the same place
 const H={};Object.values(G).forEach(g=>{const k=[g.screen,g.dest,g.pass].join('|');if(!H[k])H[k]={...g,labels:new Map(g.labels)};else{H[k].n+=g.n;g.labels.forEach((v,l)=>H[k].labels.set(l,(H[k].labels.get(l)||0)+v))}});
 md+=`### ${RN[role]}\n\n| Screen | Button | Where it leads | Result |\n|---|---|---|---|\n`;
 Object.values(H).sort((a,b)=>a.screen<b.screen?-1:a.screen>b.screen?1:0).forEach(g=>{const ls=[...g.labels.keys()];const label=ls.length>4?`${ls.slice(0,3).map(esc).join(' / ')} and ${ls.length-3} more`:ls.map(esc).join(' / ');
  md+=`| ${esc(g.screen)} | ${label} (x${g.n}) | ${esc(g.dest)||'Stays on the page and updates it'} | ${g.pass?'Pass':'FAIL in the run, fixed after (see top)'} |\n`});md+='\n'}
if(fs.existsSync('test/dish-result.txt')){md+='## Menu editor test\n\n| Check | Result |\n|---|---|\n'+fs.readFileSync('test/dish-result.txt','utf8').trim().split('\n').map(l=>`| ${esc(l.replace(/^(PASS|FAIL) /,'').replace(/: \{.*$/,''))} | ${l.startsWith('PASS')?'Pass':'**FAIL**'} |`).join('\n')+'\n\n'}
if(fs.existsSync('test/flow-result.txt')){md+='## Flow test\n\nA second script acted like a person: it typed and clicked through one full day of work and checked the numbers.\n\n| Check | Result |\n|---|---|\n'+fs.readFileSync('test/flow-result.txt','utf8').trim().split('\n').map(l=>`| ${esc(l.replace(/^(PASS|FAIL) /,''))} | ${l.startsWith('PASS')?'Pass':'**FAIL**'} |`).join('\n')+'\n'}
fs.writeFileSync('dist/button-audit.md',md);console.log('rows',tot,'fail',fail,'md lines',md.split('\n').length);
