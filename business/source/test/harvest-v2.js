// Visits the screens added or changed in version 2 and lists English text that has no Malay or Chinese yet (test/miss-v2.txt).
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:800}});
 await pg.route(/fonts\.g/,r=>r.abort());await pg.goto('file://'+path.resolve('dist/index.html')+'#notour');await pg.waitForTimeout(300);
 const miss=await pg.evaluate(async()=>{window.__H=new Set();const sl=ms=>new Promise(r=>setTimeout(r,ms));
  const click=async sel=>{const e=document.querySelector(sel);if(e){e.click();await sl(30)}};
  const all=async sel=>{for(const e of [...document.querySelectorAll(sel)]){e.click();await sl(25)}};
  const visit=async fn=>{fn();await sl(40)};
  const help=async()=>{const e=document.querySelector('#helpbtn');if(e){e.click();await sl(20);await click('#modal [data-a=closeModal]')}};
  for(const role of ['owner','kitchen','cashier']){GB.reset(role);await sl(30);
   await visit(()=>GB.root('home'));await help();
   if(role==='cashier'){await visit(()=>{GB.state().specials[new Date().toISOString().slice(0,10)]=[];});}
   for(const s of ['push','usage','weekly','setupRecipes','shelfScan','posLink','expReport','count','limits','setAlerts','settings','scan']){await visit(()=>{GB.root('home');GB.go(s,{})});await help()}
   await visit(()=>{GB.root('home');GB.go('usage',{days:7})});
   for(const sh of ['seafood','meat','veg','eggs','dry','drinks']){await visit(()=>{GB.root('stock');GB.go('shelfScan',{shelf:sh})});await click('#shelfshoot');await sl(30)}
   await click('#savecount');await sl(30);
   await visit(()=>{GB.root('home');GB.go('push')});await all('#pushlist [data-a=specialTog]');await all('#shortlist .chip');await sl(30);
   await visit(()=>GB.root('pos'));await all('.mi.so');
   await visit(()=>GB.root('home'));await all('[data-a=helpChat]');await click('#modal .xb');
   await visit(()=>{GB.root('home');GB.go('setupRecipes')});await all('[data-a=recipeOk]');await sl(20);await all('[data-a=recipeOk]');
   for(const k of ['feedme','file']){await visit(()=>{GB.root('settings');GB.go('posLink',{sys:k,step:1})});await click('#posnext');await click('#posallow');await all('#posmap [data-a=posOk]');await click('#posfinish');await click('#possync');await sl(30);await visit(()=>{GB.root('settings');GB.go('posLink')});await click('[data-a=posEdit]');await visit(()=>GB.root('home'));await click('#rolebtn');await click('#modal .xb');
     await visit(()=>{GB.root('settings');GB.go('posLink')});await click('[data-a=posDisconnect]');await click('[data-a=yes]')}
   await visit(()=>{GB.root('settings');GB.go('posLink',{step:1})});await click('[data-a=posUseTill]');
   for(const d of [1,2,3,5,7]){await visit(()=>{GB.root('home');GB.go('expReport',{days:d})})}
   await visit(()=>{GB.root('home');GB.go('weekly')});await click('#weekshare');await click('#modal .xb');
   await visit(()=>{GB.root('settings');GB.go('setAlerts')});await all('#fctarget .chip');
   await visit(()=>GB.root('home'));await all('[data-a=setupHide]');await visit(()=>GB.root('settings'));
   for(const s of ['stock','waste','reports','orders']){await visit(()=>GB.root(s));await all('.tab')}
   await visit(()=>{GB.root('home');GB.go('scan',{})});
   for(const w of ['do','shop','market']){await visit(()=>{GB.root('home');GB.go('scan',{way:w,step:'cam'})});await click('#scanshoot');await all('.pic')}
   await visit(()=>{GB.root('settings');GB.go('menuList')});await visit(()=>{GB.root('settings');GB.go('menuItem',{})});
   await visit(()=>{GB.root('pos')});await all('.tab');for(const id of ['101','203','404','503']){await visit(()=>{GB.root('pos')});await click('[data-p*=\'"'+id+'"\']');await click('#modal .xb')}
  }
  GB.reset('owner');await sl(30);document.querySelector('[data-a=demoStart]').click();await sl(60);for(let i=0;i<16;i++){const n=document.getElementById('demonext');if(n)n.click();await sl(80)}
  welcome();await sl(30);
  /* names from the catalogue */
  GB.state().ingredients.forEach(i=>window.__H.add(i.name));GB.state().menu.forEach(m=>window.__H.add(m.name));ING_CATS.forEach(c=>window.__H.add(c));MENU_CATS.forEach(c=>window.__H.add(c));
  Object.values(MODS).forEach(g=>{window.__H.add(g.name);g.opts.forEach(o=>window.__H.add(o.n))});
  const out=[];for(const s of window.__H){if(!/[A-Za-z]{2}/.test(s))continue;const z=tr1(s,'zh'),m=tr1(s,'ms');if(z===s||m===s||/[a-z]{3,} [a-z]{2,}/.test(z.replace(/\([^)]*\)/g,'')))out.push(s)}return out});
 fs.writeFileSync('test/miss-v2.txt',miss.join('\n'));console.log(miss.length);await b.close()})();
