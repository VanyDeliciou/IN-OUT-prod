const projects = [
  { id:"hq6SP8MSP14", title:"Projecto 01", type:"Vídeo / Campanha" },
  { id:"BDuB3sljbr0", title:"Projecto 02", type:"Vídeo / Campanha" },
  { id:"YnOdwbhGFw0", title:"Projecto 03", type:"Conteúdo de Marca" },
  { id:"xLf9pM8WhDY", title:"Projecto 04", type:"Activação" },
  { id:"Ar6Mx4_kl0I", title:"Projecto 05", type:"Conteúdo de Marca" },
  { id:"H9D54OGxfKA", title:"Projecto 06", type:"Vídeo / Campanha" },
  { id:"AI9wNBHU128", title:"Projecto 07", type:"Activação" },
  { id:"5oB9BkNQnko", title:"Projecto 08", type:"Vídeo / Campanha" },
  { id:"RJQbu4jp8p4", title:"Projecto 09", type:"Produção Audiovisual" },
  { id:"u4pOAJRTmrA", title:"Projecto 10", type:"Vídeo / Campanha" }
];

const grid=document.getElementById("workGrid");

projects.forEach(project=>{
  const card=document.createElement("article");
  card.className="work-card";
  card.innerHTML=`
    <div class="work-thumb">
      <img class="thumb" src="https://i.ytimg.com/vi/${project.id}/hqdefault.jpg" alt="${project.title}" loading="lazy">
      <div class="work-error">A capa deste vídeo não está disponível.<br>Clique para abrir o vídeo no YouTube.</div>
      <span class="play">▶</span>
    </div>
    <div class="work-info">
      <h3>${project.title}</h3>
      <span>${project.type}</span>
    </div>`;

  const img=card.querySelector(".thumb");
  img.addEventListener("error",()=>{
    img.style.display="none";
    card.querySelector(".work-error").style.display="flex";
  });

  card.addEventListener("click",()=>{
    window.open(`https://www.youtube.com/watch?v=${project.id}`, "_blank");
  });
  grid.appendChild(card);
});

const modal=document.getElementById("videoModal");
const frame=document.getElementById("videoFrame");
const fallback=document.getElementById("youtubeFallback");

function openVideo(id){
  frame.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  fallback.href=`https://www.youtube.com/watch?v=${id}`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeVideo(){
  frame.src="";
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeVideo));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeVideo()});
document.getElementById("year").textContent=new Date().getFullYear();

/* O efeito de camadas é feito pelo CSS: o hero fica por baixo enquanto a secção seguinte sobe por cima dele. */

/* Serviços: destaca automaticamente a linha mais próxima do centro do ecrã durante o scroll. */
const servicesSection = document.getElementById("servicos");
const serviceRows = Array.from(document.querySelectorAll(".service"));
let serviceTicking = false;

function updateActiveService(){
  serviceTicking = false;
  if(!servicesSection || !serviceRows.length) return;

  const sectionRect = servicesSection.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;

  /* Só aplica o efeito quando a secção de serviços está visível. */
  if(sectionRect.bottom <= 0 || sectionRect.top >= window.innerHeight){
    serviceRows.forEach(row => row.classList.remove("auto-active"));
    return;
  }

  let closest = null;
  let closestDistance = Infinity;

  serviceRows.forEach(row => {
    const rect = row.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < window.innerHeight;
    if(!visible) return;

    const center = rect.top + rect.height / 2;
    const distance = Math.abs(center - viewportCenter);
    if(distance < closestDistance){
      closestDistance = distance;
      closest = row;
    }
  });

  serviceRows.forEach(row => row.classList.toggle("auto-active", row === closest));
}

function requestServiceUpdate(){
  if(serviceTicking) return;
  serviceTicking = true;
  requestAnimationFrame(updateActiveService);
}

window.addEventListener("scroll", requestServiceUpdate, {passive:true});
window.addEventListener("resize", requestServiceUpdate);
window.addEventListener("load", updateActiveService);
