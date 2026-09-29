function transit(fn) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !document.startViewTransition) {
    fn();
    return;
  }
  document.startViewTransition(fn);
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function loadJSON(path) {
  const res = await fetch(path + (path.includes("?") ? "&" : "?") + "v=14");
  if (!res.ok) throw new Error(path);
  return res.json();
}

function linksFor(t) {
  const out = [];
  if (t.home_url) out.push({ href: t.home_url, label: t.home_label || "Open" });
  if (t.substack && t.substack !== t.home_url) out.push({ href: t.substack, label: "Substack" });
  if (t.x_handle) {
    const h = t.x_handle.replace(/^@/, "");
    out.push({ href: "https://x.com/" + h, label: "@" + h });
  }
  if (t.other_url) out.push({ href: t.other_url, label: "Also" });
  return out;
}

function themeHref(slug) {
  return "themes.html#" + slugify(slug);
}

function renderThinkers(data) {
  const root = document.getElementById("sky");
  if (!root) return;
  root.innerHTML = "";
  data.thinkers.forEach((t, i) => {
    const tags = (t.themes || []).map((slug) => {
      const s = slugify(slug);
      return `<a class="star-tag" href="${themeHref(s)}">${slug.replace(/-/g, " ")}</a>`;
    }).join("");
    const hrefs = linksFor(t)
      .map((l) => `<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
      .join("");
    const card = document.createElement("article");
    card.className = "star thinker";
    card.id = t.id;
    card.style.viewTransitionName = t.id;
    card.style.setProperty("--tilt", ((i % 5) - 2) * 0.35 + "deg");
    card.innerHTML = `
      <img class="star-plate" src="${t.plate}" alt="">
      <div class="star-body">
        <div class="kind">${t.role} · ${t.id}</div>
        <h3>${t.name}</h3>
        <p class="one">${t.one_line}</p>
        <p>${t.why}</p>
        <p class="guard">${t.guardrail}</p>
        <div class="star-tags">${tags}</div>
        <div class="cta-row">${hrefs}</div>
      </div>`;
    root.appendChild(card);
  });
}

function renderThemes(data) {
  const root = document.getElementById("sky");
  if (!root) return;
  const hash = location.hash.replace(/^#/, "");
  root.innerHTML = "";
  const themes = [...data.themes].sort((a, b) => (b.sort || 0) - (a.sort || 0));
  themes.forEach((th, i) => {
    const related = (th.related || []).map((n) => `<span class="star-tag is-plain">${n}</span>`).join("");
    const res = (th.resources || [])
      .map(
        (r) => `<li>
          <a href="${r.url}" target="_blank" rel="noopener">${r.title}</a>
          <span class="muted"> · ${r.kind}${r.year ? " · " + r.year : ""} · ${r.authors || ""}</span>
          <p>${r.one_line}</p>
          ${r.guardrail ? `<p class="guard">${r.guardrail}</p>` : ""}
        </li>`
      )
      .join("");
    const card = document.createElement("article");
    card.className = "star theme" + (hash === th.slug ? " is-open" : "");
    card.id = th.slug;
    card.style.viewTransitionName = th.id;
    card.style.setProperty("--tilt", ((i % 5) - 2) * -0.4 + "deg");
    card.innerHTML = `
      <div class="star-body">
        <div class="kind">theme · ${th.id}</div>
        <h3>${th.title}</h3>
        <p class="one">${th.one_line}</p>
        <p>${th.why}</p>
        <p class="guard">${th.guardrail}</p>
        ${related ? `<div class="star-tags">${related}</div>` : ""}
        ${res ? `<ol class="res-list">${res}</ol>` : `<p class="muted">No resources filed yet. Add them on the RESOURCES tab.</p>`}
      </div>`;
    root.appendChild(card);
  });
  if (hash) {
    document.getElementById(hash)?.scrollIntoView({ block: "start" });
  }
}

async function bootThinkers() {
  try {
    const data = await loadJSON("content/thinkers.json");
    renderThinkers(data);
  } catch (e) {
    document.getElementById("sky").innerHTML = "<p>Constellation failed to mount. Check content/thinkers.json.</p>";
  }
}

async function bootThemes() {
  try {
    const data = await loadJSON("content/themes.json");
    renderThemes(data);
    window.addEventListener("hashchange", () => renderThemes(data));
  } catch (e) {
    document.getElementById("sky").innerHTML = "<p>Constellation failed to mount. Check content/themes.json.</p>";
  }
}
