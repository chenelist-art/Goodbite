/* ---------- languages: English is the source. Bahasa Melayu and Chinese are applied to the page after it is drawn. ---------- */
const LANGS={en:'English',ms:'Bahasa Melayu',zh:'中文 (简体)'};
const TR={ms:{x:new Map(),p:[],c:new Map()},zh:{x:new Map(),p:[],c:new Map()}};
const curLang=()=>(S&&S.settings&&S.settings.lang)||'en';
function i18nAdd(raw){raw.split('\n').forEach(line=>{if(!line.trim()||line.startsWith('//'))return;const a=line.split(' || ');if(a.length<3)return;const en=a[0].trim();
  ['ms','zh'].forEach((l,i)=>{const t=a[i+1].trim();if(!t)return;if(/\{\w+\}/.test(en)){const names=[];const re=new RegExp('^'+en.replace(/[.*+?^$()|[\]\\]/g,'\\$&').replace(/\{(\w+)\}/g,(m,n)=>{names.push(n);return /^n\d*$/.test(n)?'([-+]?[\\d.,]*\\d)':'([\\s\\S]+?)'})+'$');TR[l].p.push({re,names,t,len:en.replace(/\{\w+\}/g,'').length})}else TR[l].x.set(en,t)})});
  ['ms','zh'].forEach(l=>TR[l].p.sort((a,b)=>b.len-a.len))}
const EMO=/^((?:\p{Extended_Pictographic}|️|‍)+)\s+(.+)$/u;
function tr1(s,l,depth){const d=TR[l];depth=depth||0;if(!d||!s)return s;if(d.x.has(s))return d.x.get(s);if(d.c.has(s))return d.c.get(s);let out=s,hit=false;
  if(depth<5&&/[A-Za-z]/.test(s)){
    for(const p of d.p){const m=s.match(p.re);if(m){out=p.t.replace(/\{(\w+)\}/g,(x,n)=>{const i=p.names.indexOf(n);return i<0?x:tr1(m[i+1].trim(),l,depth+1)});hit=true;break}}
    if(!hit){const e=s.match(EMO);if(e){out=e[1]+' '+tr1(e[2],l,depth+1);hit=true}}
    if(!hit&&s.includes(' · ')){out=s.split(' · ').map(x=>tr1(x.trim(),l,depth+1)).join(' · ');hit=true}
    if(!hit&&s.endsWith(' ›')){const t=tr1(s.slice(0,-2),l,depth+1);if(t!==s.slice(0,-2)){out=t+' ›';hit=true}}
    if(!hit&&s.includes(', ')){const ps=s.split(', ');if(ps.every(x=>d.x.has(x.trim()))){out=ps.map(x=>d.x.get(x.trim())).join(l==='zh'?'、':', ');hit=true}}
  }
  if(out===s&&depth===0&&window.__MISS&&/[A-Za-z]{2}/.test(s))window.__MISS.add(s);
  d.c.set(s,out);return out}
function trText(s){const l=curLang();const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/);if(!m[2])return s;const core=m[2].replace(/\s+/g,' ');if(window.__H)window.__H.add(core);if(l==='en')return s;const t=tr1(core,l);return t===core?s:m[1]+t+m[3]}
const TR_ATTR=['placeholder','aria-label','title'];
function trEl(el){TR_ATTR.forEach(a=>{const v=el.getAttribute&&el.getAttribute(a);if(v){const t=trText(v);if(t!==v)el.setAttribute(a,t)}});
  if(el.tagName==='OPTION'&&!el.hasAttribute('value'))el.setAttribute('value',el.textContent);
  if(el.tagName==='OPTGROUP'){const v=el.getAttribute('label'),t=trText(v||'');if(t!==v)el.setAttribute('label',t)}}
function trNode(root){if(curLang()==='en'&&!window.__H)return;
  if(root.nodeType===3){const p=root.parentNode;if(p&&/^(TEXTAREA|SCRIPT|STYLE|PRE)$/.test(p.tagName))return;const t=trText(root.nodeValue);if(t!==root.nodeValue)root.nodeValue=t;return}
  if(root.nodeType!==1||/^(TEXTAREA|SCRIPT|STYLE|PRE)$/.test(root.tagName))return;
  trEl(root);const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode:n=>n.nodeType===1&&/^(TEXTAREA|SCRIPT|STYLE|PRE)$/.test(n.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  let n;while((n=w.nextNode())){if(n.nodeType===3){const t=trText(n.nodeValue);if(t!==n.nodeValue)n.nodeValue=t}else trEl(n)}}
function i18nStart(){new MutationObserver(ms=>{for(const m of ms)m.addedNodes.forEach(trNode)}).observe(document.body,{childList:true,subtree:true});document.documentElement.lang=curLang()==='zh'?'zh-Hans':curLang()}
function setLang(l){S.settings.lang=l;save();document.documentElement.lang=l==='zh'?'zh-Hans':l;TR.ms.c.clear();TR.zh.c.clear();closeModal();render();toast('Language changed.')}
ACT.setLang=p=>setLang(p.l);
const langPicker=()=>`<div class="chips" id="langpick">${Object.keys(LANGS).map(l=>`<button class="chip ${curLang()===l?'on':''}" aria-pressed="${curLang()===l}" lang="${l==='zh'?'zh-Hans':l}" data-a="setLang" data-p='{"l":"${l}"}'>${LANGS[l]}</button>`).join('')}</div>`;
SCREENS.setLang={sec:'settings',title:()=>'Language',help:['Pick the language for the whole app on this device.','Names you typed yourself, such as a new dish, stay the way you typed them.','E-invoice documents keep their official English field names where LHDN uses them.'],
 html(){return `${pageHead('Language','Language · Bahasa · 语言')}<div class="card" style="display:flex;flex-direction:column;gap:12px"><h2>Choose the language</h2>${langPicker()}<p class="muted">The change applies straight away, for every role on this device.</p><p class="muted sm">The Bahasa Melayu and Chinese wording was written by Claude and has not been checked by a native speaker.</p></div>
  <div class="foot"><span class="muted sm">Saved automatically.</span><div class="rt"><button class="btn big" ${A('back')}>Done, back to Settings</button></div></div>`}};
