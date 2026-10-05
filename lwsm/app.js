(()=>{
const $=id=>document.getElementById(id);
const KM='lwsm.memos',KC='lwsm.cur';
const ed=$('ed'),pv=$('pv'),sw=$('sw'),bg=$('bg'),bar=$('bar'),box=$('content');
const dF=$('dFind'),kw=$('kw'),rp=$('rp'),all=$('all'),cs=$('cs'),st=$('st');
const dT=$('dTitle'),ti=$('ti'),tt=$('ttl');
const dL=$('dList'),fl=$('fl'),ul=$('ul');
let ly=0,memos=[],cur,preview=true,timer,sel=0,view=[];
try{memos=JSON.parse(localStorage.getItem(KM)||'[]')}catch(e){}

const newMemo=()=>({id:crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),text:'',bg:'',updated:Date.now()});
const strip=l=>l.replace(/<[^>]*>/g,'').replace(/^[\s#>*\-+`_~|=]+/,'').trim();
const title=t=>{for(const l of t.split('\n')){const s=strip(l);if(s)return s.slice(0,80)}return''};
const ttl=m=>m.name||title(m.text);
const BASE='Light Weight Simple Memo';
const setTitle=()=>{const t=cur&&ttl(cur);document.title=t?t+' - '+BASE:BASE;const h=$('ttl');h.textContent=t||'Untitled';h.title=t?t+'\n(Double-click to rename)':'';h.style.opacity=t?'':'.5'};
const isHtml=t=>/^\s*<(!doctype|html|head|body|[a-z][\w-]*)[\s>\/]/i.test(t);
const fg=c=>{const n=parseInt(c.slice(1),16);return((n>>16)*299+(n>>8&255)*587+(n&255)*114)/1000>150?'#111':'#f2f2f2'};
const esc=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

const persist=()=>{try{localStorage.setItem(KM,JSON.stringify(memos));localStorage.setItem(KC,cur.id)}catch(e){alert('Storage is full or unavailable.')}};
const save=()=>{clearTimeout(timer);if(!title(cur.text))return false;cur.updated=Date.now();if(!memos.includes(cur)){const i=memos.findIndex(m=>m.id===cur.id);i<0?memos.push(cur):memos[i]=cur}persist();return true};
const changed=()=>{cur.text=ed.value;setTitle();clearTimeout(timer);timer=setTimeout(save,400)};

const clean=h=>{const d=new DOMParser().parseFromString(h,'text/html');
  d.querySelectorAll('script,style,iframe,object,embed,link,meta,base,form').forEach(e=>e.remove());
  d.body.querySelectorAll('*').forEach(e=>{[...e.attributes].forEach(a=>{const n=a.name.toLowerCase();
    if(n.startsWith('on')||(/^(href|src|xlink:href|action|formaction)$/.test(n)&&/^\s*(javascript:|data:text\/html)/i.test(a.value)))e.removeAttribute(a.name)});
    if(e.tagName==='A'&&!(e.getAttribute('href')||'').startsWith('#')){e.target='_blank';e.rel='noopener noreferrer'}});
  return d.body.innerHTML};
const render=t=>clean(isHtml(t)?t:(window.marked?marked.parse(t,{gfm:true,breaks:true}):'<pre>'+esc(t)+'</pre>'));

const applyBg=()=>{const c=cur.bg;box.style.background=c;box.style.color=c?fg(c):'';box.style.setProperty('--link',c?fg(c):'');
  bg.value=c||(matchMedia('(prefers-color-scheme:dark)').matches?'#171d1a':'#ffffff')};
const setMode=(p,focus)=>{preview=p;if(p)pv.innerHTML=render(cur.text);sw.checked=p;ed.hidden=p;pv.hidden=!p;bar.classList.remove('hide');if(!p&&focus)ed.focus()};
const load=(m,p)=>{cur=m;setTitle();ed.value=m.text;applyBg();ed.hidden=pv.hidden=false;ed.scrollTop=pv.scrollTop=0;ly=0;setMode(p);try{localStorage.setItem(KC,m.id)}catch(e){}};
const rotate=d=>{save();if(!memos.length)return;const i=memos.findIndex(m=>m.id===cur.id);
  const n=memos[i<0?(d>0?0:memos.length-1):(i+d+memos.length)%memos.length];
  if(n.id===cur.id)return;n.updated=Date.now();load(n,preview);persist()};
const doNew=()=>{save();load(newMemo(),false);ed.focus()};

/* import / export */
const fi=document.createElement('input');fi.type='file';fi.accept='.md,.markdown,.txt,.html,.htm,text/*';
fi.multiple=true;
const importFile=async f=>{
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
  m.style.cssText='position:absolute;visibility:hidden;top:0;left:0;box-sizing:border-box;white-space:pre-wrap;overflow-wrap:break-word;width:'+ed.clientWidth+'px';
  ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','paddingLeft','paddingRight','tabSize'].forEach(p=>m.style[p]=cs[p]);
  m.textContent=ed.value.slice(0,i);const s=document.createElement('span');s.textContent='|';m.append(s);document.body.append(m);
  const y=s.offsetTop+(parseFloat(cs.paddingTop)||0);m.remove();return y};
/* select the hit in the editor so it is highlighted, keep the dialog open, scroll the hit below the dialog */
const showHit=(i,len)=>{
  if(matchMedia('(pointer:coarse)').matches)ed.readOnly=true;  /* no soft keyboard while searching */
  ed.focus({preventScroll:true});ed.setSelectionRange(i,i+len);
  const db=dF.open?dF.getBoundingClientRect().bottom-ed.getBoundingClientRect().top:0;
  const want=Math.min(Math.max(db+28,ed.clientHeight*.4),ed.clientHeight-120);
  ed.scrollTop=Math.max(0,yOf(i)-want)};
const find=()=>{const k=kw.value;if(!k)return false;if(preview)setMode(false);
  const t=cs.checked?ed.value:ed.value.toLowerCase(),q=cs.checked?k:k.toLowerCase();let i=t.indexOf(q,ed.selectionEnd);if(i<0)i=t.indexOf(q);
  if(i<0){stat('Not found');return false}
  showHit(i,k.length);stat('Found');return true};
const replace=()=>{const k=kw.value;if(!k)return;if(preview)setMode(false);const r=rp.value;
  if(all.checked){let n=0;ed.value=ed.value.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),cs.checked?'g':'gi'),()=>(n++,r));stat(n+' replaced');changed();return}
  const a=ed.selectionStart,b=ed.selectionEnd;
  if(a!==b&&(cs.checked?ed.value.slice(a,b)===k:ed.value.slice(a,b).toLowerCase()===k.toLowerCase())){ed.setRangeText(r,a,b,'end');changed()}
  find()};

/* list */
const drawList=()=>{const q=fl.value.trim().toLowerCase();
  view=memos.slice().sort((a,b)=>b.updated-a.updated).filter(m=>!q||ttl(m).toLowerCase().includes(q)||m.text.toLowerCase().includes(q));
  sel=Math.max(0,Math.min(sel,view.length-1));ul.innerHTML='';
  view.forEach((m,i)=>{const li=document.createElement('li');if(i===sel)li.className='on';
    li.innerHTML='<span></span><button tabindex="-1" aria-label="Delete memo">×</button>';
    li.firstChild.textContent=ttl(m);li.onclick=()=>openMemo(m);
    li.lastChild.onclick=e=>{e.stopPropagation();del(m)};ul.append(li)});
  const on=ul.querySelector('.on');if(on)on.scrollIntoView({block:'nearest'})};
const openList=()=>{save();fl.value='';sel=0;drawList();if(!dL.open)dL.showModal();fl.focus()};
const openMemo=m=>{save();m.updated=Date.now();load(m,true);persist();dL.close()};
const del=m=>{if(!confirm('Delete "'+(ttl(m)||'this memo')+'"?'))return;
  memos=memos.filter(x=>x.id!==m.id);
  if(cur.id===m.id){const n=memos.slice().sort((a,b)=>b.updated-a.updated)[0];n?load(n,true):load(newMemo(),false)}
  persist();drawList()};
const doDelete=()=>{if(!cur.text&&!memos.some(m=>m.id===cur.id))return;del(cur)};
const delAll=()=>{if(!memos.length||!confirm('Delete all '+memos.length+' memos?'))return;memos=[];load(newMemo(),false);persist();dL.close();ed.focus()};

/* events */
ed.addEventListener('input',changed);
ed.addEventListener('focus',()=>{if(!ed.readOnly)document.body.classList.add('editing')});
ed.addEventListener('blur',()=>{ed.readOnly=false;document.body.classList.remove('editing')});
ed.addEventListener('pointerdown',()=>{if(ed.readOnly){ed.readOnly=false;ed.blur()}});
$('done').onclick=()=>ed.blur();
sw.addEventListener('change',()=>setMode(sw.checked,true));
bg.addEventListener('input',()=>{cur.bg=bg.value;applyBg();changed()});
$('bRst').onclick=()=>{cur.bg='';applyBg();changed()};
$('bNew').onclick=doNew;$('bImp').onclick=doImport;$('bExp').onclick=doExport;$('bDel').onclick=doDelete;$('bPrev').onclick=()=>rotate(-1);$('bNext').onclick=()=>rotate(1);$('bFind').onclick=openFind;$('bList').onclick=openList;
$('xF').onclick=()=>dF.close();$('xL').onclick=()=>dL.close();
$('bDoFind').onclick=find;$('bDoRep').onclick=replace;$('bDelAll').onclick=delAll;
kw.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();find()}});
rp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();replace()}});
fl.addEventListener('input',()=>{sel=0;drawList()});
dL.addEventListener('close',()=>{if(!preview)ed.focus()});
dL.addEventListener('keydown',e=>{if(e.isComposing)return;const k=e.key,inF=document.activeElement===fl;
  const mv=d=>{e.preventDefault();if(view.length){sel=(sel+d+view.length)%view.length;drawList()}};
  if(e.ctrlKey&&k==='n'||k==='ArrowDown')mv(1);
  else if(e.ctrlKey&&k==='p'||k==='ArrowUp')mv(-1);
  else if(k==='Delete'&&(!inF||fl.selectionStart===fl.value.length)){e.preventDefault();if(view[sel])del(view[sel])}
  else if((k===' '&&(!inF||!fl.value))||k==='Enter'){e.preventDefault();if(view[sel])openMemo(view[sel])}});
/* bracket keys differ by keyboard layout and Option on macOS, so map by layout */
const kc={'[':'BracketLeft',']':'BracketRight'};
if(navigator.keyboard&&navigator.keyboard.getLayoutMap)navigator.keyboard.getLayoutMap().then(m=>{for(const[c,v]of m)if(v==='['||v===']')kc[v]=c}).catch(()=>{});
document.addEventListener('keydown',e=>{if(dL.open||dT.open)return;const c=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();
  if(dF.open){if(e.key==='F9'){e.preventDefault();kw.focus();kw.select()}else if(e.key==='Escape'){e.preventDefault();dF.close()}return}
  const run=f=>{e.preventDefault();f()},al=e.altKey&&!c,kb=x=>e.key===x||e.code===kc[x];
  if(e.key==='F11')run(doNew);else if(c&&k==='o')run(doImport);else if(c&&k==='s')run(doExport);else if(e.key==='F9')run(openFind);
  else if(al&&kb(']'))run(()=>rotate(1));else if(al&&kb('['))run(()=>rotate(-1));else if(al&&e.key==='Delete')run(doDelete);else if(e.key==='F10')run(openList);else if(e.key==='F2')run(()=>setMode(!preview,true))});
pv.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||(a.getAttribute('href')||'').startsWith('#'))return;
  e.preventDefault();window.open(a.href,'_blank','noopener,noreferrer')});
const onScroll=e=>{const y=e.target.scrollTop;if(y>ly+8&&y>60)bar.classList.add('hide');else if(y<ly-8||y<=0)bar.classList.remove('hide');ly=y};
ed.addEventListener('scroll',onScroll);pv.addEventListener('scroll',onScroll);
const flush=()=>{if(cur&&!ed.hidden)cur.text=ed.value;if(cur)save()};
addEventListener('pagehide',flush);document.addEventListener('visibilitychange',()=>{if(document.hidden)flush()});
new ResizeObserver(()=>box.style.setProperty('--hh',bar.offsetHeight+'px')).observe(bar);

/* drag & drop files */
let dc=0;const hasF=e=>e.dataTransfer&&[...e.dataTransfer.types].includes('Files');
addEventListener('dragenter',e=>{if(!hasF(e))return;e.preventDefault();dc++;document.body.classList.add('drop')});
addEventListener('dragover',e=>{if(hasF(e)){e.preventDefault();e.dataTransfer.dropEffect='copy'}});
addEventListener('dragleave',e=>{if(hasF(e)&&--dc<=0){dc=0;document.body.classList.remove('drop')}});
addEventListener('drop',async e=>{if(!hasF(e))return;e.preventDefault();dc=0;document.body.classList.remove('drop');
  const fs=[...e.dataTransfer.files];if(dL.open)dL.close();if(dF.open)dF.close();for(const f of fs)await importFile(f)});

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
  if(!preview||memos.length<2||e.touches.length!==1||t.clientX<24||t.clientX>innerWidth-24||pv.scrollWidth>pv.clientWidth+1||inHScroll(e.target)){sm='x';return}
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

/* start: last used memo, in preview */
const last=memos.find(m=>m.id===localStorage.getItem(KC))||memos.slice().sort((a,b)=>b.updated-a.updated)[0];
if(last)load(last,true);else{load(newMemo(),false);ed.focus()}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
