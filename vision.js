"use strict";
(() => {
  if (!document.body.classList.contains("vision-study")) return;
  const technologyImage = document.getElementById("vision-technology-image");
  const technologyCaption = document.getElementById("vision-technology-caption");
  document.querySelectorAll("[data-vision-view]").forEach(button => {
    button.addEventListener("click", () => {
      const manufacturing = button.dataset.visionView === "manufacturing";
      document.querySelectorAll("[data-vision-view]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      technologyImage.src = button.dataset.visionSrc;
      technologyImage.alt = manufacturing ? "Illustrative CNC manufacturing concept." : "Illustrative concept of closed Archo Pods transported together on a flatbed truck.";
      technologyCaption.textContent = manufacturing ? "Illustrative manufacturing concept · Technology in development" : "Illustrative deployment concept · Technology in development";
    });
  });
  const openers = new Map();
  document.querySelectorAll("[data-vision-open]").forEach(button => button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.visionOpen);
    openers.set(dialog, button);
    dialog.showModal();
  }));
  document.querySelectorAll(".vision-dialog").forEach(dialog => {
    dialog.querySelector("[data-vision-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    dialog.querySelectorAll("[data-vision-dismiss]").forEach(link => link.addEventListener("click", () => {
      dialog.dataset.visionNavigate = link.hash;
      dialog.close();
    }));
    dialog.addEventListener("close", () => {
      const anchor = dialog.dataset.visionNavigate;
      delete dialog.dataset.visionNavigate;
      if (anchor) {
        const heading = document.querySelector(anchor)?.querySelector("h2");
        if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
      } else openers.get(dialog)?.focus({preventScroll:true});
    });
  });
  document.querySelector("[data-vision-focus-ai]")?.addEventListener("click", () => {
    document.querySelector("[data-vision-ai-step=place]")?.focus();
  });
  const sections = [...document.querySelectorAll("main > section[id]")];
  const links = [...document.querySelectorAll(".vision-chapters a")];
  const update = () => {
    const y = window.innerHeight * .45;
    let selected = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top < y) selected = section;
    for (const link of links) {
      if (link.getAttribute("href") === "#" + selected?.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  };
  let scheduled = false;
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { update(); scheduled = false; });
  }, {passive:true});
  update();
})();
