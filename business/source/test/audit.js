// Button audit: clicks every clickable thing in every role and checks where it leads.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROLE=process.argv[2]||'owner',W=+(process.argv[3]||1280),H=+(process.argv[4]||800);
(async()=>{let b,pg;const errs=[];const setup=async()=>{try{if(b)await b.close()}catch(e){}
 b=await chromium.launch();pg=await b.newPage({viewport:{width:W,height:H}});
 pg.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|Failed to load resource/.test(m.text()))errs.push(m.text())});pg.on('pageerror',e=>errs.push('PAGEERR '+e.message));
 await pg.route(/fonts\.g/,r=>r.abort());await pg.goto('file://'+path.resolve('dist/index.html')+'#notour'+(process.env.L?'-lang='+process.env.L:''));await pg.waitForTimeout(400);
 await pg.evaluate(()=>{
  window.sleep=ms=>new Promise(r=>setTimeout(r,ms));if(!window.__H)window.__H=new Set();window.__LANG=(location.hash.match(/lang=(\w+)/)||[])[1]||'en';window.print=()=>{document.body.dataset.printed=(+(document.body.dataset.printed||0)+1)};
  window.layer=()=>{const t=document.getElementById('tour'),m=document.getElementById('modal'),d=document.getElementById('demo');if(!t.hidden)return t;if(!m.hidden)return m;if(!d.hidden)return d;return document};
  window.clicks=()=>{const L=layer();return [...L.querySelectorAll('[data-a]')].filter(e=>e.offsetParent!==null&&!e.disabled&&!(L===document&&e.closest('#toast')))};
  window.lab=e=>(e.getAttribute('aria-label')||e.innerText||e.textContent||'').replace(/\s+/g,' ').trim().slice(0,70);
  window.sig=()=>(document.body.dataset.printed||'')+(document.activeElement?document.activeElement.id:'')+JSON.stringify(GB.info())+document.getElementById('scr').innerHTML.length+'|'+document.getElementById('scr').innerHTML.slice(0,4000)+document.getElementById('modal').innerHTML+document.getElementById('toast').hidden+document.getElementById('toast').textContent+document.getElementById('tour').innerHTML+document.getElementById('demo').innerHTML+document.getElementById('side').innerHTML+document.getElementById('scr').innerHTML.slice(-3000);
  window.skey=(last)=>{const m=document.getElementById('modal'),d=document.getElementById('demo');if(!d.hidden&&m.hidden)return 'DEMO|'+d.querySelector('.dn').textContent;if(!m.hidden&&['help','roleMenu','tip','moreMenu'].includes(last))return GB.info().screen+'|M:'+last;return GB.key()+(m.hidden?'':'|M:'+last)};
  window.settle=async()=>{await sleep(1);if(document.querySelector('.tick.wait'))await sleep(1700)};
  window.replay=async(role,pathIdx)=>{GB.reset(role);await sleep(0);for(const i of pathIdx){const c=clicks()[i];if(!c)return false;c.click();await settle()}return true};
  window.where=()=>{const i=GB.info(),m=document.getElementById('modal'),t=document.getElementById('toast');let d=i.title+(i.depth>1?'':' (main page)');
    if(!m.hidden){const hh=m.querySelector('h2');d='Pop-up: '+(hh?hh.textContent.trim():'')+' (on '+i.title+')'}if(!document.getElementById('tour').hidden)d='Welcome tour step (on '+i.title+')';return {d,toast:t.hidden?'':t.textContent.replace(/Undo$/,'').trim(),i}};
 })};
 await setup();
 const EV=async(fn,arg)=>{for(let t=0;t<3;t++){try{return await pg.evaluate(fn,arg)}catch(e){console.error('relaunch after: '+String(e.message).slice(0,80));await setup()}}throw new Error('gave up')};
 const seen=new Set(),queued=new Set(),queue=[{path:[],last:''}],rows=[];let n=0;
 const t0=Date.now();
 while(queue.length){const st=queue.shift();
  const base=await EV(async({role,p,last})=>{if(!await replay(role,p))return null;return {key:skey(last),list:clicks().map(e=>({l:lab(e),a:e.dataset.a,p:e.dataset.p||''})),w:where()}},{role:ROLE,p:st.path,last:st.last});
  if(!base||seen.has(base.key))continue;seen.add(base.key);
  for(let i=0;i<base.list.length;i++){const it=base.list[i];n++;errs.length=0;if(process.env.V)fs.appendFileSync('test/trace-'+ROLE+(process.env.L||'')+'.txt',base.key+' >> '+it.a+' '+it.p+' '+it.l+'\n');
   const r=await EV(async({role,p,i,a})=>{await replay(role,p);document.getElementById('toast').hidden=true;document.getElementById('toast').textContent='';if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();const before=sig(),c=clicks()[i];const selected=c&&(c.classList.contains('on')||c.getAttribute('aria-current')||c.getAttribute('aria-pressed')==='true');if(!c)return {missing:true};let exp=null;try{const pp=JSON.parse(c.dataset.p||'{}');if(['go','root','rootM','goM'].includes(a)&&pp.s)exp=pp.s}catch(e){}
     c.click();await settle();const after=sig(),w=where(),nkey=skey(a);const bad=/could not be shown/.test(document.getElementById('scr').textContent);
     let backOk=true,how='';const m=document.getElementById('modal'),tr=document.getElementById('tour');
     if(!tr.hidden){how='Skip/Next';backOk=!!tr.querySelector('[data-a=tourEnd]')}
     else if(!m.hidden){how='Close';backOk=!!m.querySelector('[data-a=closeModal],[data-a=welcomeSkip]')}
     else if(w.i.depth>1){how='Back';const bb=document.querySelector('.backb');backOk=!!bb;if(bb){const d=w.i.depth;const key2=skey(a);bb.click();await sleep(5);backOk=GB.info().depth<d;/* restore not needed */}}
     else{how='Menu';backOk=!!document.querySelector('#side .nav,#bot .nav')&&[...document.querySelectorAll('#side .nav,#bot .nav')].some(e=>e.offsetParent!==null)}
     return {changed:before!==after,selected:!!selected,w,exp,bad,backOk,how,nkey}},{role:ROLE,p:st.path,i,a:it.a});
   let pass=true,why=[];
   if(r.missing){pass=false;why.push('button vanished on replay')}
   else{if(!r.changed&&!r.selected){pass=false;why.push('nothing happened')}
    if(r.exp&&r.w.i.screen!==r.exp&&!(r.exp==='receive')){pass=false;why.push('expected '+r.exp+' got '+r.w.i.screen)}
    if(r.bad){pass=false;why.push('page failed to render')}
    if(!r.backOk){pass=false;why.push('no way back')}
    if(errs.length){pass=false;why.push('console: '+errs.join(' / '))}}
   rows.push({role:ROLE,screen:base.w.d,button:it.l,action:it.a,leads:r.missing?'':(!r.changed&&r.selected?'Already selected, stays on ':'')+r.w.d+(r.w.toast?' · message: "'+r.w.toast+'"':''),back:r.how||'',pass,why:why.join('; ')});
   if(!r.missing&&pass&&it.a!=='role'&&!seen.has(r.nkey)&&!queued.has(r.nkey)){queued.add(r.nkey);queue.push({path:st.path.concat(i),last:it.a})}
  }
  if(seen.size%10===0)console.error(ROLE,'states',seen.size,'clicks',n,'queue',queue.length,Math.round((Date.now()-t0)/1000)+'s');
  // drop queued items whose resulting state is already seen is handled on dequeue
 }
 fs.writeFileSync(`test/audit-${ROLE}-${W}${process.env.L?'-'+process.env.L:''}.json`,JSON.stringify(rows));
 try{fs.writeFileSync(`test/harvest-${ROLE}${process.env.L||''}.json`,JSON.stringify(await pg.evaluate(()=>[...window.__H])))}catch(e){console.error('harvest failed')}
 const f=rows.filter(r=>!r.pass);console.log(ROLE,W,'states',seen.size,'clicks',rows.length,'fail',f.length);f.slice(0,40).forEach(r=>console.log(' FAIL',r.screen,'|',r.button,'|',r.action,'|',r.why));
 await b.close()})();
