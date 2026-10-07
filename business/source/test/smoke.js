const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const url='file://'+path.resolve('dist/index.html')+'#notour';
 for(const [n,w,h] of [['desk',1366,800],['tab',1024,768],['phone',390,800]]){
  const pg=await b.newPage({viewport:{width:w,height:h}});const errs=[];
  pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});pg.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await pg.goto(url);await pg.waitForTimeout(600);
  await pg.screenshot({path:`shots/${n}-home.png`});
  for(const s of ['pos','stock','orders','waste','reports','invoices','settings']){await pg.evaluate(s=>GB.root(s),s);await pg.waitForTimeout(150);await pg.screenshot({path:`shots/${n}-${s}.png`});
   const ov=await pg.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1||document.getElementById('scr').scrollWidth>document.getElementById('scr').clientWidth+1);if(ov)errs.push('OVERFLOW '+s)}
  console.log(n,errs.length?errs:'no errors');await pg.close()}
 await b.close()})();
