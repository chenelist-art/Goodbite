/* ---------- welcome tour (5 steps, highlights real buttons) ---------- */
const vis=s=>{const e=document.querySelector(s);return e&&e.offsetParent!==null?e:null};
const TOUR=[
 {sel:()=>vis('#side')||vis('#bot'),t:'The main menu',b:'It is always on screen. Tap a word to move to that part of the app. The page you are on is green.'},
 {sel:()=>vis('#rolebtn'),t:'Who is using the app',b:'Tap here to switch between Owner, Cashier and Kitchen staff. The menu changes to show only what that person needs.'},
 {sel:()=>vis('#bigacts'),t:'Big buttons for everyday jobs',b:'These start the things you do most: make a sale, receive a delivery, log waste, count stock.'},
 {sel:()=>vis('#todo'),t:'Your to-do list',b:'Each card is something that needs attention. Tap a card and it takes you straight to the fix.'},
 {sel:()=>vis('#helpbtn'),t:'Help on every page',b:'Stuck? Help explains the page you are on in 3 lines. You can replay this tour or start the demo tour from there.'}];
let tourI=-1;
function tourDraw(){const el=document.getElementById('tour');if(tourI<0){el.hidden=true;el.innerHTML='';return}const st=TOUR[tourI],t=st.sel(),W=innerWidth,H=innerHeight;
  let hole='',top=H/2-90,left=W/2-170;
  if(t){t.scrollIntoView({block:'nearest'});const r=t.getBoundingClientRect(),pd=6;hole=`<div class="hole" style="left:${r.left-pd}px;top:${r.top-pd}px;width:${r.width+pd*2}px;height:${r.height+pd*2}px"></div>`;
    const cw=Math.min(340,W-24);left=Math.min(W-cw-12,Math.max(12,r.left+r.width/2-cw/2));if(r.width<W*0.4&&r.right+cw+24<W&&r.height>H*0.5){left=r.right+18;top=Math.max(12,r.top+20)}
    else if(r.left>W*0.5&&r.height>H*0.5){left=r.left-cw-18;top=Math.max(12,r.top+20)}
    else top=r.bottom+230<H?r.bottom+16:Math.max(12,r.top-220)}
  el.hidden=false;el.innerHTML=`<div style="position:fixed;inset:0;pointer-events:auto"></div>${hole||'<div style="position:fixed;inset:0;background:rgba(27,38,25,.6)"></div>'}<div class="tcard" role="dialog" aria-modal="true" aria-label="Welcome tour" style="left:${left}px;top:${top}px"><span class="muted sm b">Step ${tourI+1} of ${TOUR.length}</span><h2>${st.t}</h2><p>${st.b}</p><div class="mf"><button class="btn sec sm" ${A('tourEnd')}>Skip the tour</button><div class="row">${tourI?`<button class="btn sec sm" ${A('tourStep',{d:-1})}>Back</button>`:''}<button class="btn" id="tournext" ${A('tourStep',{d:1})}>${tourI===TOUR.length-1?'Finish':'Next'}</button></div></div></div>`;
  const n=document.getElementById('tournext');if(n)n.focus()}
Object.assign(ACT,{
 tourStart:()=>{closeModal();demoEnd(true);root('home');tourI=0;tourDraw()},
 tourStep:p=>{tourI+=p.d;if(tourI>=TOUR.length){ACT.tourEnd();toast('That is the tour. Replay it any time from Help.');return}tourDraw()},
 tourEnd:()=>{tourI=-1;tourDraw();S.toured=true;save()},
 welcomeSkip:()=>{closeModal();S.toured=true;save()}
});
function welcome(){modal(()=>`${mHead('🥬 Welcome to GoodBite for business')}<p>One place for a small cafe to sell, track stock and expiry dates, order from suppliers, log waste and prepare e-invoices.</p><p class="muted">Everything here is a demo with made-up data. Nothing is sent anywhere.</p><div class="mf"><button class="btn sec" ${A('welcomeSkip')}>Skip for now</button><button class="btn" ${A('tourStart')}>Show me around (5 short steps)</button></div>`)}
addEventListener('resize',()=>{if(tourI>=0)tourDraw()});

/* ---------- demo tour: walks through the 5-minute presentation ---------- */
let demoI=-1,demoSale=null;
function demoFillBill(){const b=bill();if(!b.lines.length){S.bill={type:'dine',table:'5',lines:[]};addLine(MENU('103'),[{n:'Iced',p:100}]);addLine(MENU('501'),[])}else if(b.type==='dine'&&!b.table)b.table='5'}
function demoMakeSale(){if(demoSale&&saleBy(demoSale))return saleBy(demoSale);demoFillBill();const b=bill(),t=billTotals(b.lines,b.type),s=completeSale(b,'Cash',Math.ceil(t.total/1000)*1000);S.bill=newBill();save();demoSale=s.id;return s}
const DEMO=[
 {t:'Home: the morning check',b:'Say: "This is what the owner sees first." Point at the To do cards. Each one opens the fix. Then press Next.',sel:'#todo',go(){S.role='owner';stack=[{s:'home',p:{}}]}},
 {t:'Cashier makes a sale',b:'Now viewing as Cashier, so the menu is shorter. Tap Latte, pick Iced, press "Add to bill". Tap Butter Croissant. Type table 5.',sel:'#menug',go(){S.role='cashier';stack=[{s:'pos',p:{}}]}},
 {t:'Take payment',b:'Service charge, SST and 5 sen rounding are worked out for you. Tap the RM 50 chip and press "Confirm payment". (Next does it for you.)',sel:'#paidbtn',go(){demoFillBill();const b=bill(),t=billTotals(b.lines,b.type);stack=[{s:'pos',p:{}},{s:'pay',p:{m:'Cash',cash:amt(Math.ceil(t.total/1000)*1000)}}]}},
 {t:'Sale done, stock updated',b:'The sale is saved and the stock dropped by the recipe. Press "See what was used" to show the ingredients.',sel:'.donebox',go(){if(cur().s==='saleDone'){demoSale=cur().p.id;return}const s=demoMakeSale();stack=[{s:'pos',p:{}},{s:'saleDone',p:{id:s.id}}]}},
 {t:'Kitchen sees the stock',b:'Now viewing as Kitchen staff. Fresh milk went down by the latte. Batches are listed oldest first, and the oldest is used first.',sel:'.kpi',go(){demoMakeSale();S.role='kitchen';stack=[{s:'stock',p:{}},{s:'item',p:{id:'milk'}}]}},
 {t:'Low stock becomes an order',b:'Back as Owner. The "Fresh milk is low" card on Home opens this order, already filled in. Press "Save and check the order", then "Send order".',sel:'#ordreview',go(){S.role='owner';stack=[{s:'home',p:{}},{s:'newOrder',p:{ing:'milk'}}]}},
 {t:'A delivery arrives',b:'Kitchen staff check the amounts and expiry dates against the order, then confirm. Each item becomes a new batch.',sel:'#recvnext',go(){S.role='kitchen';const o=S.orders.find(x=>x.status==='sent')||S.orders.find(x=>x.status==='part');stack=[{s:'home',p:{}},{s:'receive',p:o?{order:o.id,step:1}:{step:0}}]}},
 {t:'Log waste in three taps',b:'Item, amount, reason are filled in as an example. Press "Save waste log". Expired food is added to this log by itself.',sel:'#wastesave',go(){S.role='kitchen';const g=onHand('lettuce')>=0.5?'lettuce':(S.ingredients.find(i=>onHand(i.id)>=1)||{}).id;stack=[{s:'waste',p:{ing:g,qty:g==='lettuce'?'0.5':'1',reason:'Spoiled'}}]}},
 {t:'The monthly report',b:'Back as Owner. Waste in kg and RM, the most wasted items, and food cost against sales. Tap any number to see what is behind it. All figures are made up.',sel:'#rep-waste',go(){S.role='owner';stack=[{s:'reports',p:{}}]}},
 {t:'A customer asks for an e-invoice',b:'Tap the first "quick fill" buyer, then follow the green button through the 4 steps to Submit. Nothing is sent to LHDN.',sel:'#wiznext',go(){S.role='owner';const s=demoMakeSale();if(s.inv){stack=[{s:'invoices',p:{}},{s:'inv',p:{id:s.inv}}];return}stack=[{s:'invoices',p:{}},{s:'invWiz',p:{sale:s.id}}]}},
 {t:'Statuses and the 72-hour rule',b:'A valid e-invoice can be cancelled for 72 hours. After that the button is locked and you issue a credit note instead. Open an older one from the list to show it.',sel:'#cancelbtn',go(){S.role='owner';const v=S.invoices.filter(i=>i.status==='Valid'&&i.type==='01'&&canCancel(i)).pop();stack=[{s:'invoices',p:{f:'Valid'}}].concat(v?[{s:'inv',p:{id:v.id}}]:[])}},
 {t:'Be honest about what is pretend',b:'Finish here: what was checked against LHDN sources, what was not, and what a real product still needs. End of the demo.',sel:null,go(){S.role='owner';stack=[{s:'settings',p:{}},{s:'notes',p:{}}]}}];
function demoDraw(){const el=document.getElementById('demo');if(!el)return;if(demoI<0){el.hidden=true;el.innerHTML='';return}const st=DEMO[demoI];el.hidden=false;
  el.innerHTML=`<span class="dn">Demo tour · step ${demoI+1} of ${DEMO.length}</span><b>${st.t}</b><span class="sm">${st.b}</span><div class="mf"><button class="btn sec sm" ${A('demoEnd')}>End tour</button><div class="row">${demoI?`<button class="btn sec sm" ${A('demoStep',{d:-1})}>Back</button>`:''}<button class="btn sm" id="demonext" ${A('demoStep',{d:1})}>${demoI===DEMO.length-1?'Finish':'Next'}</button></div></div>`;
  document.querySelectorAll('.hl').forEach(e=>e.classList.remove('hl'));if(st.sel){const t=document.querySelector(st.sel);if(t)t.classList.add('hl')}}
function demoEnd(quiet){if(demoI<0)return;demoI=-1;demoDraw();document.querySelectorAll('.hl').forEach(e=>e.classList.remove('hl'));if(!quiet)toast('Demo tour ended. Start it again from the top bar.')}
function demoGo(){closeModal();DEMO[demoI].go();save();render()}
Object.assign(ACT,{
 demoStart:()=>{closeModal();tourI=-1;tourDraw();S.toured=true;demoI=0;demoGo()},
 demoStep:p=>{demoI+=p.d;if(demoI>=DEMO.length){demoI=DEMO.length-1;demoEnd();return}demoGo()},
 demoEnd:()=>demoEnd()
});

/* ---------- start ---------- */
function boot(){S=load();if(!S){S=seed();sweep();save()}i18nStart();render();if(!S.toured&&!/[?&#]notour/.test(location.href))setTimeout(welcome,250)}
window.GB={reset(role){const _l=curLang();S=seed();S.settings.lang=window.__LANG||'en';sweep();S.toured=true;S.role=role||'owner';closeModal();demoI=-1;tourI=-1;tourDraw();demoSale=null;document.getElementById('toast').hidden=true;stack=[{s:'home',p:{}}];render()},
 key(){const c=cur(),p=c.p||{},k=[c.s,p.tab||'',p.step||'',p.f||'',p.tried?'T':''];
  if(c.s==='pos'){const b=bill();k.push(b.lines.length?'L':'',b.type,p.showBill?'B':'',S.held.length?'H':'')}
  if(c.s==='pay')k.push(p.m,p.cash?'C':'');
  if(c.s==='waste')k.push(p.ing?'I':'',p.reason?'R':'',p.done?'D':'');
  if(c.s==='newOrder')k.push(Object.values(p.qty||{}).some(v=>parseFloat(v)>0)?'Q':'');
  if(c.s==='receive')k.push(p.order?'O':'');
  if(c.s==='invWiz'||c.s==='inv'){const i=S.invoices.find(x=>x.id===(p.inv||p.id));if(i)k.push(i.kind,i.type,i.status,i.buyer&&i.buyer.name?'N':'',canCancel(i)?'cc':'',i.reason?'r':'')}
  if(c.s==='receipt'){const s=saleBy(p.id);if(s)k.push(s.status,s.inv?'i':'',s.want?'w':'')}
  if(c.s==='menuItem'){k.push(p.id?'E':'N',p.d&&p.d.recipe.length?'R':'',p.d&&p.d.add?'A':'',p.d&&p.d.cat==='__new'?'C':'')}
  if(c.s==='bill'){const b=S.bills.find(x=>x.id===p.id);if(b)k.push(b.paid?'p':'',b.einv)}
  if(c.s==='order'){const o=ordBy(p.id);if(o)k.push(o.status)}
  k.push(tourI>=0?'tour'+tourI:'',demoI>=0?'demo'+demoI:'');return k.join('|')},
 info:()=>({screen:cur().s,title:SCREENS[cur().s].title(cur().p),depth:stack.length,modal:!document.getElementById('modal').hidden,role:S.role,p:cur().p}),state:()=>S,go,root,
 fn:{billTotals,onHand,monthStats,validateInv,suggestions,canCancel,invBy:id=>S.invoices.find(i=>i.id===id)}};
boot();
