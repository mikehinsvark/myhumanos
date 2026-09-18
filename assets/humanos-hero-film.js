(() => {
  const FEATURE_VIDEO_SRC = "/manus-storage/humanos-bigger-picture-film.mp4";
  const FEATURE_POSTER_SRC = "/manus-storage/humanos-bigger-picture-poster.webp";
  const ORIGINAL_VIDEO_SRC = "/manus-storage/humanos-original-perspective-lift.mp4";
  const ORIGINAL_POSTER_SRC = "/manus-storage/humanos-original-perspective-lift-poster.webp";

  function buildTakeawaySection(hero, playFeaturedFilm) {
    if (!hero || document.getElementById("film-takeaways")) return;

    const section = document.createElement("section");
    section.id = "film-takeaways";
    section.className = "hios-film-takeaways";
    section.setAttribute("aria-labelledby", "film-takeaways-title");
    section.innerHTML = `
      <div class="hios-takeaways-shell">
        <div class="hios-takeaways-intro">
          <div class="hios-takeaways-copy">
            <span class="hios-takeaways-kicker"><i></i> The 94-Second Brief</span>
            <h2 id="film-takeaways-title">See higher.<br><em>Build smarter.</em></h2>
            <p>Five ideas from the film that turn a wider perspective into recurring value, better decisions, and intelligent action.</p>
          </div>
          <button class="hios-replay-film" type="button" aria-label="Replay the featured 94-second film">
            <span class="hios-replay-icon">▶</span>
            <span><strong>Replay the film</strong><small>94 seconds · Full HD</small></span>
          </button>
        </div>

        <div class="hios-takeaways-grid">
          <article class="hios-takeaway-card hios-tone-coral">
            <div class="hios-takeaway-top"><span>01</span><b>↑</b></div>
            <h3>Lift the perspective</h3>
            <p>At ground level, obstacles dominate. Rise higher and the pattern starts to appear.</p>
          </article>
          <article class="hios-takeaway-card hios-tone-cyan">
            <div class="hios-takeaway-top"><span>02</span><b>◇</b></div>
            <h3>Create a new model</h3>
            <p>Stop wrestling with yesterday’s system. Design a clearer one around the outcome you want.</p>
          </article>
          <article class="hios-takeaway-card hios-tone-gold">
            <div class="hios-takeaway-top"><span>03</span><b>∞</b></div>
            <h3>Build lifetime value</h3>
            <p>One trusted relationship can serve many lives and create recurring value that compounds.</p>
          </article>
          <article class="hios-takeaway-card hios-tone-violet">
            <div class="hios-takeaway-top"><span>04</span><b>AI</b></div>
            <h3>Multiply capability</h3>
            <p>Use AI to think clearly, execute faster, learn continuously—and remain fully in control.</p>
          </article>
          <article class="hios-takeaway-card hios-tone-white">
            <div class="hios-takeaway-top"><span>05</span><b>?</b></div>
            <h3>Ask the breakthrough question</h3>
            <p>“What am I not seeing?” is the doorway to better choices, better leverage, and what comes next.</p>
          </article>
        </div>

        <div class="hios-perspective-rail" aria-label="Perspective progression">
          <span>React</span><i>→</i><span>Understand</span><i>→</i><span>Anticipate</span><i>→</i><strong>Design</strong>
          <b>Perspective Intelligence</b>
        </div>
      </div>`;

    hero.insertAdjacentElement("afterend", section);
    section.querySelector(".hios-replay-film").addEventListener("click", () => {
      document.getElementById("hios-feature-film")?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(playFeaturedFilm, 420);
    });
  }

  function addOriginalFilmButton(watchButton) {
    if (!watchButton || document.getElementById("hiosOriginalFilmButton")) return;

    const button = document.createElement("button");
    button.id = "hiosOriginalFilmButton";
    button.type = "button";
    button.className = "hios-original-film-btn";
    button.setAttribute("aria-label", "Play the original Human Intelligence OS explainer");
    button.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path><path d="M4 4h16v16H4z"></path></svg>
      <span>Original 60-Second Film</span>`;

    watchButton.parentElement?.appendChild(button);
    button.addEventListener("click", () => document.getElementById("hiosFloatingExplainer")?.click());
  }

  function buildHeroFilm() {
    const currentImage = [...document.images].find((image) => image.src.includes("hero-head_"));
    if (!currentImage) return false;

    const currentVisual = currentImage.closest(".aspect-square");
    if (!currentVisual || document.getElementById("hios-feature-film")) return true;

    const feature = document.createElement("div");
    feature.id = "hios-feature-film";
    feature.className = "bp-reveal";
    feature.innerHTML = `
      <div class="hios-feature-frame">
        <div class="hios-feature-topbar">
          <span class="hios-feature-status">Featured DBR Film</span>
          <span class="hios-feature-duration">HD · 01:34</span>
        </div>
        <div class="hios-feature-media">
          <video id="hiosHeroFilm" controls playsinline preload="metadata" poster="${FEATURE_POSTER_SRC}" aria-label="A Bigger Picture. A Brighter Future. Dreams Business Resources film">
            <source src="${FEATURE_VIDEO_SRC}" type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          <button class="hios-feature-play" type="button" aria-label="Play A Bigger Picture. A Brighter Future"></button>
        </div>
        <div class="hios-feature-caption">
          <div>
            <strong>Perspective Intelligence</strong>
            <span>Lift the view. See the system. Shape what comes next.</span>
          </div>
          <span class="hios-feature-caption-badge">DBR Original Film</span>
        </div>
      </div>`;

    currentVisual.replaceWith(feature);

    const frame = feature.querySelector(".hios-feature-frame");
    const video = feature.querySelector("video");
    const play = feature.querySelector(".hios-feature-play");
    const hero = document.getElementById("hero");

    const playFilm = () => {
      video.play().catch(() => {});
      frame.classList.add("is-playing");
    };

    play.addEventListener("click", playFilm);
    video.addEventListener("play", () => frame.classList.add("is-playing"));
    video.addEventListener("pause", () => {
      if (video.currentTime < video.duration - .25) frame.classList.remove("is-playing");
    });
    video.addEventListener("ended", () => frame.classList.remove("is-playing"));

    const watchButton = [...document.querySelectorAll("a")].find((anchor) =>
      anchor.textContent.trim().includes("WATCH THE VIDEO")
    );
    if (watchButton) {
      watchButton.href = "#hios-feature-film";
      watchButton.removeAttribute("target");
      watchButton.removeAttribute("rel");
      watchButton.addEventListener("click", (event) => {
        event.preventDefault();
        feature.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(playFilm, 420);
      });
      addOriginalFilmButton(watchButton);
    }

    const modalVideo = document.getElementById("hiosExplainerVideo");
    if (modalVideo) {
      modalVideo.src = ORIGINAL_VIDEO_SRC;
      modalVideo.poster = ORIGINAL_POSTER_SRC;
      modalVideo.load();
    }

    buildTakeawaySection(hero, playFilm);
    return true;
  }

  let attempts = 0;
  function mount() {
    if (buildHeroFilm()) return;
    if (++attempts < 40) window.setTimeout(mount, 150);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
