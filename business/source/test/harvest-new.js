// Visits the screens added on 19 Oct and lists English text that has no Malay or Chinese yet.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:800}});
 await pg.route(/fonts\.g/,r=>r.abort());await pg.goto('file://'+path.resolve('dist/index.html')+'#notour');await pg.waitForTimeout(300);
 const miss=await pg.evaluate(async()=>{window.__H=new Set();const sl=ms=>new Promise(r=>setTimeout(r,ms));
  const click=async sel=>{const e=document.querySelector(sel);if(e){e.click();await sl(30)}};
  const all=async sel=>{for(const e of [...document.querySelectorAll(sel)]){e.click();await sl(20)}};
  const visit=async(fn)=>{fn();await sl(40)};
  for(const role of ['owner','kitchen']){GB.reset(role);await sl(30);
   await visit(()=>GB.root('home'));await visit(()=>GB.go('scan',{}));
   for(const w of ['do','shop','market']){await visit(()=>{GB.root('home');GB.go('scan',{way:w,step:'cam'})});
    if(w==='do'){for(const c of [...document.querySelectorAll('.chip')]){c.click();await sl(20)}await click('.chip');await click('#scanshoot');await all('[id^=sc-ok-]');await click('#scansave');await sl(30)}
    if(w==='shop'){await click('#scanshoot');await all('[id^=sc-ok-]');await sl(20);const sel=document.getElementById('sc-i-5');if(sel){sel.value='sambal';sel.dispatchEvent(new Event('change',{bubbles:true}));await sl(80)}document.querySelector('#scansave')&&document.querySelector('#scansave').click();await sl(40);
      await visit(()=>{GB.root('home');GB.go('scan',{way:'shop',step:'cam',mode:'barcode'})});for(let i=0;i<4;i++){GB.info().p.code=i;GB.root('home');GB.go('scan',{way:'shop',step:'cam',mode:'barcode',code:i});await sl(20);await click('#scanshoot');await click('#scanmore')}}
    if(w==='market'){for(const ph of ['chicken','kangkung','prawn','blur']){await click('[data-p*="'+ph+'"]');await click('#scanshoot');await click('#scanmore')}await click('[data-a=set][data-p*=confirm]');await sl(30);await click('.pic');await all('[data-a=scanPickT]');await click('[data-a=scanSave]');document.querySelector('[data-a=scanSave]')&&(GB.info().p.tried=1);await all('[id^=sc-ok-]');await click('#scansave')}}
   for(const d of [1,2,3,5,7]){await visit(()=>{GB.root('home');GB.go('expReport',{days:d})})}
   document.querySelector('#expshare')&&document.querySelector('#expshare').click();await sl(30);
   for(const s of ['stock','orders','waste','reports','invoices']){await visit(()=>GB.root(s));for(const t of [...document.querySelectorAll('.tab')]){t.click();await sl(20);await all('.sortc .chip')}}
   await visit(()=>{GB.root('waste');GB.go('wasteItem',{ing:'milk'})});await visit(()=>{GB.root('reports');GB.go('repWaste',{m:new Date().toISOString().slice(0,7)})});await visit(()=>{GB.root('reports');GB.go('repDays',{m:new Date().toISOString().slice(0,7)})});
   await visit(()=>{GB.root('pos');GB.go('salesList')});await visit(()=>{GB.root('settings');GB.go('limits')});await visit(()=>GB.root('settings'));await visit(()=>{GB.root('orders');GB.go('receive',{step:0})});
   document.querySelector('[data-a=help]').click();await sl(20);document.querySelector('[data-a=closeModal]').click();
  }
  document.querySelector('[data-a=demoStart]').click();await sl(50);for(let i=0;i<14;i++){document.getElementById('demonext').click();await sl(60)}
  const out=[];for(const s of window.__H){if(!/[A-Za-z]{2}/.test(s))continue;const z=tr1(s,'zh'),m=tr1(s,'ms');if(/[a-z]{3,} [a-z]{2,}/.test(z.replace(/\([^)]*\)/g,''))||z===s)out.push(s+'  =>  '+z)}return out});
 fs.writeFileSync('test/miss-new.txt',miss.join('\n'));console.log(miss.length);await b.close()})();
