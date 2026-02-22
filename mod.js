// ==UserScript==
// @name         Bandit.RIP Theme Selector + Tiles (CORS-safe)
// @namespace    https://tampermonkey.net/
// @version      1.3.0
// @description  Adds a theme dropdown in Settings and rewrites map images via blob URLs to avoid WebGL CORS errors.
// @match        https://bandit.rip/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

(function () {
  "use strict";

  // ---------- Theme config ----------
  const LS_KEY = "bandit_theme"; // stored in localStorage
  const THEMES = {
    none: null,
    outerspace:
      "https://raw.githubusercontent.com/spectraldragon8/background-mod/main/themes/outerspace/",
  };

  function getThemeName() {
    const v = (localStorage.getItem(LS_KEY) || "none").toLowerCase();
    return v in THEMES ? v : "none";
  }

  function getThemeBase() {
    const name = getThemeName();
    return THEMES[name] || null;
  }

  function themeUrl(filename) {
    const base = getThemeBase();
    if (!base) return null;
    return base + filename;
  }

  // ---------- Replacement map ----------
  // Your existing mapping, unchanged, except it now routes through themeUrl(...)
  const REPLACEMENTS = [
    // ===== Map1 background layers =====
    { match: "/assets/maps/bgs/map1/skyv4.png", to: () => themeUrl("skyv4.png") },
    { match: "/assets/maps/bgs/map1/bg1v6.png", to: () => themeUrl("bg1v6.png") },
    { match: "/assets/maps/bgs/map1/bg2v4.png", to: () => themeUrl("bg2v4.png") },

    // ===== VOIDS platforms =====
    { match: "/assets/maps/voids/platform2extr.png", to: () => themeUrl("platform2extr.png") },
    { match: "/assets/maps/voids/platform2extl.png", to: () => themeUrl("platform2extl.png") },
    { match: "/assets/maps/voids/platform2extr2.png", to: () => themeUrl("platform2extr2.png") },
    { match: "/assets/maps/voids/platform2extl2.png", to: () => themeUrl("platform2extl2.png") },

    { match: "/assets/maps/voids/platform3.png", to: () => themeUrl("platform3.png") },
    { match: "/assets/maps/voids/platform4.png", to: () => themeUrl("platform4.png") },
    { match: "/assets/maps/voids/platform6h4.png", to: () => themeUrl("platform6h4.png") },
    { match: "/assets/maps/voids/platform6h5.png", to: () => themeUrl("platform6h5.png") },

    { match: "/assets/maps/voids/platform8.png", to: () => themeUrl("platform8.png") },
    { match: "/assets/maps/voids/platform8h4.png", to: () => themeUrl("platform8h4.png") },
    { match: "/assets/maps/voids/platform8h6.png", to: () => themeUrl("platform8h6.png") },

    { match: "/assets/maps/voids/platform10.png", to: () => themeUrl("platform10.png") },
    { match: "/assets/maps/voids/platform10h8.png", to: () => themeUrl("platform10h8.png") },

    { match: "/assets/maps/voids/platform12b.png", to: () => themeUrl("platform12b.png") },
    { match: "/assets/maps/voids/platform14b.png", to: () => themeUrl("platform14b.png") },
    { match: "/assets/maps/voids/platform14t.png", to: () => themeUrl("platform14t.png") },

    { match: "/assets/maps/voids/platform16b.png", to: () => themeUrl("platform16b.png") },
    { match: "/assets/maps/voids/platform18b.png", to: () => themeUrl("platform18b.png") },

    { match: "/assets/maps/voids/platform36.png", to: () => themeUrl("platform36.png") },
    { match: "/assets/maps/voids/platform36h10.png", to: () => themeUrl("platform36h10.png") },
    { match: "/assets/maps/voids/platform46.png", to: () => themeUrl("platform46.png") },

    // ===== VOIDS blocks / walls =====
    { match: "/assets/maps/voids/blockl6h32.png", to: () => themeUrl("blockl6h32.png") },
    { match: "/assets/maps/voids/blockm6h32.png", to: () => themeUrl("blockm6h32.png") },
    { match: "/assets/maps/voids/blockr6h32.png", to: () => themeUrl("blockr6h32.png") },

    { match: "/assets/maps/voids/blockm8h48.png", to: () => themeUrl("blockm8h48.png") },
    { match: "/assets/maps/voids/blocksolo6h48.png", to: () => themeUrl("blocksolo6h48.png") },

    { match: "/assets/maps/voids/box1v1l.png", to: () => themeUrl("box1v1l.png") },
    { match: "/assets/maps/voids/box1v1r.png", to: () => themeUrl("box1v1r.png") },

    // ===== SKYSCА platforms =====
    { match: "/assets/maps/skysca/platform4.png", to: () => themeUrl("platform4.png") },
    { match: "/assets/maps/skysca/platform8.png", to: () => themeUrl("platform8.png") },
    { match: "/assets/maps/skysca/platform8h4.png", to: () => themeUrl("platform8h4.png") },
    { match: "/assets/maps/skysca/platform14.png", to: () => themeUrl("platform14.png") },

    // ===== TRAINING platforms =====
    { match: "/assets/maps/training/platform7.png", to: () => themeUrl("platform7.png") },
    { match: "/assets/maps/training/platprojec.png", to: () => themeUrl("platprojec.png") },

    // ===== Extra 1v1 / voids sprites you added =====
    { match: "/assets/maps/voids/platform1t.png", to: () => themeUrl("platform1t.png") },
    { match: "/assets/maps/voids/platform2.png", to: () => themeUrl("platform2.png") },
    { match: "/assets/maps/voids/platform2t.png", to: () => themeUrl("platform2t.png") },
    { match: "/assets/maps/voids/platform2t2.png", to: () => themeUrl("platform2t2.png") },
    { match: "/assets/maps/voids/platform2tl.png", to: () => themeUrl("platform2tl.png") },
    { match: "/assets/maps/voids/platform2tr.png", to: () => themeUrl("platform2tr.png") },

    { match: "/assets/maps/voids/platform4h3.png", to: () => themeUrl("platform4h3.png") },
    { match: "/assets/maps/voids/platform8h2.png", to: () => themeUrl("platform8h2.png") },
    { match: "/assets/maps/voids/platform10t.png", to: () => themeUrl("platform10t.png") },
    { match: "/assets/maps/voids/platform14h6.png", to: () => themeUrl("platform14h6.png") },

    { match: "/assets/maps/voids/platform18.png", to: () => themeUrl("platform18.png") },
    { match: "/assets/maps/voids/platform22.png", to: () => themeUrl("platform22.png") },
    { match: "/assets/maps/voids/platform26.png", to: () => themeUrl("platform26.png") },
    { match: "/assets/maps/voids/platform40.png", to: () => themeUrl("platform40.png") },
    { match: "/assets/maps/voids/platform60.png", to: () => themeUrl("platform60.png") },

    { match: "/assets/maps/voids/scho.png", to: () => themeUrl("scho.png") },
    { match: "/assets/maps/voids/barrier.png", to: () => themeUrl("barrier.png") },

    { match: "/assets/maps/voids/blockm4h48.png", to: () => themeUrl("blockm4h48.png") },

    { match: "/assets/maps/voids/box1v1mc2.png", to: () => themeUrl("box1v1mc2.png") },
    { match: "/assets/maps/voids/box1v1mo2.png", to: () => themeUrl("box1v1mo2.png") },
  ];

  // ---------- Blob caching ----------
  const blobCache = new Map(); // customUrl -> Promise<blobUrl>

  function rewriteToCustom(url) {
    // If theme is none, do not replace anything
    if (!getThemeBase()) return null;

    if (typeof url !== "string" || url.length === 0) return null;

    let abs;
    try {
      abs = new URL(url, location.href).toString();
    } catch {
      abs = url;
    }

    for (const r of REPLACEMENTS) {
      if (abs.includes(r.match)) {
        const out = typeof r.to === "function" ? r.to() : r.to;
        return out || null;
      }
    }
    return null;
  }

  function fetchAsBlobUrl(customUrl) {
    if (blobCache.has(customUrl)) return blobCache.get(customUrl);

    const p = new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: customUrl,
        responseType: "arraybuffer",
        onload: (res) => {
          try {
            if (res.status < 200 || res.status >= 300) {
              reject(new Error("HTTP " + res.status + " for " + customUrl));
              return;
            }
            const ct =
              (res.responseHeaders || "")
                .match(/content-type:\s*([^\r\n]+)/i)?.[1] || "image/png";
            const blob = new Blob([res.response], { type: ct });
            const blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          } catch (e) {
            reject(e);
          }
        },
        onerror: () => reject(new Error("Network error fetching " + customUrl)),
      });
    });

    blobCache.set(customUrl, p);
    return p;
  }

  // ---------- Interceptors ----------
  (function patchImage() {
    const origSet = Object.getOwnPropertyDescriptor(Image.prototype, "src")?.set;
    const origGet = Object.getOwnPropertyDescriptor(Image.prototype, "src")?.get;
    if (!origSet || !origGet) return;

    Object.defineProperty(Image.prototype, "src", {
      configurable: true,
      enumerable: true,
      get() {
        return origGet.call(this);
      },
      set(v) {
        try {
          this.crossOrigin = "anonymous";
        } catch {}
        return origSet.call(this, v);
      },
    });
  })();

  (function patchSetAttribute() {
    const orig = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name, value) {
      if (
        this &&
        this.tagName === "IMG" &&
        typeof name === "string" &&
        name.toLowerCase() === "src"
      ) {
        const custom = rewriteToCustom(value);
        if (custom) {
          fetchAsBlobUrl(custom)
            .then((blobUrl) => orig.call(this, name, blobUrl))
            .catch(() => orig.call(this, name, value));
          return;
        }
      }
      return orig.call(this, name, value);
    };
  })();

  (function patchImgSrcProperty() {
    const desc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
    if (!desc || !desc.set || !desc.get) return;

    Object.defineProperty(HTMLImageElement.prototype, "src", {
      configurable: true,
      enumerable: true,
      get() {
        return desc.get.call(this);
      },
      set(value) {
        const custom = rewriteToCustom(value);
        if (!custom) return desc.set.call(this, value);

        fetchAsBlobUrl(custom)
          .then((blobUrl) => desc.set.call(this, blobUrl))
          .catch(() => desc.set.call(this, value));
      },
    });
  })();

  (function patchFetch() {
    const origFetch = window.fetch;
    if (typeof origFetch !== "function") return;

    window.fetch = function (input, init) {
      try {
        const url = typeof input === "string" ? input : input?.url;
        const custom = rewriteToCustom(url);
        if (custom) {
          return fetchAsBlobUrl(custom).then((blobUrl) => {
            if (typeof input === "string") return origFetch.call(this, blobUrl, init);
            return origFetch.call(this, new Request(blobUrl, input), init);
          });
        }
      } catch {}
      return origFetch.call(this, input, init);
    };
  })();

  // ---------- Settings GUI injection ----------
  // Adds dropdown + "Apply theme" next to the existing SAVE/RESET buttons in the settings modal footer
  function injectSettingsUI() {
    // The buttons exist in your HTML:
    // .frontpage-settings-save, .frontpage-settings-reset
    const saveBtn = document.querySelector(".frontpage-settings-save");
    if (!saveBtn) return false;

    // Prevent duplicate injection
    if (document.getElementById("tm-theme-select")) return true;

    const container = document.createElement("div");
    container.style.display = "inline-flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";
    container.style.marginRight = "12px";
    container.style.userSelect = "none";

    const label = document.createElement("div");
    label.textContent = "Theme:";
    label.style.fontFamily = "pixelperfect, keyvirtue, sans-serif";
    label.style.fontSize = "14px";
    label.style.color = "#fff";
    label.style.opacity = "0.9";

    const select = document.createElement("select");
    select.id = "tm-theme-select";
    select.style.padding = "6px 8px";
    select.style.borderRadius = "6px";
    select.style.border = "1px solid rgba(255,255,255,0.25)";
    select.style.background = "rgba(0,0,0,0.35)";
    select.style.color = "#fff";
    select.style.fontFamily = "pixelperfect, keyvirtue, sans-serif";
    select.style.fontSize = "14px";
    select.style.outline = "none";

    const optNone = document.createElement("option");
    optNone.value = "none";
    optNone.textContent = "none";
    const optOuter = document.createElement("option");
    optOuter.value = "outerspace";
    optOuter.textContent = "outerspace";

    select.appendChild(optNone);
    select.appendChild(optOuter);
    select.value = getThemeName();

    const apply = document.createElement("div");
    apply.id = "tm-theme-apply";
    apply.textContent = "APPLY THEME";
    apply.className = "brbutton brbclicksound"; // match Bandit's button style
    apply.style.display = "inline-flex";
    apply.style.alignItems = "center";
    apply.style.justifyContent = "center";
    apply.style.height = "34px";
    apply.style.padding = "0 14px";

    apply.addEventListener("click", () => {
      const chosen = (select.value || "none").toLowerCase();
      localStorage.setItem(LS_KEY, chosen);

      // Clear cache so next run fetches correct assets
      blobCache.clear();

      // Reload so PIXI re-creates textures using the new theme
      location.reload();
    });

    container.appendChild(label);
    container.appendChild(select);
    container.appendChild(apply);

    // Put our UI immediately before the existing SAVE button
    saveBtn.parentNode.insertBefore(container, saveBtn);

    return true;
  }

  function startInjector() {
    const tryNow = injectSettingsUI();
    if (tryNow) return;

    // Settings modal is created later, keep trying until it appears
    const obs = new MutationObserver(() => {
      if (injectSettingsUI()) obs.disconnect();
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  // Run at document-start, but DOM is not ready yet
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startInjector);
  } else {
    startInjector();
  }
})();
