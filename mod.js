// ==UserScript==
// @name         Bandit.RIP Custom Backgrounds + Tiles (CORS-safe)
// @namespace    https://tampermonkey.net/
// @version      1.2.0
// @description  Replaces Bandit.RIP images with custom URLs using blob caching to avoid WebGL CORS errors.
// @match        https://bandit.rip/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

(function () {
  "use strict";

  // Change these if your repo/branch is different
  const THEME_BASE =
    "https://raw.githubusercontent.com/spectraldragon8/background-mod/main/themes/outerspace/";

  // Helper: build raw url for a filename in your theme folder
  function themeUrl(filename) {
    return THEME_BASE + filename;
  }

  // Map original paths to your custom image URLs
  const REPLACEMENTS = [
    // ===== Map1 background layers (original ones) =====
    { match: "/assets/maps/bgs/map1/skyv4.png", to: themeUrl("skyv4.png") },
    { match: "/assets/maps/bgs/map1/bg1v6.png", to: themeUrl("bg1v6.png") },
    { match: "/assets/maps/bgs/map1/bg2v4.png", to: themeUrl("bg2v4.png") },

    // ===== VOIDS platforms =====
    { match: "/assets/maps/voids/platform2extr.png", to: themeUrl("platform2extr.png") },
    { match: "/assets/maps/voids/platform2extl.png", to: themeUrl("platform2extl.png") },
    { match: "/assets/maps/voids/platform2extr2.png", to: themeUrl("platform2extr2.png") },
    { match: "/assets/maps/voids/platform2extl2.png", to: themeUrl("platform2extl2.png") },

    { match: "/assets/maps/voids/platform4.png", to: themeUrl("platform4.png") },
    { match: "/assets/maps/voids/platform6h4.png", to: themeUrl("platform6h4.png") },
    { match: "/assets/maps/voids/platform6h5.png", to: themeUrl("platform6h5.png") },

    { match: "/assets/maps/voids/platform8.png", to: themeUrl("platform8.png") },
    { match: "/assets/maps/voids/platform8h4.png", to: themeUrl("platform8h4.png") },
    { match: "/assets/maps/voids/platform8h6.png", to: themeUrl("platform8h6.png") },

    { match: "/assets/maps/voids/platform10.png", to: themeUrl("platform10.png") },
    { match: "/assets/maps/voids/platform10h8.png", to: themeUrl("platform10h8.png") },

    { match: "/assets/maps/voids/platform12b.png", to: themeUrl("platform12b.png") },
    { match: "/assets/maps/voids/platform14b.png", to: themeUrl("platform14b.png") },
    { match: "/assets/maps/voids/platform14t.png", to: themeUrl("platform14t.png") },

    { match: "/assets/maps/voids/platform16b.png", to: themeUrl("platform16b.png") },
    { match: "/assets/maps/voids/platform18b.png", to: themeUrl("platform18b.png") },

    { match: "/assets/maps/voids/platform36.png", to: themeUrl("platform36.png") },
    { match: "/assets/maps/voids/platform36h10.png", to: themeUrl("platform36h10.png") },
    { match: "/assets/maps/voids/platform46.png", to: themeUrl("platform46.png") },

    // ===== VOIDS blocks / walls =====
    { match: "/assets/maps/voids/blockl6h32.png", to: themeUrl("blockl6h32.png") },
    { match: "/assets/maps/voids/blockm6h32.png", to: themeUrl("blockm6h32.png") },
    { match: "/assets/maps/voids/blockr6h32.png", to: themeUrl("blockr6h32.png") },

    { match: "/assets/maps/voids/blockm8h48.png", to: themeUrl("blockm8h48.png") },
    { match: "/assets/maps/voids/blocksolo6h48.png", to: themeUrl("blocksolo6h48.png") },

    { match: "/assets/maps/voids/box1v1l.png", to: themeUrl("box1v1l.png") },
    { match: "/assets/maps/voids/box1v1r.png", to: themeUrl("box1v1r.png") },

    // ===== SKYSCА platforms =====
    { match: "/assets/maps/skysca/platform4.png", to: themeUrl("platform4.png") },
    { match: "/assets/maps/skysca/platform8.png", to: themeUrl("platform8.png") },
    { match: "/assets/maps/skysca/platform8h4.png", to: themeUrl("platform8h4.png") },
    { match: "/assets/maps/skysca/platform14.png", to: themeUrl("platform14.png") },

    // ===== TRAINING platforms =====
    { match: "/assets/maps/training/platform3.png", to: themeUrl("platform3.png") },
    { match: "/assets/maps/training/platform7.png", to: themeUrl("platform7.png") },
    { match: "/assets/maps/training/platprojec.png", to: themeUrl("platprojec.png") },
      // ===== EXTRA VOIDS / 1v1 sprites =====
      { match: "/assets/maps/voids/platform1t.png", to: themeUrl("platform1t.png") },
      { match: "/assets/maps/voids/platform2.png", to: themeUrl("platform2.png") },
      { match: "/assets/maps/voids/platform2t.png", to: themeUrl("platform2t.png") },
      { match: "/assets/maps/voids/platform2t2.png", to: themeUrl("platform2t2.png") },
      { match: "/assets/maps/voids/platform2tl.png", to: themeUrl("platform2tl.png") },
      { match: "/assets/maps/voids/platform2tr.png", to: themeUrl("platform2tr.png") },

      { match: "/assets/maps/voids/platform4h3.png", to: themeUrl("platform4h3.png") },
      { match: "/assets/maps/voids/platform8h2.png", to: themeUrl("platform8h2.png") },
      { match: "/assets/maps/voids/platform10t.png", to: themeUrl("platform10t.png") },
      { match: "/assets/maps/voids/platform14h6.png", to: themeUrl("platform14h6.png") },

      { match: "/assets/maps/voids/platform18.png", to: themeUrl("platform18.png") },
      { match: "/assets/maps/voids/platform22.png", to: themeUrl("platform22.png") },
      { match: "/assets/maps/voids/platform26.png", to: themeUrl("platform26.png") },
      { match: "/assets/maps/voids/platform40.png", to: themeUrl("platform40.png") },
      { match: "/assets/maps/voids/platform60.png", to: themeUrl("platform60.png") },

      { match: "/assets/maps/voids/scho.png", to: themeUrl("scho.png") },
      { match: "/assets/maps/voids/barrier.png", to: themeUrl("barrier.png") },

      { match: "/assets/maps/voids/blockm4h48.png", to: themeUrl("blockm4h48.png") },

      { match: "/assets/maps/voids/box1v1mc2.png", to: themeUrl("box1v1mc2.png") },
      { match: "/assets/maps/voids/box1v1mo2.png", to: themeUrl("box1v1mo2.png") },
  ];

  // Cache custom URL -> blob URL so we only download once
  const blobCache = new Map(); // customUrl -> Promise<blobUrl>

  function rewriteToCustom(url) {
    if (typeof url !== "string" || url.length === 0) return null;

    let abs;
    try {
      abs = new URL(url, location.href).toString();
    } catch {
      abs = url;
    }

    for (const r of REPLACEMENTS) {
      if (abs.includes(r.match)) return r.to;
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

  // Force anonymous crossOrigin for any IMG created
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

  // Intercept src assignment on <img> via setAttribute
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

  // Intercept direct `img.src = ...`
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

  // Patch fetch based loaders
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
})();
