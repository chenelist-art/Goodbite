/* ---------- shell: menu, top bar, router, pop-ups ---------- */
const ICON={
 home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
 bag:'<path d="M6 8h12l1 13H5L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
 box:'<path d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 truck:'<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6.5" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
 chart:'<path d="M3 20h18M6 20V11M11 20V5M16 20v-7"/>',
 file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
 sliders:'<path d="M4 6h8M16 6h4M4 12h2M10 12h10M4 18h10M18 18h2"/><circle cx="14" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',chev:'<path d="M9 5l7 7-7 7"/>',plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',alert:'<path d="M12 4l9 16H3l9-16z"/><path d="M12 10v4M12 17v.5"/>',clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17v.5"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
 more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',play:'<path d="M7 5l12 7-12 7V5z"/>',leaf:'<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19l8-8"/>',
 list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.5M4 12h.5M4 18h.5"/>',copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'
};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]||''}</svg>`;
const A=(a,p)=>`data-a="${a}"${p!==undefined?` data-p="${h(JSON.stringify(p))}"`:''}`;
const NAV=[['home','Home','home','home'],['sell','Sell','bag','pos'],['stock','Stock','box','stock'],['orders','Orders','truck','orders'],['waste','Waste','trash','waste'],['reports','Reports','chart','reports'],['invoices','Invoices','file','invoices'],['settings','Settings','sliders','settings']];
const ROLES={owner:{name:'Owner / Manager',nav:['home','sell','stock','orders','waste','reports','invoices','settings'],d:'Sees everything: sales, stock, suppliers, reports, e-invoices and settings.'},
 cashier:{name:'Cashier',nav:['home','sell'],d:'Sees the till only: take orders, take payment, print receipts.'},
 kitchen:{name:'Kitchen / Store staff',nav:['home','stock','orders','waste'],d:'Sees stock, deliveries and the waste log. Works well on a phone.'}};
const TIPS={
 tin:['TIN','Tax Identification Number. The number LHDN (the tax office) gives every taxpayer. Companies and people each have one.'],
 sst:['SST','Sales and Service Tax. Food and drink outlets that are registered for it add service tax to the bill and pay it to Customs.'],
 sc:['Service charge','An extra charge some outlets add to dine-in bills. It goes to the outlet, not the government.'],
 round:['Rounding','Malaysia has no 1 sen coins, so the final bill is rounded to the nearest 5 sen.'],
 einv:['E-invoice','A digital invoice that is sent to LHDN to be checked before the buyer gets it. LHDN calls its system MyInvois.'],
 cons:['Combined e-invoice','LHDN calls this a consolidated e-invoice. One e-invoice that covers all the walk-in sales of a month where the customer did not ask for their own e-invoice.'],
 cls:['Classification code','A 3-digit code from LHDN that says what kind of item this is. 022 means Others and 004 means a combined (consolidated) e-invoice.'],
 taxt:['Tax type','A code from LHDN. 02 means Service Tax and 06 means no tax applies.'],
 uuid:['Unique ID','The ID LHDN gives each e-invoice it has checked. In this demo the ID is made up.'],
 brn:['Business registration number','The number SSM gives a business when it is registered.'],
 msic:['Business activity code','LHDN asks for the MSIC code that describes what your business does. Check your own code before using a real system.'],
 fefo:['Use oldest first','The stock that expires soonest is always used first, so less food is thrown away.'],
 min:['Minimum stock','The lowest amount you want to have on the shelf. Below this the app tells you to order more.'],
 fc:['Food cost %','Cost of the ingredients used in the food you sold, divided by sales before tax and service charge. Lower is better.'],
 cn:['Credit note','A document that corrects or reverses an e-invoice once it can no longer be cancelled.'],
 rescue:['Food Rescue','Offer food that is close to expiry to a food charity instead of throwing it away. The partners here are made up for the demo.']
};
const tip=k=>`<button type="button" class="q" ${A('tip',{k})} aria-label="What does ${h(TIPS[k][0])} mean?">?</button>`;
const SCREENS={};
let stack=[{s:'home',p:{}}],M=null,modalFn=null,pendingYes=null,undoFn=null,BIND=null,toastT=null;
const cur=()=>stack[stack.length-1];
const scr=()=>document.getElementById('scr');
function go(s,p,replace){if(!SCREENS[s])return;if(replace)stack.pop();stack.push({s,p:p||{}});render()}
function back(){if(stack.length>1)stack.pop();else stack=[{s:'home',p:{}}];render()}
function root(s,p){stack=[{s,p:p||{}}];render()}
function setPath(o,path,v){const ks=path.split('.');for(let i=0;i<ks.length-1;i++)o=o[ks[i]]||(o[ks[i]]={});o[ks[ks.length-1]]=v}
function toast(msg,undo){const t=document.getElementById('toast');undoFn=undo||null;t.innerHTML=`<span role="status">${h(msg)}</span>`+(undo?`<button ${A('undo')}>Undo</button>`:'');t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>{t.hidden=true;undoFn=null},undo?6500:3200)}
function modal(fn,state,wide){M=state||{};modalFn=fn;const m=document.getElementById('modal');m.dataset.wide=wide?'1':'';m.hidden=false;drawModal();const f=m.querySelector('input,select,textarea,.mf .btn:last-child,button');if(f)f.focus()}
function drawModal(){const m=document.getElementById('modal');m.innerHTML=`<div class="mbox ${m.dataset.wide?'widem':''}" role="dialog" aria-modal="true">${modalFn(M)}</div>`}
function closeModal(){const m=document.getElementById('modal');m.hidden=true;m.innerHTML='';M=null;modalFn=null;pendingYes=null}
const mHead=t=>`<div class="mh"><h2>${t}</h2><button class="xb" ${A('closeModal')} aria-label="Close">${ic('x')}</button></div>`;
function confirmBox(o){pendingYes=o.yes;const py=o.yes;modal(()=>`${mHead(h(o.title))}<p>${o.body}</p><div class="mf"><button class="btn sec" ${A('closeModal')}>${h(o.no||'No, go back')}</button><button class="btn ${o.danger?'red solid':''}" ${A('yes')}>${h(o.ok)}</button></div>`);pendingYes=py}
const pill=(t,c)=>`<span class="pill ${c||''}">${h(t)}</span>`;
const pageHead=(t,sub,acts)=>`<div class="ph"><div class="t"><h1>${t}</h1>${sub?`<p>${sub}</p>`:''}</div>${acts?`<div class="acts">${acts}</div>`:''}</div>`;
const stepsBar=(ls,i)=>`<div class="steps" aria-label="Step ${i+1} of ${ls.length}">${ls.map((l,k)=>`<span class="st ${k===i?'on':k<i?'done':''}"><i>${k<i?'✓':k+1}</i>${h(l)}</span>`).join('')}</div>`;
const searchBox=(key,ph,val,extra)=>`<label class="search">${ic('search')}<input id="q-${key}" type="search" placeholder="${h(ph)}" value="${h(val||'')}" data-m="${key}" data-live ${extra||''} aria-label="${h(ph)}"></label>`;
const empty=(t,sub,btn)=>`<div class="empty"><b>${t}</b>${sub?`<span>${sub}</span>`:''}${btn||''}</div>`;
const field=(id,label,inner,tipK)=>`<div class="field"><label for="${id}">${label}${tipK?tip(tipK):''}</label>${inner}</div>`;
const inp=(id,path,val,o)=>{o=o||{};return`<input class="inp ${o.cls||''}" id="${id}" data-m="${path}" value="${h(val==null?'':val)}" type="${o.type||'text'}" ${o.attr||''} ${o.ph?`placeholder="${h(o.ph)}"`:''}>`};
const tog=(on,label,a,p,tipK)=>`<div class="row" style="flex-wrap:nowrap;gap:4px"><button type="button" class="tog ${on?'on':''}" role="switch" aria-checked="${on}" ${A(a,p)}><i></i><span>${label}</span></button>${tipK?tip(tipK):''}</div>`;
const demoTag='<span class="pill warn">Demo data</span>';

function navHtml(compact){const r=ROLES[S.role],sec=SCREENS[stack[0].s].sec;let items=NAV.filter(n=>r.nav.includes(n[0]));const all=items;
  if(compact&&items.length>5)items=items.slice(0,4);
  const cnt={invoices:S.role==='owner'?S.sales.filter(x=>x.want&&x.status==='paid'&&!x.inv).length+S.invoices.filter(i=>i.status==='Invalid').length:0};
  let o=items.map(([id,l,i,s])=>`<button class="nav ${sec===id?'on':''}" ${sec===id?'aria-current="page"':''} ${A('root',{s})} data-nav="${id}">${ic(i)}<span>${l}</span>${cnt[id]?`<span class="cnt" aria-label="${cnt[id]} to do">${cnt[id]}</span>`:''}</button>`).join('');
  if(compact&&all.length>5)o+=`<button class="nav ${all.slice(4).some(n=>n[0]===sec)?'on':''}" ${A('moreMenu')} data-nav="more">${ic('more')}<span>More</span></button>`;
  return o}
function render(keep){
  if(sweep())IX=null;
  const c=cur(),sc=SCREENS[c.s],el=scr(),st=keep?el.scrollTop:0,ae=document.activeElement,fid=ae&&ae.id,ss=ae&&ae.selectionStart;
  BIND=null;
  let body='';try{body=sc.html(c.p)}catch(err){console.error(err);body=empty('This page could not be shown','Go back and try again.',`<button class="btn" ${A('root',{s:'home'})}>Back to Home</button>`)}
  document.getElementById('side').innerHTML=`<div class="logo"><span class="lf">🥬</span><span>GoodBite<small>for business</small></span></div>${navHtml(false)}<div class="sp"></div><button class="nav" ${A('help')}>${ic('help')}<span>Help</span></button>`;
  document.getElementById('bot').innerHTML=navHtml(true);
  const crumbs=stack.map((x,i)=>{const t=h(SCREENS[x.s].title(x.p));return i<stack.length-1?`<button ${A('crumb',{i})}>${t}</button><span aria-hidden="true">›</span>`:`<b aria-current="page">${t}</b>`}).join('');
  document.getElementById('top').innerHTML=`${stack.length>1?`<button class="backb" ${A('back')}>${ic('back')}Back</button>`:''}<nav class="crumbs" aria-label="You are here">${crumbs}</nav>
    <button class="rolebtn" id="rolebtn" ${A('roleMenu')}>${ic('user')}<span>Viewing as:</span>${h(ROLES[S.role].name.split(' /')[0])} ▾</button>
    <button class="topb" id="demobtn" ${A('demoStart')}>${ic('play')}<span class="lbl">Demo tour</span></button>
    <button class="topb" id="helpbtn" ${A('help')}>${ic('help')}<span class="lbl">Help</span></button>`;
  el.innerHTML=`<div class="pg ${sc.wide?'wide':''}">${sc.einv?'<div class="demo-b" role="note">DEMO - not connected to LHDN MyInvois. Not a valid tax document.</div>':''}${body}</div>`;
  el.scrollTop=st;
  if(fid){const f=document.getElementById(fid);if(f){f.focus();try{if(ss!=null&&f.setSelectionRange&&/text|search|tel/.test(f.type))f.setSelectionRange(ss,ss)}catch(e){}}}
  if(typeof demoDraw==='function')demoDraw();
}
const ACT={
 root:p=>root(p.s,p.p),go:p=>go(p.s,p.p),back:()=>back(),crumb:p=>{stack=stack.slice(0,p.i+1);render()},
 closeModal:()=>closeModal(),yes:()=>{const f=pendingYes;closeModal();if(f)f()},undo:()=>{const f=undoFn;undoFn=null;document.getElementById('toast').hidden=true;if(f){f();save();render(true)}},
 tip:p=>{const t=TIPS[p.k];modal(()=>`${mHead(h(t[0]))}<p>${h(t[1])}</p><div class="mf"><button class="btn" ${A('closeModal')}>Got it</button></div>`)},
 set:p=>{setPath(cur().p,p.k,p.v);render(true)},
 mset:p=>{setPath(M,p.k,p.v);drawModal()},
 roleMenu:()=>modal(()=>`${mHead('Who is using the app?')}<p class="muted">The menu changes to show only what each person needs. This demo has no passwords.</p>${Object.entries(ROLES).map(([k,r])=>`<button class="opt ${S.role===k?'on':''}" ${A('role',{r:k})}>${ic('user')}<span><b>${r.name}</b><small>${r.d}</small></span></button>`).join('')}`),
 role:p=>{S.role=p.r;save();closeModal();root('home');toast('Now viewing as '+ROLES[p.r].name)},
 moreMenu:()=>modal(()=>`${mHead('More')}${NAV.filter(n=>ROLES[S.role].nav.includes(n[0])).slice(4).map(([id,l,i,s])=>`<button class="opt" ${A('rootM',{s})}>${ic(i)}<b>${l}</b></button>`).join('')}<button class="opt" ${A('help')}>${ic('help')}<b>Help</b></button>`),
 rootM:p=>{closeModal();root(p.s)},
 help:()=>{const c=cur(),sc=SCREENS[c.s];modal(()=>`${mHead('Help: '+h(sc.title(c.p)))}<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px">${(sc.help||['Use the menu to move around.','The green button is always the main thing to do on a page.','Press Back to return to where you were.']).map(x=>`<li>${x}</li>`).join('')}</ol>
   <div class="mf" style="justify-content:flex-start"><button class="btn sec sm" ${A('tourStart')}>Replay the welcome tour</button><button class="btn sec sm" ${A('demoStart')}>Start the demo tour</button>${S.role==='owner'?`<button class="btn sec sm" ${A('goM',{s:'notes'})}>E-invoice notes</button>`:''}</div><div><div class="flabel" style="margin-bottom:6px">Language · Bahasa · 语言</div>${langPicker()}</div><div class="mf"><button class="btn" ${A('closeModal')}>Close help</button></div>`)},
 goM:p=>{closeModal();go(p.s,p.p)},
 focus:p=>{const f=document.getElementById(p.id);if(f){f.scrollIntoView({block:'center'});f.focus()}},
 refreshDemo:()=>{const r=S.role;resetDemo();S.role=r;S.toured=true;save();root('home');toast('Demo data refreshed. All dates now match today.')},
 showText:p=>showText(p.t,p.k)
};
/* a box of text people can copy (the artifact viewer blocks file downloads, so copying is the way that always works) */
const TEXTS={};
function showText(title,key){modal(()=>`${mHead(h(title))}<textarea class="code" id="exp-text" readonly aria-label="${h(title)}">${h(TEXTS[key]())}</textarea><div class="mf"><button class="btn sec" ${A('closeModal')}>Close</button>${STANDALONE?`<button class="btn sec" ${A('download',{key,name:TEXTS[key].file})}>Download file</button>`:''}<button class="btn" ${A('copyText')}>Copy all</button></div>`,{},true)}
ACT.copyText=()=>{const t=document.getElementById('exp-text');const ok=()=>toast('Copied. Paste it into Excel, Sheets or Notepad.');t.select();try{navigator.clipboard.writeText(t.value).then(ok,()=>{try{document.execCommand('copy');ok()}catch(e){toast('Press Ctrl+C to copy the selected text.')}})}catch(e){toast('Press Ctrl+C to copy the selected text.')}};
ACT.download=p=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([TEXTS[p.key]()],{type:'text/plain'}));a.download=p.name;document.body.appendChild(a);a.click();a.remove();toast('Saved as '+p.name)};
ACT.print=()=>window.print();

document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el){if(e.target.id==='modal')closeModal();return}if(el.disabled||el.getAttribute('aria-disabled')==='true')return;
  const f=ACT[el.dataset.a];if(!f){console.error('No action: '+el.dataset.a);return}f(el.dataset.p?JSON.parse(el.dataset.p):{},el,e)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.getElementById('modal').hidden){closeModal();return}
  if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('tr[data-a]')){e.preventDefault();e.target.click()}
  if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.enter){e.preventDefault();const f=ACT[e.target.dataset.enter];if(f)f({},e.target,e)}});
function bindInput(e,isChange){const t=e.target;if(!t.dataset||!t.dataset.m)return;let path=t.dataset.m,o;const inM=!!t.closest('#modal');
  if(path[0]==='@'){o=BIND;path=path.slice(1)}else o=inM?M:cur().p;if(!o)return;
  setPath(o,path,t.dataset.num!==undefined?(parseFloat(t.value)||0):t.value);
  if(t.dataset.save!==undefined)save();
  if((t.dataset.live!==undefined&&!isChange)||(t.dataset.r!==undefined&&isChange)){const go=()=>{if(inM){if(M)drawModal()}else render(true)};if(isChange&&t.tagName!=='SELECT')setTimeout(go,220);else go()}}
document.addEventListener('input',e=>bindInput(e,false));
document.addEventListener('change',e=>bindInput(e,true));

/* ---------- charts ---------- */
function barChart(data,o){o=o||{};const W=640,H=o.h||180,L=46,B=22,T=8,max=Math.max(1,...data.map(d=>d.v)),n=data.length;
  const mag=Math.pow(10,Math.floor(Math.log10(max))),step=[1,2,5,10].map(k=>k*mag).find(s=>max/s<=4)||mag*10,top=Math.ceil(max/step)*step;
  const bw=(W-L)/n,w=Math.min(26,Math.max(3,bw-2)),y=v=>T+(H-T-B)*(1-v/top);let g='';
  for(let v=0;v<=top+1e-9;v+=step)g+=`<line class="gl" x1="${L}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end">${o.fmt?o.fmt(v):v}</text>`;
  const every=Math.ceil(n/8);
  data.forEach((d,i)=>{const x=L+i*bw+(bw-w)/2,yy=y(d.v),hh=H-B-yy;
    if(d.v>0)g+=`<path class="bar" d="M${x} ${H-B}V${yy+Math.min(3,hh)}q0-${Math.min(3,hh)} ${Math.min(3,w/2)}-${Math.min(3,hh)}h${w-2*Math.min(3,w/2)}q${Math.min(3,w/2)} 0 ${Math.min(3,w/2)} ${Math.min(3,hh)}V${H-B}z"/>`;
    if(i%every===0)g+=`<text x="${L+i*bw+bw/2}" y="${H-6}" text-anchor="middle">${h(d.l)}</text>`;
    g+=`<rect class="hit" x="${L+i*bw}" y="${T}" width="${bw}" height="${H-T-B}" data-tip="${h(d.t)}"/>`});
  return`<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${h(o.label||'Bar chart')}">${g}</svg><div class="tipb" hidden></div></div>`}
document.addEventListener('mousemove',e=>{const r=e.target.closest&&e.target.closest('.hit');document.querySelectorAll('.tipb').forEach(t=>{if(!r||t.parentNode!==r.closest('.chart'))t.hidden=true});
  if(r){const c=r.closest('.chart'),t=c.querySelector('.tipb'),b=c.getBoundingClientRect();t.textContent=r.dataset.tip;t.hidden=false;t.style.left=Math.min(b.width-70,Math.max(70,e.clientX-b.left))+'px';t.style.top=(e.clientY-b.top)+'px'}});
/* a QR-looking picture. It is random dots, not a real code. */
function fakeQR(seedStr){let s=0;for(const c of seedStr)s=(s*31+c.charCodeAt(0))>>>0;const R=rng(s),n=25;let d='';
  const fin=(x,y)=>(x<7&&y<7)||(x>=n-7&&y<7)||(x<7&&y>=n-7);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){let on;if(fin(x,y)){const fx=x<7?x:x-(n-7),fy=y<7?y:y-(n-7);on=fx===0||fx===6||fy===0||fy===6||(fx>=2&&fx<=4&&fy>=2&&fy<=4)}else on=R()<0.48;if(on)d+=`M${x} ${y}h1v1h-1z`}
  return`<div class="qr" title="Demo picture only. It cannot be scanned."><svg viewBox="-1 -1 ${n+2} ${n+2}" aria-hidden="true"><rect x="-1" y="-1" width="${n+2}" height="${n+2}" fill="#fff"/><path d="${d}" fill="#111"/></svg><span><b>DEMO</b></span></div>`}
