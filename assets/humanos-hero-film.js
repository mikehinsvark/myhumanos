(() => {
  const VIDEO_SRC = "/manus-storage/humanos-bigger-picture-film.mp4";
  const POSTER_SRC = "/manus-storage/humanos-bigger-picture-poster.webp";

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
          <video id="hiosHeroFilm" controls playsinline preload="metadata" poster="${POSTER_SRC}" aria-label="A Bigger Picture. A Brighter Future. Dreams Business Resources film">
            <source src="${VIDEO_SRC}" type="video/mp4" />
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

    [...document.querySelectorAll("a")].forEach((anchor) => {
      if (anchor.textContent.trim().includes("WATCH THE VIDEO")) {
        anchor.href = "#hios-feature-film";
        anchor.removeAttribute("target");
        anchor.removeAttribute("rel");
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          feature.scrollIntoView({ behavior: "smooth", block: "center" });
          window.setTimeout(playFilm, 420);
        });
      }
    });

    const modalVideo = document.getElementById("hiosExplainerVideo");
    if (modalVideo) {
      modalVideo.src = VIDEO_SRC;
      modalVideo.poster = POSTER_SRC;
      modalVideo.load();
    }
    const floatingLabel = document.querySelector("#hiosFloatingExplainer span:last-child");
    if (floatingLabel) floatingLabel.textContent = "Play the Featured Film";

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
