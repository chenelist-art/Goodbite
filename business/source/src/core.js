'use strict';
/* ---------- helpers ---------- */
const KEY='goodbite_b2b_v1';
let S=null,IX=null;
const pad=n=>String(n).padStart(2,'0');
const isoD=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const isoDT=d=>isoD(d)+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
const now=()=>new Date();
const today=()=>isoD(now());
const pD=s=>{const[a,b,c]=s.slice(0,10).split('-').map(Number);return new Date(a,b-1,c)};
const pDT=s=>{const d=pD(s);if(s.length>10){const[h,m]=s.slice(11).split(':').map(Number);d.setHours(h,m)}return d};
const addDays=(s,n)=>{const d=pD(s);d.setDate(d.getDate()+n);return isoD(d)};
const dayDiff=(a,b)=>Math.round((pD(a)-pD(b))/864e5);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONF=['January','February','March','April','May','June','July','August','September','October','November','December'];
const fD=s=>{const d=pD(s);return d.getDate()+' '+MON[d.getMonth()]+' '+d.getFullYear()};
const fDs=s=>{const d=pD(s);return d.getDate()+' '+MON[d.getMonth()]};
const fT=s=>{const d=pDT(s),h=d.getHours();return(h%12||12)+':'+pad(d.getMinutes())+(h<12?' am':' pm')};
const fDT=s=>fD(s)+', '+fT(s);
const fM=m=>MONF[+m.slice(5,7)-1]+' '+m.slice(0,4);
const addMonth=(m,n)=>{const d=new Date(+m.slice(0,4),+m.slice(5,7)-1+n,1);return isoD(d).slice(0,7)};
const rm=c=>(c<0?'-':'')+'RM '+(Math.abs(c)/100).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
const amt=c=>(c/100).toFixed(2);
const r3=x=>Math.round(x*1000)/1000;
const qf=q=>String(+(+q).toFixed(2));
const h=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=p=>p+(S.seq.id++);
const fakeId=(R,n)=>{const c='ABCDEFGHJKMNPQRSTVWXYZ0123456789';let o='';for(let i=0;i<n;i++)o+=c[Math.floor(R()*c.length)];return'DEMO'+o.slice(4)};
const plural=(n,w,ws)=>n+' '+(n===1?w:(ws||w+'s'));
const SIM_ERR='LHDN could not match the buyer TIN with the ID number (this rejection is simulated).';

/* ---------- saving ---------- */
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.v===1&&Array.isArray(s.batches))return s}catch(e){}return null}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function resetDemo(){S=seed();IX=null;sweep();save()}

/* ---------- lookups ---------- */
function ix(){if(!IX||IX.s!==S){IX={s:S,ing:{},menu:{},sup:{}};S.ingredients.forEach(i=>IX.ing[i.id]=i);S.menu.forEach(m=>IX.menu[m.id]=m);S.suppliers.forEach(x=>IX.sup[x.id]=x)}return IX}
const ING=id=>ix().ing[id]||{id,name:'(removed item)',unit:'',cost:0,min:0,kg:0,sup:'',shelf:7,cat:''};
const MENU=id=>ix().menu[id];
const SUP=id=>ix().sup[id]||{id,name:'(no supplier)',lead:1};
const qU=(id,q)=>{const u=ING(id).unit;const w=u==='loaf'?(+q===1?'loaf':'loaves'):u==='piece'?(+q===1?'piece':'pieces'):u;return qf(q)+' '+w};

/* ---------- bill maths (all money is kept in sen so nothing drifts) ---------- */
function billTotals(lines,type,tax){
  tax=tax||S.settings.tax;
  const rate=tax.sstOn?tax.sstRate:0;
  let sub=0,sst=0;
  lines.forEach(l=>{const a=(l.price+(l.modTotal||0))*l.qty;sub+=a;sst+=Math.round(a*rate/100)});
  const sc=(tax.scOn&&(type==='dine'||tax.scTakeaway))?Math.round(sub*tax.scRate/100):0;
  if(tax.sstOnSc)sst+=Math.round(sc*rate/100);
  const raw=sub+sc+sst,total=tax.round5?Math.round(raw/5)*5:raw;
  return{sub,sc,sst,round:total-raw,total};
}
function addDay(sale,sign){const d=sale.dt.slice(0,10),x=S.days[d]||(S.days[d]={bills:0,sub:0,sc:0,sst:0,round:0,total:0,cogs:0,first:sale.no,last:sale.no,ex:{n:0,sub:0,sc:0,sst:0,round:0,total:0}});
  x.bills+=sign;['sub','sc','sst','round','total','cogs'].forEach(k=>x[k]+=sign*sale[k]);if(sign>0){x.first=Math.min(x.first,sale.no);x.last=Math.max(x.last,sale.no)}}
function exDay(sale,sign){const x=S.days[sale.dt.slice(0,10)];if(!x)return;x.ex.n+=sign;['sub','sc','sst','round','total'].forEach(k=>x.ex[k]+=sign*sale[k])}

/* ---------- stock ---------- */
const batchesOf=id=>S.batches.filter(b=>b.ing===id&&b.qty>0.0005).sort((a,b)=>a.exp<b.exp?-1:a.exp>b.exp?1:a.recv<b.recv?-1:1);
const onHand=id=>r3(S.batches.reduce((a,b)=>b.ing===id&&b.qty>0.0005?a+b.qty:a,0));
const onOrder=id=>r3(S.orders.reduce((a,o)=>(o.status==='sent'||o.status==='part')?a+o.lines.reduce((x,l)=>l.ing===id?x+Math.max(0,l.qty-l.recv):x,0):a,0));
const daysLeft=b=>dayDiff(b.exp,today());
const isLow=i=>onHand(i.id)<i.min;
const lowList=()=>S.ingredients.filter(isLow);
const soonList=()=>S.batches.filter(b=>b.qty>0.0005&&daysLeft(b)>=0&&daysLeft(b)<=S.settings.expDays).sort((a,b)=>a.exp<b.exp?-1:1);
function consume(id,qty,batchId){const used=[];let need=qty;
  for(const b of batchesOf(id)){if(need<=0.0005)break;if(batchId&&b.id!==batchId)continue;const t=Math.min(b.qty,need);b.qty=r3(b.qty-t);need=r3(need-t);used.push({b:b.id,ing:id,qty:t,cost:Math.round(t*b.cost)})}
  return{used,short:need>0.0005?need:0}}
function giveBack(used){used.forEach(u=>{const b=S.batches.find(x=>x.id===u.b);if(b)b.qty=r3(b.qty+u.qty)})}
function addBatch(ingId,qty,exp,cost,recv){const b={id:'b'+S.seq.batch++,ing:ingId,qty:r3(qty),recv:recv||today(),exp,cost};S.batches.push(b);return b}
function addUse(id,q){const d=today(),u=S.use[d]||(S.use[d]={});u[id]=r3((u[id]||0)+q);const ks=Object.keys(S.use).sort();while(ks.length>21)delete S.use[ks.shift()]}
function avgUse(id){let t=0;for(let d=1;d<=14;d++){const u=S.use[addDays(today(),-d)];if(u&&u[id])t+=u[id]}return t/14}
function logWaste(ingId,qty,reason,o){o=o||{};const i=ING(ingId),r=consume(ingId,qty,o.batch);const got=r3(qty-r.short);if(got<=0.0005)return null;
  const w={id:uid('w'),dt:isoDT(now()),ing:ingId,qty:got,reason,cost:r.used.reduce((a,u)=>a+u.cost,0),kg:r3(got*i.kg),auto:!!o.auto,used:r.used};S.waste.push(w);return w}
function undoWaste(id){const w=S.waste.find(x=>x.id===id);if(!w)return;giveBack(w.used||[]);S.waste=S.waste.filter(x=>x!==w)}
/* anything past its expiry date is moved to the waste log automatically */
function sweep(){let n=0;S.batches.forEach(b=>{if(b.qty>0.0005&&daysLeft(b)<0){S.rescue.forEach(r=>{if(r.batch===b.id&&r.status==='Offered')r.status='Expired before collection'});if(logWaste(b.ing,b.qty,'Expired',{auto:true,batch:b.id}))n++}});if(n)save();return n}
function suggestions(){const out=[];S.ingredients.forEach(i=>{const oh=onHand(i.id),oo=onOrder(i.id),avg=avgUse(i.id),lead=SUP(i.sup).lead;
  const target=Math.max(i.min*2,i.min+avg*(lead+3));
  if(oh+oo<i.min||oh+oo<avg*(lead+1)){let q=target-oh-oo;q=(i.unit==='piece'||i.unit==='loaf'||q>=5)?Math.ceil(q):Math.ceil(q*2)/2;if(q>0)out.push({ing:i.id,qty:q,oh,oo,avg})}});return out}
function adjustStock(id,counted){const oh=onHand(id),diff=r3(counted-oh);if(Math.abs(diff)<0.0005)return 0;
  if(diff<0)consume(id,-diff);else{const i=ING(id),bs=batchesOf(id);if(bs.length)bs[bs.length-1].qty=r3(bs[bs.length-1].qty+diff);else addBatch(id,diff,addDays(today(),i.shelf),i.cost)}
  return diff}

/* ---------- sales ---------- */
function lineRecipe(l){const m=MENU(l.item);if(!m)return[];let rec=m.recipe.map(x=>x.slice());
  (l.mods||[]).forEach(o=>{(o.remove||[]).forEach(g=>rec=rec.filter(x=>x[0]!==g));(o.add||[]).forEach(a=>rec.push(a.slice()))});return rec}
function completeSale(bill,pay,cash){
  const t=billTotals(bill.lines,bill.type);
  const sale={id:uid('s'),no:S.seq.receipt++,dt:isoDT(now()),type:bill.type,table:bill.type==='dine'?bill.table:'',lines:JSON.parse(JSON.stringify(bill.lines)),...t,pay,status:'paid',inv:null,want:false,cogs:0,used:[],short:[],tax:{...S.settings.tax}};
  if(pay==='Cash'){sale.cash=cash;sale.change=cash-t.total}
  sale.lines.forEach(l=>lineRecipe(l).forEach(([g,q])=>{const r=consume(g,q*l.qty);sale.used.push(...r.used);addUse(g,q*l.qty);if(r.short&&!sale.short.includes(g))sale.short.push(g)}));
  sale.cogs=sale.used.reduce((a,u)=>a+u.cost,0);
  S.sales.push(sale);addDay(sale,1);save();return sale}
function voidSale(sale,reason,restock){sale.status='void';sale.voidReason=reason;sale.want=false;addDay(sale,-1);if(restock)giveBack(sale.used);save()}
const lineName=l=>l.name+((l.mods||[]).length?' ('+l.mods.map(o=>o.n).join(', ')+')':'');

/* ---------- e-invoice (simulation only) ---------- */
const invNo=()=>'EINV-'+pad(now().getFullYear()%100)+'-'+String(S.seq.inv++).padStart(5,'0');
function invTotals(inv){const excl=inv.lines.reduce((a,l)=>a+l.amt,0),tax=inv.lines.reduce((a,l)=>a+l.tax,0);inv.tot={excl,tax,incl:excl+tax,round:inv.tot?inv.tot.round:0};inv.tot.payable=inv.tot.incl+inv.tot.round;return inv}
function invFromSale(sale,buyer){const tx=sale.tax||S.settings.tax,rate=tx.sstOn?tx.sstRate:0,tt=tx.sstOn?'02':'06';
  const lines=sale.lines.map(l=>{const a=(l.price+(l.modTotal||0))*l.qty;return{desc:lineName(l),cls:'022',qty:l.qty,unit:l.price+(l.modTotal||0),amt:a,taxType:tt,rate,tax:Math.round(a*rate/100)}});
  if(sale.sc)lines.push({desc:'Service charge ('+tx.scRate+'%)',cls:'022',qty:1,unit:sale.sc,amt:sale.sc,taxType:tx.sstOnSc?tt:'06',rate:tx.sstOnSc?rate:0,tax:tx.sstOnSc?Math.round(sale.sc*rate/100):0});
  return invTotals({id:uid('i'),no:invNo(),type:'01',kind:'single',sales:[sale.id],receipt:sale.no,buyer:buyer||{type:'biz',idType:'BRN',state:'Selangor'},lines,status:'Draft',created:isoDT(now()),tot:{round:sale.round}})}
function consDays(month){return Object.keys(S.days).filter(d=>d.slice(0,7)===month).sort().map(d=>({d,x:S.days[d]})).filter(o=>o.x.bills-o.x.ex.n>0)}
function invConsolidated(month){const tx=S.settings.tax;let rnd=0;
  const lines=consDays(month).map(({d,x})=>{rnd+=x.round-x.ex.round;const a=x.sub+x.sc-x.ex.sub-x.ex.sc;return{desc:'Receipts '+x.first+' to '+x.last+' on '+fD(d)+(x.ex.n?' (leaving out '+plural(x.ex.n,'receipt')+' that got its own e-invoice)':''),cls:'004',qty:1,unit:a,amt:a,taxType:tx.sstOn?'02':'06',rate:tx.sstOn?tx.sstRate:0,tax:x.sst-x.ex.sst,agg:true}});
  return invTotals({id:uid('i'),no:invNo(),type:'01',kind:'consolidated',month,sales:[],buyer:{type:'public',name:'General Public',tin:'EI00000000010',idType:'NA',idNo:'NA',sst:'NA',addr:'NA',city:'NA',post:'',state:'NA',phone:'NA',email:''},lines,status:'Draft',created:isoDT(now()),tot:{round:rnd}})}
function invCreditNote(orig,reason){const lines=orig.lines.map(l=>({...l}));
  return invTotals({id:uid('i'),no:invNo().replace('EINV','CN'),type:'02',kind:'credit',ref:orig.id,refNo:orig.no,refUuid:orig.uuid,sales:orig.sales.slice(),receipt:orig.receipt,buyer:{...orig.buyer},lines,status:'Draft',created:isoDT(now()),reason,tot:{round:orig.tot.round}})}
const TIN_RE=/^[A-Z]{1,2}\d{9,13}$/;
function validateInv(inv){const e=[],b=inv.buyer,c=S.settings.cafe,E=(f,msg,step)=>e.push({f,msg,step});
  if(!c.tin)E('cafe','Your own TIN is missing. Add it in Settings.',0);
  if(!c.msic)E('cafe','Your business activity code is missing. Add it in Settings.',0);
  if(inv.kind!=='consolidated'){
    if(!(b.name||'').trim())E('name','Buyer name is missing.',1);
    if(!(b.tin||'').trim())E('tin','Buyer TIN is missing.',1);else if(!TIN_RE.test(b.tin.trim().toUpperCase()))E('tin','Buyer TIN does not look right. It should be 1 or 2 letters followed by numbers, with no spaces.',1);
    if(!(b.idNo||'').trim())E('idNo','Buyer ID number is missing.',1);
    if(!(b.addr||'').trim())E('addr','Buyer address is missing.',1);
    if(!(b.city||'').trim())E('city','Buyer city is missing.',1);
    if(!(b.phone||'').trim())E('phone','Buyer phone number is missing.',1);else if(!/^\+?\d{8,14}$/.test(b.phone.replace(/[\s-]/g,'')))E('phone','Buyer phone number should be numbers only, for example 0123456789.',1);
    if(b.email&&!/^\S+@\S+\.\S+$/.test(b.email))E('email','Buyer email does not look right. Check for a missing @ or dot.',1);
  }
  if(!inv.lines.length)E('lines','There are no items on this e-invoice.',2);
  const ex=inv.lines.reduce((a,l)=>a+l.amt,0),tx=inv.lines.reduce((a,l)=>a+l.tax,0);
  if(ex!==inv.tot.excl||tx!==inv.tot.tax||ex+tx+inv.tot.round!==inv.tot.payable)E('lines','The totals do not add up. Go back to "Check items" and the app will work them out again.',2);
  if(inv.kind==='single'&&inv.lines.some(l=>!l.agg&&l.tax!==Math.round(l.amt*l.rate/100)))E('lines','A tax amount does not match its tax rate.',2);
  if(inv.type==='02'&&!(inv.reason||'').trim())E('reason','Give a reason for the credit note.',1);
  return e}
/* pretend to send it. Returns the status LHDN "gives back" in this demo. */
function simulateOutcome(inv){return /404$/.test((inv.buyer.tin||'').trim())?'Invalid':'Valid'}
function applyValid(inv){const R=rng(Date.now()%1e9+S.seq.id);inv.status='Valid';inv.validated=isoDT(now());inv.uuid=inv.uuid||fakeId(R,26);inv.longId=fakeId(R,40);inv.errors=[];
  if(inv.kind==='single')inv.sales.forEach(id=>{const s=S.sales.find(x=>x.id===id);if(s){s.inv=inv.id;s.want=false;exDay(s,1)}});
  if(inv.kind==='consolidated')S.cons[inv.month]=inv.id}
function applyInvalid(inv){const R=rng(Date.now()%1e9+7);inv.status='Invalid';inv.uuid=inv.uuid||fakeId(R,26);inv.errors=[SIM_ERR]}
function cancelDeadline(inv){return new Date(pDT(inv.validated).getTime()+S.settings.cancelHours*36e5)}
const canCancel=inv=>inv.status==='Valid'&&now()<cancelDeadline(inv);
function cancelInv(inv,reason){inv.status='Cancelled';inv.cancelReason=reason;inv.cancelled=isoDT(now());
  if(inv.kind==='single')inv.sales.forEach(id=>{const s=S.sales.find(x=>x.id===id);if(s&&s.inv===inv.id){s.inv=null;exDay(s,-1)}});
  if(inv.kind==='consolidated'&&S.cons[inv.month]===inv.id)delete S.cons[inv.month];save()}
const TAXT={'01':'Sales Tax','02':'Service Tax','06':'Not Applicable'};
function invJSON(inv){const c=S.settings.cafe,b=inv.buyer,M=v=>[{_:+amt(v),currencyID:'MYR'}];
  const party=(name,tin,idT,idN,sst,ad,city,post,st,ph,em,msic)=>({Party:[{...(msic?{IndustryClassificationCode:[{_:msic,name:c.activity}]}:{}),PartyIdentification:[{ID:[{_:tin,schemeID:'TIN'}]},{ID:[{_:idN||'NA',schemeID:idT||'BRN'}]},{ID:[{_:sst||'NA',schemeID:'SST'}]}],
    PostalAddress:[{CityName:[{_:city||'NA'}],PostalZone:[{_:post||''}],CountrySubentityCode:[{_:st||'NA'}],AddressLine:[{Line:[{_:ad||'NA'}]}],Country:[{IdentificationCode:[{_:'MYS'}]}]}],PartyLegalEntity:[{RegistrationName:[{_:name}]}],Contact:[{Telephone:[{_:ph||'NA'}],ElectronicMail:[{_:em||''}]}]}]});
  const d=inv.issued||inv.created;
  return{_DEMO:'Simulated document from the GoodBite demo. Not sent to LHDN MyInvois. Not signed. Not a valid tax document.',
   Invoice:[{ID:[{_:inv.no}],IssueDate:[{_:d.slice(0,10)}],IssueTime:[{_:d.slice(11)+':00Z'}],InvoiceTypeCode:[{_:inv.type,listVersionID:'1.1'}],DocumentCurrencyCode:[{_:'MYR'}],
    ...(inv.type==='02'?{BillingReference:[{InvoiceDocumentReference:[{ID:[{_:inv.refNo}],UUID:[{_:inv.refUuid||''}]}]}]}:{}),
    AccountingSupplierParty:[party(c.legal,c.tin,'BRN',c.brn,c.sst,c.addr,c.city,c.post,c.state,c.phone,c.email,c.msic)],
    AccountingCustomerParty:[party(b.name,(b.tin||'').toUpperCase(),b.idType,b.idNo,b.sst,b.addr,b.city,b.post,b.state,b.phone,b.email)],
    TaxTotal:[{TaxAmount:M(inv.tot.tax),TaxSubtotal:[{TaxableAmount:M(inv.tot.excl),TaxAmount:M(inv.tot.tax),TaxCategory:[{ID:[{_:inv.lines[0]?inv.lines[0].taxType:'06'}]}]}]}],
    LegalMonetaryTotal:[{LineExtensionAmount:M(inv.tot.excl),TaxExclusiveAmount:M(inv.tot.excl),TaxInclusiveAmount:M(inv.tot.incl),PayableRoundingAmount:M(inv.tot.round),PayableAmount:M(inv.tot.payable)}],
    InvoiceLine:inv.lines.map((l,i)=>({ID:[{_:String(i+1)}],InvoicedQuantity:[{_:l.qty,unitCode:'C62'}],LineExtensionAmount:M(l.amt),
      TaxTotal:[{TaxAmount:M(l.tax),TaxSubtotal:[{TaxableAmount:M(l.amt),TaxAmount:M(l.tax),Percent:[{_:l.rate}],TaxCategory:[{ID:[{_:l.taxType}]}]}]}],
      Item:[{Description:[{_:l.desc}],CommodityClassification:[{ItemClassificationCode:[{_:l.cls,listID:'CLASS'}]}]}],Price:[{PriceAmount:M(l.unit)}],ItemPriceExtension:[{Amount:M(l.amt)}]})),
    Signature:[{_note:'A real e-invoice carries the issuer digital signature here. This demo does not sign anything.'}]}]}}

/* ---------- report numbers ---------- */
function monthStats(m){let sales=0,net=0,bills=0,cogs=0;const daily=[];
  const dim=new Date(+m.slice(0,4),+m.slice(5,7),0).getDate();
  for(let d=1;d<=dim;d++){const k=m+'-'+pad(d),x=S.days[k];if(k>today())break;daily.push({d:k,v:x?x.total:0,b:x?x.bills:0});if(x){sales+=x.total;net+=x.sub;bills+=x.bills;cogs+=x.cogs}}
  const w=S.waste.filter(x=>x.dt.slice(0,7)===m),wRM=w.reduce((a,x)=>a+x.cost,0),wKg=r3(w.reduce((a,x)=>a+x.kg,0));
  const by={},rs={};w.forEach(x=>{const o=by[x.ing]||(by[x.ing]={ing:x.ing,qty:0,cost:0,kg:0,n:0});o.qty=r3(o.qty+x.qty);o.cost+=x.cost;o.kg=r3(o.kg+x.kg);o.n++;const r=rs[x.reason]||(rs[x.reason]={reason:x.reason,cost:0,kg:0});r.cost+=x.cost;r.kg=r3(r.kg+x.kg)});
  const resc=S.rescue.filter(r=>r.status==='Collected'&&r.dt.slice(0,7)===m).reduce((a,r)=>a+r.kg,0);
  return{m,sales,net,bills,cogs,daily,waste:w,wRM,wKg,top:Object.values(by).sort((a,b)=>b.cost-a.cost),reasons:Object.values(rs).sort((a,b)=>b.cost-a.cost),resc:r3(resc),
    fc:net?cogs/net*100:0,wp:net?wRM/net*100:0}}
function weeklyWaste(n){const out=[],T=today(),dow=(pD(T).getDay()+6)%7,mon=addDays(T,-dow);
  for(let k=n-1;k>=0;k--){const a=addDays(mon,-7*k),b=addDays(a,6);let kg=0,c=0;S.waste.forEach(w=>{const d=w.dt.slice(0,10);if(d>=a&&d<=b){kg+=w.kg;c+=w.cost}});out.push({a,b,kg:r3(kg),cost:c})}return out}
function toCSV(rows){return rows.map(r=>r.map(v=>{v=String(v==null?'':v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}).join(',')).join('\n')}
