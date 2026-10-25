/* ---------- Dishes to push today, and what may run out ---------- */
const isSoldOut=id=>S.soldOut[id]===today();
const todaySpecials=()=>S.specials[today()]||[];
const isSpecial=id=>todaySpecials().includes(id);
/* how many portions the stock can still make, and which ingredient runs out first */
function dishPortions(m){let mn=Infinity,lim='';m.recipe.forEach(([g,q])=>{if(q<=0)return;const n=onHand(g)/q;if(n<mn){mn=n;lim=g}});return{n:mn===Infinity?0:Math.floor(mn+1e-9),lim}}
/* dishes that use the food most likely to be left over in the next 3 days */
function pushList(){const risk={};riskList(3).forEach(x=>{if(x.risk>0){const o=risk[x.i.id]||(risk[x.i.id]={ing:x.i.id,risk:0,left:0,d:x.d});o.risk+=x.risk;o.left=r3(o.left+x.left);o.d=Math.min(o.d,x.d)}});
  const out=[];S.menu.forEach(m=>{if(isSoldOut(m.id)||!m.recipe.length)return;let score=0;const uses=[];
    m.recipe.forEach(([g,q])=>{const r=risk[g];if(r&&q*ING(g).cost>=50){score+=r.risk;uses.push(r)}});
    if(score>=500&&dishPortions(m).n>=1)out.push({m,score,uses:uses.sort((a,b)=>b.risk-a.risk)})});
  return out.sort((a,b)=>b.score-a.score).slice(0,6)}
const pushWhy=x=>{const u=x.uses[0];return 'Uses '+ING(u.ing).name+': '+qU(u.ing,u.left)+' likely left over by '+(u.d===0?'tonight':u.d===1?'tomorrow':fDs(addDays(today(),u.d)))+' ('+rm(u.risk)+' at risk)'};
/* ingredients that will probably run out before the next delivery at today's pace */
function shortList(){const out=[];S.ingredients.forEach(i=>{const avg=avgUse(i.id),oh=onHand(i.id);if(avg<0.0005)return;const cover=oh/avg;if(cover<1){
    const dishes=S.menu.filter(m=>m.recipe.some(r=>r[0]===i.id&&r[1]*i.cost>=30));if(!dishes.length)return;out.push({i,oh,avg,cover,oo:onOrder(i.id),dishes})}});return out.sort((a,b)=>a.cover-b.cover)}
SCREENS.push={sec:'stock',title:()=>"Dishes to push today",help:['"Push these today" lists dishes that use food likely to be left over soon. Put them on the specials board.','"May run out today" lists ingredients that will probably run out at today\'s pace, and the dishes that need them.','"Mark sold out" greys the dish out on the till for the rest of today.'],
 html(){const ps=pushList(),sh=shortList(),sp=todaySpecials();
  return `${pageHead("Dishes to push today",'Based on what expires soon and what is running low. '+demoTag,`<button class="btn sec" ${A('go',{s:'expReport'})}>${ic('clock')}Expiring-soon report</button>`)}
  <div class="card pad0" id="pushlist"><div style="padding:14px 16px 6px"><h2>Push these today</h2><p class="muted sm">These dishes use food that will probably be left over in the next 3 days. Selling them first turns it into sales instead of waste.</p></div>
   <div class="tw">${ps.length?`<table><tr><th>Dish and why</th><th class="r hide-s">Can still make</th><th></th></tr>${ps.map(x=>{const on=isSpecial(x.m.id);return`<tr><td><b>${x.m.e} ${h(x.m.name)}</b>${on?' '+pill("Today's special",'ok'):''}<div class="sm muted" style="margin-top:3px">${h(pushWhy(x))}</div></td><td class="r hide-s">${plural(dishPortions(x.m).n,'portion')}</td><td><button class="btn ${on?'sec':''} sm" ${A('specialTog',{id:x.m.id})}>${on?'Take off specials':"Add to today's specials"}</button></td></tr>`}).join('')}</table>`
    :empty('Nothing needs pushing today','No food is likely to be left over in the next 3 days.')}</div></div>
  <div class="card pad0" id="shortlist"><div style="padding:14px 16px 6px"><h2>May run out today</h2><p class="muted sm">At the pace of the last 14 days, these will run out before the end of today.</p></div>
   <div class="tw">${sh.length?`<table><tr><th>Ingredient</th><th class="r">Left</th><th class="r hide-s">Used per day</th><th>Dishes that need it</th><th>What to do</th></tr>${sh.map(x=>`<tr><td class="b">${h(x.i.name)} ${pill('About '+Math.round(x.cover*100)+'% of a day left','bad')}</td><td class="r" style="white-space:nowrap">${qU(x.i.id,x.oh)}</td><td class="r hide-s" style="white-space:nowrap">${qU(x.i.id,x.avg)}</td>
     <td><div class="chips">${x.dishes.slice(0,6).map(m=>`<button class="chip sm ${isSoldOut(m.id)?'on':''}" aria-pressed="${isSoldOut(m.id)}" ${A('soldTog',{id:m.id})}>${isSoldOut(m.id)?'Sold out: ':''}${h(m.name)}</button>`).join('')}</div><span class="muted sm">Tap a dish to mark it sold out on the till.</span></td>
     <td>${x.oo>0?pill(qU(x.i.id,x.oo)+' on order','info'):`<button class="btn sm" style="white-space:nowrap" ${A('go',{s:'newOrder',p:{ing:x.i.id}})}>Order more</button>`}</td></tr>`).join('')}</table>`
    :empty('Nothing should run out today','Every ingredient has at least a day of stock at the usual pace.')}</div></div>
  ${sp.length?`<div class="card"><h2>On today's specials board</h2><p>${sp.map(id=>MENU(id)).filter(Boolean).map(m=>h(m.name)).join(', ')}</p><p class="muted sm">The till shows these with a star, so cashiers can suggest them.</p></div>`:''}
  <p class="muted sm">How this is worked out: "at risk" food comes from the expiring-soon report. "May run out" compares what is left with the average use per day over the last 14 days. It is a guide, so check with the kitchen.</p>`}};
Object.assign(ACT,{
 specialTog:p=>{const T=today(),l=S.specials[T]||(S.specials[T]=[]),m=MENU(p.id);Object.keys(S.specials).forEach(d=>{if(d<addDays(T,-7))delete S.specials[d]});
   if(l.includes(p.id)){S.specials[T]=l.filter(x=>x!==p.id);toast(m.name+" taken off today's specials")}else{l.push(p.id);toast(m.name+" added to today's specials. The till shows it with a star.")}save();render(true)},
 soldTog:p=>{const m=MENU(p.id);if(isSoldOut(p.id)){delete S.soldOut[p.id];toast(m.name+' is back on sale')}else{S.soldOut[p.id]=today();toast(m.name+' marked sold out on the till for today',()=>{delete S.soldOut[p.id]})}save();render(true)}
});

/* ---------- Usage check ---------- */
const USE_ST={less:['Less than the recipes say','bad'],more:['More than the recipes say','warn'],ok:['Normal range','ok']};
function useWhy(o){const i=ING(o.ing),pct=Math.abs(Math.round(o.share*100));
  if(o.st==='less')return 'Counted '+qU(o.ing,Math.abs(o.diff))+' less than the recipes say ('+pct+'% of what was used). Portions may be bigger than the recipe, waste may not be logged, or stock went missing. Check the portion size with the cook.';
  if(o.st==='more')return 'Counted '+qU(o.ing,o.diff)+' more than the recipes say ('+pct+'% of what was used). The recipe may list more than cooks really use. Check the recipe amount.';
  return Math.abs(o.diff)<0.0005?'The count matched the app.':'Within the normal range. Portions are never exactly the same.'}
SCREENS.usage={sec:'stock',title:()=>'Usage check',help:['This compares what the recipes say was used with what your stock counts found on the shelf.','A red row means much less was on the shelf than expected. Check portion sizes, unlogged waste, or missing stock.','Differences under 10% of what was used are normal, because portions are never exactly the same.'],
 html(p){const days=p.days||14,xs=usageCheck(days),ls=xs.filter(o=>o.st==='less'),mo=xs.filter(o=>o.st==='more'),okn=xs.length-ls.length-mo.length;
  return `${pageHead('Usage check','What the recipes say was used, compared with your stock counts. '+demoTag,`<button class="btn" ${A('go',{s:'shelfScan'})}>${ic('scan')}Count by photo</button><button class="btn sec" ${A('go',{s:'count'})}>Count stock</button>`)}
  <div class="row"><span class="flabel">Counts from the last:</span><div class="chips">${[7,14].map(k=>`<button class="chip sm ${days===k?'on':''}" aria-pressed="${days===k}" ${A('set',{k:'days',v:k})}>${plural(k,'day')}</button>`).join('')}</div></div>
  <div class="grid g3" id="usekpi"><div class="kpi"><span class="l">Less than the recipes say</span><span class="v red-t">${rm(-ls.reduce((a,o)=>a+o.cost,0))}</span><span class="s">${plural(ls.length,'item')} to check</span></div>
   <div class="kpi"><span class="l">More than the recipes say</span><span class="v">${rm(mo.reduce((a,o)=>a+o.cost,0))}</span><span class="s">${plural(mo.length,'item')} to check</span></div>
   <div class="kpi"><span class="l">Within the normal range</span><span class="v grn-t">${okn}</span><span class="s">Differences under 10% are normal</span></div></div>
  <div class="card pad0"><div class="tw">${xs.length?`<table><tr><th>Item and what it may mean</th><th class="r hide-s">Used by recipes</th><th class="r">Count difference</th><th class="r hide-s">Value</th><th></th></tr>${xs.map(o=>`<tr><td><b>${h(ING(o.ing).name)}</b> ${pill(...USE_ST[o.st])}${o.photo?' '+pill('Photo count','info'):''}<div class="sm muted" style="margin-top:4px;max-width:520px">${useWhy(o)}</div></td><td class="r hide-s" style="white-space:nowrap">${qU(o.ing,o.use)}</td><td class="r ${o.diff<0?'red-t':o.diff>0?'grn-t':''} b" style="white-space:nowrap">${o.diff>0?'+':''}${qU(o.ing,o.diff)}</td><td class="r hide-s" style="white-space:nowrap">${rm(o.cost)}</td>
    <td>${o.st==='more'?`<button class="btn sec sm" ${A('go',{s:'menuList',p:{q:''}})}>Check recipes</button>`:`<button class="btn sec sm" ${A('go',{s:'item',p:{id:o.ing}})}>Open item</button>`}</td></tr>`).join('')}</table>`
   :empty('No stock counts in the last '+plural(days,'day'),'Count your stock, by hand or with a photo, and the check appears here.',`<button class="btn" ${A('go',{s:'shelfScan'})}>Count by photo</button>`)}</div></div>
  <p class="muted sm">How this is worked out: every sale takes the recipe amounts off the stock. When staff count the shelf, the difference between the count and the app is kept. Here those differences are added up and compared with what the recipes used in the same days. Demo data.</p>`}};

/* ---------- Weekly summary ---------- */
function weekText(){const w=weekStats(0),l=weekStats(1),ur=usageCheck(7).filter(o=>o.st!=='ok').slice(0,3),ps=pushList().slice(0,3),risk=riskList(7).reduce((a,x)=>a+x.risk,0);
  return [L('Weekly summary'),S.settings.cafe.name+' · '+fD(w.a)+' – '+fD(w.b),'',
   L('Food cost this week')+': '+w.fc.toFixed(1)+'% ('+L('target')+' '+S.settings.fcTarget+'%, '+L('last week')+' '+l.fc.toFixed(1)+'%)',
   L('Waste this week')+': '+rm(w.wRM)+' ('+L('last week')+' '+rm(l.wRM)+')',L('Value at risk in the next 7 days')+': '+rm(risk),'',
   L('Check these')+':',...ur.map(o=>'- '+L(ING(o.ing).name)+': '+(o.diff>0?'+':'')+qU(o.ing,o.diff)+' ('+L(USE_ST[o.st][0])+')'),...ps.map(x=>'- '+L('Push')+': '+L(x.m.name)),'',L('Demo data.')].join('\n')}
SCREENS.weekly={sec:'reports',title:()=>'Weekly summary',help:['One page to check once a week: food cost against your target, waste, and what to look at.','"Copy to share" gives a short text for the team chat.','Change the food cost target in Settings, under Alerts and targets.'],
 html(){const w=weekStats(0),l=weekStats(1),t=S.settings.fcTarget,st=fcState(w.fc),risk=riskList(7).reduce((a,x)=>a+x.risk,0),ur=usageCheck(7).filter(o=>o.st!=='ok').slice(0,3),ps=pushList().slice(0,3),sh=shortList().slice(0,3);
  const wk=[7,6,5,4,3,2,1,0].map(k=>({k,s:weekStats(k)}));TEXTS.weekText=weekText;TEXTS.weekText.file='goodbite-week-'+w.a+'.txt';
  const diff=w.fc-l.fc;
  return `${pageHead('Weekly summary',fD(w.a)+' – '+fD(w.b)+' '+demoTag,`<button class="btn" id="weekshare" ${A('showText',{t:'Weekly summary',k:'weekText'})}>${ic('copy')}Copy to share</button><button class="btn sec" ${A('go',{s:'setAlerts'})}>Change target</button>`)}
  <div class="grid g4" id="weekkpi"><div class="kpi"><span class="l">Food cost this week ${tip('fc')}</span><span class="v ${st==='ok'?'grn-t':st==='bad'?'red-t':''}">${w.fc.toFixed(1)}%</span><span class="s">${pill(st==='ok'?'On target':'Above target',st==='ok'?'ok':st==='bad'?'bad':'warn')} Target ${t}%</span></div>
   <div class="kpi"><span class="l">Compared with last week</span><span class="v">${diff>0?'+':''}${diff.toFixed(1)}</span><span class="s">Last week ${l.fc.toFixed(1)}% (percentage points)</span></div>
   <div class="kpi"><span class="l">Waste this week</span><span class="v">${rm(w.wRM)}</span><span class="s">Last week ${rm(l.wRM)}</span></div>
   <div class="kpi"><span class="l">Value at risk, next 7 days</span><span class="v red-t">${rm(risk)}</span><span class="s">Food likely left over</span></div></div>
  <div class="card"><h2>Food cost per week, target ${t}%</h2>${barChart(wk.map(x=>({l:fDs(x.s.a),v:Math.round(x.s.fc*10)/10,t:'Week of '+fDs(x.s.a)+': '+x.s.fc.toFixed(1)+'%'+(x.k===0?' (so far)':'')})),{fmt:v=>v+'%',h:170,label:'Food cost per week in percent'})}<p class="muted sm">Each bar is one week, Monday to Sunday. The last bar is this week so far.</p></div>
  <div class="grid g3"><div class="card"><h2>Usage check</h2>${ur.length?ur.map(o=>`<div class="tot sm" style="padding:5px 0"><span>${h(ING(o.ing).name)} ${pill(USE_ST[o.st][0],USE_ST[o.st][1])}</span><b style="white-space:nowrap">${rm(o.cost)}</b></div>`).join(''):'<p class="muted">Every count this week was in the normal range.</p>'}<div style="margin-top:10px"><button class="btn sec sm" ${A('go',{s:'usage',p:{days:7}})}>Open the usage check</button></div></div>
   <div class="card"><h2>Dishes to push</h2>${ps.length?`<p>${ps.map(x=>h(x.m.name)).join(', ')}</p>`:'<p class="muted">Nothing needs pushing right now.</p>'}<div style="margin-top:10px"><button class="btn sec sm" ${A('go',{s:'push'})}>Open dishes to push</button></div></div>
   <div class="card"><h2>May run out today</h2>${sh.length?`<p>${sh.map(x=>h(x.i.name)).join(', ')}</p>`:'<p class="muted">Nothing should run out today.</p>'}<div style="margin-top:10px"><button class="btn sec sm" ${A('root',{s:'orders',p:{tab:'suggest'}})}>See suggested orders</button></div></div></div>
  <p class="muted sm">Food cost % = cost of the ingredients used in what was sold, divided by sales before tax and service charge.${S.pos.connected?' Sales synced from your POS are included.':''} Demo data.</p>`}};

/* ---------- Get set up: 3 steps on the owner's Home ---------- */
function topDishes(n){const by={};S.sales.forEach(s=>{if(s.status==='paid')s.lines.forEach(l=>{if(MENU(l.item))by[l.item]=(by[l.item]||0)+l.qty})});
  return Object.keys(by).sort((a,b)=>by[b]-by[a]).slice(0,n).map(id=>({m:MENU(id),q:by[id]}))}
const recipesDone=()=>topDishes(5).every(x=>S.setup.recipes[x.m.id]);
function setupSteps(){return[['photo','Count your stock with a photo','Take a photo of each shelf. The app fills in the amounts for you to check.',!!S.setup.photo,{s:'shelfScan'}],
  ['pos','Connect your POS, or use the GoodBite till','Then every sale takes its ingredients off the stock by itself.',!!S.setup.pos,{s:'posLink'}],
  ['recipes','Check the recipes of your top 5 dishes','Start with what sells most. Add the rest later.',recipesDone(),{s:'setupRecipes'}]]}
function setupCard(){if(S.setup.hide)return'';const st=setupSteps(),n=st.filter(x=>x[3]).length;
  return `<div class="card setup" id="setupcard" style="display:flex;flex-direction:column;gap:10px"><div class="row"><h2 class="grow">Get set up in 3 steps</h2>${pill(n+' of 3 done',n===3?'ok':'info')}</div>
   ${st.map(([k,t,d,done,go],i)=>`<button class="alert ${done?'':'info'}" ${A('go',go)}><span class="ai" style="background:${done?'var(--green-s)':'var(--panel-2)'};color:var(--green-d)">${done?ic('check'):'<b>'+(i+1)+'</b>'}</span><span class="grow" style="text-align:left">${t}<small>${d}</small></span><span class="go">${done?'Done':'Start'}${ic('chev')}</span></button>`).join('')}
   <div class="row"><span class="muted sm grow">Stuck? We can help in English, BM or 中文.</span><button class="btn sec sm" ${A('helpChat',{k:'chat'})}>Chat on WhatsApp</button><button class="btn sec sm" ${A('helpChat',{k:'call'})}>Book a free video call</button><button class="btn sec sm" ${A('setupHide')}>${n===3?'Hide this':'Hide for now'}</button></div></div>`}
Object.assign(ACT,{
 helpChat:p=>modal(()=>`${mHead(p.k==='call'?'Book a free video call':'Chat on WhatsApp')}<p>${p.k==='call'?'Pick a 15-minute slot and someone from GoodBite walks you through connecting your POS on a video call. No visit is needed.':'A real product would open WhatsApp with the GoodBite support number here, so you can ask a question in English, BM or 中文.'}</p><p class="muted sm">Simulated in this demo. Nothing is sent and no call is booked.</p><div class="mf"><button class="btn" ${A('closeModal')}>Got it</button></div>`),
 setupHide:()=>{S.setup.hide=true;save();render();toast('Set-up steps hidden. Open them again from Settings.',()=>{S.setup.hide=false})},
 setupShow:()=>{S.setup.hide=false;save();root('home')}
});
SCREENS.setupRecipes={sec:'settings',title:()=>'Check your top 5 recipes',help:['These are the 5 dishes that sold the most in the last few days.','Check each recipe with the cook. If it looks right, press "Looks right". If not, press "Change recipe".','The recipe is what each sale takes off the stock, so the top sellers matter most.'],
 html(){const ts=topDishes(5),n=ts.filter(x=>S.setup.recipes[x.m.id]).length;
  return `${pageHead('Check your top 5 recipes','Each sale takes the recipe off the stock, so start with what sells most. '+pill(n+' of '+ts.length+' checked',n===ts.length?'ok':'info'))}
  <div class="grid">${ts.map(({m,q})=>{const ok=S.setup.recipes[m.id],c=recipeCost(m);return`<div class="card" style="display:flex;flex-direction:column;gap:8px"><div class="row"><h3 class="grow">${m.e} ${h(m.name)}</h3><span class="muted sm">${plural(q,'portion')} sold in the last 3 days</span>${ok?pill('Looks right','ok'):''}</div>
    <p class="sm">${m.recipe.map(([g,qq])=>h(ING(g).name)+' '+qU(g,qq)).join(' · ')}</p><p class="muted sm">Ingredients cost ${rm(c)} · price ${rm(m.price)} · food cost ${m.price?(c/m.price*100).toFixed(0):0}%</p>
    <div class="row"><button class="btn ${ok?'sec':''} sm" ${A('recipeOk',{id:m.id})}>${ok?'Not sure any more':'Looks right'}</button><button class="btn sec sm" ${A('go',{s:'menuItem',p:{id:m.id}})}>Change recipe</button></div></div>`}).join('')}</div>
  <div class="foot"><span class="muted sm">${n===ts.length?'All done. The other dishes can be checked later in Settings, Menu and recipes.':'Check each one with the cook.'}</span><div class="rt"><button class="btn big" ${A('root',{s:'home'})}>Back to Home</button></div></div>`}};
ACT.recipeOk=p=>{S.setup.recipes[p.id]=!S.setup.recipes[p.id];save();render(true);if(recipesDone())toast('Top 5 recipes checked. Step 3 is done.')};

/* ---------- POS link (simulated): for outlets that keep their own POS ---------- */
const POS_SYS=[['feedme','Feed Me'],['coox','Coox'],['loyverse','Loyverse'],['storehub','StoreHub'],['file','Another POS (upload a sales file)']];
const posName=k=>(POS_SYS.find(x=>x[0]===k)||['','your POS'])[1];
/* menu items as the POS names them, with the dish the app suggests. sure:false means staff should check the match. */
const POS_ITEMS=[{k:'p1',n:'BUTTER PRAWN',d:'104',sure:true,w:5},{k:'p2',n:'KAM HEONG LALA',d:'105',sure:true,w:5},{k:'p3',n:'LALA SOUP',d:'106',sure:true,w:4},{k:'p4',n:'STM TILAPIA HK',d:'101',sure:false,w:4},
 {k:'p5',n:'SWEET SOUR PORK',d:'201',sure:true,w:6},{k:'p6',n:'KUNG PO CHICKEN',d:'203',sure:true,w:6},{k:'p7',n:'KANGKUNG BELACAN',d:'301',sure:true,w:8},{k:'p8',n:'KAILAN GARLIC',d:'302',sure:true,w:7},
 {k:'p9',n:'TOFU CLAYPOT',d:'304',sure:false,w:5},{k:'p10',n:'WHITE RICE',d:'401',sure:true,w:22},{k:'p11',n:'EGG FRIED RICE',d:'402',sure:true,w:8},{k:'p12',n:'CKT',d:'404',sure:false,w:9},
 {k:'p13',n:'WAT TAN HOR',d:'405',sure:false,w:7},{k:'p14',n:'CHINESE TEA',d:'501',sure:true,w:14},{k:'p15',n:'LIMAU ICE',d:'502',sure:false,w:10},{k:'p16',n:'TAKEAWAY BOX',d:'',sure:true,w:6,nf:true}];
const posMatch=it=>S.pos.map[it.k]!=null?S.pos.map[it.k]:it.d;
SCREENS.posLink={sec:'settings',title:()=>'Plan and POS link',help:['Already have a POS? Connect it, and every sale it records takes the recipe off GoodBite\'s stock.','Step 3 matches the names your POS uses to the dishes in GoodBite. You only do this once.','No password is typed into GoodBite. In a real product you would log in on your POS\'s own page.'],
 html(p){const P=S.pos;if(P.connected&&!p.edit)return posConnected();const step=p.step||1,steps=stepsBar(['Pick your POS','Allow access','Match menu items'],step-1),sys=p.sys||P.sys;
  if(step===1)return `${pageHead('Plan and POS link','How do you take orders today? '+pill('Simulated in this demo','warn'))}${steps}
   <div class="grid g2"><div class="card" style="display:flex;flex-direction:column;gap:10px"><h2>I already have a POS</h2><p class="muted sm">GoodBite Stock, RM39 to RM59 a month. Keep your POS. GoodBite reads its sales and takes the ingredients off the stock.</p>
     ${POS_SYS.map(([k,l])=>`<button class="opt ${sys===k?'on':''}" aria-pressed="${sys===k}" ${A('set',{k:'sys',v:k})}>${ic('link')}<b>${h(l)}</b></button>`).join('')}
     <button class="btn big" id="posnext" ${A('set',{k:'step',v:2})} ${sys?'':'disabled'}>Next: allow access</button>${sys?'':'<span class="why">Pick your POS first.</span>'}</div>
    <div class="card" style="display:flex;flex-direction:column;gap:10px"><h2>I want a new till</h2><p class="muted sm">GoodBite All-in-One, RM79 to RM99 a month. Use the GoodBite till on a tablet. Sales take the stock off straight away.</p>
     <button class="btn sec big" ${A('posUseTill')}>${ic('bag')}Use the GoodBite till</button>${S.settings.plan==='allinone'?`<p class="sm">${pill('This is your plan now','ok')}</p>`:''}</div></div>
   <div class="foot"><button class="btn sec" ${A('back')}>Cancel</button></div>`;
  if(step===2)return `${pageHead('Allow GoodBite to read your sales',h(posName(sys)))}${steps}
   <div class="card" style="display:flex;flex-direction:column;gap:12px">${sys==='file'?`<p>Export last week's sales from your POS as a spreadsheet (CSV) file, then upload it here. Do this once a day, or once a week.</p><div><button class="btn big" id="posallow" ${A('posAllow')}>${ic('file')}Use the sample sales file (simulated)</button></div>`
    :`<p>In a real product, this button opens ${h(posName(sys))}'s own log-in page. You log in there and press "Allow".</p><ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px"><li>GoodBite can read your menu items and the sales of each item.</li><li>GoodBite cannot change prices, see card numbers or move money.</li><li>You can disconnect at any time.</li></ul><div><button class="btn big" id="posallow" ${A('posAllow')}>${ic('link')}Allow access (simulated)</button></div>`}
    <p class="muted sm">Nothing is connected in this demo, and no password is asked for.</p></div>
   <div class="foot"><button class="btn sec" ${A('set',{k:'step',v:1})}>${ic('back')}Pick another POS</button></div>`;
  const mv=it=>(p.map&&p.map[it.k]!=null)?p.map[it.k]:posMatch(it),need=it=>!it.nf&&!it.sure&&!(p.ok||{})[it.k]&&(p.map||{})[it.k]==null&&S.pos.map[it.k]==null,left=POS_ITEMS.filter(need).length;
  return `${pageHead('Match your menu items','Your POS calls some dishes by other names. Match each one to a GoodBite dish once, and the app remembers.')}${steps}
   <div class="card pad0" id="posmap"><div class="tw"><table><tr><th>Name in ${h(posName(sys))}</th><th>GoodBite dish</th></tr>${POS_ITEMS.map(it=>{const v=mv(it),chk=need(it);
     return`<tr><td style="width:34%"><span class="mono b">${h(it.n)}</span><div class="sm muted">${plural(it.w*7,'sold last week','sold last week')}</div></td><td><div class="row" style="flex-wrap:wrap"><select class="inp" style="flex:1;min-width:180px;max-width:360px" id="pm-${it.k}" aria-label="GoodBite dish for ${h(it.n)}" data-m="map.${it.k}" data-r><option value="">Do not track (no recipe)</option>${S.menu.map(m=>`<option value="${m.id}" ${v===m.id?'selected':''}>${h(m.name)}</option>`).join('')}</select>
      ${it.nf?pill('Not food, left out'):chk?`<button class="btn sm" ${A('posOk',{k:it.k})}>Match is right</button>`:v?pill('Matched','ok'):pill('Not tracked')}</div></td></tr>`}).join('')}</table></div></div>
   <div class="foot"><button class="btn sec" ${A('set',{k:'step',v:2})}>${ic('back')}Back</button><div class="rt">${left?`<span class="why">Check ${plural(left,'match','matches')} the app was not sure about.</span>`:''}<button class="btn big" id="posfinish" ${A('posFinish')} ${left?'disabled':''}>Save and connect</button></div></div>`}};
function posConnected(){const P=S.pos,last=P.syncs[P.syncs.length-1],n=POS_ITEMS.filter(it=>posMatch(it)).length;
  return `${pageHead('Plan and POS link',pill('Connected to '+posName(P.sys)+' (simulated)','ok'),`<button class="btn" id="possync" ${A('posSyncDo')}>${ic('link')}Sync sales now</button><button class="btn sec" ${A('posEdit')}>Change matches</button>`)}
  <div class="grid g3"><div class="kpi"><span class="l">Your plan</span><span class="v" style="font-size:20px">GoodBite Stock</span><span class="s">RM39 to RM59 a month. The GoodBite till is hidden.</span></div>
   <div class="kpi"><span class="l">Last sync</span><span class="v" style="font-size:20px">${last?fT(last.dt):'Not yet'}</span><span class="s">${last?fD(last.dt):'Press "Sync sales now"'}</span></div>
   <div class="kpi"><span class="l">Menu items matched</span><span class="v">${n} of ${POS_ITEMS.length}</span><span class="s">The rest are not tracked</span></div></div>
  <div class="card pad0"><h2 style="padding:14px 16px 8px">Sales synced from ${h(posName(P.sys))}</h2><div class="tw">${P.syncs.length?`<table><tr><th>When</th><th class="r">Dishes sold</th><th class="r hide-s">Sales before tax</th><th class="r">Ingredients cost</th><th class="r">Food cost</th></tr>${P.syncs.slice().reverse().map(y=>`<tr><td>${fDT(y.dt)}</td><td class="r">${y.lines.reduce((a,l)=>a+l.qty,0)}</td><td class="r hide-s">${rm(y.net)}</td><td class="r">${rm(y.cogs)}</td><td class="r">${y.net?(y.cogs/y.net*100).toFixed(1):'0.0'}%</td></tr>`).join('')}</table>`:empty('No sales synced yet','Press "Sync sales now" to bring in the sales from your POS.',`<button class="btn" ${A('posSyncDo')}>Sync sales now</button>`)}</div></div>
  <div class="foot"><button class="btn red" ${A('posDisconnect')}>Disconnect and use the GoodBite till</button></div>`}
/* bring in sales from the POS: each matched dish takes its recipe off the stock. The sales are sample data. */
function posSync(){const P=S.pos,R=rng(7919+P.syncs.length*31),T=today(),lines=[],skipped=[],used=[],uses={};let net=0;
  POS_ITEMS.forEach(it=>{const q=Math.max(0,Math.round(it.w*(0.35+R()*0.4)));if(!q)return;const d=posMatch(it),m=d&&MENU(d);if(!m){skipped.push({pos:it.n,qty:q});return}
    lines.push({pos:it.n,dish:m.id,qty:q});net+=m.price*q;m.recipe.forEach(([g,qq])=>{const r=consume(g,qq*q);used.push(...r.used);uses[g]=r3((uses[g]||0)+qq*q);addUse(g,qq*q)})});
  const y={id:uid('y'),dt:isoDT(now()),sys:P.sys,lines,skipped,used,uses,net,cogs:used.reduce((a,u)=>a+u.cost,0)};P.syncs.push(y);if(P.syncs.length>40)P.syncs.shift();save();return y}
function posUnsync(y){giveBack(y.used);const u=S.use[y.dt.slice(0,10)];if(u)Object.keys(y.uses).forEach(g=>{u[g]=r3(Math.max(0,(u[g]||0)-y.uses[g]))});S.pos.syncs=S.pos.syncs.filter(x=>x!==y)}
Object.assign(ACT,{
 posUseTill:()=>{S.settings.plan='allinone';S.setup.pos=true;save();root('home');toast('Using the GoodBite till (All-in-One). Step 2 is done.')},
 posAllow:()=>{const c=cur().p;c.step=3;c.ok={};render();toast('Access allowed (simulated). Now match your menu items.')},
 posOk:p=>{const c=cur().p;c.ok=c.ok||{};c.ok[p.k]=true;render(true)},
 posFinish:()=>{const c=cur().p;POS_ITEMS.forEach(it=>{const v=(c.map||{})[it.k];S.pos.map[it.k]=v!=null?v:(it.nf?'':it.d)});S.pos.sys=c.sys||S.pos.sys;S.pos.connected=true;S.settings.plan='stock';S.setup.pos=true;if(S.role==='cashier')S.role='owner';save();stack=[{s:'settings',p:{}},{s:'posLink',p:{}}];render();toast('Connected to '+posName(S.pos.sys)+' (simulated). Press "Sync sales now" to bring in sales.')},
 posEdit:()=>go('posLink',{edit:1,step:3,sys:S.pos.sys,map:{...S.pos.map},ok:{}}),
 posSyncDo:()=>{const y=posSync();go('posSyncDone',{id:y.id});toast(plural(y.lines.reduce((a,l)=>a+l.qty,0),'dish','dishes')+' synced from '+posName(S.pos.sys),()=>{posUnsync(y);root('home')})},
 posDisconnect:()=>confirmBox({title:'Disconnect '+posName(S.pos.sys)+'?',body:'GoodBite stops reading sales from your POS. The GoodBite till comes back on the menu. Sales already synced stay in the reports.',ok:'Yes, disconnect',no:'No, stay connected',danger:true,yes:()=>{S.pos.connected=false;S.settings.plan='allinone';save();root('settings');toast('Disconnected. The GoodBite till is back on the menu.')}})
});
SCREENS.posSyncDone={sec:'settings',title:()=>'Sales synced',html(p){const y=S.pos.syncs.find(x=>x.id===p.id);if(!y)return empty('This sync was undone','',`<button class="btn" ${A('root',{s:'home'})}>Back to Home</button>`);const n=y.lines.reduce((a,l)=>a+l.qty,0),ings=Object.keys(y.uses);
  return `<div class="card donebox"><span class="tick">${ic('check')}</span><h1>Sales synced</h1><p>${plural(n,'dish','dishes')} sold on ${h(posName(y.sys))} since the last sync. Stock was reduced for ${plural(ings.length,'ingredient')}, oldest batches first.</p>
   <div class="tw" style="width:100%;max-width:560px"><table>${y.lines.map(l=>`<tr><td style="text-align:left"><span class="mono">${h(l.pos)}</span></td><td style="text-align:left">${h(MENU(l.dish)?MENU(l.dish).name:'')}</td><td class="r b">${l.qty}</td></tr>`).join('')}${y.skipped.map(l=>`<tr><td style="text-align:left"><span class="mono">${h(l.pos)}</span></td><td style="text-align:left" class="muted">Not tracked</td><td class="r muted">${l.qty}</td></tr>`).join('')}</table></div>
   <p class="muted">Ingredients cost ${rm(y.cogs)} for ${rm(y.net)} of sales before tax (food cost ${y.net?(y.cogs/y.net*100).toFixed(1):'0.0'}%). Sample sales, simulated.</p>
   <div class="acts"><button class="btn big" ${A('root',{s:'home'})}>Back to Home</button><button class="btn sec big" ${A('root',{s:'stock'})}>See stock</button></div></div>`}};

/* ---------- Count stock with a photo of a shelf (simulated) ---------- */
const SHELVES=[['seafood','Seafood chiller','Seafood','🧊'],['meat','Meat chiller','Meat and poultry','🥩'],['veg','Vegetable rack','Vegetables','🥬'],['eggs','Egg, tofu and noodle shelf','Eggs, tofu and noodles','🥚'],['dry','Dry store','Dry goods and sauces','📦'],['drinks','Drinks fridge','Drinks and dairy','🥤']];
/* what is really on the shelf in the sample photo, compared with the app: a few items are short, as happens in real kitchens */
const SHELF_GAP={prawn:-0.4,lala:-0.6,squid:-0.1,chicken:-0.3,beef:-0.2,wing:-0.1,kailan:-0.1,tofu:-1,egg:-6,rice:2,oil:-0.3};
const photoRead=id=>{const i=ING(id),v=Math.max(0,onHand(id)+(SHELF_GAP[id]||0));return i.unit==='piece'?Math.round(v):v<10?Math.round(v*10)/10:Math.round(v*2)/2};
SCREENS.shelfScan={sec:'stock',title:()=>'Count by photo',help:['Pick the shelf, then take a photo of it.','The app reads how much of each item it can see and fills in the count for you.','Check each amount on the next screen, change any that are wrong, then press "Save count".'],
 html(p){const sh=SHELVES.find(x=>x[0]===p.shelf);
  if(!sh)return `${pageHead('Count by photo','Which shelf are you counting? '+pill('Simulated in this demo','warn'))}${stepsBar(['Pick a shelf','Take the photo','Check and save'],0)}
   <div class="grid g3" id="shelves">${SHELVES.map(([k,t,c,e])=>`<button class="biga way" ${A('set',{k:'shelf',v:k})}><span class="wpic" aria-hidden="true">${e}</span>${t}<small>${plural(S.ingredients.filter(i=>i.cat===c).length,'item')}</small></button>`).join('')}</div>
   <div class="foot"><button class="btn sec" ${A('back')}>Cancel</button><div class="rt"><button class="btn sec" ${A('go',{s:'count'})}>Count by hand instead</button></div></div>`;
  const items=S.ingredients.filter(i=>i.cat===sh[2]);
  return `${pageHead(h(sh[1]),'Stand back so the whole shelf fits in the photo. In this demo the camera shows a sample picture.')}${stepsBar(['Pick a shelf','Take the photo','Check and save'],1)}
   <div class="grid g2"><div class="cam shelfpic" role="img" aria-label="Camera view of the ${h(sh[1])} (sample picture)"><span class="cr tl"></span><span class="cr tr"></span><span class="cr bl"></span><span class="cr br"></span><div class="shelfg">${items.map(i=>`<span><i aria-hidden="true">${PICS[i.id]||'📦'}</i>${h(i.name)}</span>`).join('')}</div></div>
    <div class="card" style="display:flex;flex-direction:column;gap:12px"><p>The app looks for each of the ${plural(items.length,'item')} kept here and estimates how much is left.</p><button class="btn big full" id="shelfshoot" ${A('shelfShoot')}>${ic('scan')}Take photo (simulated)</button><p class="muted sm">Simulated: nothing is read from a real camera. Amounts are rounded, so staff check them before saving.</p></div></div>
   <div class="foot"><button class="btn sec" ${A('set',{k:'shelf',v:''})}>${ic('back')}Pick another shelf</button></div>`}};
ACT.shelfShoot=()=>{const c=cur().p,sh=SHELVES.find(x=>x[0]===c.shelf),items=S.ingredients.filter(i=>i.cat===sh[2]),vals={};items.forEach(i=>vals[i.id]=qf(photoRead(i.id)));
  go('count',{cat:sh[2],vals,photo:{shelf:sh[1],ids:items.map(i=>i.id)}},true);toast(plural(items.length,'amount')+' read from the photo (simulated). Check them, then save.')};
