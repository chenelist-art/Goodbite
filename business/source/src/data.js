/* ---------- demo catalogue. Every name, price, weight and number here is made up for the demo. ---------- */
const SUPPLIERS=[
 {id:'D',name:'Lembah Fresh Dairy Sdn Bhd (demo)',tin:'C99000000010',phone:'03-5550 0101',email:'orders@lembahdairy.example',lead:1},
 {id:'P',name:'Pasar Pagi Produce (demo)',tin:'C99000000020',phone:'03-5550 0102',email:'orders@pasarpagi.example',lead:1},
 {id:'B',name:'Roti Rumah Bakery Supply (demo)',tin:'C99000000030',phone:'03-5550 0103',email:'hello@rotirumah.example',lead:2},
 {id:'C',name:'Biji Hitam Coffee Roasters (demo)',tin:'C99000000040',phone:'03-5550 0104',email:'beans@bijihitam.example',lead:3},
 {id:'K',name:'Kedai Kering Dry Goods (demo)',tin:'C99000000050',phone:'03-5550 0105',email:'sales@kedaikering.example',lead:2},
 {id:'M',name:'Ayam & Laut Fresh Proteins (demo)',tin:'C99000000060',phone:'03-5550 0106',email:'order@ayamlaut.example',lead:1}
];
/* id|name|unit|category|supplier|cost RM per unit|minimum stock|shelf life days|kg per unit */
const ING_RAW=`milk|Fresh milk|L|Dairy|D|7.5|12|7|1.03
oat|Oat milk|L|Dairy|D|11|4|60|1.03
cream|Whipping cream|L|Dairy|D|16|2|10|1
butter|Butter|kg|Dairy|D|38|2|45|1
cheese|Cheddar slices|kg|Dairy|D|42|1.5|30|1
mozz|Mozzarella|kg|Dairy|D|36|1.5|21|1
yog|Yogurt|kg|Dairy|D|12|2|14|1
egg|Eggs|piece|Dairy|D|0.55|60|21|0.06
ccheese|Cream cheese|kg|Dairy|D|34|1|30|1
lettuce|Lettuce|kg|Produce|P|9|2|5|1
tomato|Tomato|kg|Produce|P|6|3|7|1
cucumber|Cucumber|kg|Produce|P|4|2|7|1
onion|Onion|kg|Produce|P|4.5|3|30|1
garlic|Garlic|kg|Produce|P|9|1|45|1
chilli|Chilli|kg|Produce|P|14|0.5|10|1
lemon|Lemon|piece|Produce|P|1.2|15|14|0.1
lime|Limau kasturi|kg|Produce|P|8|1|10|1
banana|Banana|kg|Produce|P|5.5|3|5|1
avocado|Avocado|piece|Produce|P|5.5|10|5|0.2
mushroom|Mushrooms|kg|Produce|P|18|1.5|6|1
spinach|Spinach|kg|Produce|P|12|1|4|1
potato|Potato|kg|Produce|P|3.8|5|30|1
berries|Mixed berries (frozen)|kg|Produce|P|32|2|180|1
mango|Mango|kg|Produce|P|9|2|6|1
sourdough|Sourdough loaf|loaf|Bakery|B|9|6|3|0.6
croissant|Croissant (frozen dough)|piece|Bakery|B|2.2|30|60|0.08
bun|Burger bun|piece|Bakery|B|1.1|20|4|0.07
bagel|Bagel|piece|Bakery|B|2|12|4|0.1
wrap|Tortilla wrap|piece|Bakery|B|0.9|20|14|0.06
flour|Flour|kg|Bakery|B|3.2|8|180|1
sugar|Sugar|kg|Bakery|B|3|5|365|1
cocoa|Cocoa powder|kg|Bakery|B|38|1|365|1
choc|Dark chocolate|kg|Bakery|B|45|1.5|300|1
almond|Almond flakes|kg|Bakery|B|48|0.5|180|1
beans|Coffee beans|kg|Coffee and drinks|C|78|4|45|1
matcha|Matcha powder|kg|Coffee and drinks|C|220|0.3|180|1
tea|Tea leaves|kg|Coffee and drinks|C|60|0.5|365|1
syrup|Vanilla syrup|L|Coffee and drinks|C|28|1|365|1.2
caramel|Caramel sauce|L|Coffee and drinks|C|26|1|365|1.3
honey|Honey|kg|Coffee and drinks|C|30|1|365|1
gula|Gula melaka|kg|Coffee and drinks|C|14|1|180|1
soda|Soda water|L|Coffee and drinks|C|2.5|10|180|1
oj|Orange juice|L|Coffee and drinks|C|9|4|10|1.04
rice|Rice|kg|Dry goods|K|4.2|10|365|1
pasta|Pasta|kg|Dry goods|K|7.5|4|365|1
santan|Coconut milk|L|Dry goods|K|8|3|180|1
oil|Cooking oil|L|Dry goods|K|7|5|365|0.92
olive|Olive oil|L|Dry goods|K|38|1|365|0.92
sambal|Sambal paste|kg|Dry goods|K|16|2|60|1
bilis|Ikan bilis|kg|Dry goods|K|38|1|120|1
peanut|Peanuts|kg|Dry goods|K|11|1|120|1
tomsauce|Tomato pasta sauce|kg|Dry goods|K|10|3|240|1
mayo|Mayonnaise|kg|Dry goods|K|13|1.5|120|1
chicken|Chicken breast|kg|Meat and seafood|M|17|5|3|1
beef|Beef patty|piece|Meat and seafood|M|5.5|20|4|0.15
salmon|Smoked salmon|kg|Meat and seafood|M|95|1|10|1
tuna|Tuna (canned)|kg|Meat and seafood|M|28|1.5|365|1
prawn|Prawns|kg|Meat and seafood|M|42|1.5|2|1
turkeyham|Turkey ham|kg|Meat and seafood|M|32|1|10|1
sausage|Chicken sausage|piece|Meat and seafood|M|1.6|20|14|0.06`;
const ING_CATS=['Dairy','Produce','Bakery','Coffee and drinks','Dry goods','Meat and seafood'];
/* modifier groups: one = pick one, many = pick any. add / remove change the recipe. */
const MODS={
 temp:{name:'Hot or iced',one:true,opts:[{n:'Hot',p:0},{n:'Iced',p:100}]},
 milk:{name:'Milk',one:true,opts:[{n:'Fresh milk',p:0},{n:'Oat milk',p:200,add:[['oat',0.2]],remove:['milk']}]},
 shot:{name:'Extras',opts:[{n:'Extra coffee shot',p:300,add:[['beans',0.018]]},{n:'Vanilla syrup',p:150,add:[['syrup',0.02]]}]},
 sweet:{name:'Sugar',one:true,opts:[{n:'Normal sugar',p:0},{n:'Less sugar',p:0},{n:'No sugar',p:0}]},
 addon:{name:'Add-ons',opts:[{n:'Add egg',p:250,add:[['egg',1]]},{n:'Add cheese',p:200,add:[['cheese',0.02]]},{n:'Extra chicken',p:500,add:[['chicken',0.08]]}]},
 spice:{name:'Spice level',one:true,opts:[{n:'Normal',p:0},{n:'Mild',p:0},{n:'Extra spicy',p:0}]}
};
/* code|name|category|price RM|emoji|modifier groups|recipe (ingredient:qty ...) */
const MENU_RAW=`101|Espresso|Coffee|8|☕|shot|beans:.018
102|Americano|Coffee|9|☕|temp,shot|beans:.018
103|Latte|Coffee|12|☕|temp,milk,shot|beans:.018 milk:.2
104|Cappuccino|Coffee|12|☕|milk,shot|beans:.018 milk:.18
105|Flat White|Coffee|12|☕|milk,shot|beans:.018 milk:.16
106|Mocha|Coffee|14|☕|temp,milk,shot|beans:.018 milk:.18 cocoa:.015
107|Caramel Latte|Coffee|14|☕|temp,milk,shot|beans:.018 milk:.2 caramel:.02
108|Gula Melaka Latte|Coffee|14|☕|temp,milk,shot|beans:.018 milk:.2 gula:.025
109|Iced Long Black|Coffee|10|🧊|shot|beans:.018
201|Matcha Latte|Drinks|14|🍵|temp,milk|matcha:.004 milk:.22
202|Hot Chocolate|Drinks|12|🍫|milk|cocoa:.025 milk:.22 choc:.01
203|Teh Tarik Special|Drinks|7|🫖|temp,sweet|tea:.006 milk:.1 sugar:.01
204|Lemon Honey Soda|Drinks|10|🍋|sweet|lemon:.5 honey:.02 soda:.2
205|Limau Kasturi Cooler|Drinks|9|🥤|sweet|lime:.05 sugar:.02 soda:.2
206|Mango Smoothie|Drinks|14|🥭||mango:.2 yog:.1 honey:.01
207|Berry Smoothie|Drinks|15|🫐||berries:.15 banana:.1 yog:.1
208|Orange Juice|Drinks|11|🍊||oj:.3
301|Big Breakfast|Breakfast|26|🍳|addon|egg:2 sausage:2 sourdough:.15 mushroom:.06 tomato:.08 butter:.01
302|Avocado Toast|Breakfast|19|🥑|addon|avocado:1 sourdough:.12 egg:1 lemon:.25
303|Smoked Salmon Bagel|Breakfast|24|🥯||bagel:1 salmon:.05 ccheese:.03 cucumber:.03
304|Scrambled Eggs on Toast|Breakfast|14|🍞|addon|egg:3 sourdough:.12 butter:.015 cream:.02
305|Banana Pancakes|Breakfast|17|🥞||flour:.1 egg:1 milk:.12 banana:.12 honey:.02 butter:.01
306|Berry Yogurt Bowl|Breakfast|15|🥣||yog:.18 berries:.08 honey:.015 almond:.01
307|Nasi Lemak Ayam|Breakfast|16|🍛|spice,addon|rice:.12 santan:.05 sambal:.04 bilis:.015 peanut:.015 egg:1 cucumber:.04 chicken:.12
401|Chicken Burger|Mains|22|🍔|addon|bun:1 chicken:.14 lettuce:.03 tomato:.04 cheese:.02 mayo:.015 potato:.15
402|Beef Burger|Mains|26|🍔|addon|bun:1 beef:1 lettuce:.03 tomato:.04 cheese:.02 onion:.02 potato:.15
403|Chicken Caesar Wrap|Mains|19|🌯||wrap:1 chicken:.1 lettuce:.05 mayo:.02 cheese:.015
404|Tuna Melt Sandwich|Mains|18|🥪||sourdough:.14 tuna:.08 mozz:.04 mayo:.02 onion:.015
405|Mushroom Aglio Olio|Mains|20|🍝|spice,addon|pasta:.11 mushroom:.08 garlic:.01 olive:.02 chilli:.005
406|Prawn Aglio Olio|Mains|26|🍝|spice|pasta:.11 prawn:.1 garlic:.01 olive:.02 chilli:.005
407|Tomato Chicken Pasta|Mains|22|🍝|addon|pasta:.11 chicken:.1 tomsauce:.12 onion:.03 garlic:.005
408|Nasi Goreng Kampung|Mains|16|🍚|spice,addon|rice:.15 egg:1 bilis:.02 chilli:.008 onion:.03 oil:.02 spinach:.04
409|Garden Salad|Mains|15|🥗|addon|lettuce:.08 tomato:.06 cucumber:.05 avocado:.5 olive:.015 lemon:.25
410|Turkey Ham Cheese Croissant|Mains|16|🥐||croissant:1 turkeyham:.04 cheese:.02
411|Fries|Mains|9|🍟||potato:.2 oil:.03
501|Butter Croissant|Bakery|8|🥐||croissant:1 butter:.005
502|Almond Croissant|Bakery|11|🥐||croissant:1 almond:.02 sugar:.01 butter:.01
503|Chocolate Brownie|Bakery|10|🍫||choc:.04 butter:.03 sugar:.03 egg:.5 flour:.02 cocoa:.005
504|Banana Bread Slice|Bakery|8|🍌||banana:.08 flour:.04 sugar:.02 egg:.3 butter:.015
505|Burnt Cheesecake Slice|Bakery|15|🍰||ccheese:.07 cream:.03 egg:.5 sugar:.02
506|Berry Muffin|Bakery|8|🧁||flour:.05 berries:.03 sugar:.02 egg:.3 butter:.02 milk:.03
507|Gula Melaka Cake Slice|Bakery|12|🍰||flour:.04 gula:.03 santan:.03 egg:.4 butter:.02
508|Bagel with Cream Cheese|Bakery|10|🥯||bagel:1 ccheese:.03
509|Garlic Toast|Bakery|7|🍞||sourdough:.1 garlic:.005 butter:.015`;
const MENU_CATS=['Coffee','Drinks','Breakfast','Mains','Bakery'];
const REASONS=['Expired','Spoiled','Overproduced','Prep error','Returned'];
const PARTNERS=['Kind Kitchen KL (demo partner)','Second Serve PJ (demo partner)','Campus Pantry Subang (demo partner)'];
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
  const R=rng(20261007),T=today(),pick=a=>a[Math.floor(R()*a.length)];
  const s={v:1,seeded:T,role:'owner',toured:false,
    settings:{cafe:{name:'Teduh Daun Cafe (demo)',legal:'Teduh Daun Enterprise (DEMO)',tin:'C99999999990',brn:'209901999999',sst:'B16-9999-99999999',msic:'56101',activity:'Restaurants (example code, check your own)',
      addr:'G-01, Jalan Demo 15/4',city:'Subang Jaya',post:'47500',state:'Selangor',phone:'0355500100',email:'hello@teduhdaun.example'},
      tax:{scOn:true,scRate:10,scTakeaway:false,sstOn:true,sstRate:6,sstOnSc:true,round5:true},expDays:2,cancelHours:72},
    ingredients:parseIng(),menu:parseMenu(),suppliers:SUPPLIERS.map(x=>({...x})),
    batches:[],sales:[],held:[],orders:[],bills:[],waste:[],invoices:[],rescue:[],days:{},use:{},cons:{},
    seq:{receipt:10001,order:101,inv:1,batch:1,id:1}};
  S=s;IX=null;
  const I=id=>s.ingredients.find(i=>i.id===id);
  /* stock on hand right now, by batch */
  const LOW={milk:5,croissant:14,avocado:6,beans:2.5};
  const SOON={sourdough:[1,5],chicken:[1,3.5],prawn:[2,1.2],spinach:[2,0.8],lettuce:[1,1.6]};
  const GONE={banana:[1.5],mushroom:[0.6]};
  s.ingredients.forEach(i=>{
    const mk=(qty,expIn,recvAgo)=>s.batches.push({id:'b'+s.seq.batch++,ing:i.id,qty:r3(qty),recv:addDays(T,-recvAgo),exp:addDays(T,expIn),cost:i.cost});
    if(LOW[i.id]!=null){mk(LOW[i.id],Math.max(3,Math.round(i.shelf*.5)),2);return}
    if(SOON[i.id]){mk(SOON[i.id][1],SOON[i.id][0],Math.max(1,i.shelf-SOON[i.id][0]));mk(i.min*1.3,i.shelf,0);return}
    if(GONE[i.id]){mk(GONE[i.id][0],-1,i.shelf+1)}
    const total=i.min*(1.4+R()*1.2),n=i.shelf>20?1:2;
    for(let k=0;k<n;k++){const age=Math.floor(R()*Math.min(i.shelf-3,6));mk(total/n,Math.max(3,i.shelf-age-k*2),age+k*2)}
  });
  /* two months of sales, kept as one summary per day (only the last 3 days keep every receipt) */
  const weights=s.menu.map(m=>m.cat==='Coffee'?5:m.cat==='Drinks'?2.5:m.cat==='Bakery'?2.2:1.6);
  const wsum=weights.reduce((a,b)=>a+b,0);
  const rItem=()=>{let x=R()*wsum;for(let k=0;k<weights.length;k++){x-=weights[k];if(x<=0)return s.menu[k]}return s.menu[0]};
  for(let d=62;d>=0;d--){
    const date=addDays(T,-d),dow=pD(date).getDay(),keep=d<=2;
    let n=Math.round((dow===0||dow===6?92:68)*(0.85+R()*0.3));
    if(d===0)n=Math.max(6,Math.round(n*Math.min(1,Math.max(0.08,(now().getHours()-8)/12))));
    for(let k=0;k<n;k++){
      const lines=[],c=1+Math.floor(R()*R()*4);
      for(let j=0;j<c;j++){const m=rItem();const ex=lines.find(l=>l.item===m.id);if(ex)ex.qty++;else lines.push({item:m.id,name:m.name,qty:1,price:m.price,mods:[],modTotal:0})}
      const type=R()<0.55?'dine':'take',t=billTotals(lines,type,s.settings.tax);
      let cogs=0;const use=s.use[date]||(d<=14?(s.use[date]={}):null);
      lines.forEach(l=>s.menu.find(m=>m.id===l.item).recipe.forEach(([g,q])=>{cogs+=Math.round(q*l.qty*I(g).cost);if(use)use[g]=r3((use[g]||0)+q*l.qty)}));
      const span=d===0?Math.max(1,Math.min(12,now().getHours()-8)):12,hh=8+Math.floor(k/n*span),mm=d===0&&hh>=now().getHours()?Math.floor(R()*Math.max(1,now().getMinutes())):Math.floor(R()*60);
      const sale={id:'s'+s.seq.id++,no:s.seq.receipt++,dt:date+'T'+pad(hh)+':'+pad(mm),type,table:type==='dine'?String(1+Math.floor(R()*14)):'',lines,...t,
        pay:pick(['Cash','Card','DuitNow QR','E-wallet','Card','DuitNow QR']),status:'paid',inv:null,want:false,cogs,used:[],tax:{...s.settings.tax}};
      if(sale.pay==='Cash'){sale.cash=Math.ceil(sale.total/1000)*1000;sale.change=sale.cash-sale.total}
      addDay(sale,1);if(keep)s.sales.push(sale);
    }
  }
  /* waste history */
  const perish=s.ingredients.filter(i=>i.shelf<=14);
  for(let d=62;d>=1;d--){const date=addDays(T,-d),n=Math.floor(R()*4.2);
    for(let k=0;k<n;k++){const i=R()<0.8?pick(perish):pick(s.ingredients);const qty=r3(i.unit==='piece'||i.unit==='loaf'?1+Math.floor(R()*4):0.2+R()*1.1);
      const reason=R()<0.45?'Expired':pick(REASONS);
      s.waste.push({id:'w'+s.seq.id++,dt:date+'T'+pad(9+Math.floor(R()*10))+':'+pad(Math.floor(R()*60)),ing:i.id,qty,reason,cost:Math.round(qty*i.cost),kg:r3(qty*i.kg),auto:reason==='Expired'&&R()<0.5,used:[]})}}
  /* orders and supplier bills */
  const ord=(sup,ago,status,items,recvFrac)=>{const o={id:'o'+s.seq.id++,no:s.seq.order++,sup,date:addDays(T,-ago),expected:addDays(T,-ago+s.suppliers.find(x=>x.id===sup).lead),status,
      lines:items.map(([g,q])=>({ing:g,qty:q,price:I(g).cost,recv:status==='received'?q:status==='part'?Math.floor(q*recvFrac):0}))};s.orders.push(o);return o};
  const bill=(o,paid,einv,dueIn)=>s.bills.push({id:'sb'+s.seq.id++,no:'INV-'+o.sup+'-'+(2000+o.no),sup:o.sup,order:o.id,date:o.expected,due:addDays(T,dueIn),
    amount:o.lines.reduce((a,l)=>a+Math.round(l.recv*l.price),0),paid,einv,uuid:einv==='Valid'?fakeId(R,26):''});
  bill(ord('D',16,'received',[['milk',30],['butter',3],['egg',120],['yog',4]]),true,'Valid',-2);
  bill(ord('C',14,'received',[['beans',8],['matcha',0.5],['soda',24]]),true,'Valid',0);
  bill(ord('K',12,'received',[['rice',25],['pasta',8],['oil',10],['tomsauce',6]]),false,'Valid',-3);
  bill(ord('M',6,'received',[['chicken',12],['beef',40],['salmon',2]]),false,'Valid',8);
  bill(ord('P',4,'received',[['lettuce',5],['tomato',8],['banana',6],['avocado',24]]),false,'Not received yet',10);
  ord('B',2,'part',[['sourdough',12],['bun',40],['bagel',24]],0.5);
  ord('P',1,'sent',[['spinach',2],['mushroom',3],['mango',4],['lemon',30],['lettuce',4]]);
  ord('D',9,'cancelled',[['cream',4]]);
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
