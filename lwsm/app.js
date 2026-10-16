(()=>{
const $=id=>document.getElementById(id);
const KM='lwsm.memos',KC='lwsm.cur';
const ed=$('ed'),pv=$('pv'),sw=$('bSw'),bg=$('bg'),bar=$('bar'),box=$('content');
const dF=$('dFind'),kw=$('kw'),rp=$('rp'),all=$('all'),cs=$('cs'),rx=$('rx'),st=$('st');
const dS=$('dSet'),fsr=$('fs');
const hitBox=$('hit'),clearHit=()=>{hitBox.textContent='';hit=null};
const dGr=$('dGrep'),dD=$('dData'),dG=$('dTags'),gc=$('gc'),gs=$('gs'),gi=$('gi'),dM=$('dMng'),mg=$('mg'),dR=$('dRest'),tl=$('tl');
const dT=$('dTitle'),ti=$('ti'),tt=$('ttl');
const dL=$('dList'),fl=$('fl'),ul=$('ul');
let ly=0,hit=null,memos=[],cur,tagSel=new Set(),rest=null,preview=true,timer,sel=0,view=[];
try{memos=JSON.parse(localStorage.getItem(KM)||'[]')}catch(e){}

const newMemo=()=>({id:crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),text:'',bg:'',updated:Date.now()});
const strip=l=>l.replace(/<[^>]*>/g,'').replace(/^[\s#>*\-+`_~|=]+/,'').trim();
const title=t=>{const n=t.length;for(let p=0;p<=n;){let e=t.indexOf('\n',p);if(e<0)e=n;const s=strip(t.slice(p,Math.min(e,p+20000)));if(s)return s.slice(0,80);p=e+1}return''};  /* reads only up to the first line with visible text (no full split) */
const ttl=m=>m.name||title(m.text);
const BASE='Light Weight Simple Memo';
const setTitle=()=>{const t=cur&&ttl(cur);const lab=(preview?'👁️':'✏️')+' ';document.title=lab+(t?t+' - '+BASE:BASE);const h=$('ttl');h.textContent=t||'Untitled';h.title=t?t+'\n(Double-click or Alt+R to rename)':'';h.style.opacity=t?'':'.5';
  const g=$('tgs'),tg=(cur&&cur.tags)||[];g.textContent=tg.map(x=>'#'+x).join(' ');g.title=tg.length?'Tags: '+tg.join(', ')+' (click to edit)':'';drawFlt()};
const isHtml=t=>/^\s*<(!doctype|html|head|body|[a-z][\w-]*)[\s>\/]/i.test(t);
const fg=c=>{const n=parseInt(c.slice(1),16);return((n>>16)*299+(n>>8&255)*587+(n&255)*114)/1000>150?'#111':'#f2f2f2'};
const esc=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

const persist=()=>{try{localStorage.setItem(KM,JSON.stringify(memos));localStorage.setItem(KC,cur.id)}catch(e){alert('Storage is full or unavailable.')}};
const save=()=>{clearTimeout(timer);if(!title(cur.text))return false;cur.updated=Date.now();if(!memos.includes(cur)){const i=memos.findIndex(m=>m.id===cur.id);i<0?memos.push(cur):memos[i]=cur}persist();return true};
const changed=()=>{cur.text=ed.value;clearHit();setTitle();clearTimeout(timer);timer=setTimeout(save,400)};

const YT=['www.youtube.com','youtube.com','www.youtube-nocookie.com','youtube-nocookie.com'];
const clean=h=>{const d=new DOMParser().parseFromString(h,'text/html');
  d.querySelectorAll('script,style,iframe,object,embed,link,meta,base,form').forEach(e=>{
    if(e.tagName==='IFRAME'){let u;try{u=new URL(e.getAttribute('src')||'','https://invalid.example/')}catch(x){}
      if(u&&u.protocol==='https:'&&YT.includes(u.hostname)&&/^\/embed\/[\w-]+\/?$/.test(u.pathname)&&!u.username&&!u.password){
        u.hostname='www.youtube-nocookie.com';const n=d.createElement('iframe');n.src=u.href;
        n.title=(e.getAttribute('title')||'YouTube video player').slice(0,100);
        n.setAttribute('allowfullscreen','');n.setAttribute('loading','lazy');n.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
        n.setAttribute('allow','encrypted-media; picture-in-picture');
        n.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox');
        e.replaceWith(n);return}}
    e.remove()});
  d.body.querySelectorAll('*').forEach(e=>{[...e.attributes].forEach(a=>{const n=a.name.toLowerCase();
    if(n.startsWith('on')||(/^(href|src|xlink:href|action|formaction)$/.test(n)&&/^\s*(javascript:|data:text\/html)/i.test(a.value)))e.removeAttribute(a.name)});
    if(e.tagName==='A'&&!(e.getAttribute('href')||'').startsWith('#')){e.target='_blank';e.rel='noopener noreferrer'}});
  return d.body.innerHTML};
const render=t=>clean(isHtml(t)?t:(window.marked?marked.parse(t,{gfm:true,breaks:true}):'<pre>'+esc(t)+'</pre>'));

const applyBg=()=>{const c=cur.bg;box.style.background=c;box.style.color=c?fg(c):'';box.style.setProperty('--link',c?fg(c):'');
  bg.value=c||(matchMedia('(prefers-color-scheme:dark)').matches?'#171d1a':'#ffffff')};
const setMode=(p,focus)=>{preview=p;document.body.dataset.mode=p?'preview':'edit';setTitle();if(p){pv.innerHTML=render(cur.text);olBuild()}else olUpdate();sw.dataset.mode=p?'preview':'edit';const sl=p?'Switch to edit (F2)':'Switch to preview (F2)';sw.title=sl;sw.setAttribute('aria-label',sl);ed.hidden=p;pv.hidden=!p;olUpdate();bar.classList.remove('hide');if(!p&&focus)ed.focus();if(p){clearHit();pv.focus({preventScroll:true})}};
const load=(m,p)=>{cur=m;clearHit();setTitle();ed.value=m.text;applyBg();ed.hidden=pv.hidden=false;ed.scrollTop=pv.scrollTop=0;ly=0;setMode(p);try{localStorage.setItem(KC,m.id)}catch(e){}};
const pool=()=>memos.filter(m=>[...tagSel].every(k=>hasTag(m,k)));
const canRotate=()=>{const p=pool();return p.length>1||(p.length===1&&p[0].id!==cur.id)};
const rotate=d=>{save();const p=pool();
  if(tagSel.size){if(!p.length){say('No memos match the tag filter',1800);return}if(p.length===1&&p[0].id===cur.id){say('Only this memo matches the tag filter',1800);return}}
  if(!p.length)return;const i=p.findIndex(m=>m.id===cur.id);
  const n=p[i<0?(d>0?0:p.length-1):(i+d+p.length)%p.length];
  if(n.id===cur.id)return;n.updated=Date.now();load(n,!title(cur.text)||preview);persist()};  /* leaving an empty new memo -> open the next one in preview */
const doNew=()=>{save();load(newMemo(),false);ed.focus()};

/* import / export */
const fi=document.createElement('input');fi.type='file';fi.accept='.md,.markdown,.txt,.html,.htm,.json,text/*';
fi.multiple=true;
const importFile=async f=>{
  if(/\.json$/i.test(f.name)){const p=parseBackup(await f.text());if(!p){alert('This is not a valid LWSM backup file: '+f.name);return}startRestore(p);return}
  if(!/\.(md|markdown|txt|html?)$/i.test(f.name)&&!(f.type||'').startsWith('text/')){alert('Only Markdown, HTML, and text files can be opened: '+f.name);return}
  const t=await f.text();
  if(!title(t)){alert('This file has no visible text, so it was not imported: '+f.name);return}
  save();const m=newMemo();m.text=t;m.name=f.name.replace(/\.[^.]+$/,'');cur=m;save();load(m,true)};
fi.onchange=async()=>{const fs=[...fi.files];fi.value='';for(const f of fs)await importFile(f)};
const doImport=()=>fi.click();
const doExport=()=>{if(!title(cur.text)){alert('Add some text before exporting.');return}save();
  const h=isHtml(cur.text),a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([cur.text],{type:h?'text/html':'text/markdown'}));
  a.download=ttl(cur).replace(/[\\/:*?"<>|]/g,'_').slice(0,50)+(h?'.html':'.md');a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};

/* find & replace */
const stat=t=>st.textContent=t;
const openFind=()=>{if(!preview){const s=ed.value.slice(ed.selectionStart,ed.selectionEnd);if(s&&!s.includes('\n'))kw.value=s}
  if(!dF.open)dF.show();kw.focus();kw.select()};
/* y position of a character offset inside the textarea (accounts for soft wraps) */
const yOf=i=>{const cs=getComputedStyle(ed),m=document.createElement('div');
  m.style.cssText='position:absolute;visibility:hidden;top:0;left:0;box-sizing:border-box;white-space:pre-wrap;overflow-wrap:break-word;-webkit-text-size-adjust:100%;text-size-adjust:100%;width:'+ed.clientWidth+'px';
  ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','paddingLeft','paddingRight','tabSize'].forEach(p=>m.style[p]=cs[p]);
  m.textContent=ed.value.slice(0,i);const s=document.createElement('span');s.textContent='|';m.append(s);document.body.append(m);
  const y=s.offsetTop+(parseFloat(cs.paddingTop)||0);m.remove();return y};
/* select the hit in the editor so it is highlighted, keep the dialog open, scroll the hit below the dialog */
/* yellow marker over the hit (stays until you type, click in the editor, or change memo / text size) */
const drawHit=(i,len)=>{hitBox.textContent='';const cs=getComputedStyle(ed),m=document.createElement('div');
  m.style.cssText='position:absolute;visibility:hidden;top:0;left:0;box-sizing:border-box;white-space:pre-wrap;overflow-wrap:break-word;-webkit-text-size-adjust:100%;text-size-adjust:100%;width:'+ed.clientWidth+'px';
  ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','paddingLeft','paddingRight','tabSize'].forEach(p=>m.style[p]=cs[p]);
  m.append(document.createTextNode(ed.value.slice(0,i)));const s=document.createElement('span');s.textContent=ed.value.slice(i,i+len);m.append(s);document.body.append(m);
  const mr=m.getBoundingClientRect(),pt=parseFloat(cs.paddingTop)||0;
  for(const r of (s.getClientRects?s.getClientRects():[])){const d=document.createElement('div');d.className='hit-rect';
    d.style.cssText='left:'+(r.left-mr.left-2)+'px;top:'+(r.top-mr.top+pt-1)+'px;width:'+(r.width+4)+'px;height:'+(r.height+2)+'px';hitBox.append(d)}
  m.remove();hitBox.style.transform='translateY('+(-ed.scrollTop)+'px)'};
const showHit=(i,len)=>{   /* no text selection: only the yellow marker; the hit is remembered for Replace */
  const db=dF.open?dF.getBoundingClientRect().bottom-ed.getBoundingClientRect().top:0;
  const vv=window.visualViewport,avail=Math.min(ed.clientHeight,(vv?vv.height:innerHeight)-ed.getBoundingClientRect().top);
  const want=Math.max(db+24,Math.min(Math.max(db+48,avail*.42),avail-120));
  if(!coarse)ed.setSelectionRange(i,i);   /* cursor just before the keyword (PC only; no selection) */
  ed.scrollTop=Math.max(0,yOf(i)-want);drawHit(i,len);hit={i,len}};
/* ---- regular expressions + keyword history (shared by Find and Search all memos) ---- */
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const mkRe=(k,isRe,csens)=>{const src=isRe?k:reEsc(k),fl=(csens?'':'i')+'gm',re=new RegExp(src,fl);   /* throws if the pattern is invalid */
  if(isRe&&new RegExp(src,fl.replace('g','')).test(''))throw new Error('empty');return re};
const reMsg=e=>e.message==='empty'?'This pattern can match empty text. Make it more specific.':'Invalid regular expression';
const HK='lwsm.hist';let hist=[];
try{hist=JSON.parse(localStorage.getItem(HK)||'[]').filter(h=>h&&typeof h.k==='string'&&h.k).slice(0,5)}catch(e){}
const addHist=(k,re,cs)=>{if(!k)return;re=!!re;cs=!!cs;hist=[{k,re,cs},...hist.filter(h=>!(h.k===k&&h.re===re&&h.cs===cs))].slice(0,5);try{localStorage.setItem(HK,JSON.stringify(hist))}catch(e){}};
const histUI=(inp,btn,ul,onPick)=>{let sel=-1;
  const draw=()=>{ul.textContent='';
    hist.forEach((h,i)=>{const li=document.createElement('li'),s=document.createElement('span');if(i===sel)li.className='on';s.className='hk';s.textContent=h.k;li.append(s);
      for(const [on,t,tip] of [[h.re,'.*','Regex'],[h.cs,'Aa','Case sensitive']])if(on){const b=document.createElement('span');b.className='hb';b.textContent=t;b.title=tip;li.append(b)}
      li.onmousedown=e=>e.preventDefault();li.onclick=()=>pick(i);ul.append(li)});
    const c=document.createElement('li');c.className='hc';c.textContent='Clear history';c.onmousedown=e=>e.preventDefault();
    c.onclick=()=>{hist=[];try{localStorage.removeItem(HK)}catch(e){}show(false)};ul.append(c)};
  const show=on=>{on=on&&hist.length>0;ul.hidden=!on;btn.setAttribute('aria-expanded',on);sel=-1;if(on)draw()};
  const pick=i=>{const h=hist[i];if(!h)return;onPick(h);show(false);inp.focus()};
  btn.onclick=()=>{show(ul.hidden);inp.focus()};
  inp.addEventListener('input',()=>show(false));
  inp.addEventListener('keydown',e=>{if(e.isComposing)return;const stop=()=>{e.preventDefault();e.stopImmediatePropagation()};
    if(e.altKey&&e.key==='ArrowDown'){stop();show(ul.hidden);return}
    if(ul.hidden)return;
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){stop();const n=hist.length;sel=sel<0?(e.key==='ArrowDown'?0:n-1):(sel+(e.key==='ArrowDown'?1:-1)+n)%n;draw()}
    else if(e.key==='Enter'&&sel>=0){stop();pick(sel)}
    else if(e.key==='Escape'){stop();show(false)}},true);
  return{close:()=>show(false)}};

const find=()=>{const k=kw.value;if(!k)return false;if(preview)setMode(false);
  let re;try{re=mkRe(k,rx.checked,cs.checked)}catch(e){stat(reMsg(e));clearHit();return false}
  fHist.close();addHist(k,rx.checked,cs.checked);
  const t=ed.value,from=hit?hit.i+hit.len:ed.selectionEnd,found=[];let m;
  while((m=re.exec(t))){if(!m[0].length){re.lastIndex++;continue}found.push([m.index,m[0].length]);if(found.length>=20000)break}
  if(!found.length){stat('Not found');clearHit();return false}
  const nx=found.find(a=>a[0]>=from)||found[0];
  showHit(nx[0],nx[1]);stat((found.indexOf(nx)+1)+' / '+found.length+(found.length>=20000?'+':''));return true};
const replace=()=>{const k=kw.value;if(!k)return;if(preview)setMode(false);const r=rp.value;
  let re;try{re=mkRe(k,rx.checked,cs.checked)}catch(e){stat(reMsg(e));return}
  if(all.checked){const t=ed.value;let n=0,m;while((m=re.exec(t))){if(!m[0].length){re.lastIndex++;continue}n++}
    re.lastIndex=0;ed.value=rx.checked?t.replace(re,r):t.replace(re,()=>r);stat(n+' replaced');changed();return}
  if(hit){const t=ed.value,a=hit.i,sr=new RegExp(re.source,re.flags.replace('g','')+'y');sr.lastIndex=a;const m=sr.exec(t);
    if(m&&m.index===a&&m[0].length===hit.len){sr.lastIndex=a;
      const frag=rx.checked?(o=>o.slice(a,a+o.length-t.length+hit.len))(sr[Symbol.replace](t,r)):r;   /* $1, $2 ... work in regex mode */
      ed.setRangeText(frag,a,a+hit.len,'end');changed()}}
  find()};

/* list */
const drawList=()=>{const q=fl.value.trim().toLowerCase();drawTagBar();
  view=memos.slice().sort((a,b)=>b.updated-a.updated).filter(m=>(!q||ttl(m).toLowerCase().includes(q))&&[...tagSel].every(k=>hasTag(m,k)));
  sel=Math.max(0,Math.min(sel,view.length-1));ul.innerHTML='';
  view.forEach((m,i)=>{const li=document.createElement('li');if(i===sel)li.className='on';
    li.innerHTML='<span><b></b><i></i></span><button tabindex="-1" aria-label="Delete memo">×</button>';
    li.firstChild.firstChild.textContent=ttl(m);li.firstChild.lastChild.textContent=(m.tags||[]).map(t=>'#'+t).join(' ');li.onclick=()=>openMemo(m);
    li.lastChild.onclick=e=>{e.stopPropagation();del(m)};ul.append(li)});
  const on=ul.querySelector('.on');if(on)on.scrollIntoView({block:'nearest'});
  const b=$('bDelAll');b.textContent=(tagSel.size||q)?'Delete '+view.length+' shown':'Delete all';b.disabled=!view.length};
const openList=()=>{save();fl.value='';sel=0;drawList();if(!dL.open)dL.showModal();fl.focus()};
const openMemo=m=>{save();m.updated=Date.now();load(m,true);persist();dL.close()};
const del=m=>{if(!confirm('Delete "'+(ttl(m)||'this memo')+'"?'))return;
  memos=memos.filter(x=>x.id!==m.id);
  if(cur.id===m.id){const n=memos.slice().sort((a,b)=>b.updated-a.updated)[0];n?load(n,true):load(newMemo(),false)}
  persist();drawList()};
const doDelete=()=>{if(!cur.text&&!memos.some(m=>m.id===cur.id))return;del(cur)};
const doDuplicate=()=>{if(!memos.some(m=>m.id===cur.id)){say('Only saved memos can be duplicated',1800);return}
  save();const root=ttl(cur).replace(/ \(\d+\)$/,''),re=new RegExp('^'+root.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?: \\((\\d+)\\))?$');
  let max=1;for(const x of memos){const r=re.exec(ttl(x));if(r)max=Math.max(max,r[1]?+r[1]:1)}
  const suf=' ('+(max+1)+')',name=root.slice(0,80-suf.length)+suf;
  const m=newMemo();m.text=cur.text;m.bg=cur.bg||'';m.name=name;if(cur.tags&&cur.tags.length)m.tags=cur.tags.slice();
  memos.push(m);load(m,preview);persist();say('Duplicated: '+name,2000)};
const delAll=()=>{const q=fl.value.trim(),filtered=!!(tagSel.size||q),t=filtered?view.slice():memos.slice();
  if(!t.length)return;
  const tg=[...tagSel].map(k=>'#'+((allTags().find(x=>x.t.toLowerCase()===k)||{t:k}).t)).join(' ');
  const msg=filtered?'Delete the '+t.length+' memo'+(t.length>1?'s':'')+' shown in the list'+(tg?' (tags: '+tg+')':'')+(q?' (filter: "'+q+'")':'')+'?':'Delete all '+memos.length+' memos?';
  if(!confirm(msg))return;
  const ids=new Set(t.map(m=>m.id));memos=memos.filter(m=>!ids.has(m.id));
  tagSel.clear();fl.value='';sel=0;drawFlt();
  if(ids.has(cur.id)||!memos.length){const n=memos.slice().sort((a,b)=>b.updated-a.updated)[0];n?load(n,true):load(newMemo(),false)}
  persist();
  if(!memos.length){dL.close();ed.focus()}else{drawList();say('Deleted '+t.length+' memo'+(t.length>1?'s':''),1800)}};

/* events */
ed.addEventListener('input',changed);
ed.addEventListener('focus',()=>{if(!ed.readOnly)document.body.classList.add('editing')});
/* leaving the editor (also when only the soft keyboard was closed): bring the header back and undo the page shift iOS leaves behind */
const leaveEdit=()=>{ed.readOnly=false;document.body.classList.remove('editing');bar.classList.remove('hide');ly=ed.scrollTop;scrollTo(0,0);setTimeout(()=>scrollTo(0,0),80)};
ed.addEventListener('blur',leaveEdit);
/* detect that the soft keyboard was closed (iOS can close it while the textarea keeps focus) */
if(window.visualViewport){const vv=window.visualViewport;let base=0,kb=false,lw=innerWidth;
  const upd=()=>{if(!matchMedia('(pointer:coarse)').matches||vv.scale!==1)return;
    if(innerWidth!==lw){lw=innerWidth;base=0;kb=false}
    base=Math.max(base,vv.height);
    if(vv.height<base-120)kb=true;
    else if(kb){kb=false;if(document.activeElement===ed)ed.blur()}};
  vv.addEventListener('resize',upd);upd()}
ed.addEventListener('pointerdown',()=>{clearHit();if(ed.readOnly){ed.readOnly=false;ed.blur()}});
ed.addEventListener('scroll',()=>{hitBox.style.transform='translateY('+(-ed.scrollTop)+'px)'});
addEventListener('resize',clearHit);
$('done').onclick=()=>ed.blur();
/* iOS pans the page when the keyboard opens; keep the close-keyboard button at the top of what is actually visible */
if(window.visualViewport){const v=window.visualViewport,place=()=>{$('done').style.transform='translate('+v.offsetLeft+'px,'+v.offsetTop+'px)'};v.addEventListener('scroll',place);v.addEventListener('resize',place);place()}
sw.addEventListener('click',()=>setMode(!preview,true));
bg.addEventListener('input',()=>{cur.bg=bg.value;applyBg();changed()});
$('bRst').onclick=()=>{cur.bg='';applyBg();changed()};
$('bNew').onclick=doNew;$('bImp').onclick=doImport;$('bExp').onclick=doExport;$('bDel').onclick=doDelete;$('bDup').onclick=doDuplicate;$('bPrev').onclick=()=>rotate(-1);$('bNext').onclick=()=>rotate(1);$('bFind').onclick=openFind;$('bList').onclick=openList;
$('xF').onclick=()=>dF.close();$('xL').onclick=()=>dL.close();
$('bDoFind').onclick=find;
const rpx=$('rpx'),bRpT=$('bRpT');
const setRp=on=>{rpx.hidden=!on;bRpT.setAttribute('aria-expanded',on);bRpT.textContent=on?'Replace ▴':'Replace ▾'};
bRpT.onclick=()=>{setRp(rpx.hidden);if(!rpx.hidden)rp.focus()};
kw.addEventListener('input',()=>{stat('');clearHit()});
const fHist=histUI(kw,$('hF'),$('hlF'),h=>{kw.value=h.k;cs.checked=h.cs;rx.checked=h.re;kw.dispatchEvent(new Event('input'))});
cs.addEventListener('change',()=>{stat('');clearHit()});rx.addEventListener('change',()=>{stat('');clearHit()});
dF.addEventListener('close',()=>fHist.close());
$('bDoRep').onclick=replace;$('bDelAll').onclick=delAll;
kw.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();find()}});
rp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();replace()}});
let flT=0;const flushFl=()=>{if(flT){clearTimeout(flT);flT=0;sel=0;drawList()}};
fl.addEventListener('input',()=>{clearTimeout(flT);flT=setTimeout(()=>{flT=0;sel=0;drawList()},80)});
/* give keyboard scrolling back to the memo after any dialog closes (not on touch edit: no soft keyboard) */
const coarse=matchMedia('(pointer:coarse)').matches,dlgs=[dF,dS,dT,dG,dM,dR,dD,dL,dGr];
const focusBody=()=>{if(dlgs.some(d=>d.open))return;if(preview)pv.focus({preventScroll:true});else if(!coarse)ed.focus({preventScroll:true})};
dlgs.forEach(d=>d.addEventListener('close',focusBody));
dL.addEventListener('keydown',e=>{if(e.isComposing)return;
  if(e.key==='Enter'||e.key==='Delete'||e.key===' ')flushFl();
  if(e.altKey&&/^Digit[0-9]$/.test(e.code)){e.preventDefault();const d=+e.code.slice(5);if(d===0)tagSel.clear();else{const t=allTags()[d-1];if(t)toggleTag(t.t)}sel=0;drawList();return}const k=e.key,inF=document.activeElement===fl;
  const mv=d=>{e.preventDefault();if(view.length){sel=(sel+d+view.length)%view.length;drawList()}};
  if(e.ctrlKey&&k==='n'||k==='ArrowDown')mv(1);
  else if(e.ctrlKey&&k==='p'||k==='ArrowUp')mv(-1);
  else if(k==='Delete'&&(!inF||fl.selectionStart===fl.value.length)){e.preventDefault();if(view[sel])del(view[sel])}
  else if((k===' '&&(!inF||!fl.value))||k==='Enter'){e.preventDefault();if(view[sel])openMemo(view[sel])}});
/* bracket keys differ by keyboard layout and Option on macOS, so map by layout */
const kc={'[':'BracketLeft',']':'BracketRight'};
if(navigator.keyboard&&navigator.keyboard.getLayoutMap)navigator.keyboard.getLayoutMap().then(m=>{for(const[c,v]of m)if(v==='['||v===']')kc[v]=c}).catch(()=>{});
document.addEventListener('keydown',e=>{if(dL.open||dT.open||dG.open||dM.open||dR.open||dD.open||dGr.open)return;
  if(e.key==='Escape'&&!olNav.hidden){e.preventDefault();olClose();return}const c=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();
  if(e.altKey&&!c&&(e.code==='Comma'||e.code==='Period')){e.preventDefault();fsStep(e.code==='Comma'?-1:1);return}
  if(dS.open){if(e.key==='Escape'){e.preventDefault();dS.close()}return}
  if(dF.open){if(e.key==='F9'){e.preventDefault();kw.focus();kw.select()}else if(e.key==='Escape'){e.preventDefault();dF.close()}return}
  const run=f=>{e.preventDefault();f()},al=e.altKey&&!c,ak=x=>al&&e.code===x,kb=x=>e.key===x||e.code===kc[x];
  if(e.key==='F11')run(doNew);else if(c&&k==='o')run(doImport);else if(c&&k==='s')run(doExport);else if(e.key==='F9')run(openFind);
  else if(al&&kb(']'))run(()=>rotate(1));else if(al&&kb('['))run(()=>rotate(-1));else if(al&&e.key==='Delete')run(doDelete);else if(al&&(k==='r'||e.code==='KeyR'))run(openTitle);else if(ak('KeyT'))run(openTags);else if(ak('KeyM'))run(openMng);else if(ak('KeyB'))run(doBackup);else if(ak('KeyO'))run(openRestore);else if(ak('KeyD'))run(openData);else if(ak('KeyC'))run(doDuplicate);else if(ak('KeyG'))run(openGrep);else if(ak('KeyH'))run(olToggle);else if(e.key==='F10')run(openList);else if(e.key==='F2')run(()=>setMode(!preview,true))});
pv.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||(a.getAttribute('href')||'').startsWith('#'))return;
  e.preventDefault();window.open(a.href,'_blank','noopener,noreferrer')});
const onScroll=e=>{const y=e.target.scrollTop;if(y>ly+8&&y>60)bar.classList.add('hide');else if(y<ly-8||y<=0)bar.classList.remove('hide');ly=y};
ed.addEventListener('scroll',onScroll);pv.addEventListener('scroll',onScroll);
const flush=()=>{if(cur&&!ed.hidden)cur.text=ed.value;if(cur)save()};
addEventListener('pagehide',flush);document.addEventListener('visibilitychange',()=>{if(document.hidden)flush()});
/* header buttons: hidden scrollbar, soft fade at the edge that still has more buttons */
const tools=document.querySelector('.tools');
const updTools=()=>{const max=tools.scrollWidth-tools.clientWidth;tools.classList.toggle('mr',max>2&&tools.scrollLeft<max-2);tools.classList.toggle('ml',tools.scrollLeft>2)};
tools.addEventListener('scroll',updTools,{passive:true});
const ro=new ResizeObserver(()=>{box.style.setProperty('--hh',bar.offsetHeight+'px');updTools()});ro.observe(bar);ro.observe(tools);

/* drag & drop files */
let dc=0;const hasF=e=>e.dataTransfer&&[...e.dataTransfer.types].includes('Files');
addEventListener('dragenter',e=>{if(!hasF(e))return;e.preventDefault();dc++;document.body.classList.add('drop')});
addEventListener('dragover',e=>{if(hasF(e)){e.preventDefault();e.dataTransfer.dropEffect='copy'}});
addEventListener('dragleave',e=>{if(hasF(e)&&--dc<=0){dc=0;document.body.classList.remove('drop')}});
addEventListener('drop',async e=>{if(!hasF(e))return;e.preventDefault();dc=0;document.body.classList.remove('drop');
  const fs=[...e.dataTransfer.files];if(dL.open)dL.close();if(dF.open)dF.close();for(const f of fs)await importFile(f)});

/* ---- tags ---- */
const norm=t=>t.trim().replace(/\s+/g,' ').slice(0,30);
const hasTag=(m,t)=>(m.tags||[]).some(x=>x.toLowerCase()===t.toLowerCase());
const allTags=()=>{const c=new Map();for(const m of memos)for(const t of m.tags||[]){const k=t.toLowerCase(),e=c.get(k);e?e.n++:c.set(k,{t,n:1})}return[...c.values()].sort((a,b)=>a.t.localeCompare(b.t))};
const chip=(label,cls,fn)=>{const b=document.createElement('button');b.type='button';b.className='chip'+(cls?' '+cls:'');b.textContent=label;b.onclick=fn;return b};
const toggleTag=t=>{const k=t.toLowerCase();tagSel.has(k)?tagSel.delete(k):tagSel.add(k)};
const drawFlt=()=>{const ts=allTags();for(const k of [...tagSel])if(!ts.some(x=>x.t.toLowerCase()===k))tagSel.delete(k);
  const f=$('flt');f.hidden=!tagSel.size;if(tagSel.size)f.firstChild.textContent='Filter: '+[...tagSel].map(k=>'#'+(ts.find(x=>x.t.toLowerCase()===k)||{t:k}).t).join(' ')};
const drawTagBar=()=>{const ts=allTags();for(const k of [...tagSel])if(!ts.some(x=>x.t.toLowerCase()===k))tagSel.delete(k);tl.innerHTML='';
  ts.forEach((x,i)=>{const on=tagSel.has(x.t.toLowerCase());const b=chip((i<9?(i+1)+' ':'')+x.t,on?'on':'',()=>{toggleTag(x.t);sel=0;drawList()});
    b.tabIndex=-1;b.setAttribute('aria-pressed',on);if(i<9)b.title='Alt+'+(i+1);tl.append(b)});drawFlt()};
const drawTags=()=>{setTitle();gc.innerHTML='';gs.innerHTML='';
  (cur.tags||[]).forEach(t=>gc.append(chip('#'+t+' ✕','on',()=>{cur.tags=cur.tags.filter(x=>x!==t);if(!cur.tags.length)delete cur.tags;save();drawTags();gi.focus()})));
  allTags().filter(x=>!hasTag(cur,x.t)).forEach(x=>gs.append(chip('+ '+x.t,'',()=>addTag(x.t))))};
const addTag=raw=>{const cand=raw.split(/[,、，]/).map(norm).filter(Boolean);
  if(cand.length){cur.tags=cur.tags||[];const ex=allTags();
    for(const c of cand){if(cur.tags.length>=20)break;if(hasTag(cur,c))continue;const f=ex.find(x=>x.t.toLowerCase()===c.toLowerCase());cur.tags.push(f?f.t:c)}
    save()}
  gi.value='';drawTags();gi.focus()};
const openTags=()=>{if(dG.open)return;if(!title(cur.text)){alert('Type some text first, then add tags.');return}
  save();gi.value='';drawTags();dG.showModal();gi.focus()};
const drawMng=()=>{const ts=allTags();mg.innerHTML='';
  if(!ts.length){const p=document.createElement('p');p.className='hint';p.textContent='No tags yet.';mg.append(p);return}
  ts.forEach(({t,n})=>{const r=document.createElement('div');r.className='mrow';const s=document.createElement('span');s.textContent='#'+t+' ('+n+')';
    const rb=document.createElement('button'),db=document.createElement('button');rb.textContent='Rename';db.textContent='Delete';
    rb.onclick=()=>renameTag(t);db.onclick=()=>deleteTag(t,n);r.append(s,rb,db);mg.append(r)})};
const renameTag=old=>{let v=prompt('New name for tag "'+old+'"',old);if(v===null)return;v=norm(v);if(!v||v===old)return;
  const ex=allTags().find(x=>x.t.toLowerCase()===v.toLowerCase()&&x.t.toLowerCase()!==old.toLowerCase());
  if(ex){v=ex.t;if(!confirm('Tag "'+v+'" already exists. Merge "'+old+'" into it?'))return}
  for(const m of memos){if(!hasTag(m,old))continue;const out=[];
    for(const x of m.tags){const y=x.toLowerCase()===old.toLowerCase()?v:x;if(!out.some(z=>z.toLowerCase()===y.toLowerCase()))out.push(y)}m.tags=out}
  if(tagSel.delete(old.toLowerCase()))tagSel.add(v.toLowerCase());persist();setTitle();drawMng();drawList()};
const deleteTag=(name,n)=>{if(!confirm('Remove tag "'+name+'" from '+n+' memo'+(n>1?'s':'')+'?'))return;
  for(const m of memos)if(m.tags){m.tags=m.tags.filter(x=>x.toLowerCase()!==name.toLowerCase());if(!m.tags.length)delete m.tags}
  tagSel.delete(name.toLowerCase());persist();setTitle();drawMng();drawList()};
const openMng=()=>{if(dM.open)return;save();drawMng();dM.showModal()};

/* ---- search all memos (Alt+G): async, cancellable, scoped by the tag selection ---- */
const gk=$('gk'),gcs=$('gcs'),grx=$('grx'),gcur=$('gcur'),gl=$('gl'),GMAX=1000;
let gRes=null,gRun=false,gAbort=false,gSel=-1;
const gShow=run=>{$('gform').hidden=run;$('gh').hidden=run;$('grun').hidden=!run;$('gres').hidden=run||!gRes};
const drawGScope=()=>{const ts=allTags();for(const k of [...tagSel])if(!ts.some(x=>x.t.toLowerCase()===k))tagSel.delete(k);
  const gt=$('gtl');gt.textContent='';
  ts.forEach(x=>{const on=tagSel.has(x.t.toLowerCase());const b=chip(x.t,on?'on':'',()=>{toggleTag(x.t);drawFlt();drawGScope()});b.setAttribute('aria-pressed',on);gt.append(b)});
  gt.classList.toggle('off',gcur.checked);const n=pool().length;$('gscope').textContent=gcur.checked?'Current memo only':tagSel.size?fltText()+' · '+n+' memo'+(n===1?'':'s'):'All memos · '+n};
const drawGRes=()=>{gl.textContent='';gSel=-1;const r=gRes;$('gres').hidden=!r;if(!r)return;
  $('gsum').textContent=(r.cancelled?'Cancelled: ':'')+r.total+(r.truncated?'+':'')+' hit'+(r.total===1?'':'s')+' in '+r.memos+' memo'+(r.memos===1?'':'s')+(r.truncated?' (showing the first '+r.hits.length+')':'')+(r.cancelled?' so far':'');
  for(const h of r.hits){const li=document.createElement('li'),a=document.createElement('div'),ln=document.createElement('span'),tt=document.createElement('span'),sn=document.createElement('div'),mk=document.createElement('mark');
    a.className='h1';ln.className='ln';ln.textContent='L'+h.line;tt.className='tt';tt.textContent=h.title||'(untitled)';a.append(ln,tt);
    sn.className='sn';mk.textContent=h.snip.slice(h.hs,h.hs+h.hl);sn.append(document.createTextNode(h.snip.slice(0,h.hs)),mk,document.createTextNode(h.snip.slice(h.hs+h.hl)));
    li.append(a,sn);li.onclick=()=>gotoHit(h);gl.append(li)}};
const runGrep=async()=>{if(gRun)return;const k=gk.value;if(!k)return;save();
  let re;try{re=mkRe(k,grx.checked,gcs.checked)}catch(e){$('gerr').textContent=reMsg(e);$('gerr').hidden=false;return}
  $('gerr').hidden=true;gHist.close();addHist(k,grx.checked,gcs.checked);
  const cs=gcs.checked,isRe=grx.checked,cm=memos.find(x=>x.id===cur.id),scope=gcur.checked?(cm?[cm]:[]):pool();
  gRun=true;gAbort=false;gRes=null;gShow(true);$('gn').textContent='0 hits';
  const hits=[];let memosHit=0,trunc=false,t0=performance.now();
  outer:for(const m of scope){const text=m.text;let nl=text.indexOf('\n'),line=1,ls=0,r,found=false;re.lastIndex=0;
    while((r=re.exec(text))){
      if(!r[0].length){re.lastIndex++;continue}
      while(nl>=0&&nl<r.index){line++;ls=nl+1;nl=text.indexOf('\n',nl+1)}
      if(hits.length>=GMAX){trunc=true;break outer}
      const le=nl<0?text.length:nl;let a=ls,b=le,pre='',post='';
      if(b-a>90){a=Math.max(ls,r.index-30);b=Math.min(le,r.index+r[0].length+50);pre=a>ls?'…':'';post=b<le?'…':''}
      hits.push({id:m.id,line,off:r.index,len:r[0].length,title:ttl(m),snip:pre+text.slice(a,b)+post,hs:pre.length+(r.index-a),hl:r[0].length,kw:k,cs,re:isRe});found=true}
    if(found)memosHit++;
    if(performance.now()-t0>12){$('gn').textContent=hits.length+' hit'+(hits.length===1?'':'s');await new Promise(x=>setTimeout(x,0));if(gAbort)break;t0=performance.now()}}
  gRun=false;gRes={hits,total:hits.length,memos:memosHit,truncated:trunc,cancelled:gAbort};
  gShow(false);drawGRes();drawGScope()};
const gotoHit=h=>{const m=memos.find(x=>x.id===h.id);if(!m){say('That memo no longer exists',2000);return}
  save();if(cur.id!==m.id){m.updated=Date.now();load(m,false);persist()}else if(preview)setMode(false);
  dGr.close();kw.value=h.kw;cs.checked=h.cs;rx.checked=!!h.re;
  const t=ed.value;let off=h.off,len=h.len,re;
  try{re=mkRe(h.kw,h.re,h.cs)}catch(e){say('Invalid pattern',2000);return}
  const sr=new RegExp(re.source,re.flags.replace('g','')+'y');sr.lastIndex=off;const m0=sr.exec(t);
  if(m0&&m0.index===off)len=m0[0].length;
  else{let best=-1,bd=Infinity,r;re.lastIndex=0;
    while((r=re.exec(t))){if(!r[0].length){re.lastIndex++;continue}const d=Math.abs(r.index-h.off);if(d<bd){bd=d;best=r.index;len=r[0].length}else if(r.index>h.off)break}
    if(best<0){say('The keyword is no longer in this memo',2200);return}off=best;say('The memo has changed; showing the nearest match',2000)}
  showHit(off,len)};
const openGrep=()=>{if(dGr.open)return;save();drawGScope();gShow(gRun);drawGRes();dGr.showModal();gk.focus();gk.select()};
$('bGrep').onclick=openGrep;$('xGr').onclick=()=>dGr.close();$('bGr').onclick=runGrep;$('bGc').onclick=()=>{gAbort=true};
dGr.addEventListener('close',()=>{if(gRun)gAbort=true});
gk.addEventListener('input',()=>{gSel=-1;[...gl.children].forEach(li=>li.classList.remove('on'))});
const gHist=histUI(gk,$('hG'),$('hlG'),h=>{gk.value=h.k;gcs.checked=h.cs;grx.checked=h.re;gk.dispatchEvent(new Event('input'))});
gcur.addEventListener('change',drawGScope);
dGr.addEventListener('cancel',e=>{if(!$('hlG').hidden)e.preventDefault()});
dGr.addEventListener('keydown',e=>{if(e.isComposing)return;
  const k=e.key.toLowerCase(),step=e.ctrlKey&&!e.altKey&&!e.metaKey?(k==='n'?1:k==='p'?-1:0):(e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0);
  if(step&&gRes&&gl.children.length){e.preventDefault();const n=gl.children.length;   /* Ctrl+N / Ctrl+P / arrows: wrap around like the memo list */
    gSel=gSel<0?(step>0?0:n-1):(gSel+step+n)%n;
    [...gl.children].forEach((li,i)=>li.classList.toggle('on',i===gSel));gl.children[gSel].scrollIntoView({block:'nearest'})}
  else if(e.key==='Enter'&&e.target.tagName!=='BUTTON'){e.preventDefault();
    if(gSel>=0&&gRes&&gRes.hits[gSel])gotoHit(gRes.hits[gSel]);else if(e.target===gk)runGrep()}});

/* ---- backup / restore ---- */
const stamp=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds())};
const fltText=()=>[...tagSel].map(k=>'#'+((allTags().find(x=>x.t.toLowerCase()===k)||{t:k}).t)).join(' ');
const doBackup=all=>{save();const part=!all&&tagSel.size>0,list=part?pool():memos;
  if(part&&!list.length){say('No memos match the tag filter',1800);return}
  const data={app:'lwsm',version:1,exported:new Date().toISOString(),settings:{fontLevel:fsLv},memos:list};
  if(part){data.partial=true;data.filter=[...tagSel].map(k=>(allTags().find(x=>x.t.toLowerCase()===k)||{t:k}).t)}
  const slug=part?'-'+data.filter.join('+').replace(/[^\w\u3040-\u30ff\u3400-\u9fff+-]+/g,'_').slice(0,40):'';
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,1)],{type:'application/json'}));
  a.download='lwsm-backup'+slug+'-'+stamp()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  say('Backup saved ('+(part?list.length+' of '+memos.length+' memos, '+fltText():list.length+' memos')+')',2500)};
const parseBackup=t=>{let d;try{d=JSON.parse(t)}catch(e){return null}
  if(!d||d.app!=='lwsm'||!Array.isArray(d.memos))return null;const ms=[];
  for(const m of d.memos){if(!m||typeof m.id!=='string'||typeof m.text!=='string')continue;
    const o={id:m.id.slice(0,80),text:m.text,bg:/^#[0-9a-f]{6}$/i.test(m.bg)?m.bg:'',updated:Number.isFinite(m.updated)?m.updated:Date.now()};
    if(typeof m.name==='string'&&m.name.trim())o.name=m.name.trim().slice(0,80);
    if(Array.isArray(m.tags)){const tg=[];for(const x of m.tags){if(typeof x!=='string')continue;const n=norm(x);if(n&&!tg.some(z=>z.toLowerCase()===n.toLowerCase()))tg.push(n)}if(tg.length)o.tags=tg}
    if(title(o.text))ms.push(o)}
  return{memos:ms,fontLevel:d.settings&&d.settings.fontLevel,exported:d.exported,partial:d.partial===true,filter:Array.isArray(d.filter)?d.filter.filter(x=>typeof x==='string').map(norm).filter(Boolean).slice(0,10):[]}};
const startRestore=p=>{if(!p.memos.length){alert('This backup has no memos.');return}rest=p;
  const dt=new Date(p.exported),n=p.memos.length;
  $('rs').textContent=n+' memo'+(n>1?'s':'')+' in this backup'+(isNaN(dt)?'':' (made '+dt.toLocaleString()+')')+'. You have '+memos.length+' now.'+(p.partial?' This is a PARTIAL backup (only memos with tags: '+(p.filter.length?p.filter.map(t=>'#'+t).join(' '):'selected')+').':'');
  if(dD.open)dD.close();if(!dR.open)dR.showModal()};
const doMerge=()=>{if(!rest)return;save();let a=0,u=0;
  for(const m of rest.memos){const i=memos.findIndex(x=>x.id===m.id);if(i<0){memos.push(m);a++}else if(m.updated>memos[i].updated){memos[i]=m;u++}}
  const keep=memos.find(x=>x.id===cur.id)||memos.slice().sort((x,y)=>y.updated-x.updated)[0];
  load(keep,true);persist();rest=null;dR.close();say('Merged: '+a+' added, '+u+' updated',2500)};
const doReplace=()=>{if(!rest)return;
  const ft=rest.filter&&rest.filter.length?' (tags: '+rest.filter.map(t=>'#'+t).join(' ')+')':'';
  if(!confirm(!memos.length?'Load the backup ('+rest.memos.length+' memos)?':rest.partial?'This is a PARTIAL backup: it holds only some of your memos'+ft+'.\nReplacing ALL current memos ('+memos.length+') with these '+rest.memos.length+' will remove every other memo.\nA backup of the current memos is downloaded first.\n\nContinue?':'Replace ALL current memos ('+memos.length+') with the backup ('+rest.memos.length+')?\nA backup of the current memos is downloaded first.'))return;
  if(memos.length)doBackup(true);
  memos=rest.memos;const n=memos.length;if(Number.isInteger(rest.fontLevel)&&rest.fontLevel>=1&&rest.fontLevel<=5){fsLv=rest.fontLevel;applyFs(true)}
  tagSel.clear();drawFlt();load(memos.slice().sort((x,y)=>y.updated-x.updated)[0],true);persist();rest=null;dR.close();say('Restored '+n+' memos',2500)};
const ri=document.createElement('input');ri.type='file';ri.accept='.json,application/json';
ri.onchange=async()=>{const f=ri.files[0];ri.value='';if(!f)return;const p=parseBackup(await f.text());if(!p){alert('This is not a valid LWSM backup file.');return}startRestore(p)};
const openRestore=()=>ri.click();
const openData=()=>{if(dD.open)return;save();const n=memos.length,k=pool().length,part=tagSel.size>0;
  $('dn').textContent=part?'Backup will include '+k+' of '+n+' memos (tags: '+fltText()+'). Clear the tag filter to back up all memos.':n+' memo'+(n===1?'':'s')+' saved on this device.';
  $('bBk').textContent=part?'Backup '+k+' of '+n:'Backup';dD.showModal()};
$('fx').onclick=()=>{tagSel.clear();drawFlt();if(dL.open)drawList()};$('bTag').onclick=openTags;$('tgs').addEventListener('click',openTags);$('bGear').onclick=openData;$('xD').onclick=()=>dD.close();$('xG').onclick=()=>dG.close();$('bGa').onclick=()=>addTag(gi.value);
gi.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();addTag(gi.value)}});
$('xM').onclick=()=>dM.close();$('xR').onclick=()=>dR.close();
$('bTagM').onclick=openMng;$('bBk').onclick=()=>doBackup();$('bRs').onclick=openRestore;
$('bMerge').onclick=doMerge;$('bRepl').onclick=doReplace;

/* rename: double-click / double-tap the title */
const openTitle=()=>{if(dT.open)return;if(!title(cur.text)){alert('Type some text first, then rename the memo.');return}ti.value=ttl(cur);dT.showModal();ti.focus();ti.select()};
const saveTitle=()=>{const v=ti.value.trim().replace(/\s+/g,' ').slice(0,80);if(v)cur.name=v;else delete cur.name;setTitle();save();dT.close()};
tt.addEventListener('dblclick',openTitle);
let tapT=0,tapX=0,tapY=0;
tt.addEventListener('pointerup',e=>{if(e.pointerType!=='touch')return;const n=Date.now();
  if(n-tapT<350&&Math.abs(e.clientX-tapX)<30&&Math.abs(e.clientY-tapY)<30){tapT=0;openTitle()}else{tapT=n;tapX=e.clientX;tapY=e.clientY}});
$('bTi').onclick=saveTitle;$('xT').onclick=()=>dT.close();
ti.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();saveTitle()}});

/* swipe left/right in preview (touch only): next / previous memo */
let sx=0,sy=0,dx=0,sm=null;
const inHScroll=el=>{for(;el&&el!==pv;el=el.parentElement)if(el.scrollWidth>el.clientWidth+1&&/auto|scroll/.test(getComputedStyle(el).overflowX))return true;return false};
const back=()=>{pv.style.transition='transform .18s';pv.style.transform=''};
pv.addEventListener('touchstart',e=>{dx=0;sm=null;const t=e.touches[0];
  if(!preview||!canRotate()||e.touches.length!==1||t.clientX<24||t.clientX>innerWidth-24||pv.scrollWidth>pv.clientWidth+1||inHScroll(e.target)){sm='x';return}
  sx=t.clientX;sy=t.clientY},{passive:true});
pv.addEventListener('touchmove',e=>{if(sm==='x'||sm==='v')return;const t=e.touches[0];dx=t.clientX-sx;const dy=t.clientY-sy;
  if(!sm){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;sm=Math.abs(dx)>Math.abs(dy)*1.5?'h':'v';if(sm==='h')pv.style.transition='none'}
  if(sm==='h'){e.preventDefault();pv.style.transform='translateX('+dx+'px)'}},{passive:false});
pv.addEventListener('touchend',()=>{const h=sm==='h';sm=null;if(!h)return;
  const w=pv.clientWidth;if(Math.abs(dx)<Math.min(110,w*.25)){back();return}
  const d=dx<0?1:-1;pv.style.transition='transform .14s ease-in';pv.style.transform='translateX('+(-d*w)+'px)';
  setTimeout(()=>{rotate(d);pv.style.transition='none';pv.style.transform='translateX('+(d*w)+'px)';void pv.offsetWidth;
    pv.style.transition='transform .18s ease-out';pv.style.transform=''},150)});
pv.addEventListener('touchcancel',()=>{if(sm==='h')back();sm=null});

/* ---- outline (table of contents) for the preview ---- */
const OLK='lwsm.outline',bOut=$('bOut'),olNav=$('outline'),olUl=$('ol'),sOut=$('sOut');
let olOn=true,heads=[],olRaf=0;try{olOn=localStorage.getItem(OLK)!=='0'}catch(e){}
const olNarrow=()=>matchMedia('(max-width:520px)').matches;
const olClose=()=>{olNav.hidden=true;bOut.setAttribute('aria-expanded','false')};
const olUpdate=()=>{const can=olOn&&preview&&heads.length>0&&pv.scrollHeight>pv.clientHeight+8;bOut.hidden=!can;if(!can)olClose()};
const olSpy=()=>{olRaf=0;if(olNav.hidden)return;const top=pv.getBoundingClientRect().top+(olNarrow()?24:bar.offsetHeight+24);let c=0;
  heads.forEach((h,i)=>{if(h.getBoundingClientRect().top<=top)c=i});
  [...olUl.querySelectorAll('button')].forEach((b,i)=>b.classList.toggle('cur',i===c));
  const li=olUl.children[c];if(li)li.scrollIntoView({block:'nearest'})};
const olGo=i=>{const h=heads[i];if(!h)return;const m=olNarrow()?12:bar.offsetHeight+8;
  pv.scrollTo({top:pv.scrollTop+h.getBoundingClientRect().top-pv.getBoundingClientRect().top-m,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});olClose()};
const olBuild=()=>{olClose();heads=[...pv.querySelectorAll('h1,h2,h3,h4,h5,h6')];olUl.textContent='';
  const min=Math.min(6,...heads.map(h=>+h.tagName[1]));
  heads.forEach((h,i)=>{const li=document.createElement('li'),b=document.createElement('button');b.type='button';
    b.textContent=h.textContent.trim()||'(untitled)';b.title=b.textContent;b.style.paddingLeft=(8+(+h.tagName[1]-min)*14)+'px';b.onclick=()=>olGo(i);li.append(b);olUl.append(li)});
  olUpdate()};
const olToggle=()=>{if(bOut.hidden)return;const open=olNav.hidden;olNav.hidden=!open;bOut.setAttribute('aria-expanded',open);if(open)olSpy()};
bOut.onclick=olToggle;
sOut.checked=olOn;sOut.addEventListener('change',()=>{olOn=sOut.checked;try{localStorage.setItem(OLK,olOn?'1':'0')}catch(e){}olUpdate()});
pv.addEventListener('scroll',()=>{if(!olNav.hidden&&!olRaf)olRaf=requestAnimationFrame(olSpy)},{passive:true});
pv.addEventListener('click',()=>{if(!olNav.hidden)olClose()});
pv.addEventListener('load',olUpdate,true);
new ResizeObserver(olUpdate).observe(pv);

/* settings: memo text size (5 levels, remembered) */
const FS=[12,14,16,20,24],FN=['Extra small','Small','Medium','Large','Extra large'],KF='lwsm.fs';
let fsLv=3;try{const v=+localStorage.getItem(KF);if(v>=1&&v<=5)fsLv=v}catch(e){}
const applyFs=(keep)=>{clearHit();olUpdate();document.documentElement.style.setProperty('--fs',FS[fsLv-1]+'px');fsr.value=fsLv;$('fo').textContent=FN[fsLv-1]+' ('+FS[fsLv-1]+'px)';
  if(keep)try{localStorage.setItem(KF,fsLv)}catch(e){}};
const openSet=()=>{if(!dS.open)dS.show();fsr.focus()};
fsr.addEventListener('input',()=>{fsLv=+fsr.value;applyFs(true)});
$('bFsR').onclick=()=>{fsLv=3;applyFs(true)};
$('bSet').onclick=openSet;$('xS').onclick=()=>dS.close();
const toast=$('toast');let toastT;
const say=(t,ms)=>{toast.textContent=t;toast.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>toast.classList.remove('on'),ms||1200)};
const fsStep=d=>{const n=Math.max(1,Math.min(5,fsLv+d));fsLv=n;applyFs(true);say('Text size: '+FN[n-1]+' ('+FS[n-1]+'px)')};
applyFs();

/* start: last used memo, in preview */
const last=memos.find(m=>m.id===localStorage.getItem(KC))||memos.slice().sort((a,b)=>b.updated-a.updated)[0];
if(last)load(last,true);else{load(newMemo(),false);ed.focus()}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
