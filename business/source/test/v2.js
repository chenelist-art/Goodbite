// Tests for version 2 (25 Oct 2026): restaurant demo, shelf photo count, usage check, dishes to push, may run out,
// food cost target and weekly summary, set-up steps, POS link with plan switch, Food Rescue removed, 16-step demo tour.
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:800}});const errs=[];
 pg.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push(m.text())});pg.on('pageerror',e=>errs.push('PAGEERR '+e.message));
 await pg.route(/fonts\.g/,r=>r.abort());await pg.goto('file://'+path.resolve('dist/index.html')+'#notour');await pg.waitForTimeout(300);pg.setDefaultTimeout(5000);
 const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};const ev=(f,a)=>pg.evaluate(f,a);const near=(a,b,t)=>Math.abs(a-b)<(t||0.0011);
 const txt=async()=>pg.locator('#scr').innerText();

 // --- the demo outlet
 await ev(()=>GB.reset('owner'));await pg.waitForTimeout(40);
 const cafe=await ev(()=>({n:GB.state().settings.cafe.name,m:GB.state().menu.length,i:GB.state().ingredients.length,cats:[...new Set(GB.state().menu.map(m=>m.cat))].join(',')}));
 ok(/Seafood Restaurant/.test(cafe.n)&&cafe.m===37&&cafe.i===58,'Demo outlet is a Chinese seafood restaurant: '+cafe.n+', '+cafe.m+' dishes, '+cafe.i+' ingredients ('+cafe.cats+')');
 ok(await ev(()=>localStorage.getItem('goodbite_b2b_v2')!==null),'Saved under a new key, so old cafe data in a browser is replaced by the restaurant');

 // --- Home: set-up steps and weekly food cost
 ok(/Get set up in 3 steps/.test(await txt())&&/0 of 3 done/.test(await txt()),'Owner Home starts with "Get set up in 3 steps" (0 of 3 done)');
 const wk=await ev(()=>GB.fn.weekStats(0));
 ok((await pg.locator('#fckpi').innerText()).includes(wk.fc.toFixed(1)+'%')&&/Target 40%/.test(await pg.locator('#fckpi').innerText()),'Home shows food cost this week ('+wk.fc.toFixed(1)+'%) against the 40% target');
 ok(/may run out today/.test(await txt())&&/Dishes to push today/.test(await txt()),'To do has "may run out today" and "Dishes to push today" cards');
 await pg.locator('#setupcard [data-a=helpChat]').first().click();ok(/Simulated/.test(await pg.locator('#modal').innerText()),'"Chat on WhatsApp" explains it is simulated');await pg.locator('#modal .xb').click();

 // --- 1. count by photo
 await pg.locator('#setupcard .alert').nth(0).click();
 ok((await ev(()=>GB.info().screen))==='shelfScan'&&await pg.locator('#shelves .biga').count()===6,'Step 1 opens "Count by photo" with 6 shelves');
 await pg.locator('#shelves .biga',{hasText:'Seafood chiller'}).click();await pg.locator('#shelfshoot').click();await pg.waitForTimeout(40);
 const ph=await ev(()=>({s:GB.info().screen,p:GB.info().p,prawn:GB.fn.onHand('prawn'),lala:GB.fn.onHand('lala')}));
 ok(ph.s==='count'&&ph.p.cat==='Seafood'&&ph.p.photo.ids.length===9&&await pg.locator('#photonote').count()===1,'The photo fills in the count for the 9 seafood items and the page says to check them');
 ok(await pg.locator('.pill',{hasText:'From photo'}).count()===9,'Each amount read from the photo is marked "From photo"');
 ok(parseFloat(ph.p.vals.prawn)<ph.prawn&&parseFloat(ph.p.vals.lala)<ph.lala,'The photo finds less prawns ('+ph.p.vals.prawn+' vs '+ph.prawn+' kg) and lala ('+ph.p.vals.lala+' vs '+ph.lala+' kg) than the app expected');
 const k0=await ev(()=>GB.state().counts.length);await pg.locator('#savecount').click();await pg.waitForTimeout(40);
 const k1=await ev(()=>{const s=GB.state();return {n:s.counts.length,last:s.counts.slice(-9),prawn:GB.fn.onHand('prawn'),photo:s.setup.photo,scr:GB.info().screen}});
 ok(k1.n===k0+9&&k1.last.every(c=>c.src==='photo'),'Saving keeps 9 count records, each marked as a photo count');
 ok(near(k1.prawn,parseFloat(ph.p.vals.prawn))&&k1.photo&&k1.scr==='countDone','Stock now matches the count, and set-up step 1 is done');
 ok(/App expected/i.test(await txt()),'The saved screen shows what the app expected next to what was counted');

 // --- usage check
 await pg.getByRole('button',{name:'See the usage check'}).click();
 const uc=await ev(()=>GB.fn.usageCheck(14).map(o=>o.ing+':'+o.st));
 ok(uc.includes('prawn:less')&&uc.includes('lala:less')&&uc.includes('rice:more'),'Usage check: prawns and lala less than the recipes say, rice more ('+uc.filter(x=>!/:ok/.test(x)).join(', ')+')');
 ok(/Portions may be bigger than the recipe/.test(await txt())&&/The recipe may list more than cooks really use/.test(await txt()),'Each flag says in plain words what it may mean');
 const okRow=await ev(()=>GB.fn.usageCheck(14).find(o=>o.ing==='tofu'));
 ok(okRow&&okRow.st==='ok'&&Math.abs(okRow.share)<0.1,'Small differences (tofu '+(okRow.share*100).toFixed(1)+'%) count as the normal range');
 await pg.locator('.chip',{hasText:'7 days'}).click();ok(await ev(()=>GB.info().p.days)===7,'The period can be changed to 7 days');

 // --- dishes to push and may run out
 await ev(()=>{GB.root('home');GB.go('push')});await pg.waitForTimeout(40);
 const pl=await ev(()=>GB.fn.pushList().map(x=>x.m.id+':'+x.m.name));
 ok(pl.length>=2&&pl.some(x=>/Lala/.test(x)),'Dishes to push: '+pl.map(x=>x.split(':')[1]).join(', '));
 const sh=await ev(()=>GB.fn.shortList().map(x=>x.i.id));
 ok(sh.includes('egg')&&sh.includes('crab'),'May run out today: '+sh.join(', '));
 const sp=pl[0].split(':')[0];await pg.locator('#pushlist button',{hasText:"Add to today's specials"}).first().click();
 ok(await ev(id=>GB.state().specials[Object.keys(GB.state().specials)[0]].includes(id),sp),'"Add to today\'s specials" saves the dish as a special');
 const so=await ev(()=>GB.fn.shortList().find(x=>x.i.id==='crab').dishes[0].id);
 await pg.locator('#shortlist .chip').filter({hasText:'Chilli Crab'}).first().click();
 ok(await ev(id=>!!GB.state().soldOut[id],so),'Tapping Chilli Crab marks it sold out for today');
 await ev(()=>{GB.state().role='cashier';GB.root('pos')});await pg.waitForTimeout(40);
 ok(await pg.locator('.mi.sp').count()===1&&/Today's special/.test(await pg.locator('.mi.sp').innerText()),'The till shows the special with a star');
 const n0=await ev(()=>GB.state().bill?GB.state().bill.lines.length:0);await pg.locator('.mi.so').click();await pg.waitForTimeout(40);
 ok(await pg.locator('.mi.so').count()===1&&/sold out today/.test(await pg.locator('#toast').innerText())&&await ev(()=>GB.state().bill?GB.state().bill.lines.length:0)===n0,'The sold-out dish is greyed out on the till and cannot be added');
 ok(/Today's specials/.test(await ev(()=>{GB.root('home');return document.getElementById('scr').innerText})),'Cashier Home lists today\'s specials');

 // --- weekly summary and target
 await ev(()=>{GB.state().role='owner';GB.root('reports')});await pg.waitForTimeout(40);
 ok(!/Rescued/.test(await txt()),'Reports no longer show "Rescued instead of binned"');
 await pg.locator('#weekbtn').click();
 ok((await pg.locator('#weekkpi').innerText()).includes(wk.fc.toFixed(1)+'%')&&/Above target|On target/.test(await pg.locator('#weekkpi').innerText()),'Weekly summary shows this week\'s food cost against the target');
 await pg.locator('#weekshare').click();const wt=await pg.locator('#exp-text').inputValue();
 ok(/Weekly summary/.test(wt)&&/Food cost this week/.test(wt)&&/Check these/.test(wt),'"Copy to share" gives a short text for the team chat');await pg.locator('#modal .xb').click();
 await pg.getByRole('button',{name:'Change target'}).click();await pg.locator('#fctarget .chip',{hasText:'35%'}).click();
 ok(await ev(()=>GB.state().settings.fcTarget)===35,'The food cost target can be changed in Alerts and targets');
 await ev(()=>GB.root('home'));await pg.waitForTimeout(40);ok(/Target 35%/.test(await pg.locator('#fckpi').innerText()),'Home uses the new target');

 // --- Food Rescue is gone
 await ev(()=>GB.root('waste'));await pg.waitForTimeout(40);
 ok(!/Food Rescue/.test(await txt())&&await pg.locator('.tab').count()===0,'The waste page has no Food Rescue tab');
 await ev(()=>GB.root('stock',{tab:'soon'}));await pg.waitForTimeout(40);ok(!/rescue/i.test(await txt()),'"Expiring soon" offers "Dishes to push" instead of food rescue');

 // --- 2. POS link
 await ev(()=>GB.root('home'));await pg.waitForTimeout(40);await pg.locator('#setupcard .alert').nth(1).click();
 ok((await ev(()=>GB.info().screen))==='posLink'&&await pg.locator('#posnext').isDisabled(),'Step 2 opens "Plan and POS link"; Next is locked until a POS is picked');
 await pg.locator('.opt',{hasText:'Feed Me'}).click();await pg.locator('#posnext').click();
 ok(await pg.locator('#scr input[type=password]').count()===0&&/no password/.test(await txt()),'Allow access asks for no password');
 await pg.locator('#posallow').click();
 ok(await pg.locator('#posfinish').isDisabled()&&await pg.locator('#posmap button',{hasText:'Match is right'}).count()===5,'Matching: 5 names the app was not sure about must be checked before connecting');
 for(let i=0;i<4;i++){await pg.locator('#posmap button',{hasText:'Match is right'}).first().click()}
 await pg.selectOption('#pm-p15','502');await pg.waitForTimeout(300);
 ok(!(await pg.locator('#posfinish').isDisabled()),'Picking a dish by hand also counts as checked');
 await pg.locator('#posfinish').click();await pg.waitForTimeout(40);
 const pc=await ev(()=>({c:GB.state().pos.connected,plan:GB.state().settings.plan,nav:[...document.querySelectorAll('#side .nav')].map(e=>e.dataset.nav).filter(Boolean).join(','),setup:GB.state().setup.pos}));
 ok(pc.c&&pc.plan==='stock'&&pc.setup,'Connected (simulated): the plan is now GoodBite Stock and set-up step 2 is done');
 ok(!/sell|invoices/.test(pc.nav),'With GoodBite Stock the till and e-invoices are hidden from the menu ('+pc.nav+')');
 await pg.locator('#rolebtn').click();ok(await pg.locator('#modal .opt').count()===2&&await pg.locator('#modal .opt',{hasText:'Cashier'}).count()===0,'The Cashier view is hidden, because sales come from the POS');await pg.locator('#modal .xb').click();
 const s0=await ev(()=>({lala:GB.fn.onHand('lala'),rice:GB.fn.onHand('rice'),w:GB.fn.weekStats(0)}));
 await pg.locator('#possync').click();await pg.waitForTimeout(40);
 const y=await ev(()=>{const s=GB.state(),y=s.pos.syncs[s.pos.syncs.length-1];const want={};y.lines.forEach(l=>s.menu.find(m=>m.id===l.dish).recipe.forEach(([g,q])=>want[g]=(want[g]||0)+q*l.qty));return {y,want,lala:GB.fn.onHand('lala'),rice:GB.fn.onHand('rice'),w:GB.fn.weekStats(0),scr:GB.info().screen}});
 ok(y.scr==='posSyncDone'&&y.y.lines.length>=10&&y.y.skipped.some(l=>l.pos==='TAKEAWAY BOX'),'Sync brings in '+y.y.lines.reduce((a,l)=>a+l.qty,0)+' dishes; the takeaway box is not tracked');
 ok(near(s0.lala-y.lala,Math.min(s0.lala,y.want.lala||0),0.002)&&near(s0.rice-y.rice,y.want.rice,0.002),'Each matched dish takes its recipe off the stock (rice -'+y.want.rice.toFixed(2)+' kg)');
 ok(near(y.w.net-s0.w.net,y.y.net,1)&&near(y.w.cogs-s0.w.cogs,y.y.cogs,1),'Synced sales count in this week\'s food cost');
 await pg.locator('#toast button').click();await pg.waitForTimeout(40);
 ok(near(await ev(()=>GB.fn.onHand('rice')),s0.rice,0.002)&&await ev(()=>GB.state().pos.syncs.length)===0,'Undo takes the synced sales back out');
 await ev(()=>GB.root('home'));await pg.waitForTimeout(40);ok(await pg.locator('#bigacts .biga',{hasText:'Sync POS sales'}).count()===1,'Home has a "Sync POS sales" button instead of "New sale"');
 await ev(()=>{GB.root('settings');GB.go('posLink')});await pg.waitForTimeout(40);await pg.getByRole('button',{name:'Disconnect and use the GoodBite till'}).click();await pg.getByRole('button',{name:'Yes, disconnect'}).click();await pg.waitForTimeout(40);
 ok(await ev(()=>GB.state().settings.plan==='allinone'&&!!document.querySelector('#side [data-nav=sell]')),'Disconnecting brings the GoodBite till back');

 // --- 3. top 5 recipes
 await ev(()=>{GB.root('home');GB.go('setupRecipes')});await pg.waitForTimeout(40);
 for(let i=0;i<5;i++){await pg.locator('#scr button',{hasText:'Looks right'}).first().click()}
 await ev(()=>GB.root('home'));await pg.waitForTimeout(40);ok(/3 of 3 done/.test(await txt()),'After the 5 recipes are checked, set-up shows 3 of 3 done');
 await pg.getByRole('button',{name:'Hide this'}).click();ok(await pg.locator('#setupcard').count()===0,'"Hide this" removes the set-up steps from Home');

 // --- demo tour
 await ev(()=>GB.reset('owner'));await pg.waitForTimeout(40);await pg.locator('#demobtn').click();await pg.waitForTimeout(60);const miss=[];
 for(let i=0;i<16;i++){const st=await ev(()=>({n:document.querySelector('#demo .dn').textContent,hl:document.querySelectorAll('.hl').length,t:document.querySelector('#demo b').textContent}));if(!st.hl&&i<15)miss.push(st.t);if(i<15){await pg.locator('#demonext').click();await pg.waitForTimeout(60)}}
 ok(/16 of 16/i.test(await pg.locator('#demo .dn').innerText())&&!miss.length,'Demo tour has 16 steps and each one highlights something on screen'+(miss.length?' (missing: '+miss.join('; ')+')':''));
 await pg.locator('#demonext').click();
 // language
 await ev(()=>{GB.state().settings.lang='zh';GB.root('stock');GB.go('usage')});await pg.waitForTimeout(80);
 ok(!/Usage check|Less than the recipes say/.test(await txt()),'The usage check is translated into Chinese');
 await ev(()=>{GB.state().settings.lang='ms';GB.root('home');GB.go('push')});await pg.waitForTimeout(80);
 ok(!/Push these today|May run out today/.test(await txt()),'Dishes to push is translated into Malay');
 await ev(()=>{GB.state().settings.lang='en'});
 ok(errs.length===0,'No console errors '+errs.join(' | '));
 await b.close()})().catch(e=>{console.log('CRASH',e.message.split('\n').slice(0,6).join(' '));process.exit(1)});
