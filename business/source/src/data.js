/* ---------- demo catalogue. Every name, price, weight and number here is made up for the demo. ---------- */
const SUPPLIERS=[
 {id:'F',name:'Ah Seng Fresh Seafood (demo)',tin:'C99000000010',phone:'03-5550 0101',email:'orders@ahsengseafood.example',lead:1},
 {id:'P',name:'Pasar Pagi Produce (demo)',tin:'C99000000020',phone:'03-5550 0102',email:'orders@pasarpagi.example',lead:1},
 {id:'M',name:'Kedai Daging Segar Meat and Poultry (demo)',tin:'C99000000030',phone:'03-5550 0103',email:'order@dagingsegar.example',lead:1},
 {id:'D',name:'Lembah Tofu, Egg and Noodle Supply (demo)',tin:'C99000000040',phone:'03-5550 0104',email:'hello@lembahtofu.example',lead:1},
 {id:'K',name:'Kedai Kering Dry Goods (demo)',tin:'C99000000050',phone:'03-5550 0105',email:'sales@kedaikering.example',lead:2},
 {id:'B',name:'Minuman Segar Drinks and Dairy (demo)',tin:'C99000000060',phone:'03-5550 0106',email:'order@minumansegar.example',lead:3}
];
/* id|name|unit|category|supplier|cost RM per unit|minimum stock|shelf life days|kg per unit */
const ING_RAW=`tilapia|Tilapia (whole)|kg|Seafood|F|16|2.5|2|1
seabass|Siakap (sea bass)|kg|Seafood|F|38|2.5|2|1
grouper|Grouper (live)|kg|Seafood|F|85|3|3|1
prawn|Tiger prawns|kg|Seafood|F|55|2.5|2|1
lala|Lala (clams)|kg|Seafood|F|14|3.5|1|1
squid|Sotong (squid)|kg|Seafood|F|28|1.6|2|1
crab|Mud crab (live)|kg|Seafood|F|75|3|3|1
fillet|Fish fillet (frozen)|kg|Seafood|F|24|3|60|1
fishball|Fish balls|kg|Seafood|F|18|2|7|1
chicken|Chicken (cut)|kg|Meat and poultry|M|11|1|2|1
wing|Chicken wings|kg|Meat and poultry|M|14|2|2|1
pork|Pork belly|kg|Meat and poultry|M|26|2.5|3|1
rib|Pork ribs|kg|Meat and poultry|M|30|1.5|3|1
beef|Beef slices|kg|Meat and poultry|M|45|1|3|1
kangkung|Kangkung|kg|Vegetables|P|6|1.5|3|1
kailan|Kailan|kg|Vegetables|P|9|2|4|1
choysum|Choy sum|kg|Vegetables|P|7|2.5|3|1
sprout|Bean sprouts|kg|Vegetables|P|4|2|2|1
longbean|Long beans|kg|Vegetables|P|8|1.5|5|1
brinjal|Brinjal|kg|Vegetables|P|7|1.5|6|1
gourd|Bitter gourd|kg|Vegetables|P|8|1|6|1
tomato|Tomato|kg|Vegetables|P|6|1|7|1
cucumber|Cucumber|kg|Vegetables|P|4|1|7|1
onion|Big onion|kg|Vegetables|P|4.5|1.5|30|1
shallot|Shallots|kg|Vegetables|P|9|0.5|30|1
garlic|Garlic|kg|Vegetables|P|9|2|45|1
ginger|Ginger|kg|Vegetables|P|10|1.5|21|1
scallion|Spring onion|kg|Vegetables|P|12|0.5|4|1
chilli|Red chilli|kg|Vegetables|P|14|1.5|10|1
padi|Cili padi|kg|Vegetables|P|20|0.2|10|1
lime|Limau kasturi|kg|Vegetables|P|8|2|10|1
mushroom|Shiitake mushrooms|kg|Vegetables|P|28|0.5|6|1
pineapple|Pineapple|piece|Vegetables|P|4|4|5|1.2
capsicum|Capsicum|kg|Vegetables|P|12|0.6|7|1
curryleaf|Curry leaves|kg|Vegetables|P|15|0.1|5|1
egg|Eggs|piece|Eggs, tofu and noodles|D|0.5|90|21|0.06
tofu|Egg tofu|piece|Eggs, tofu and noodles|D|1.8|15|7|0.15
kueyteow|Kuey teow (fresh)|kg|Eggs, tofu and noodles|D|5|3|2|1
yeemee|Yellow noodles|kg|Eggs, tofu and noodles|D|5|1.8|3|1
meehoon|Mee hoon (dried)|kg|Eggs, tofu and noodles|D|8|2|180|1
rice|Rice|kg|Dry goods and sauces|K|4.2|20|365|1
oil|Cooking oil|L|Dry goods and sauces|K|7|10|365|0.92
oyster|Oyster sauce|L|Dry goods and sauces|K|12|2|180|1.2
soy|Light soy sauce|L|Dry goods and sauces|K|8|2|365|1.1
darksoy|Dark soy sauce|L|Dry goods and sauces|K|9|1|365|1.2
belacan|Belacan (shrimp paste)|kg|Dry goods and sauces|K|20|0.5|180|1
dshrimp|Dried shrimp|kg|Dry goods and sauces|K|60|0.5|120|1
cornflour|Corn flour|kg|Dry goods and sauces|K|5|2|365|1
sugar|Sugar|kg|Dry goods and sauces|K|3|3|365|1
tomsauce|Tomato sauce|kg|Dry goods and sauces|K|8|2|240|1
peanut|Peanuts|kg|Dry goods and sauces|K|11|1|120|1
butter|Butter|kg|Drinks and dairy|B|38|1|45|1
evap|Evaporated milk (can)|piece|Drinks and dairy|B|3|6|365|0.39
tea|Chinese tea leaves|kg|Drinks and dairy|B|60|0.5|365|1
barley|Barley|kg|Drinks and dairy|B|9|1|365|1
soya|Soya bean milk|L|Drinks and dairy|B|4|5|3|1.03
coconut|Young coconut|piece|Drinks and dairy|B|4|15|5|1.5
can|Soft drink (can)|piece|Drinks and dairy|B|1.6|30|270|0.33`;
/* items added after the first version. The seed gives them fixed stock so the rest of the demo numbers stay the same. */
const ING_EXTRA=[];
const ING_CATS=['Seafood','Meat and poultry','Vegetables','Eggs, tofu and noodles','Dry goods and sauces','Drinks and dairy'];
/* modifier groups: one = pick one, many = pick any. add / remove change the recipe. */
const MODS={
 temp:{name:'Hot or iced',one:true,opts:[{n:'Hot',p:0},{n:'Iced',p:50}]},
 sweet:{name:'Sugar',one:true,opts:[{n:'Normal sugar',p:0},{n:'Less sugar',p:0},{n:'No sugar',p:0}]},
 spice:{name:'Spice level',one:true,opts:[{n:'Normal',p:0},{n:'Mild',p:0},{n:'Extra spicy',p:0}]},
 addon:{name:'Add-ons',opts:[{n:'Add egg',p:150,add:[['egg',1]]},{n:'Extra prawns',p:600,add:[['prawn',0.06]]}]},
 rice:{name:'Extra rice',opts:[{n:'Add 1 rice',p:200,add:[['rice',0.08]]}]}
};
/* code|name|category|price RM|emoji|modifier groups|recipe (ingredient:qty ...) */
const MENU_RAW=`101|Steamed Tilapia, Hong Kong Style|Seafood|38|🐟|spice|tilapia:.8 ginger:.03 scallion:.02 soy:.03 oil:.02
102|Steamed Siakap with Lime and Chilli|Seafood|58|🐟|spice|seabass:.8 lime:.05 chilli:.02 padi:.01 garlic:.02
103|Sweet and Sour Fish Fillet|Seafood|26|🐟||fillet:.25 pineapple:.25 tomato:.08 onion:.05 capsicum:.04 tomsauce:.05 sugar:.02 cornflour:.03 oil:.05
104|Butter Prawns|Seafood|42|🦐||prawn:.35 butter:.05 curryleaf:.005 egg:1 evap:.25 chilli:.01
105|Kam Heong Lala|Seafood|28|🐚|spice|lala:.6 dshrimp:.02 curryleaf:.005 chilli:.02 garlic:.02 oyster:.02 oil:.02
106|Lala Soup with Ginger|Seafood|22|🍲||lala:.5 ginger:.03 garlic:.01 padi:.005
107|Salted Egg Sotong|Seafood|30|🦑||squid:.35 egg:1 butter:.03 curryleaf:.005 cornflour:.04 oil:.08
108|Chilli Crab|Seafood|88|🦀|spice|crab:1 tomsauce:.1 chilli:.05 egg:1 garlic:.03 sugar:.03 cornflour:.02
109|Steamed Live Grouper|Seafood|120|🐟||grouper:1 ginger:.03 scallion:.03 soy:.04 oil:.03
201|Sweet and Sour Pork|Meat|24|🍖||pork:.25 pineapple:.25 tomato:.06 onion:.05 capsicum:.04 tomsauce:.05 sugar:.02 cornflour:.03 oil:.05
202|Salt and Pepper Pork Ribs|Meat|28|🍖|spice|rib:.35 garlic:.02 chilli:.01 cornflour:.03 oil:.06
203|Kung Pao Chicken|Meat|22|🍗|spice|chicken:.3 chilli:.02 onion:.05 peanut:.03 soy:.02 darksoy:.01 sugar:.01 oil:.03
204|Ginger and Spring Onion Beef|Meat|28|🥩||beef:.25 ginger:.04 scallion:.04 oyster:.02 oil:.03
205|Prawn Paste Chicken Wings|Meat|22|🍗||wing:.5 belacan:.02 cornflour:.05 oil:.1
206|Braised Pork Belly with Egg|Meat|24|🍖||pork:.3 darksoy:.03 soy:.02 garlic:.03 egg:1 sugar:.02
301|Belacan Kangkung|Vegetables and tofu|14|🥬|spice|kangkung:.3 belacan:.02 chilli:.01 garlic:.01 shallot:.01 oil:.02
302|Garlic Kailan|Vegetables and tofu|16|🥦||kailan:.3 garlic:.02 oyster:.02 oil:.02
303|Stir-fried Choy Sum|Vegetables and tofu|14|🥬||choysum:.3 garlic:.02 oil:.02
304|Claypot Egg Tofu|Vegetables and tofu|20|🍲||tofu:2 mushroom:.05 prawn:.05 oyster:.03 cornflour:.02 kailan:.08
305|Long Beans with Dried Shrimp|Vegetables and tofu|16|🫛|spice|longbean:.25 dshrimp:.02 garlic:.01 chilli:.01 oil:.03
306|Sambal Brinjal|Vegetables and tofu|16|🍆|spice|brinjal:.3 belacan:.015 chilli:.02 shallot:.01 oil:.04
307|Bitter Gourd Omelette|Vegetables and tofu|16|🍳||gourd:.2 egg:3 oil:.03
308|Bean Sprouts with Dried Shrimp|Vegetables and tofu|12|🌱||sprout:.3 dshrimp:.01 garlic:.01 oil:.02
401|Steamed Rice|Rice and noodles|2|🍚||rice:.08
402|Egg Fried Rice|Rice and noodles|12|🍚|addon|rice:.15 egg:1 scallion:.01 soy:.01 oil:.02
403|Seafood Fried Rice|Rice and noodles|16|🍤|addon|rice:.15 prawn:.05 squid:.04 egg:1 oil:.02 soy:.01
404|Char Kuey Teow|Rice and noodles|14|🍜|spice,addon|kueyteow:.25 prawn:.05 egg:1 sprout:.05 darksoy:.015 chilli:.01 oil:.03
405|Cantonese Fried Kuey Teow|Rice and noodles|15|🍜|addon|kueyteow:.25 prawn:.04 squid:.04 egg:1 choysum:.05 cornflour:.02 oyster:.02 oil:.03
406|Hokkien Mee|Rice and noodles|15|🍜|addon|yeemee:.25 pork:.05 prawn:.04 darksoy:.03 choysum:.05 oil:.03
407|Fried Mee Hoon|Rice and noodles|13|🍝|spice,addon|meehoon:.1 egg:1 sprout:.05 chilli:.005 soy:.01 oil:.02
408|Fish Ball Noodle Soup|Rice and noodles|12|🍜||meehoon:.08 fishball:.12 choysum:.05 scallion:.01
501|Chinese Tea (pot)|Drinks|3|🍵||tea:.006
502|Iced Lime Juice|Drinks|5|🥤|sweet|lime:.05 sugar:.02
503|Barley Drink|Drinks|4|🥛|temp,sweet|barley:.02 sugar:.015
504|Soya Bean Milk|Drinks|4|🥛|temp|soya:.3
505|Young Coconut|Drinks|8|🥥||coconut:1
506|Soft Drink (can)|Drinks|4|🥤||can:1`;
const MENU_CATS=['Seafood','Meat','Vegetables and tofu','Rice and noodles','Drinks'];
const REASONS=['Expired','Spoiled','Overproduced','Prep error','Returned'];
/* food cost target the demo starts with (percent of sales before tax) */
const FC_TARGET=40;
/* past stock counts for the usage check: item | days ago | counted minus expected | how it was counted */
const COUNT_SEED=[['prawn',9,-1,'hand'],['prawn',5,-1.1,'hand'],['prawn',2,-0.9,'photo'],['lala',9,-1.8,'hand'],['lala',5,-2,'hand'],['lala',2,-1.5,'photo'],
 ['rice',9,2.5,'hand'],['rice',2,3,'hand'],['beef',5,-0.3,'hand'],['beef',2,-0.25,'hand'],['chicken',5,-0.3,'hand'],['chicken',2,-0.2,'photo'],
 ['kailan',5,-0.1,'hand'],['oil',9,-0.3,'hand'],['oil',2,-0.4,'hand'],['tofu',5,-1,'hand'],['egg',5,-4,'hand'],['squid',2,-0.1,'photo']];
const STATES=['Selangor','W.P. Kuala Lumpur','W.P. Putrajaya','Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Terengganu','W.P. Labuan'];
const BUYERS=[
 {label:'Syarikat Contoh Maju Sdn Bhd (demo company)',type:'biz',name:'Syarikat Contoh Maju Sdn Bhd (DEMO)',tin:'C99123456780',idType:'BRN',idNo:'209901999991',sst:'',addr:'12 Jalan Contoh 1/1, Taman Demo',city:'Subang Jaya',post:'47500',state:'Selangor',phone:'0355500111',email:'accounts@contohmaju.example'},
 {label:'Aina Demo (demo individual)',type:'my',name:'Aina Binti Demo (DEMO)',tin:'IG99123456780',idType:'NRIC',idNo:'990101999999',sst:'',addr:'7 Lorong Contoh 2',city:'Petaling Jaya',post:'46000',state:'Selangor',phone:'0125550111',email:'aina@demo.example'},
 {label:'Buyer with a wrong TIN (shows a rejection)',type:'biz',name:'Kedai Ujian Enterprise (DEMO)',tin:'C99000000404',idType:'BRN',idNo:'209901999404',sst:'',addr:'3 Jalan Ujian',city:'Shah Alam',post:'40000',state:'Selangor',phone:'0355500404',email:'kedai@ujian.example'}
];

function parseIng(){return ING_RAW.split('\n').map(l=>{const[id,name,unit,cat,sup,cost,min,shelf,kg]=l.split('|');
  return{id,name,unit,cat,sup,cost:Math.round(cost*100),min:+min,shelf:+shelf,kg:+kg}})}
function parseMenu(){return MENU_RAW.split('\n').map(l=>{const[code,name,cat,price,e,mods,rec]=l.split('|');
  return{id:code,name,cat,price:Math.round(price*100),e,mods:mods?mods.split(','):[],recipe:rec.split(' ').map(x=>{const[i,q]=x.split(':');return[i,+q]})}})}

/* small seeded random so the demo looks the same every time it is reset */
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

function seed(){
  const R=rng(20261025),T=today(),pick=a=>a[Math.floor(R()*a.length)];
  const s={v:2,seeded:T,role:'owner',toured:false,
    settings:{cafe:{name:'Ombak Biru Seafood Restaurant (demo)',legal:'Ombak Biru Enterprise (DEMO)',tin:'C99999999990',brn:'209901999999',sst:'B16-9999-99999999',msic:'56101',activity:'Restaurants (example code, check your own)',
      addr:'G-12, Jalan Demo 7/3',city:'Puchong',post:'47100',state:'Selangor',phone:'0355500100',email:'hello@ombakbiru.example'},
      tax:{scOn:true,scRate:10,scTakeaway:false,sstOn:true,sstRate:6,sstOnSc:true,round5:true},expDays:2,cancelHours:72,fcTarget:FC_TARGET,plan:'allinone'},
    ingredients:parseIng(),menu:parseMenu(),suppliers:SUPPLIERS.map(x=>({...x})),
    batches:[],sales:[],held:[],orders:[],bills:[],waste:[],invoices:[],rescue:[],days:{},use:{},cons:{},sort:{},
    counts:[],specials:{},soldOut:{},setup:{photo:false,pos:false,recipes:{},hide:false},pos:{sys:'',connected:false,map:{},syncs:[]},
    seq:{receipt:10001,order:101,inv:1,batch:1,id:1}};
  S=s;IX=null;
  const I=id=>s.ingredients.find(i=>i.id===id);
  /* stock on hand right now, by batch */
  const LOW={egg:40,oyster:0.8,can:20,ginger:0.6,crab:1.5};
  const SOON={prawn:[1,2.2],tilapia:[1,2.5],kailan:[1,1.4],sprout:[1,1.5],chicken:[2,4],squid:[2,1.8]};
  const GONE={choysum:[1],mushroom:[0.4]};
  const base=s.ingredients.filter(i=>!ING_EXTRA.includes(i.id));
  base.forEach(i=>{
    const mk=(qty,expIn,recvAgo)=>s.batches.push({id:'b'+s.seq.batch++,ing:i.id,qty:r3(qty),recv:addDays(T,-recvAgo),exp:addDays(T,expIn),cost:i.cost});
    if(LOW[i.id]!=null){mk(LOW[i.id],Math.max(2,Math.round(i.shelf*.5)),1);return}
    if(SOON[i.id]){mk(SOON[i.id][1],SOON[i.id][0],Math.max(1,i.shelf-SOON[i.id][0]));mk(i.min*1.3,i.shelf,0);return}
    if(GONE[i.id]){mk(GONE[i.id][0],-1,i.shelf+1)}
    const total=i.min*(1.4+R()*1.2),n=i.shelf>20?1:2;
    for(let k=0;k<n;k++){const age=Math.floor(R()*Math.max(1,Math.min(i.shelf-1,6)));mk(total/n,Math.max(1,i.shelf-age-k),age+k)}
  });
  /* two months of sales, kept as one summary per day (only the last 3 days keep every receipt). Open 11 am to 10 pm. */
  const weights=s.menu.map(m=>(m.cat==='Drinks'?3.4:m.cat==='Rice and noodles'?2.6:m.cat==='Vegetables and tofu'?2:m.cat==='Meat'?1.6:1.4)*(m.price>=60?0.3:1));
  const wsum=weights.reduce((a,b)=>a+b,0);
  const rItem=()=>{let x=R()*wsum;for(let k=0;k<weights.length;k++){x-=weights[k];if(x<=0)return s.menu[k]}return s.menu[0]};
  const NOW=now(),nowMin=NOW.getHours()*60+NOW.getMinutes(),openMin=11*60,closeMin=22*60;
  for(let d=62;d>=0;d--){
    const date=addDays(T,-d),dow=pD(date).getDay(),keep=d<=2;
    let n=Math.round((dow===0||dow===6||dow===5?74:54)*(0.85+R()*0.3));
    let a0=openMin,a1=closeMin;
    if(d===0){a1=Math.max(30,nowMin-2);a0=Math.min(openMin,Math.max(0,a1-90));n=Math.max(6,Math.round(n*Math.min(1,Math.max(0.1,(a1-openMin)/(closeMin-openMin)))))}
    for(let k=0;k<n;k++){
      const lines=[],c=1+Math.floor(R()*3)+(R()<0.35?1:0);
      for(let j=0;j<c;j++){const m=rItem(),q=(m.cat==='Drinks'||m.id==='401')?1+Math.floor(R()*3):1;const ex=lines.find(l=>l.item===m.id);if(ex)ex.qty+=q;else lines.push({item:m.id,name:m.name,qty:q,price:m.price,mods:[],modTotal:0})}
      const type=R()<0.7?'dine':'take',t=billTotals(lines,type,s.settings.tax);
      let cogs=0;const use=s.use[date]||(d<=14?(s.use[date]={}):null);
      lines.forEach(l=>s.menu.find(m=>m.id===l.item).recipe.forEach(([g,q])=>{cogs+=Math.round(q*l.qty*I(g).cost);if(use)use[g]=r3((use[g]||0)+q*l.qty)}));
      const mins=Math.round(a0+(a1-a0)*(k+R()*0.9)/n),hh=Math.min(23,Math.floor(mins/60)),mm=mins%60;
      const sale={id:'s'+s.seq.id++,no:s.seq.receipt++,dt:date+'T'+pad(hh)+':'+pad(mm),type,table:type==='dine'?String(1+Math.floor(R()*18)):'',lines,...t,
        pay:pick(['Cash','Card','DuitNow QR','E-wallet','Card','DuitNow QR']),status:'paid',inv:null,want:false,cogs,used:[],tax:{...s.settings.tax}};
      if(sale.pay==='Cash'){sale.cash=Math.ceil(sale.total/1000)*1000;sale.change=sale.cash-sale.total}
      addDay(sale,1);if(keep)s.sales.push(sale);
    }
  }
  /* waste history */
  const perish=base.filter(i=>i.shelf<=14);
  for(let d=62;d>=1;d--){const date=addDays(T,-d),n=Math.floor(R()*4.2);
    for(let k=0;k<n;k++){const i=R()<0.8?pick(perish):pick(base);const qty=r3(i.unit==='piece'?1+Math.floor(R()*4):0.2+R()*1.1);
      const reason=R()<0.45?'Expired':pick(REASONS);
      s.waste.push({id:'w'+s.seq.id++,dt:date+'T'+pad(10+Math.floor(R()*12))+':'+pad(Math.floor(R()*60)),ing:i.id,qty,reason,cost:Math.round(qty*i.cost),kg:r3(qty*i.kg),auto:reason==='Expired'&&R()<0.5,used:[]})}}
  /* past stock counts: what the app expected and what staff really counted (used by the usage check) */
  COUNT_SEED.forEach(([ing,ago,diff,src])=>{const i=I(ing),app=r3(i.min*1.6+((ago*7)%5)*0.1);s.counts.push({id:'k'+s.seq.id++,dt:addDays(T,-ago)+'T22:'+pad(10+ago),ing,app,counted:r3(app+diff),diff,cost:Math.round(diff*i.cost),src})});
  /* orders and supplier bills */
  const ord=(sup,ago,status,items,recvFrac)=>{const o={id:'o'+s.seq.id++,no:s.seq.order++,sup,date:addDays(T,-ago),expected:addDays(T,-ago+s.suppliers.find(x=>x.id===sup).lead),status,
      lines:items.map(([g,q])=>({ing:g,qty:q,price:I(g).cost,recv:status==='received'?q:status==='part'?Math.floor(q*recvFrac):0}))};s.orders.push(o);return o};
  const bill=(o,paid,einv,dueIn)=>s.bills.push({id:'sb'+s.seq.id++,no:'INV-'+o.sup+'-'+(2000+o.no),sup:o.sup,order:o.id,date:o.expected,due:addDays(T,dueIn),
    amount:o.lines.reduce((a,l)=>a+Math.round(l.recv*l.price),0),paid,einv,uuid:einv==='Valid'?fakeId(R,26):''});
  bill(ord('D',16,'received',[['egg',300],['tofu',40],['kueyteow',15],['yeemee',10]]),true,'Valid',-2);
  bill(ord('B',14,'received',[['tea',2],['can',96],['evap',24]]),true,'Valid',0);
  bill(ord('K',12,'received',[['rice',50],['oil',20],['soy',6],['cornflour',5]]),false,'Valid',-3);
  bill(ord('M',6,'received',[['chicken',20],['pork',10],['rib',8]]),false,'Valid',8);
  bill(ord('P',4,'received',[['kailan',5],['tomato',6],['choysum',6],['sprout',5]]),false,'Not received yet',10);
  ord('F',2,'part',[['tilapia',6],['lala',8],['squid',5]],0.5);
  ord('P',1,'sent',[['kangkung',4],['mushroom',2],['longbean',3],['scallion',1],['chilli',2]]);
  ord('D',9,'cancelled',[['tofu',20]]);
  /* e-invoices already in the list */
  const mkInv=(sale,buyer,status,agoH,extra)=>{const inv=invFromSale(sale,{...buyer});inv.status=status;const t=new Date(now()-agoH*36e5);
    inv.issued=isoDT(t);if(status!=='Draft'){inv.uuid=fakeId(R,26);inv.longId=fakeId(R,40)}if(status==='Valid'||status==='Cancelled')inv.validated=isoDT(t);
    Object.assign(inv,extra||{});s.invoices.push(inv);if(status==='Valid'){sale.inv=inv.id;exDay(sale,1)}return inv};
  const old=s.sales.filter(x=>x.dt.slice(0,10)===addDays(T,-2)),yes=s.sales.filter(x=>x.dt.slice(0,10)===addDays(T,-1)),tod=s.sales.filter(x=>x.dt.slice(0,10)===T);
  mkInv(old[3],BUYERS[0],'Valid',100);
  mkInv(yes[yes.length-4],BUYERS[1],'Valid',20);
  mkInv(yes[5],BUYERS[2],'Invalid',22,{errors:[SIM_ERR]});
  mkInv(old[9],BUYERS[1],'Cancelled',52,{cancelReason:'Wrong buyer details',cancelled:isoDT(new Date(now()-50*36e5))});
  [yes[yes.length-2],tod[0],tod[tod.length-1]].forEach(x=>{if(x)x.want=true});
  return s;
}
