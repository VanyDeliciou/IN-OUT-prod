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

const grid = document.getElementById("workGrid");

projects.forEach(project => {
  const card = document.createElement("article");
  card.className = "work-card";

  card.innerHTML = `
    <div class="work-thumb">
      <img 
        class="thumb" 
        src="https://i.ytimg.com/vi/${project.id}/hqdefault.jpg" 
        alt="${project.title}" 
        loading="lazy"
      >

      <div class="work-error">
        A capa deste vídeo não está disponível.<br>
        Clique para abrir o vídeo no YouTube.
      </div>

      <span class="play">▶</span>
    </div>

    <div class="work-info">
      <h3>${project.title}</h3>
      <span>${project.type}</span>
    </div>
  `;

  const img = card.querySelector(".thumb");

  img.addEventListener("error", () => {
    img.style.display = "none";
    card.querySelector(".work-error").style.display = "flex";
  });

  /*
    Ao clicar no trabalho, abre diretamente
    o vídeo no YouTube em uma nova aba.
  */
  card.addEventListener("click", () => {
    window.open(
      `https://www.youtube.com/watch?v=${project.id}`,
      "_blank"
    );
  });

  grid.appendChild(card);
});


/* =========================
   VIDEO MODAL
========================= */

const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");
const fallback = document.getElementById("youtubeFallback");

function openVideo(id) {
  frame.src =
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

  fallback.href =
    `https://www.youtube.com/watch?v=${id}`;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeVideo() {
  frame.src = "";

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

document
  .querySelectorAll("[data-close]")
  .forEach(el => el.addEventListener("click", closeVideo));


document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeVideo();
  }
});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/*
  O efeito de camadas é feito pelo CSS:
  o hero fica por baixo enquanto a secção seguinte
  sobe por cima dele.
*/


/* =========================
   SERVIÇOS — DESTAQUE AUTOMÁTICO
========================= */

const serviceItems =
  Array.from(document.querySelectorAll(".service"));

if (serviceItems.length) {

  const updateActiveService = () => {

    const centerY = window.innerHeight * 0.5;

    let closest = null;
    let distance = Infinity;

    serviceItems.forEach(item => {

      const r = item.getBoundingClientRect();

      const itemCenter =
        r.top + r.height / 2;

      const d =
        Math.abs(itemCenter - centerY);

      if (
        r.bottom > 0 &&
        r.top < window.innerHeight &&
        d < distance
      ) {
        distance = d;
        closest = item;
      }

    });

    serviceItems.forEach(item => {
      item.classList.toggle(
        "auto-active",
        item === closest
      );
    });
  };


  let ticking = false;

  const onScroll = () => {

    if (!ticking) {

      requestAnimationFrame(() => {

        updateActiveService();

        ticking = false;

      });

      ticking = true;
    }
  };


  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    updateActiveService
  );


  updateActiveService();
}
