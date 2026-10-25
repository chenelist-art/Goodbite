// Tests for the 19 Oct features: Scan (3 ways), date sort on list screens, expiring-soon report.
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:800}});const errs=[];
 pg.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push(m.text())});pg.on('pageerror',e=>errs.push('PAGEERR '+e.message));
 await pg.route(/fonts\.g/,r=>r.abort());await pg.goto('file://'+path.resolve('dist/index.html')+'#notour');await pg.waitForTimeout(300);pg.setDefaultTimeout(5000);
 const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};const ev=(f,a)=>pg.evaluate(f,a);const near=(a,b)=>Math.abs(a-b)<0.0011;
 const T=await ev(()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())});
 const plus=n=>{const[a,m,d]=T.split('-').map(Number);const x=new Date(a,m-1,d+n);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
 const checkAll=async()=>{for(const id of await ev(()=>[...document.querySelectorAll('[id^=sc-ok-]')].filter(e=>e.getAttribute('aria-pressed')!=='true').map(e=>e.id)))await pg.locator('#'+id).click()};

 // --- Home and entry points
 await ev(()=>GB.reset('kitchen'));await pg.waitForTimeout(40);
 ok(await pg.locator('#bigacts .biga',{hasText:'Scan'}).count()===1,'Kitchen Home has one Scan button');
 await pg.locator('#bigacts .biga',{hasText:'Scan'}).click();
 ok(await pg.locator('#scanways .biga').count()===4,'Scan offers four ways: delivery order, supermarket receipt or barcode, wet-market photo, shelf photo');

 // --- 1. delivery order
 const o=await ev(()=>{const os=GB.state().orders.filter(x=>x.status==='sent'||x.status==='part').sort((a,b)=>a.expected<b.expected?-1:1);return JSON.parse(JSON.stringify(os[0]))});
 await pg.locator('#scanways .biga').nth(0).click();await pg.locator('#scanshoot').click();
 const want=o.lines.filter(l=>l.qty-l.recv>0);
 ok(await pg.locator('.scanrow').count()===want.length,'Delivery order: the whole order is read ('+want.length+' lines from order #'+o.no+')');
 ok(await pg.locator('#scansave').isDisabled()&&/Check the expiry date/.test(await pg.locator('.foot').innerText()),'"Add to stock" is locked until staff check each expiry date');
 const sug=await ev(()=>GB.info().p.rows.map(r=>({ing:r.ing,exp:r.exp,src:r.src})));
 ok(sug.every(r=>r.exp>T),'Every line has a suggested expiry date in the future');
 const before=await ev(ids=>ids.map(i=>GB.fn.onHand(i)),want.map(l=>l.ing));
 await checkAll();ok(!(await pg.locator('#scansave').isDisabled()),'After "Date checked" on every line, "Add to stock" unlocks');
 await pg.locator('#scansave').click();await pg.waitForTimeout(40);
 const after=await ev(({ids,no})=>({oh:ids.map(i=>GB.fn.onHand(i)),st:GB.state().orders.find(x=>x.no===no).status,scr:GB.info().screen}),{ids:want.map(l=>l.ing),no:o.no});
 ok(after.scr==='scanDone'&&after.st==='received'&&want.every((l,i)=>near(after.oh[i]-before[i],l.qty-l.recv)),'Order #'+o.no+' is received in full and stock went up by each line');

 // --- 2. supermarket receipt
 await pg.locator('#scanagain').click();await pg.locator('#scanways .biga').nth(1).click();await pg.locator('#scanshoot').click();
 ok(await pg.locator('.scanrow').count()===7,'Receipt: 7 lines read');
 ok(/Not a food item, left out/.test(await pg.locator('#scr').innerText()),'The plastic bag is left out as a non-food line');
 const r0=await ev(()=>({milk:GB.fn.onHand('egg'),n:GB.state().batches.length}));
 await checkAll();
 ok(await pg.locator('[id^=sc-ok-]').count()===5,'5 food lines need a date check; the unknown "KICAP MANIS" line is left out until matched');
 const milkRow=await ev(()=>GB.info().p.rows.find(r=>r.ing==='egg'));
 ok(milkRow.src==='shelf'&&milkRow.exp===plus(21),'Eggs get their usual shelf life (21 days) as the suggestion');
 const tomRow=await ev(()=>GB.info().p.rows.find(r=>r.ing==='tomato'));
 ok(tomRow.src==='fresh'&&tomRow.exp===plus(5),'Loose tomatoes get the typical fresh-food life (5 days)');
 // change one date: that counts as checked
 await pg.locator('#sc-ok-0').click();ok(await pg.locator('#scansave').isDisabled(),'Un-ticking one date locks the button again');
 await pg.fill('#sc-e-0',plus(6));await pg.locator('#sc-e-0').dispatchEvent('change');await pg.waitForTimeout(300);
 ok(await ev(()=>GB.info().p.rows[0].ok&&GB.info().p.rows[0].exp)===plus(6),'Changing a date by hand counts as checked');
 await pg.fill('#sc-e-1',plus(-1));await pg.locator('#sc-e-1').dispatchEvent('change');await pg.waitForTimeout(300);
 ok(await pg.locator('#scansave').isDisabled()&&/in the past/.test(await pg.locator('#scr').innerText()),'A date in the past is refused');
 await pg.fill('#sc-e-1',plus(20));await pg.locator('#sc-e-1').dispatchEvent('change');await pg.waitForTimeout(300);
 await pg.selectOption('#sc-i-5','soy');await pg.waitForTimeout(80);
 ok(await pg.locator('[id^=sc-ok-]').count()===6&&await pg.locator('#scansave').isDisabled(),'Matching "KICAP MANIS" to an item brings it in, with its own date to check');
 await pg.locator('#sc-ok-5').click();
 await pg.locator('#scansave').click();await pg.waitForTimeout(40);
 const r1=await ev(()=>{const s=GB.state(),nb=s.batches.slice(-6);return {milk:GB.fn.onHand('egg'),n:s.batches.length,ev:nb.find(b=>b.ing==='evap'),egg:nb.find(b=>b.ing==='egg')}});
 ok(r1.n===r0.n+6&&near(r1.milk-r0.milk,30),'6 batches added; eggs +30');
 ok(r1.ev.exp===plus(6)&&r1.ev.cost===290&&r1.egg.cost===53,'Batches keep the checked date and the price paid (evaporated milk RM17.40 / 6 cans = RM2.90 a can; eggs RM15.90 / 30 = 53 sen each)');

 // --- barcode
 await pg.locator('#scanagain').click();await pg.locator('#scanways .biga').nth(1).click();await pg.locator('.chip',{hasText:'Barcode on a pack'}).click();
 await pg.locator('#scanshoot').click();await pg.locator('#scanmore').click();await pg.locator('.chip',{hasText:'Soya bean milk'}).click();await pg.locator('#scanshoot').click();
 const bc=await ev(()=>GB.info().p.rows.map(r=>r.ing+':'+r.src));
 ok(bc.join()==='oyster:pack,soya:pack','Two barcodes scanned in a row, both with a date "read from the pack"');

 // --- 3. wet market
 await ev(()=>{GB.root('home');GB.go('scan',{})});await pg.waitForTimeout(40);
 await pg.locator('#scanways .biga').nth(2).click();await pg.locator('#scanshoot').click();
 const ch=await ev(()=>GB.info().p.rows[0]);
 ok(ch.ing==='chicken'&&ch.exp===plus(2)&&ch.src==='fresh','Market photo of chicken: guessed as chicken, suggested expiry 2 days');
 await pg.locator('#scanmore').click();await pg.locator('.chip',{hasText:'Blurry photo'}).click();await pg.locator('#scanshoot').click();
 ok(await pg.locator('.pic').count()>10,'A blurry photo shows big picture buttons instead of a guess');
 await pg.locator('.pic',{hasText:'Kangkung'}).click();await pg.waitForTimeout(40);
 const kg=await ev(()=>GB.info().p.rows[1]);
 ok(kg.ing==='kangkung'&&kg.exp===plus(3),'Tapping the kangkung picture fills it in with a 3-day suggestion (leafy greens)');
 await checkAll();const k0=await ev(()=>GB.fn.onHand('kangkung'));await pg.locator('#scansave').click();await pg.waitForTimeout(40);
 ok(near(await ev(()=>GB.fn.onHand('kangkung'))-k0,1),'Kangkung bought at the market is now in stock');
 await pg.locator('#toast button').click();await pg.waitForTimeout(40);
 ok(near(await ev(()=>GB.fn.onHand('kangkung')),k0),'Undo takes the scanned stock back out');

 // --- date sort
 await ev(()=>{GB.reset('owner');GB.root('orders')});await pg.waitForTimeout(40);
 const firstRow=async()=>(await pg.locator('#scr table tr').nth(1).innerText()).split('\t')[0].trim();
 const dn=await firstRow();await pg.locator('.sortc .chip',{hasText:'Oldest first'}).click();const up=await firstRow();
 const ord=await ev(()=>{const o=GB.state().orders.slice().sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:a.no-b.no);return ['#'+o[o.length-1].no,'#'+o[0].no]});
 ok(dn===ord[0]&&up===ord[1],'Orders: newest first shows '+dn+', oldest first shows '+up);
 await ev(()=>GB.root('waste'));await pg.waitForTimeout(40);
 ok(/Latest entries/.test(await pg.locator('#scr').innerText()),'Each list keeps its own sort: the waste log is still newest first');
 await pg.locator('.sortc .chip',{hasText:'Oldest first'}).click();
 const wd=await ev(()=>{const s=GB.state(),w=s.waste.slice().sort((a,b)=>a.dt<b.dt?-1:1);return w[0].dt.slice(0,10)});
 ok(/Oldest entries/.test(await pg.locator('#scr').innerText())&&await ev(()=>GB.state().sort.waste)==='asc','Waste log: "Oldest first" flips the list and the heading says "Oldest entries"');
 await ev(()=>GB.root('stock'));await pg.waitForTimeout(40);
 const sx=await ev(()=>[...document.querySelectorAll('#scr table tr.click')].slice(0,6).map(t=>t.cells[3].innerText));
 ok(/Tomorrow/.test(sx[0]),'Stock list is sorted soonest expiry first by default ('+sx[0]+')');
 await pg.locator('.sortc .chip',{hasText:'Expiring latest first'}).click();
 const sy=await ev(()=>[...document.querySelectorAll('#scr table tr.click')].slice(0,1).map(t=>t.cells[3].innerText)[0]);
 ok(!/Tomorrow|Today/.test(sy),'"Expiring latest first" flips it ('+sy+')');
 await ev(()=>{GB.root('pos');GB.go('salesList')});await pg.waitForTimeout(40);
 const t1=await pg.locator('#scr table tr').nth(1).innerText();await pg.locator('.sortc .chip',{hasText:'Oldest first'}).click();const t2=await pg.locator('#scr table tr').nth(1).innerText();
 ok(t1!==t2&&parseInt(t1)>parseInt(t2),'Past sales: newest first starts at receipt '+parseInt(t1)+', oldest first at '+parseInt(t2));
 await ev(()=>GB.root('invoices'));await pg.waitForTimeout(40);
 ok(await pg.locator('.sortc').count()===1,'Invoices list has the date sort');
 await ev(()=>GB.root('home'));await pg.waitForTimeout(40);
 ok(await pg.locator('.sortc').count()===0,'Home has no sort (list screens only)');
 await ev(()=>GB.root('pos'));await pg.waitForTimeout(40);
 ok(await pg.locator('.sortc').count()===0,'The till has no sort');

 // --- expiring-soon report
 await ev(()=>{GB.reset('owner');GB.root('home')});await pg.waitForTimeout(40);
 const al=pg.locator('.alert',{hasText:'expiring in'});ok(/at risk/.test(await al.innerText()),'Home "expiring" card shows the RM at risk');
 await al.click();ok((await ev(()=>GB.info().screen))==='expReport','The card opens the expiring-soon report');
 const rep=await ev(()=>{const xs=GB.fn.riskList(2);return {n:xs.length,risk:xs.reduce((a,x)=>a+x.risk,0),acts:xs.map(x=>x.i.id+':'+x.act),ok:xs.every(x=>x.risk===Math.round(x.left*x.b.cost)&&x.left<=x.b.qty+1e-9)}});
 const shown=await pg.locator('#exprisk .kpi').first().innerText();
 ok(rep.n===await pg.locator('table.exp tr').count()-2&&shown.includes((rep.risk/100).toFixed(2)),'Report lists '+rep.n+' batches and the total value at risk RM'+(rep.risk/100).toFixed(2));
 ok(rep.ok,'Value at risk = likely leftover x cost, and never more than the batch');
 ok(!rep.acts.some(a=>/rescue/.test(a))&&await pg.locator('table.exp button',{hasText:'Offer for rescue'}).count()===0,'Food rescue is gone from the report (taken out of scope in version 2)');
 ok(new Set(rep.acts.map(a=>a.split(':')[1])).size>=3,'Actions vary: '+[...new Set(rep.acts.map(a=>a.split(':')[1]))].join(', '));
 await pg.locator('#expshare').click();const txt=await pg.locator('#exp-text').inputValue();
 ok(/Expiring-soon report/.test(txt)&&/Value at risk/.test(txt)&&/Suggested/.test(txt),'"Copy to share" gives a plain text version for a chat');
 await pg.locator('#modal .xb').click();
 await pg.locator('table.exp button',{hasText:'Dishes to push'}).first().click();await pg.waitForTimeout(40);
 ok((await ev(()=>GB.info().screen))==='push','"Dishes to push" opens from a special or discount row in the report');await pg.locator('.backb').click();await pg.waitForTimeout(40);
 await pg.locator('.chip',{hasText:'7 days'}).click();
 ok((await pg.locator('table.exp tr').count()-2)>rep.n,'Choosing 7 days shows more batches');
 // language
 await ev(()=>{GB.state().settings.lang='zh';GB.root('stock')});await pg.waitForTimeout(80);
 ok(!/Sort by expiry date/.test(await pg.locator('#scr').innerText()),'Sort label is translated in Chinese');
 await ev(()=>{GB.state().settings.lang='en'});
 ok(errs.length===0,'No console errors '+errs.join(' | '));
 await b.close()})().catch(e=>{console.log('CRASH',e.message.split('\n').slice(0,6).join(' '));process.exit(1)});
