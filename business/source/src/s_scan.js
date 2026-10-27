/* ---------- Date sort for list screens ---------- */
const SORTD={stock:'asc',orders:'desc',bills:'desc',waste:'desc',inv:'desc',sales:'desc'};
const sortDir=k=>(S.sort&&S.sort[k])||SORTD[k];
/* compare two rows by a date string (YYYY-MM-DD or YYYY-MM-DDTHH:MM), in the direction the person picked */
const byDate=(k,f)=>(a,b)=>{const x=f(a),y=f(b),r=x<y?-1:x>y?1:0;return sortDir(k)==='asc'?r:-r};
function sortBar(k,exp){const d=sortDir(k),o=exp?[['asc','Expiring soonest first'],['desc','Expiring latest first']]:[['desc','Newest first'],['asc','Oldest first']];
  return `<div class="sortc noprint" role="group" aria-label="${exp?'Sort by expiry date':'Sort by date'}"><span class="flabel">${exp?'Sort by expiry date':'Sort by date'}</span>${o.map(([v,l])=>`<button class="chip sm ${d===v?'on':''}" aria-pressed="${d===v}" ${A('sortSet',{k,v})}><span aria-hidden="true">${v==='asc'?'↑':'↓'}</span> ${l}</button>`).join('')}</div>`}
ACT.sortSet=p=>{S.sort=S.sort||{};S.sort[p.k]=p.v;save();render(true)};

/* ---------- Scan: one button, three ways. Reading is simulated with sample pictures. ---------- */
/* typical shelf life of fresh food bought without a printed date, in days */
const FRESH_DAYS={chicken:2,wing:2,pork:2,rib:2,beef:2,prawn:1,tilapia:1,seabass:1,lala:1,squid:1,crab:2,kangkung:3,kailan:4,choysum:3,sprout:2,longbean:5,brinjal:6,gourd:5,tomato:5,cucumber:5,scallion:4,chilli:7,padi:7,lime:7,mushroom:3,pineapple:4,capsicum:6,curryleaf:5,onion:21,shallot:21,garlic:30,ginger:21};
const PICS={prawn:'🦐',tilapia:'🐟',seabass:'🐠',grouper:'🐡',lala:'🐚',squid:'🦑',crab:'🦀',fillet:'🧊',fishball:'🍢',chicken:'🍗',wing:'🍗',pork:'🥓',rib:'🍖',beef:'🥩',kangkung:'🌿',kailan:'🥦',choysum:'🥬',sprout:'🌱',longbean:'🫛',brinjal:'🍆',gourd:'🥒',tomato:'🍅',cucumber:'🥒',onion:'🧅',shallot:'🧅',garlic:'🧄',ginger:'🫚',scallion:'🌱',chilli:'🌶️',padi:'🌶️',lime:'🟢',mushroom:'🍄',pineapple:'🍍',capsicum:'🫑',curryleaf:'🍃',egg:'🥚',tofu:'🧈',kueyteow:'🍜',yeemee:'🍜',meehoon:'🍝',rice:'🍚',oil:'🛢️',oyster:'🫙',soy:'🫙',darksoy:'🫙',belacan:'🟫',dshrimp:'🦐',cornflour:'🌾',sugar:'🧂',tomsauce:'🥫',peanut:'🥜',butter:'🧈',evap:'🥫',tea:'🍵',barley:'🌾',soya:'🥛',coconut:'🥥',can:'🥤'};
/* the market picture grid shows fresh items only */
const MARKET_PICS=['chicken','wing','pork','beef','prawn','tilapia','seabass','lala','squid','crab','kangkung','kailan','choysum','sprout','longbean','brinjal','tomato','cucumber','onion','garlic','ginger','chilli','lime','mushroom','pineapple','egg'];
const SCAN_WAYS=[['do','📦','Delivery order or supplier invoice','Reads the whole order: items, amounts and prices.'],
 ['shop','🛒','Supermarket receipt or barcode','Reads the items and amounts, and knows packaged products.'],
 ['market','📷','Wet-market photo','Guesses the food in the photo, such as chicken or kangkung.'],
 ['shelf','🧊','Shelf photo (stock count)','Counts what is left on a shelf, such as the seafood chiller.']];
const SCAN_RECEIPT={shop:'Pasaraya Jimat (demo shop)',no:'R-48213',lines:[
 {raw:'SUSU CAIR 390G x6',ing:'evap',qty:6,paid:1740},{raw:'TELUR GRED A 30 BIJI',ing:'egg',qty:30,paid:1590},{raw:'SOS TIRAM 2.2KG',ing:'oyster',qty:2,paid:2390},
 {raw:'TOMATO 1.2KG',ing:'tomato',qty:1.2,paid:708},{raw:'GULA PASIR 2KG',ing:'sugar',qty:2,paid:580},{raw:'KICAP MANIS 1L',ing:'',qty:1,paid:690,unknown:true},{raw:'BEG PLASTIK',nonfood:true,paid:20}]};
const SCAN_CODES=[{code:'9550000000017',raw:'Oyster sauce 510 g',ing:'oyster',qty:0.5,paid:650},{code:'9550000000024',raw:'Soya bean milk 1 L',ing:'soya',qty:1,paid:450},
 {code:'9550000000031',raw:'Tomato sauce 325 g',ing:'tomsauce',qty:0.325,paid:320},{code:'9550000000048',raw:'Light soy sauce 640 ml',ing:'soy',qty:0.64,paid:560}];
const SCAN_MARKET=[{k:'chicken',pic:'🍗',label:'Chicken',ing:'chicken',qty:3,paid:5100,sure:true},{k:'kangkung',pic:'🌿',label:'Kangkung',ing:'kangkung',qty:1,paid:600,sure:true},
 {k:'prawn',pic:'🦐',label:'Prawns',ing:'prawn',qty:1.5,paid:6300,sure:true},{k:'blur',pic:'🌫️',label:'Blurry photo',ing:'',qty:1,paid:0,sure:false}];
const DO_SAMPLE={sup:'P',lines:[['kailan',3],['tomato',4],['cucumber',2]]};
const openOrders=()=>S.orders.filter(o=>o.status==='sent'||o.status==='part').sort((a,b)=>a.expected<b.expected?-1:a.expected>b.expected?1:a.no-b.no);
/* the suggested expiry date for an item: printed on the pack (barcode), typical for fresh food, or the item's usual shelf life */
function suggestExp(id,way){const i=ING(id),fresh=FRESH_DAYS[id]!=null;
  if(way==='barcode'){const n=Math.max(2,i.shelf-2);return{exp:addDays(today(),n),src:'pack',n}}
  if(fresh&&(way==='market'||id!=='egg')){const n=FRESH_DAYS[id];return{exp:addDays(today(),n),src:'fresh',n}}
  return{exp:addDays(today(),i.shelf),src:'shelf',n:i.shelf}}
let scanSeq=1;
function scanRow(o,way){const r={k:scanSeq++,ing:o.ing||'',raw:o.raw||'',qty:o.qty!=null?qf(o.qty):'',ok:false,skip:!!o.nonfood,unknown:!!o.unknown,nonfood:!!o.nonfood,sure:o.sure!==false,pic:o.pic||'',line:o.line,unit:way==='do'};
  if(r.unit)r.price=o.price!=null?amt(o.price):'';else r.paid=o.paid!=null?amt(o.paid):'';
  if(r.ing){const s=suggestExp(r.ing,way);Object.assign(r,{exp:s.exp,src:s.src,n:s.n,sugExp:s.exp,lastIng:r.ing,lastExp:s.exp})}else r.exp='';
  return r}
function scanShoot(p){const way=p.way;p.rows=p.rows||[];
  if(way==='do'){const o=p.order&&ordBy(p.order);p.rows=[];
    if(o)o.lines.forEach((l,i)=>{const rem=r3(l.qty-l.recv);if(rem>0)p.rows.push(scanRow({ing:l.ing,raw:ING(l.ing).name+' '+qU(l.ing,rem),qty:rem,price:l.price,line:i},'do'))});
    else DO_SAMPLE.lines.forEach(([g,q])=>p.rows.push(scanRow({ing:g,raw:ING(g).name+' '+qU(g,q),qty:q,price:ING(g).cost},'do')));
    return p.rows.length}
  if(way==='shop'&&(p.mode||'receipt')==='receipt'){p.rows=SCAN_RECEIPT.lines.map(l=>scanRow(l,'receipt'));return p.rows.length}
  if(way==='shop'){const c=SCAN_CODES[p.code||0];p.rows.push(scanRow(c,'barcode'));return 1}
  const m=SCAN_MARKET.find(x=>x.k===(p.photo||'chicken'))||SCAN_MARKET[0];p.rows.push(scanRow(m,'market'));return 1}
const scanIn=r=>!r.nonfood&&!r.skip&&!!r.ing;
function scanErrs(r){const e={},q=num(r.qty),pr=num(r.unit?r.price:r.paid);if(!scanIn(r))return e;
  if(!(q>0))e.qty='Type an amount above 0.';
  if(!/^\d{4}-\d{2}-\d{2}$/.test(r.exp||''))e.exp='Pick the expiry date.';else if(r.exp<today())e.exp='This date is in the past.';
  if(!(pr>=0))e.price='Type a price, for example 7.50.';
  if(!e.exp&&!r.ok)e.ok='Check the expiry date, then tap "Date checked".';return e}
const scanWay=p=>p.way==='shop'?((p.mode||'receipt')==='barcode'?'barcode':'receipt'):p.way;
const srcTxt=r=>r.src==='pack'?'Date read from the pack (simulated)':r.src==='fresh'?'Typical for fresh food: '+plural(r.n,'day'):'Usual shelf life for this item: '+plural(r.n,'day')+'. Check the date printed on the pack.';
const SSTEPS=['Pick a way','Take the photo','Check and confirm'];
function camHtml(p){const way=p.way,inner=[];let pick='',shoot='Take photo (simulated)';
  if(way==='do'){const os=openOrders();if(!p.order&&p.order!=='')p.order=os.length?os[0].id:'';const o=p.order&&ordBy(p.order);
    pick=`<div class="flabel">Which paper is in front of the camera?</div><div class="chips">${os.map(x=>`<button class="chip ${p.order===x.id?'on':''}" aria-pressed="${p.order===x.id}" ${A('set',{k:'order',v:x.id})}>Order #${x.no} · ${h(SUP(x.sup).name.replace(' (demo)',''))}</button>`).join('')}<button class="chip ${p.order===''?'on':''}" aria-pressed="${p.order===''}" ${A('set',{k:'order',v:''})}>Delivery with no order in the app (sample)</button></div>`;
    const sup=o?SUP(o.sup):SUP(DO_SAMPLE.sup),ls=o?o.lines.filter(l=>l.qty-l.recv>0).map(l=>[l.ing,r3(l.qty-l.recv)]):DO_SAMPLE.lines;
    inner.push(`<div class="doc"><b>DELIVERY ORDER</b><span>${h(sup.name)}</span><span>DO-${o?2000+o.no:'3051'}${o?' · PO #'+o.no:''} · ${fD(today())}</span><hr>${ls.map(([g,q])=>`<div class="l"><span>${h(ING(g).name)}</span><span>${qU(g,q)}</span></div>`).join('')}<hr><span>Received by: ____________</span></div>`)}
  else if(way==='shop'){const mode=p.mode||'receipt';
    pick=`<div class="chips">${[['receipt','Receipt'],['barcode','Barcode on a pack']].map(([k,l])=>`<button class="chip ${mode===k?'on':''}" aria-pressed="${mode===k}" ${A('set',{k:'mode',v:k})}>${l}</button>`).join('')}</div>`;
    if(mode==='receipt'){const t=SCAN_RECEIPT.lines.reduce((a,l)=>a+l.paid,0);inner.push(`<div class="doc"><b>${h(SCAN_RECEIPT.shop)}</b><span>${SCAN_RECEIPT.no} · ${fD(today())}</span><hr>${SCAN_RECEIPT.lines.map(l=>`<div class="l"><span>${h(l.raw)}</span><span>${amt(l.paid)}</span></div>`).join('')}<hr><div class="l b"><span>TOTAL RM</span><span>${amt(t)}</span></div></div>`)}
    else{const ci=p.code||0,c=SCAN_CODES[ci];shoot='Scan barcode (simulated)';
      pick+=`<div class="flabel">Which pack is in front of the camera?</div><div class="chips">${SCAN_CODES.map((x,i)=>`<button class="chip ${ci===i?'on':''}" aria-pressed="${ci===i}" ${A('set',{k:'code',v:i})}>${h(x.raw)}</button>`).join('')}</div>`;
      inner.push(`<div class="doc bc"><svg viewBox="0 0 95 40" aria-hidden="true">${c.code.split('').map((d,i)=>`<rect x="${4+i*6.6}" y="0" width="${1+(+d%3)}" height="34"/><rect x="${7+i*6.6}" y="0" width="${1+((+d+1)%2)}" height="34"/>`).join('')}</svg><span class="mono">${c.code}</span><b>${h(c.raw)}</b></div>`)}}
  else{const ph=p.photo||'chicken',m=SCAN_MARKET.find(x=>x.k===ph);
    pick=`<div class="flabel">Pretend photo of:</div><div class="chips">${SCAN_MARKET.map(x=>`<button class="chip ${ph===x.k?'on':''}" aria-pressed="${ph===x.k}" ${A('set',{k:'photo',v:x.k})}><span aria-hidden="true">${x.pic}</span> ${x.label}</button>`).join('')}</div>`;
    inner.push(`<div class="photo ${ph==='blur'?'blur':''}" aria-hidden="true">${m.pic}</div>`)}
  const n=(p.rows||[]).length;
  return `${pageHead(h(SCAN_WAYS.find(w=>w[0]===way)[2]),'Hold the phone over it and take the photo. In this demo the camera shows a sample picture.')}${stepsBar(SSTEPS,1)}
   <div class="grid g2"><div class="cam" role="img" aria-label="Camera view (sample picture)"><span class="cr tl"></span><span class="cr tr"></span><span class="cr bl"></span><span class="cr br"></span>${inner.join('')}</div>
   <div class="card" style="display:flex;flex-direction:column;gap:12px">${pick}<button class="btn big full" id="scanshoot" ${A('scanShoot')}>${ic('scan')}${shoot}</button>
    ${n&&(way==='market'||scanWay(p)==='barcode')?`<button class="btn sec" ${A('set',{k:'step',v:'confirm'})}>Go to the ${plural(n,'item')} already scanned</button>`:''}<p class="muted sm">Simulated: nothing is read from a real camera. A real app would read the text and dates for you.</p></div></div>
   <div class="foot"><button class="btn sec" ${A('scanWayBack')}>${ic('back')}Pick another way</button></div>`}
function rowHtml(r,i,p){const g=r.ing?ING(r.ing):null,way=scanWay(p);
  /* if staff changed the item, suggest a new date for it; if they changed the date, that counts as checked */
  if(r.ing&&r.ing!==r.lastIng){const s=suggestExp(r.ing,way==='market'?'market':way);Object.assign(r,{exp:s.exp,src:s.src,n:s.n,sugExp:s.exp,lastIng:r.ing,lastExp:s.exp,ok:false});if(!r.unit&&!(num(r.paid)>0))r.paid=amt(Math.round((num(r.qty)||0)*ING(r.ing).cost))}
  if(r.exp!==r.lastExp){r.lastExp=r.exp;if(r.exp)r.ok=true}
  const e=scanErrs(r);if(!p.tried)delete e.ok;
  if(r.nonfood)return`<div class="card scanrow off"><div class="row"><span class="mono grow">${h(r.raw)}</span><span class="num">${rm(Math.round(num(r.paid)*100))}</span>${pill('Not a food item, left out')}</div></div>`;
  const opts=`<option value="">${r.unknown?'Leave it out':'Pick an item'}</option>${ING_CATS.map(c=>`<optgroup label="${c}">${S.ingredients.filter(x=>x.cat===c).map(x=>`<option value="${x.id}" ${r.ing===x.id?'selected':''}>${h(x.name)}</option>`).join('')}</optgroup>`).join('')}`;
  const grid=way==='market'&&(!r.ing||r.pick)?`<div><div class="flabel" style="margin-bottom:6px">${r.ing?'Tap the right picture':'The app is not sure. Tap the picture of what you bought.'}</div><div class="picg">${MARKET_PICS.filter(k=>ix().ing[k]).map(k=>`<button class="pic ${r.ing===k?'on':''}" aria-pressed="${r.ing===k}" ${A('scanPic',{i,k})}><span aria-hidden="true">${PICS[k]}</span><b>${h(ING(k).name)}</b></button>`).join('')}</div></div>`:'';
  const head=`<div class="row" style="align-items:flex-start"><span class="rpic" aria-hidden="true">${r.ing&&PICS[r.ing]?PICS[r.ing]:r.pic||'📦'}</span><div class="grow" style="display:flex;flex-direction:column;gap:2px">
    ${way==='market'?(r.ing?`<span class="muted sm">${r.sure?'The app thinks this is':'You picked'}</span><h3>${h(g.name)}</h3>`:'<h3>Not sure what this is</h3>'):`<label class="muted sm" for="sc-i-${i}">${r.unknown?'Not in your item list. Match it to an item:':'Item'}</label><select class="inp" id="sc-i-${i}" data-m="rows.${i}.ing" data-r>${opts}</select>`}
    ${r.raw?`<span class="muted sm"><span>Read:</span> <span class="mono">${h(r.raw)}</span></span>`:''}</div>
    ${way==='market'&&r.ing?`<button class="btn sec sm" ${A('scanPickT',{i})}>${r.pick?'Hide pictures':'Not right?'}</button>`:''}<button class="btn red sm" ${A('scanDrop',{i})} aria-label="Remove this line">${ic('x')}<span class="hide-s">Remove</span></button></div>`;
  if(!scanIn(r))return`<div class="card scanrow ${r.unknown?'off':''}">${head}${grid}${r.unknown&&!r.ing?`<p class="muted sm">Left out. ${rm(Math.round(num(r.paid)*100))} on the receipt is not added to stock.</p>`:''}</div>`;
  const pf=r.unit?['price','Price per '+h(g.unit)+' (RM)',r.price]:['paid','Total paid (RM)',r.paid];
  return`<div class="card scanrow">${head}${grid}<div class="fgrid">
    ${field('sc-q-'+i,'Amount ('+h(g.unit)+')',inp('sc-q-'+i,'rows.'+i+'.qty',r.qty,{attr:'inputmode="decimal"',cls:e.qty?'err':''}))}
    <div class="field"><label for="sc-e-${i}">Expiry date</label><input class="inp ${e.exp||e.ok?'err':''}" id="sc-e-${i}" type="date" data-m="rows.${i}.exp" data-r value="${h(r.exp)}"><span class="muted sm"><span class="pill info">Suggested</span> ${srcTxt(r)}</span></div>
    ${field('sc-p-'+i,pf[1],inp('sc-p-'+i,'rows.'+i+'.'+pf[0],pf[2],{attr:'inputmode="decimal"',cls:e.price?'err':''}))}</div>
   <div class="row"><button class="chip ${r.ok?'on':''}" id="sc-ok-${i}" aria-pressed="${r.ok}" ${A('scanOk',{i})}>${r.ok?ic('check'):''}Date checked</button>${Object.values(e).length?`<span class="why">${Object.values(e)[0]}</span>`:''}</div></div>`}
SCREENS.scan={sec:'stock',title:()=>'Scan',help:['Pick what you are scanning: a delivery order, a supermarket receipt or barcode, or a photo of wet-market food.','The app fills in the items, amounts and a suggested expiry date. Check each date, then tap "Date checked" or change it.','Press "Add to stock" at the bottom. Reading is simulated in this demo.'],
 html(p){const step=p.step||'way';
  if(step==='way')return `${pageHead('Scan','What are you adding to stock? Every way ends on a screen where you check the details. '+pill('Simulated in this demo','warn'))}${stepsBar(SSTEPS,0)}
   <div class="grid g2" id="scanways">${SCAN_WAYS.map(([k,e,t,d])=>`<button class="biga way" ${A('scanWay',{w:k})}><span class="wpic" aria-hidden="true">${e}</span>${t}<small>${d}</small></button>`).join('')}</div>
   <div class="card"><h2>Why four ways?</h2><p>Many restaurants buy fish and vegetables themselves at a wet market or supermarket. There is no delivery order and often no printed expiry date, so the app suggests one and staff confirm it. A shelf photo is for counting what is already there.</p></div>
   <div class="foot"><button class="btn sec" ${A('back')}>Cancel</button><div class="rt"><button class="btn sec" ${A('go',{s:'receive',p:{step:0}})}>Type a delivery in by hand instead</button></div></div>`;
  if(step==='cam')return camHtml(p);
  const rows=p.rows||[],inc=rows.filter(scanIn),bad=rows.filter(r=>Object.keys(scanErrs(r)).length),todo=rows.filter(r=>scanIn(r)&&!scanErrs(r).exp&&!r.ok).length,way=scanWay(p),o=p.way==='do'&&p.order&&ordBy(p.order);
  const tot=inc.reduce((a,r)=>a+Math.round((r.unit?num(r.price)*num(r.qty):num(r.paid))*100||0),0);
  const why=!inc.length?'Nothing to add yet. Pick an item or scan again.':todo?'Check the expiry date on '+plural(todo,'item')+' first.':bad.length?'Fix the boxes marked in red first.':'';
  return `${pageHead('Check and confirm',(o?'<span>Order #'+o.no+' from '+h(SUP(o.sup).name)+'.</span> ':way==='receipt'?'<span>'+h(SCAN_RECEIPT.shop)+'.</span> ':'')+'<span>Change anything the app read wrong.</span> '+pill('Simulated reading','warn'))}${stepsBar(SSTEPS,2)}
   ${inc.length?`<p class="muted">For each item, look at the pack or the food. If the suggested expiry date is right, tap "Date checked". If not, change the date.</p>`:''}
   <div class="grid">${rows.length?rows.map((r,i)=>rowHtml(r,i,p)).join(''):`<div class="card">${empty('No lines left','Scan again to add something.',`<button class="btn" ${A('set',{k:'step',v:'cam'})}>Scan again</button>`)}</div>`}</div>
   ${way==='market'||way==='barcode'?`<div><button class="btn sec" id="scanmore" ${A('set',{k:'step',v:'cam'})}>${ic('plus')}${way==='market'?'Add another photo':'Scan another barcode'}</button></div>`:''}
   <div class="foot"><button class="btn sec" ${A('scanRestart')}>${ic('back')}Start again</button><div class="rt">${why?`<span class="why">${why}</span>`:`<span class="b num">${plural(inc.length,'item')} · ${rm(tot)}</span>`}<button class="btn big" id="scansave" ${A('scanSave')} ${why?'disabled':''}>Add to stock</button></div></div>`}};
Object.assign(ACT,{
 scanWay:p=>{if(p.w==='shelf'){go('shelfScan',{});return}const c=cur().p;c.way=p.w;c.step='cam';c.rows=[];c.tried=0;render()},
 scanWayBack:()=>{const c=cur().p;c.step='way';c.rows=[];render()},
 scanRestart:()=>{const c=cur().p;c.step='cam';c.rows=[];c.tried=0;render()},
 scanShoot:()=>{const c=cur().p,n=scanShoot(c);c.step='confirm';render();toast(plural(n,'line')+' read from the picture (simulated). Check them below.')},
 scanOk:p=>{const r=cur().p.rows[p.i];if(!r)return;r.ok=!r.ok;render(true)},
 scanPic:p=>{const r=cur().p.rows[p.i];if(!r)return;r.ing=p.k;r.sure=false;r.pick=false;render(true)},
 scanPickT:p=>{const r=cur().p.rows[p.i];if(r){r.pick=!r.pick;render(true)}},
 scanDrop:p=>{const c=cur().p,r=c.rows.splice(p.i,1)[0];render(true);toast('Line removed',()=>{c.rows.splice(p.i,0,r)})},
 scanSave:()=>{const c=cur().p,rows=(c.rows||[]).filter(scanIn);c.tried=1;if(!rows.length||rows.some(r=>Object.keys(scanErrs(r)).length)){render(true);return}
   const snap=JSON.stringify({b:S.batches,o:S.orders}),o=c.way==='do'&&c.order&&ordBy(c.order),made=[];
   rows.forEach(r=>{const q=num(r.qty),cost=r.unit?Math.round(num(r.price)*100):Math.round(num(r.paid)*100/q);made.push(addBatch(r.ing,q,r.exp,cost).id);
     if(o&&r.line!=null&&o.lines[r.line]&&o.lines[r.line].ing===r.ing)o.lines[r.line].recv=r3(o.lines[r.line].recv+q)});
   if(o)o.status=o.lines.every(l=>l.recv>=l.qty)?'received':'part';
   save();go('scanDone',{made,order:o?o.id:'',way:c.way},true);toast(plural(made.length,'new batch','new batches')+' added to stock',()=>{const x=JSON.parse(snap);S.batches=x.b;S.orders=x.o;root('stock')})}
});
SCREENS.scanDone={sec:'stock',title:()=>'Added to stock',html(p){const bs=S.batches.filter(b=>p.made.includes(b.id)),o=p.order&&ordBy(p.order);
  return`${stepsBar(SSTEPS,3)}<div class="card donebox"><span class="tick">${ic('check')}</span><h1>Stock updated</h1><p><span>${plural(bs.length,'new batch','new batches')} added, each with the expiry date you checked.</span>${o?' <span>'+(o.status==='part'?'Order #'+o.no+' stays open for the items that did not arrive.':'Order #'+o.no+' is now complete.')+'</span>':''}</p>
  <div class="tw" style="width:100%;max-width:520px"><table>${bs.map(b=>`<tr><td style="text-align:left">${h(ING(b.ing).name)}</td><td class="r b grn-t">+${qU(b.ing,b.qty)}</td><td class="r muted">${fDs(b.exp)}</td></tr>`).join('')}</table></div>
  <div class="acts"><button class="btn big" id="scanagain" ${A('go',{s:'scan',p:{}})}>Scan something else</button><button class="btn sec big" ${A('root',{s:'home'})}>Back to Home</button></div>
  <div class="acts"><button class="btn sec sm" ${A('root',{s:'stock'})}>See stock</button>${o&&o.status==='received'&&!S.bills.some(x=>x.order===o.id)?`<button class="btn sec sm" ${A('go',{s:'billForm',p:{order:o.id}})}>Enter the supplier bill</button>`:''}</div></div>`}};

/* ---------- Expiring-soon report: value at risk and a suggested action for each batch ---------- */
const ACTS={use:['Use first','ok'],special:["Use in today's special",'info'],discount:['Discount','warn'],staff:['Staff meal','bad']};
function riskList(days){const list=S.batches.filter(b=>b.qty>0.0005&&daysLeft(b)>=0&&daysLeft(b)<=days).sort((a,b)=>a.exp<b.exp?-1:a.exp>b.exp?1:0);
  return list.map(b=>{const i=ING(b.ing),d=daysLeft(b),avg=avgUse(i.id),order=batchesOf(i.id),k=order.findIndex(x=>x.id===b.id);
    /* oldest first: batches that expire earlier are used before this one */
    const earlier=order.slice(0,Math.max(0,k)).reduce((a,x)=>a+x.qty,0),use=Math.min(b.qty,Math.max(0,avg*(d+1)-earlier)),left=r3(b.qty-use);
    const dishes=S.menu.filter(m=>m.recipe.some(r=>r[0]===i.id)).sort((x,y)=>(y.recipe.find(r=>r[0]===i.id)[1])-(x.recipe.find(r=>r[0]===i.id)[1])).slice(0,2).map(m=>m.name);
    let act;const share=left/b.qty;
    if(left<=0.0005||share<0.25||Math.round(left*b.cost)<300)act='use';else if(!dishes.length)act='staff';else if(d===0)act=share>0.5?'staff':'discount';else if(d===1&&share>0.6)act='discount';else if(d>=4&&share<0.6)act='use';else act='special';
    return{b,i,d,avg,left,risk:Math.round(left*b.cost),value:Math.round(b.qty*b.cost),kg:r3(left*i.kg),dishes,act}})}
function riskWhy(x){const dn=x.dishes.join(', ');
  if(x.act==='use')return x.left>0.0005?'Only about '+qU(x.i.id,x.left)+' may be left. Use this batch first and keep it at the front of the shelf.':'Normal sales should use it up in time. Keep it at the front of the shelf.';
  if(x.act==='staff')return x.dishes.length?'Expires today and most of it will be left. Use it for the staff meal after service.':'Not used in any dish. Use it for a staff meal, or add it to a dish on the menu.';
  if(x.act==='discount')return'About '+qU(x.i.id,x.left)+' will be left and there is little time. Sell dishes with it at a discount, for example 20% off '+dn+'.';
  return'Put '+dn+' on the specials board to use up the extra '+qU(x.i.id,x.left)+'.'}
const L=s=>curLang()==='en'?s:tr1(s,curLang());
SCREENS.expReport={sec:'stock',title:()=>'Expiring-soon report',help:['Every batch that expires in the next few days, what it is worth, and what to do with it.','"Value at risk" is what will probably be left by the expiry date, worked out from the last 14 days of use.','Print it for the kitchen wall, or copy it into a chat for the team.'],
 html(p){const days=p.days||S.settings.expDays,xs=riskList(days),T=today(),risk=xs.reduce((a,x)=>a+x.risk,0),val=xs.reduce((a,x)=>a+x.value,0),kg=r3(xs.reduce((a,x)=>a+x.kg,0)),n={};xs.forEach(x=>n[x.act]=(n[x.act]||0)+1);
  TEXTS.expText=()=>[L('Expiring-soon report'),S.settings.cafe.name+' · '+fD(T)+' · '+L('Next '+plural(days,'day')),L('Value at risk')+': '+rm(risk)+' ('+L(plural(xs.length,'batch','batches'))+')','',
    ...xs.map((x,k)=>[(k+1)+'. '+L(x.i.name)+' · '+qU(x.i.id,x.b.qty)+' · '+L(expTxt(x.b))+' ('+fDs(x.b.exp)+')','   '+L('Value at risk')+': '+rm(x.risk)+' · '+L('Suggested')+': '+L(ACTS[x.act][0]),'   '+L(riskWhy(x))].join('\n')),'',L('Demo data. Suggestions use the last 14 days of use. Check before acting.')].join('\n');
  TEXTS.expText.file='stox-expiring-'+T+'.txt';
  return `${pageHead('Expiring-soon report','Food that expires in the next '+plural(days,'day')+', what it is worth, and what to do with it. '+demoTag,`<button class="btn sec noprint" ${A('go',{s:'push'})}>${ic('star')}Dishes to push today</button>${STANDALONE?`<button class="btn" ${A('print')}>Print</button>`:''}<button class="btn ${STANDALONE?'sec':''}" id="expshare" ${A('showText',{t:'Expiring-soon report',k:'expText'})}>${ic('copy')}Copy to share</button>`)}
  <div class="printonly"><b>${h(S.settings.cafe.name)}</b> · ${fD(T)}</div>
  <div class="row noprint"><span class="flabel">Show food that expires in:</span><div class="chips">${[1,2,3,5,7].map(k=>`<button class="chip sm ${days===k?'on':''}" aria-pressed="${days===k}" ${A('set',{k:'days',v:k})}>${plural(k,'day')}</button>`).join('')}</div></div>
  <div class="grid g3" id="exprisk"><div class="kpi"><span class="l">Value at risk</span><span class="v red-t">${rm(risk)}</span><span class="s">Likely left over by the expiry date</span></div>
   <div class="kpi"><span class="l">Batches expiring</span><span class="v">${xs.length}</span><span class="s">${qf(kg)} kg likely left over</span></div>
   <div class="kpi"><span class="l">Worth in total</span><span class="v">${rm(val)}</span><span class="s">If none of it were used</span></div></div>
  ${xs.length?`<div class="chips" aria-label="Suggested actions">${Object.keys(ACTS).filter(k=>n[k]).map(k=>`<span class="pill ${ACTS[k][1]}">${ACTS[k][0]}: ${n[k]}</span>`).join('')}</div>`:''}
  <div class="card pad0"><div class="tw">${xs.length?`<table class="exp"><tr><th>Item</th><th class="r">Amount</th><th>Expires</th><th class="r hide-s">Likely left over</th><th class="r">Value at risk</th><th>Suggested action</th><th class="noprint"></th></tr>${xs.map(x=>{return`<tr><td class="b">${h(x.i.name)}</td><td class="r">${qU(x.i.id,x.b.qty)}</td><td>${pill(expTxt(x.b),x.d<=0?'bad':'warn')} <span class="muted sm">${fDs(x.b.exp)}</span></td><td class="r hide-s">${qU(x.i.id,x.left)}</td><td class="r b">${rm(x.risk)}</td>
    <td>${pill(...ACTS[x.act])}<div class="sm muted" style="margin-top:4px;max-width:340px">${riskWhy(x)}</div></td><td class="noprint">${x.act==='special'||x.act==='discount'?`<button class="btn sec sm" ${A('go',{s:'push'})}>Dishes to push</button>`:`<button class="btn sec sm" ${A('go',{s:'item',p:{id:x.i.id}})}>Open item</button>`}</td></tr>`}).join('')}<tr><td colspan="4" class="r b hide-s">Total value at risk</td><td class="r b">${rm(risk)}</td><td colspan="2"></td></tr></table>`
   :empty('Nothing expires in the next '+plural(days,'day'),'Good news. Try a longer period, or check again tomorrow.',`<button class="btn sec" ${A('root',{s:'stock'})}>See all stock</button>`)}</div></div>
  <p class="muted sm">How this is worked out: the app takes how much of each item was used per day over the last 14 days, and assumes older batches are used first. Whatever is not likely to be used by the expiry date is "at risk". It is a rough guide, so check the shelf before acting. Demo data.</p>`}};
