const LOGS = [
  {
    id: "af-001",
    kind: "video",
    stamp: "TRANSMISSION",
    title: "Can Anglofuturism save Britain?",
    blurb: "Aris Roussinos and Tom Ough unpack the idea on UnHerd: high modernism without the managed-decline script.",
    thumb: "assets/hero.jpg",
    wide: true,
    body: "The originating public conversation. Not a party broadcast. A reminder that a country can still want things larger than the next fiscal event.",
    video: "https://www.youtube.com/embed/r6yZoU9DanE",
    link: "https://unherd.com/watch-listen/can-anglofuturism-save-britain/",
    linkLabel: "Watch on UnHerd"
  },
  {
    id: "af-002",
    kind: "essay",
    stamp: "FOUNDING NOTE",
    title: "It's time for Anglofuturism",
    blurb: "The 2022 UnHerd essay that named the mood: nuclear county towns, houses people can live in, rail that actually arrives.",
    thumb: "assets/log-knights.jpg",
    body: "Roussinos's original sketch is still the cleanest public definition: fuse the can-do of postwar high modernism with a landscape that still looks like a place, not a logistics park. Generational infrastructure. Cheap energy. Homes. Farms that feed the country. The state as a builder again, not a commentator.",
    link: "https://unherd.com/2022/08/its-time-for-anglofuturism/",
    linkLabel: "Read the essay"
  },
  {
    id: "af-003",
    kind: "essay",
    stamp: "FIELD NOTE",
    title: "The envelope is not the sky",
    blurb: "Internal briefing. How a narrow Overton window became a substitute for ambition — and why this archive exists.",
    thumb: "assets/paper.jpg",
    body: "Official Britain talks as if the available futures are a short menu: manage decline politely, decorate it with targets, and treat any larger proposal as a category error. That is an envelope, not a country. Anglofuturism, in this station's use of the word, is the refusal to let the current Overton window pose as physical law. Energy abundance, beautiful density, completed railways, workshops, orbital industry, Antarctic research, tidal barrages — these are engineering and institutional problems. They are allowed to be discussed. They are allowed to be wanted.",
    hash: "#envelope"
  },
  {
    id: "af-004",
    kind: "audio",
    stamp: "STATION FEED",
    title: "The Anglofuturism podcast",
    blurb: "Tom Ough and Calum Drysdale, allegedly broadcasting from a thatched space station. Interviews with people who still want to build.",
    thumb: "assets/log-galleon.jpg",
    body: "The most sustained public workshop the movement has. Housing, crime, spaceports, factories, state capacity. Listen as a dossier, not as content.",
    link: "https://www.anglofuturism.co/about",
    linkLabel: "Open the station"
  },
  {
    id: "af-005",
    kind: "essay",
    stamp: "CIRCULATE",
    title: "Embrace Anglofuturism",
    blurb: "CapX on jolting Britain out of its stupor: intergenerational projects that still feel like home.",
    thumb: "assets/log-blitz.jpg",
    body: "A compact case for ambition as policy rather than vibe. Artificial islands, spaceports, geothermal, factories, the unfashionable idea that a country can decide to be good at things again.",
    link: "https://capx.co/embrace-anglofuturism-we-can-jolt-britain-out-of-its-stupor",
    linkLabel: "Read at CapX"
  },
  {
    id: "af-006",
    kind: "essay",
    stamp: "COUNTER-BRIEF",
    title: "The progressive case for Anglofuturism",
    blurb: "New Statesman: there is nothing left-wing about a country that cannot build.",
    thumb: "assets/log-pit.jpg",
    body: "Useful because it breaks the reflex that optimism about national capacity must belong to one bench. If your politics needs houses, energy, and industry, it needs a country that can deliver them.",
    link: "https://www.newstatesman.com/ideas/2025/11/the-progressive-case-for-anglofuturism",
    linkLabel: "Read at New Statesman"
  },
  {
    id: "af-007",
    kind: "policy",
    stamp: "DOSSIER",
    title: "Isambard Envoys & the policy shelf",
    blurb: "A stockroom, not a manifesto: competency, energy, infrastructure, the unembarrassed study of states that still work.",
    thumb: "assets/log-civil.jpg",
    body: "The existing Anglofuturism policy shelf treats ideas as tools to be lifted. That is the correct posture. This archive does the same: no party ownership, no blood-and-soil romance, no permission structure. Read, argue, steal.",
    link: "https://anglofuturism.net/policies/",
    linkLabel: "Open the policy shelf"
  },
  {
    id: "af-008",
    kind: "policy",
    stamp: "OPEN SKY",
    title: "Horizons: a skies-the-limit brief",
    blurb: "County-town reactors. Finished railways. Georgian new towns. Cornish spaceport. A Festival of Britain that is not a museum.",
    thumb: "assets/log-storm.jpg",
    wide: true,
    body: "A working list of futures that fit in an envelope only if you fold the paper wrong. Built for argument, not reverence.",
    hash: "#horizons"
  }
];

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function transit(fn) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fn();
    return;
  }
  if (document.startViewTransition) {
    document.startViewTransition(fn);
  } else {
    fn();
  }
}

function paintLogs(filter = "all") {
  const root = document.getElementById("logs");
  if (!root) return;
  const items = LOGS.filter((l) => filter === "all" || l.kind === filter);
  root.innerHTML = "";
  items.forEach((log) => {
    const card = el(`
      <button class="log ${log.wide ? "wide" : ""}" data-id="${log.id}" type="button" style="view-transition-name: log-${log.id}">
        <img class="thumb" src="${log.thumb}" alt="">
        <div class="body">
          <div class="kind">${log.stamp} · ${log.kind}</div>
          <h3>${log.title}</h3>
          <p>${log.blurb}</p>
          <div class="file-no">unfiled · ${log.id.toUpperCase()} · pass on</div>
        </div>
      </button>`);
    card.addEventListener("click", () => openLog(log.id));
    root.appendChild(card);
  });
}

function renderLogs(filter = "all") {
  transit(() => paintLogs(filter));
}

function openLog(id) {
  const log = LOGS.find((l) => l.id === id);
  if (!log) return;
  if (log.hash) {
    closeModal();
    document.querySelector(log.hash)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const modal = document.getElementById("modal");
  const sheet = modal.querySelector(".sheet-body");
  sheet.innerHTML = `
    <div class="kind">${log.stamp} · UNFILED ${log.id.toUpperCase()}</div>
    <h2>${log.title}</h2>
    <p>${log.body}</p>
    ${log.video ? `<div class="frame"><iframe src="${log.video}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="${log.title}"></iframe></div>` : ""}
    ${log.link ? `<p><a class="btn solid" style="color:#1b2430" href="${log.link}" target="_blank" rel="noopener">${log.linkLabel || "Open resource"}</a></p>` : ""}
  `;
  transit(() => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
}

function closeModal() {
  const modal = document.getElementById("modal");
  transit(() => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modal.querySelector(".sheet-body").innerHTML = "";
  });
}

function bindFilters() {
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      renderLogs(btn.dataset.kind);
    });
  });
}

function skipIntro() {
  const intro = document.getElementById("intro");
  if (!intro || intro.classList.contains("done")) return;
  const film = document.getElementById("intro-film");
  if (film) {
    film.pause();
    film.classList.add("is-done");
  }
  sessionStorage.setItem("opensky-intro", "1");
  transit(() => {
    intro.classList.add("done");
    intro.remove();
  });
}

function runTypewriter(intro) {
  const lines = [
    { text: "WARNING  ·  YOU ARE NOT ON THE APPROVED CHANNEL", cls: "warn" },
    { text: "carrier: unlicensed  /  protocol: samizdat-3", cls: "" },
    { text: "official envelope rejected — page-count insufficient", cls: "glitch" },
    { text: "mounting withheld futures…", cls: "" },
    { text: "ENERGY   HABITATION   MOTION   INDUSTRY   ORBIT", cls: "ok" },
    { text: "if you can read this the seal has already failed", cls: "warn" },
    { text: "ARCHIVE OPEN  ·  DO NOT FILE", cls: "ok" }
  ];
  const stage = intro.querySelector(".intro-lines");
  const mark = intro.querySelector(".intro-mark");
  const wrap = intro.querySelector(".intro-stage");
  wrap.classList.remove("is-waiting");
  wrap.classList.add("is-live");
  mark.classList.add("show");
  let i = 0;
  const tick = () => {
    if (i >= lines.length) {
      setTimeout(skipIntro, 700);
      return;
    }
    const row = document.createElement("div");
    row.className = `intro-line ${lines[i].cls}`;
    row.textContent = lines[i].text;
    stage.appendChild(row);
    requestAnimationFrame(() => row.classList.add("show"));
    i += 1;
    setTimeout(tick, 520);
  };
  setTimeout(tick, 280);
}

function playIntro() {
  const intro = document.getElementById("intro");
  if (!intro) return;
  if (sessionStorage.getItem("opensky-intro") === "1" || location.hash) {
    intro.remove();
    return;
  }
  const film = document.getElementById("intro-film");
  const startText = () => {
    if (intro.dataset.phase === "text") return;
    intro.dataset.phase = "text";
    if (film) film.classList.add("is-done");
    runTypewriter(intro);
  };
  if (film) {
    const go = () => startText();
    film.addEventListener("ended", go, { once: true });
    film.addEventListener("error", go, { once: true });
    const kick = film.play();
    if (kick && typeof kick.catch === "function") kick.catch(go);
    // unmute on first gesture so the clip can speak
    const armSound = () => {
      film.muted = false;
      film.play().catch(() => {});
    };
    intro.addEventListener("click", armSound, { once: true });
    setTimeout(() => {
      if (intro.dataset.phase !== "text" && film.readyState < 2) go();
    }, 8000);
  } else {
    startText();
  }
  intro.querySelector(".skip-intro").addEventListener("click", skipIntro);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skipIntro();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  playIntro();
  paintLogs();
  bindFilters();
  document.getElementById("modal")?.addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });
  document.querySelector(".close")?.addEventListener("click", closeModal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
