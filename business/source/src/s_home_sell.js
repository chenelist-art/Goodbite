/* ---------- Home ---------- */
function alertsFor(role){const a=[],T=today(),k=role==='kitchen',c=role==='cashier',o=role==='owner';
  const add=(cls,icn,t,sub,act,p,goTxt)=>a.push({cls,icn,t,sub,act,p,goTxt});
  if(!c){
    const auto=S.waste.filter(w=>w.auto&&w.dt.slice(0,10)===T);
    if(auto.length)add('bad','trash',plural(auto.length,'item')+' passed the expiry date',''+'Moved to the waste log automatically ('+rm(auto.reduce((x,w)=>x+w.cost,0))+').','root',{s:'waste'},'See waste log');
    const soon=soonList(),ids=[...new Set(soon.map(b=>b.ing))];
    if(soon.length)add('warn','clock',plural(ids.length,'item')+' expiring in '+plural(S.settings.expDays,'day'),ids.slice(0,4).map(i=>ING(i).name).join(', ')+(ids.length>4?' and more':''),'root',{s:'stock',p:{tab:'soon'}},'See the list');
    S.orders.filter(x=>(x.status==='sent'||x.status==='part')&&x.expected<=T).forEach(x=>add('info','truck','Delivery from '+SUP(x.sup).name+' is due'+(x.expected===T?' today':''),'Order #'+x.no+(x.status==='part'?' (part received)':''),'go',{s:'receive',p:{order:x.id,step:1}},'Receive goods'));
    const low=lowList();let shown=0;
    low.forEach(i=>{if(shown>=3)return;const oo=onOrder(i.id);if(oo>0)return;shown++;add('bad','box',i.name+' is low',qU(i.id,onHand(i.id))+' left. Minimum is '+qU(i.id,i.min)+'.','go',{s:'newOrder',p:{ing:i.id}},'Order now')});
    const rest=low.length-shown;if(rest>0)add('warn','box',plural(rest,'more item')+' below minimum stock','Some of them are already on order.','root',{s:'stock',p:{tab:'low'}},'See the list');
  }
  if(o||c){const w=S.sales.filter(x=>x.want&&x.status==='paid'&&!x.inv).length;if(w)add('warn','file',plural(w,'sale')+(w===1?' has':' have')+' no e-invoice yet','The customer asked for an e-invoice.','go',{s:'invoices',p:{f:'wait'}},'Issue them');
    if(c&&S.held.length)add('info','bag',plural(S.held.length,'bill')+' on hold','Open the till to bring a bill back.','root',{s:'pos',p:{openHeld:1}},'Open held bills')}
  if(o){const pm=addMonth(T.slice(0,7),-1);if(!S.cons[pm]&&consDays(pm).length){const due=T.slice(0,7)+'-07';add(T>due?'bad':'warn','file','Combined e-invoice for '+fM(pm)+' walk-in sales is '+(T>due?'overdue':'due by '+fDs(due)),'One e-invoice covers every sale where nobody asked for their own.','go',{s:'invWiz',p:{cons:pm}},'Create it')}
    S.invoices.filter(i=>i.status==='Invalid').forEach(i=>add('bad','alert','E-invoice '+i.no+' was rejected','Fix the buyer details and send it again.','go',{s:'inv',p:{id:i.id}},'Fix it'));
    const od=S.bills.filter(b=>!b.paid&&b.due<T);if(od.length)add('warn','truck',plural(od.length,'supplier bill')+(od.length===1?' is':' are')+' overdue',rm(od.reduce((x,b)=>x+b.amount,0))+' in total.','root',{s:'orders',p:{tab:'bills'}},'See bills')}
  return a}
SCREENS.home={sec:'home',title:()=>'Home',help:['The big round buttons start the jobs you do most often.','The cards under "To do" are things that need attention. Tap a card to go straight to the fix.','Use "Viewing as" at the top to see the app the way another staff member sees it.'],
 html(){const r=S.role,T=today(),hr=now().getHours(),al=alertsFor(r);
  const big={owner:[['New sale','bag','root',{s:'pos'}],['Receive delivery','truck','go',{s:'receive',p:{step:0}}],['Log waste','trash','root',{s:'waste'}],['Count stock','list','go',{s:'count'}]],
    cashier:[['New sale','bag','root',{s:'pos'}],["See today's sales",'list','go',{s:'salesList'}]],
    kitchen:[['Receive delivery','truck','go',{s:'receive',p:{step:0}}],['Log waste','trash','root',{s:'waste'}],['Count stock','list','go',{s:'count'}],['Expiring soon','clock','root',{s:'stock',p:{tab:'soon'}}]]}[r];
  let kp='';
  if(r==='owner'){const d=S.days[T]||{total:0,bills:0},ms=monthStats(T.slice(0,7));
    kp=`<div><div class="row" style="margin-bottom:10px"><h2>Numbers at a glance</h2>${demoTag}</div><div class="grid g4">
    <button class="kpi" ${A('go',{s:'salesList'})}><span class="l">Sales today</span><span class="v">${rm(d.total)}</span><span class="s lnk">${plural(d.bills,'bill')} · see them ›</span></button>
    <button class="kpi" ${A('root',{s:'reports'})}><span class="l">Sales this month</span><span class="v">${rm(ms.sales)}</span><span class="s lnk">Open report ›</span></button>
    <button class="kpi" ${A('root',{s:'reports',p:{focus:'waste'}})}><span class="l">Waste this month</span><span class="v">${rm(ms.wRM)}</span><span class="s lnk">${qf(ms.wKg)} kg · see why ›</span></button>
    <button class="kpi" ${A('root',{s:'reports',p:{focus:'cost'}})}><span class="l">Food cost this month</span><span class="v">${ms.fc.toFixed(1)}%</span><span class="s lnk">How it is worked out ›</span></button></div></div>`}
  return `${pageHead((hr<12?'Good morning':hr<18?'Good afternoon':'Good evening')+'. What would you like to do?',h(S.settings.cafe.name)+' · '+fD(T))}
   ${S.seeded!==T?`<div class="stale"><span class="grow">This demo data was made on ${fD(S.seeded)}, so some dates look old.</span><button class="btn sm" ${A('refreshDemo')}>Refresh demo data</button></div>`:''}
   <div class="bigacts" id="bigacts">${big.map(([l,i,a,p])=>`<button class="biga" ${A(a,p)}><span class="rnd">${ic(i)}</span>${l}</button>`).join('')}</div>
   <div id="todo"><h2 style="margin-bottom:10px">To do ${al.length?`<span class="muted sm">(${al.length})</span>`:''}</h2><div class="grid">${al.length?al.map(x=>`<button class="alert ${x.cls}" ${A(x.act,x.p)}><span class="ai">${ic(x.icn)}</span><span class="grow" style="text-align:left">${h(x.t)}<small>${h(x.sub)}</small></span><span class="go">${x.goTxt}${ic('chev')}</span></button>`).join(''):`<div class="card row"><span class="pill ok">${ic('check')}All caught up</span><span class="muted">Nothing needs your attention right now.</span></div>`}</div></div>
   ${kp}`}};

/* ---------- Sell (till) ---------- */
const newBill=()=>({type:'dine',table:'',lines:[]});
const bill=()=>S.bill||(S.bill=newBill());
const billCount=()=>bill().lines.reduce((a,l)=>a+l.qty,0);
function addLine(m,mods){const b=bill(),mt=mods.reduce((a,o)=>a+o.p,0),sig=JSON.stringify(mods.map(o=>o.n));
  const ex=b.lines.find(l=>l.item===m.id&&JSON.stringify(l.mods.map(o=>o.n))===sig);
  if(ex)ex.qty++;else b.lines.push({item:m.id,name:m.name,qty:1,price:m.price,mods,modTotal:mt});save()}
function totalsHtml(t,tx){return`<div class="tot"><span>Subtotal</span><span>${rm(t.sub)}</span></div>
  ${t.sc?`<div class="tot"><span>Service charge (${tx.scRate}%)${tip('sc')}</span><span>${rm(t.sc)}</span></div>`:''}
  ${tx.sstOn?`<div class="tot"><span>SST (${tx.sstRate}%)${tip('sst')}</span><span>${rm(t.sst)}</span></div>`:''}
  ${t.round?`<div class="tot"><span>Rounding${tip('round')}</span><span>${rm(t.round)}</span></div>`:''}
  <div class="tot g"><span>Total</span><span>${rm(t.total)}</span></div>`}
SCREENS.pos={sec:'sell',wide:true,title:()=>'Sell',help:['Tap a menu item to add it to the bill on the right. Type a name or item code in the search box to find it faster.','Choose Dine-in or Takeaway, then press the green "Go to payment" button.','"Hold bill" parks a bill so you can serve someone else. Find it again under "Held bills".'],
 html(p){const b=bill();BIND=b;const q=(p.q||'').trim().toLowerCase(),cat=p.cat&&menuCats().includes(p.cat)?p.cat:'All',tx=S.settings.tax,t=billTotals(b.lines,b.type),n=billCount();
  if(p.openHeld){p.openHeld=0;setTimeout(()=>ACT.heldOpen(),0)}
  const items=S.menu.filter(m=>(cat==='All'||m.cat===cat||q)&&(!q||m.name.toLowerCase().includes(q)||m.id.includes(q)));
  const why=!n?'Add at least 1 item first.':(b.type==='dine'&&!String(b.table).trim())?'Type the table number first.':'';
  return `<div class="pos ${p.showBill?'showbill':''}">
  <div class="menucol" style="display:flex;flex-direction:column;gap:12px;min-width:0">
   ${pageHead('Sell','',`<button class="btn sec sm" ${A('go',{s:'salesList'})}>${ic('list')}Today's sales</button>`)}
   ${searchBox('q','Search by name or item code',p.q,'data-enter="posEnter"')}
   <div class="tabs" role="tablist">${['All',...menuCats()].map(c=>`<button class="tab ${cat===c&&!q?'on':''}" ${A('set',{k:'cat',v:c})}>${c}</button>`).join('')}</div>
   <div class="menug" id="menug">${items.length?items.map(m=>`<button class="mi" ${A('addItem',{id:m.id})}><span class="e" aria-hidden="true">${m.e}</span><b>${h(m.name)}</b><small>Code ${m.id}${m.mods.length?' · has options':''}</small><span>${rm(m.price)}</span></button>`).join(''):empty('No menu item matches "'+h(p.q)+'"','Check the spelling or clear the search.',`<button class="btn sec" ${A('set',{k:'q',v:''})}>Clear search</button>`)}</div>
   <button class="btn big full billbar" ${A('set',{k:'showBill',v:1})}>View bill (${n}) · ${rm(t.total)}</button>
  </div>
  <div class="bill card" id="billbox">
   <div class="row"><h2 class="grow">Bill</h2><button class="btn sec sm billbar" style="position:static" ${A('set',{k:'showBill',v:0})}>${ic('back')}Back to menu</button></div>
   <div class="row"><div class="chips">${[['dine','Dine-in'],['take','Takeaway']].map(([k,l])=>`<button class="chip ${b.type===k?'on':''}" ${A('billType',{t:k})}>${l}</button>`).join('')}</div>
    ${b.type==='dine'?`<label class="row sm b" for="tableno">Table <input class="inp narrow" id="tableno" inputmode="numeric" value="${h(b.table)}" data-m="@table" data-live data-save placeholder="No."></label>`:''}</div>
   <div>${b.lines.length?b.lines.map((l,i)=>`<div class="bl"><div class="grow"><b>${h(l.name)}</b>${l.mods.length?`<small>${h(l.mods.map(o=>o.n).join(', '))}</small>`:''}<small class="num">${rm(l.price+l.modTotal)} each</small></div>
     <button class="qb" ${A('lineQty',{i,d:-1})} aria-label="One less ${h(l.name)}">−</button><b class="num" style="min-width:22px;text-align:center;padding-top:10px">${l.qty}</b><button class="qb" ${A('lineQty',{i,d:1})} aria-label="One more ${h(l.name)}">+</button>
     <b class="num" style="min-width:78px;text-align:right;padding-top:10px">${rm((l.price+l.modTotal)*l.qty)}</b></div>`).join(''):`<p class="muted" style="padding:14px 0">No items yet. Tap a menu item to add it.</p>`}</div>
   <div style="display:flex;flex-direction:column;gap:4px">${totalsHtml(t,tx)}</div>
   <button class="btn big full" id="paybtn" ${A('toPay')} ${why?'disabled':''}>Go to payment${n?' · '+rm(t.total):''}</button>${why?`<span class="why">${why}</span>`:''}
   <div class="row"><button class="btn sec sm" ${A('hold')} ${n?'':'disabled'}>Hold bill</button><button class="btn sec sm" ${A('heldOpen')}>Held bills (${S.held.length})</button><button class="btn red sm" ${A('clearBill')} ${n?'':'disabled'}>Clear bill</button></div>
   ${n?'':'<span class="muted sm">"Hold bill" and "Clear bill" work once the bill has an item.</span>'}
  </div></div>`}};
function modModal(m){const st={id:m.id,sel:{}};m.mods.forEach(g=>{if(MODS[g].one)st.sel[g]=[0];else st.sel[g]=[]});
  modal(M=>{const mm=MENU(M.id);let extra=0;mm.mods.forEach(g=>M.sel[g].forEach(i=>extra+=MODS[g].opts[i].p));
    return`${mHead(h(mm.e+' '+mm.name))}${mm.mods.map(g=>`<div><div class="flabel" style="margin-bottom:6px">${MODS[g].name} <span class="muted">${MODS[g].one?'(pick one)':'(pick any, or none)'}</span></div><div class="chips">${MODS[g].opts.map((o,i)=>`<button class="chip ${M.sel[g].includes(i)?'on':''}" aria-pressed="${M.sel[g].includes(i)}" ${A('modPick',{g,i})}>${o.n}${o.p?' +'+rm(o.p):''}</button>`).join('')}</div></div>`).join('')}
    <div class="mf"><button class="btn sec" ${A('closeModal')}>Cancel</button><button class="btn" ${A('modAdd')}>Add to bill · ${rm(mm.price+extra)}</button></div>`},st)}
Object.assign(ACT,{
 addItem:p=>{const m=MENU(p.id);if(m.mods.length)modModal(m);else{addLine(m,[]);render(true);toast(m.name+' added to the bill')}},
 posEnter:()=>{const p=cur().p,q=(p.q||'').trim().toLowerCase();if(!q)return;const m=S.menu.find(x=>x.id===q)||S.menu.find(x=>x.name.toLowerCase().includes(q));if(!m){toast('No menu item matches "'+p.q+'". Check the spelling.');return}p.q='';ACT.addItem({id:m.id});if(!m.mods.length)render(true)},
 modPick:p=>{const g=MODS[p.g],s=M.sel[p.g];if(g.one)M.sel[p.g]=[p.i];else if(s.includes(p.i))M.sel[p.g]=s.filter(x=>x!==p.i);else s.push(p.i);drawModal()},
 modAdd:()=>{const m=MENU(M.id),mods=[];m.mods.forEach(g=>M.sel[g].slice().sort().forEach(i=>{const o=MODS[g].opts[i];if(!(MODS[g].one&&i===0))mods.push({n:o.n,p:o.p,add:o.add,remove:o.remove})}));addLine(m,mods);closeModal();render(true);toast(m.name+' added to the bill')},
 lineQty:p=>{const b=bill(),l=b.lines[p.i];if(!l)return;l.qty+=p.d;if(l.qty<=0){const gone=b.lines.splice(p.i,1)[0];save();render(true);toast(gone.name+' removed from the bill',()=>{gone.qty=1;b.lines.splice(p.i,0,gone)});return}save();render(true)},
 billType:p=>{bill().type=p.t;save();render(true)},
 hold:()=>{const b=bill();if(!b.lines.length)return;S.held.push({...b,at:isoDT(now())});S.bill=newBill();save();render();toast('Bill put on hold. Find it under "Held bills".',()=>{S.bill=S.held.pop()})},
 heldOpen:()=>modal(()=>`${mHead('Held bills')}${S.held.length?S.held.map((b,i)=>{const t=billTotals(b.lines,b.type);return`<button class="opt" ${A('resume',{i})}><span class="grow"><b>${b.type==='dine'?'Table '+h(b.table||'?'):'Takeaway'} · ${rm(t.total)}</b><small>${plural(b.lines.reduce((a,l)=>a+l.qty,0),'item')} · held at ${fT(b.at)}</small></span><span class="chev">Bring back ›</span></button>`}).join(''):empty('No bills on hold','When a customer needs more time, press "Hold bill" and the bill waits here.',`<button class="btn" ${A('closeModal')}>Back to the till</button>`)}`),
 resume:p=>{const cur0=bill();const b=S.held.splice(p.i,1)[0];if(cur0.lines.length)S.held.push({...cur0,at:isoDT(now())});delete b.at;S.bill=b;save();closeModal();render();toast('Bill is back on the till'+(cur0.lines.length?'. The bill you were on is now on hold.':''))},
 clearBill:()=>confirmBox({title:'Clear this bill?',body:'All '+plural(billCount(),'item')+' will be removed from the bill. Nothing has been paid, so no stock or sales change.',ok:'Yes, clear the bill',no:'No, keep it',danger:true,yes:()=>{const old=S.bill;S.bill=newBill();save();render();toast('Bill cleared',()=>{S.bill=old})}}),
 toPay:()=>go('pay',{m:'Cash',cash:''})
});
const PAYM=[['Cash','Cash'],['Card','Card'],['DuitNow QR','DuitNow QR'],['E-wallet','E-wallet']];
SCREENS.pay={sec:'sell',title:()=>'Payment',help:['Pick how the customer is paying.','For cash, type what the customer gave you. The app works out the change.','Press the green button to finish. Every payment here is pretend, no money moves.'],
 html(p){const b=bill(),t=billTotals(b.lines,b.type),cash=Math.round(parseFloat(p.cash||0)*100)||0;
  if(!b.lines.length)return empty('There is no bill to pay','Go back to the till and add an item.',`<button class="btn" ${A('root',{s:'pos'})}>Back to the till</button>`);
  const quick=[...new Set([t.total,Math.ceil(t.total/500)*500,Math.ceil(t.total/1000)*1000,Math.ceil(t.total/5000)*5000,Math.ceil(t.total/10000)*10000])].slice(0,5);
  const why=p.m==='Cash'&&cash<t.total?(cash?'The cash given is less than the total. Type '+rm(t.total)+' or more.':'Type how much cash the customer gave you.'):'';
  return `${pageHead('Payment',b.type==='dine'?'Dine-in · Table '+h(b.table):'Takeaway')}${stepsBar(['Bill','Payment','Done'],1)}
  <div class="grid g2"><div class="card" style="display:flex;flex-direction:column;gap:14px"><h2>How is the customer paying?</h2>
    <div class="paym">${PAYM.map(([k,l])=>`<button class="${p.m===k?'on':''}" aria-pressed="${p.m===k}" ${A('set',{k:'m',v:k})}>${l}</button>`).join('')}</div>
    ${p.m==='Cash'?`${field('cashin','Cash received (RM)',inp('cashin','cash',p.cash,{attr:'inputmode="decimal" data-live data-enter="paid"',ph:'0.00'}))}
      <div class="chips">${quick.map((v,i)=>`<button class="chip ${cash===v?'on':''}" aria-pressed="${cash===v}" ${A('set',{k:'cash',v:amt(v)})}>${i===0?'Exact ':''}${rm(v)}</button>`).join('')}</div>
      <div class="tot g"><span>Change to give</span><span>${cash>=t.total?rm(cash-t.total):'-'}</span></div>`
     :`<div class="card" style="background:var(--panel-2)"><b>${p.m} (pretend)</b><p class="muted sm">A real till would talk to a card terminal or payment company here. In this demo, just press the green button when the customer has paid.</p>${p.m==='DuitNow QR'?`<div style="margin-top:10px">${fakeQR('pay'+t.total)}</div>`:''}</div>`}
   </div><div class="card" style="display:flex;flex-direction:column;gap:6px"><h2>Bill summary</h2>${b.lines.map(l=>`<div class="tot sm"><span>${l.qty} × ${h(lineName(l))}</span><span>${rm((l.price+l.modTotal)*l.qty)}</span></div>`).join('')}<div style="height:6px"></div>${totalsHtml(t,S.settings.tax)}</div></div>
  <div class="foot"><button class="btn sec" ${A('back')}>${ic('back')}Back to the bill</button><div class="rt">${why?`<span class="why">${why}</span>`:''}<button class="btn big" id="paidbtn" ${A('paid')} ${why?'disabled':''}>Confirm payment of ${rm(t.total)}</button></div></div>`}};
ACT.paid=()=>{const p=cur().p,b=bill(),t=billTotals(b.lines,b.type),cash=Math.round(parseFloat(p.cash||0)*100)||0;if(!b.lines.length||(p.m==='Cash'&&cash<t.total))return;
  const sale=completeSale(b,p.m,cash);S.bill=newBill();save();stack=[{s:'pos',p:{}},{s:'saleDone',p:{id:sale.id}}];render()};
const saleBy=id=>S.sales.find(x=>x.id===id);
const saleMissing=()=>empty('This receipt is no longer in the demo','Only the last few days of receipts are kept.',`<button class="btn" ${A('root',{s:'pos'})}>Back to the till</button>`);
SCREENS.saleDone={sec:'sell',title:()=>'Sale done',help:['The sale is saved and the stock has been reduced by the recipe.','If the customer wants an e-invoice, press "Issue e-invoice for this sale".','Otherwise press "New sale" to serve the next customer.'],
 html(p){const s=saleBy(p.id);if(!s)return saleMissing();const ings=[...new Set(s.used.map(u=>u.ing))];
  return `${stepsBar(['Bill','Payment','Done'],2)}<div class="card donebox"><span class="tick">${ic('check')}</span><h1>Payment received</h1>
   <p class="num"><b>${rm(s.total)}</b> by ${h(s.pay)} · Receipt ${s.no}</p>${s.pay==='Cash'?`<p class="num" style="font-size:20px">Change to give: <b>${rm(s.change)}</b></p>`:''}
   <p class="muted">Stock was reduced for ${plural(ings.length,'ingredient')}, oldest batches first. <button class="btn sec sm" ${A('usedList',{id:s.id})}>See what was used</button></p>
   ${s.short.length?`<p class="pill warn" style="white-space:normal">Stock count may be off for: ${h(s.short.map(i=>ING(i).name).join(', '))}. The app had less in stock than this sale needed.</p>`:''}
   <div class="acts"><button class="btn big" id="newsale" ${A('root',{s:'pos'})}>New sale</button><button class="btn sec big" id="einvbtn" ${A('go',{s:'invWiz',p:{sale:s.id}})}>Issue e-invoice for this sale</button></div>
   <div class="acts"><button class="btn sec sm" ${A('go',{s:'receipt',p:{id:s.id}})}>View receipt</button><button class="btn sec sm" ${A('wantInv',{id:s.id})}>Customer will ask for an e-invoice later</button><button class="btn sec sm" ${A('root',{s:'home'})}>Back to Home</button></div></div>`}};
ACT.usedList=p=>{const s=saleBy(p.id),by={};s.used.forEach(u=>{by[u.ing]=r3((by[u.ing]||0)+u.qty)});
  modal(()=>`${mHead('Ingredients used by receipt '+s.no)}<div class="tw"><table><tr><th>Ingredient</th><th class="r">Used</th><th class="r">Left in stock</th></tr>${Object.keys(by).map(i=>`<tr><td>${h(ING(i).name)}</td><td class="r">${qU(i,by[i])}</td><td class="r">${qU(i,onHand(i))}</td></tr>`).join('')}</table></div><p class="muted sm">Cost of ingredients: ${rm(s.cogs)} (demo prices).</p><div class="mf"><button class="btn" ${A('closeModal')}>Close</button></div>`)};
ACT.wantInv=p=>{const s=saleBy(p.id);if(!s)return;s.want=!s.want;save();render(true);toast(s.want?'Marked as waiting for an e-invoice. It now shows under Invoices.':'No longer waiting for an e-invoice.')};
function receiptHtml(s){const c=S.settings.cafe,tx=s.tax||S.settings.tax;return`<div class="paper"><h3>${h(c.name)}</h3><div style="text-align:center">${h(c.addr)}, ${h(c.post)} ${h(c.city)}<br>SST no. ${h(c.sst)}</div><hr>
  <div class="l"><span>Receipt ${s.no}</span><span>${fDT(s.dt)}</span></div><div class="l"><span>${s.type==='dine'?'Dine-in, table '+h(s.table):'Takeaway'}</span><span>${h(s.pay)}</span></div><hr>
  ${s.lines.map(l=>`<div class="l"><span>${l.qty} x ${h(lineName(l))}</span><span>${amt((l.price+l.modTotal)*l.qty)}</span></div>`).join('')}<hr>
  <div class="l"><span>Subtotal</span><span>${amt(s.sub)}</span></div>${s.sc?`<div class="l"><span>Service charge ${tx.scRate}%</span><span>${amt(s.sc)}</span></div>`:''}${tx.sstOn?`<div class="l"><span>SST ${tx.sstRate}%</span><span>${amt(s.sst)}</span></div>`:''}${s.round?`<div class="l"><span>Rounding</span><span>${amt(s.round)}</span></div>`:''}
  <div class="l" style="font-weight:800;font-size:16px"><span>TOTAL (RM)</span><span>${amt(s.total)}</span></div>${s.pay==='Cash'&&s.cash?`<div class="l"><span>Cash</span><span>${amt(s.cash)}</span></div><div class="l"><span>Change</span><span>${amt(s.change)}</span></div>`:''}<hr>
  <div style="text-align:center">${s.status==='void'?'*** VOID: '+h(s.voidReason)+' ***<br>':''}Demo receipt. All prices are made up.<br>Need an e-invoice? Ask our staff.</div></div>`}
SCREENS.receipt={sec:'sell',title:p=>{const s=saleBy(p.id);return s?'Receipt '+s.no:'Receipt'},help:['This is the receipt the customer gets.','"Issue e-invoice for this sale" starts the e-invoice steps with this sale already filled in.','"Void this sale" cancels the sale. Use it only for mistakes.'],
 html(p){const s=saleBy(p.id);if(!s)return saleMissing();const inv=s.inv&&S.invoices.find(i=>i.id===s.inv);
  return `${pageHead('Receipt '+s.no,`${s.status==='void'?pill('Void','bad'):pill('Paid','ok')} ${inv?pill('E-invoice '+inv.status,'ok'):s.want?pill('Waiting for e-invoice','warn'):''}`,
    s.status==='void'?'':(inv?`<button class="btn" ${A('go',{s:'inv',p:{id:inv.id}})}>Open its e-invoice</button>`:`<button class="btn" ${A('go',{s:'invWiz',p:{sale:s.id}})}>Issue e-invoice for this sale</button>`)+(STANDALONE?`<button class="btn sec" ${A('print')}>Print</button>`:''))}
  ${receiptHtml(s)}
  ${STANDALONE?'':'<p class="muted sm" style="text-align:center">To print, open the app from your own web link (GitHub Pages) instead of the Claude preview, then press Print there.</p>'}
  ${s.status==='paid'?`<div class="foot"><button class="btn red" ${A('voidAsk',{id:s.id})}>Void this sale</button><div class="rt">${inv?'':`<button class="btn sec" ${A('wantInv',{id:s.id})}>${s.want?'Stop waiting for an e-invoice':'Customer will ask for an e-invoice later'}</button>`}</div></div>`:''}`}};
const VOIDR=[['Keyed in by mistake (nothing was made)',true],['Test sale',true],['Customer cancelled (food was already made)',false]];
ACT.voidAsk=p=>{const s=saleBy(p.id);if(s.inv){confirmBox({title:'Cancel the e-invoice first',body:'This sale has an e-invoice. A sale cannot be voided while its e-invoice is still valid.',ok:'Open the e-invoice',no:'Go back',yes:()=>go('inv',{id:s.inv})});return}
  modal(M=>`${mHead('Void receipt '+s.no+'?')}<p>This cancels the sale of <b>${rm(s.total)}</b>. It comes off today's sales. You cannot undo this.</p><div class="flabel">Why? (pick one)</div>${VOIDR.map(([r,rs],i)=>`<button class="opt ${M.r===i?'on':''}" aria-pressed="${M.r===i}" ${A('mset',{k:'r',v:i})}><span><b>${r}</b><small>${rs?'Ingredients go back into stock.':'Ingredients stay used. Log the food as waste if it was thrown away.'}</small></span></button>`).join('')}
   <div class="mf">${M.r==null?'<span class="why">Pick a reason first.</span>':''}<button class="btn sec" ${A('closeModal')}>No, keep the sale</button><button class="btn red solid" ${A('voidDo',{id:s.id})} ${M.r==null?'disabled':''}>Yes, void this sale</button></div>`,{r:null})};
ACT.voidDo=p=>{const s=saleBy(p.id),[r,rs]=VOIDR[M.r];voidSale(s,r,rs);closeModal();render();toast('Receipt '+s.no+' is now void.'+(rs?' Ingredients are back in stock.':''))};
SCREENS.salesList={sec:'sell',title:()=>'Recent sales',help:['Every receipt from the last few days is listed here.','Tap a row to open the receipt. From there you can issue an e-invoice or void the sale.','Use the search box to find a receipt number.'],
 html(p){const T=today(),d=p.d||T,q=(p.q||'').trim();const days=[T,addDays(T,-1),addDays(T,-2)];
  const rows=S.sales.filter(s=>(q?String(s.no).includes(q):s.dt.slice(0,10)===d)).sort((a,b)=>b.no-a.no);
  return `${pageHead('Recent sales','Receipts from the last 3 days. '+demoTag,`<button class="btn" ${A('root',{s:'pos'})}>New sale</button>`)}
  <div class="row">${searchBox('q','Search by receipt number',p.q)}<div class="tabs">${days.map((x,i)=>`<button class="tab ${d===x&&!q?'on':''}" ${A('set',{k:'d',v:x})}>${i===0?'Today':i===1?'Yesterday':fDs(x)}</button>`).join('')}</div></div>
  <div class="card pad0"><div class="tw">${rows.length?`<table><tr><th>Receipt</th><th>Time</th><th class="hide-s">Type</th><th class="hide-s">Paid by</th><th class="r">Total</th><th>Status</th><th></th></tr>${rows.slice(0,120).map(s=>`<tr class="click" tabindex="0" ${A('go',{s:'receipt',p:{id:s.id}})}><td class="b">${s.no}</td><td>${q?fDs(s.dt)+', ':''}${fT(s.dt)}</td><td class="hide-s">${s.type==='dine'?'Table '+h(s.table):'Takeaway'}</td><td class="hide-s">${h(s.pay)}</td><td class="r">${rm(s.total)}</td><td>${s.status==='void'?pill('Void','bad'):s.inv?pill('E-invoice sent','ok'):s.want?pill('Waiting for e-invoice','warn'):pill('Paid')}</td><td class="chev">Open ›</td></tr>`).join('')}</table>`
   :empty(q?'No receipt matches "'+h(q)+'"':'No sales on this day yet',q?'Check the number, or clear the search.':'Sales you make on the till show up here.',q?`<button class="btn sec" ${A('set',{k:'q',v:''})}>Clear search</button>`:`<button class="btn" ${A('root',{s:'pos'})}>Make the first sale</button>`)}</div></div>`}};
