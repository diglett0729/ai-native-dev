// 외부 의존성 없는 최소 예제. 문서 렌더러는 제목·문단·목록·코드 블록만 지원합니다.
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let slides=[], index=0, opener=null, requestId=0;
async function read(path){const r=await fetch(path);if(!r.ok)throw Error(`파일을 읽지 못했습니다: ${path}`);return r.text();}
function markdown(text){
 let code=false,buf=[],out=[],list=false;
 const endList=()=>{if(list){out.push('</ul>');list=false;}};
 for(const line of text.split(/\r?\n/)){
  if(line.startsWith('```')){endList();if(code){out.push('<pre><code>'+esc(buf.join('\n'))+'</code></pre>');buf=[];}code=!code;continue;}
  if(code){buf.push(line);continue;}
  if(line.startsWith('- ')){if(!list){out.push('<ul>');list=true;}out.push('<li>'+esc(line.slice(2))+'</li>');continue;}
  endList();const h=line.match(/^(#{1,6}) (.*)/);
  if(h)out.push(`<h${h[1].length}>${esc(h[2])}</h${h[1].length}>`);
  else if(line.trim())out.push('<p>'+esc(line)+'</p>');
 }
 endList();if(code)out.push('<pre><code>'+esc(buf.join('\n'))+'</code></pre>');return out.join('');
}
function openViewer(title){opener=document.activeElement;$('#viewer-title').textContent=title;$('#viewer-body').textContent='불러오는 중…';$('#viewer').showModal();}
$('#close').onclick=()=>$('#viewer').close();
$('#viewer').addEventListener('close',()=>{requestId++;opener?.focus();});
$('#theme').onchange=()=>{document.documentElement.dataset.theme=$('#theme').value;try{localStorage.setItem('theme',$('#theme').value);}catch{}};
try{const theme=localStorage.getItem('theme');if(['paper','slate','warm'].includes(theme)){$('#theme').value=theme;document.documentElement.dataset.theme=theme;}}catch{}
function render(){
 index=Math.max(0,slides.findIndex(s=>'#'+s.id===location.hash));const s=slides[index];
 $('#nav').innerHTML=slides.map((x,i)=>`<a href="#${x.id}" ${i===index?'aria-current="step"':''}>${i+1}. ${esc(x.title)}</a>`).join('');
 $('#main').innerHTML=`<div class="eyebrow">WORKFLOW / 0${index+1}</div><h1>${esc(s.title)}</h1><p class="lead">${esc(s.description)}</p>`+
 (index===0?'<div class="flow" aria-label="개발 순서">'+slides.map((x,i)=>`<a href="#${i===0?'spec':x.id}"><small>0${i+1}</small><br>${esc(['요구사항','설계','계획','구현·검증','리뷰·PR'][i])}</a>`).join('')+'</div>':'')+
 `<div class="grid"><section><div class="card"><h2>이 단계에서 하는 일</h2><ul>${s.bullets.map(b=>'<li>'+esc(b)+'</li>').join('')}</ul></div>`+
 s.images.map((im,i)=>`<figure class="card" style="margin-left:0;margin-right:0"><button class="image-button" data-image="${i}" aria-label="이미지 확대"><img src="${esc(im.path)}" alt="${esc(im.alt)}"></button><figcaption class="caption">${esc(im.caption)}</figcaption></figure>`).join('')+
 `</section><aside><div class="card"><h3>관련 문서</h3>${s.documents.length?s.documents.map((d,i)=>`<p>${esc(d.summary)}</p><button data-doc="${i}">${esc(d.title)} 전문 보기 ↗</button>`).join(''):'<p>2~5장에서 샘플 문서를 열어보세요.</p>'}</div><div class="card"><h3>운영 팁</h3>${s.tips.map(t=>`<details><summary>${esc(t.title)}</summary><p>${esc(t.body)}</p></details>`).join('')}</div></aside></div>`+
 `<footer>${index?`<a href="#${slides[index-1].id}">← 이전</a>`:'<span></span>'}<span>${index+1} / ${slides.length}</span>${index<slides.length-1?`<a href="#${slides[index+1].id}">다음 →</a>`:'<a href="#overview">처음으로 ↑</a>'}</footer>`;
 document.querySelectorAll('[data-doc]').forEach(b=>b.onclick=async()=>{const d=s.documents[+b.dataset.doc];openViewer(d.title);const id=++requestId;try{const text=await read(d.path);if(id===requestId)$('#viewer-body').innerHTML=markdown(text);}catch(e){if(id===requestId)$('#viewer-body').textContent=e.message;}});
 document.querySelectorAll('[data-image]').forEach(b=>b.onclick=()=>{const im=s.images[+b.dataset.image];openViewer(im.caption);$('#viewer-body').innerHTML=`<img src="${esc(im.path)}" alt="${esc(im.alt)}">`;});
}
window.addEventListener('hashchange',()=>{if(slides.length){render();window.scrollTo(0,0);}});
read('content/slides.json').then(t=>{slides=JSON.parse(t);render();}).catch(e=>{$('#main').textContent=e.message+' — README의 로컬 서버 실행 방법을 확인하세요.';});
