const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const briefForm = document.querySelector("#brief-form");
const contactEmail = "info@archosystem.com";
const briefSubject = "ArchoSystem Brief Request";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopNavQuery = window.matchMedia("(min-width: 821px)");

const closeMobileNav = () => {
  if (!menuToggle || !siteNav) return;

  siteNav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
};

const resolveCssLength = (value, fallback = 0) => {
  const trimmedValue = value.trim();
  const directValue = parseFloat(trimmedValue);

  if (Number.isFinite(directValue) && /^-?\d/.test(trimmedValue)) {
    return directValue;
  }

  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.height = trimmedValue;
  document.body.append(probe);

  const resolvedValue = probe.getBoundingClientRect().height;
  probe.remove();

  return resolvedValue || fallback;
};

const getAnchorOffset = () => {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--anchor-offset");
  return resolveCssLength(value, 112);
};

const getScrollTarget = (target) => {
  if (!target) return null;
  const section = target.closest?.(".section, .site-footer");

  if (!section) return target;

  return Array.from(section.children).find((child) => child.classList.contains("container")) || section;
};

const getScrollTop = (scrollTarget) => {
  return scrollTarget.getBoundingClientRect().top + window.scrollY - getAnchorOffset();
};

const addRevealClass = (element, delayIndex = 0) => {
  if (!element) return;

  element.classList.add("reveal");
  if (delayIndex > 0) {
    element.classList.add(`reveal-delay-${Math.min(delayIndex, 3)}`);
  }
};

const prepareRevealElements = () => {
  const primaryRevealSelectors = [
    ".hero-copy",
    ".hero-visual",
    ".trust-strip",
    ".comparison",
    ".lifecycle-nodes",
    ".product-image",
    ".contact-form",
    ".footer-grid"
  ];

  document.querySelectorAll(primaryRevealSelectors.join(", ")).forEach((element, index) => {
    addRevealClass(element, index % 2);
  });

  document.querySelectorAll(".stacked-cards, .card-grid, .step-cards, .status-grid").forEach((group) => {
    Array.from(group.children).forEach((element, index) => {
      addRevealClass(element, index % 4);
    });
  });
};

const revealVisibleElements = (snap = false) => {
  document.querySelectorAll(".reveal").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (snap) {
        element.style.transition = "none";
      }
      element.classList.add("is-visible");
      if (snap) {
        window.requestAnimationFrame(() => {
          element.style.transition = "";
        });
      }
    }
  });
};

const scrollToAnchor = (target, behavior = reduceMotion.matches ? "auto" : "smooth") => {
  if (!target) return;

  const targetId = target.id;

  if (targetId === "top") {
    if (behavior === "instant") {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        behavior
      });
    }
    setActiveNavLink("top");
    return;
  }

  const scrollTarget = getScrollTarget(target);
  const top = getScrollTop(scrollTarget);

  if (behavior === "instant") {
    window.scrollTo(0, Math.max(0, top));
    revealVisibleElements(true);
    return;
  }

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
};

const updateHash = (hash) => {
  if (!hash) return;

  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
};

const revealOnScroll = () => {
  const revealElements = document.querySelectorAll(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  document.body.classList.add("reveal-enabled");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.14
  });

  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add("is-visible");
      return;
    }

    revealObserver.observe(element);
  });
};

const setActiveNavLink = (sectionId) => {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("is-active", href === `#${sectionId}`);
  });

  document.querySelectorAll(".section, .hero, .site-footer").forEach((section) => {
    const id = section.dataset.sectionId || section.id;
    section.classList.toggle("is-section-active", id === sectionId);
  });
};

const trackActiveSections = () => {
  const trackedLinks = Array.from(navLinks).filter((link) => {
    const href = link.getAttribute("href");
    return href && href.startsWith("#") && document.querySelector(href);
  });

  if (!trackedLinks.length) return;

  const sections = Array.from(new Set(trackedLinks.map((link) => {
    const anchor = document.querySelector(link.getAttribute("href"));
    return anchor.closest(".section, .hero, .site-footer") || anchor;
  })));

  if ("IntersectionObserver" in window) {
    const clearActiveAtTop = () => {
      if (window.scrollY < 40) {
        setActiveNavLink("top");
      }
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      if (window.scrollY < 40) {
        setActiveNavLink("top");
        return;
      }

      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) return;

      const activeSection = visibleEntries[0].target;
      setActiveNavLink(activeSection.dataset.sectionId || activeSection.id);
    }, {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0.01
    });

    sections.forEach((section) => sectionObserver.observe(section));
    window.addEventListener("scroll", clearActiveAtTop, { passive: true });
    window.addEventListener("resize", clearActiveAtTop);
    clearActiveAtTop();
    return;
  }

  const updateActiveFromScroll = () => {
    const marker = window.scrollY + window.innerHeight * 0.28;
    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= marker) {
        activeSection = section;
      }
    });

    setActiveNavLink(activeSection.dataset.sectionId || activeSection.id);
  };

  window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
  window.addEventListener("resize", updateActiveFromScroll);
  updateActiveFromScroll();
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNav();
  }
});

document.addEventListener("click", (event) => {
  if (!menuToggle || !siteNav || !siteNav.classList.contains("is-open")) return;

  const clickedToggle = menuToggle.contains(event.target);
  const clickedNav = siteNav.contains(event.target);

  if (!clickedToggle && !clickedNav) {
    closeMobileNav();
  }
});

const closeNavOnDesktop = (event) => {
  if (event.matches) {
    closeMobileNav();
  }
};

if (desktopNavQuery.addEventListener) {
  desktopNavQuery.addEventListener("change", closeNavOnDesktop);
} else if (desktopNavQuery.addListener) {
  desktopNavQuery.addListener(closeNavOnDesktop);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const url = new URL(link.getAttribute("href"), window.location.href);
  const isSamePage = url.origin === window.location.origin
    && url.pathname === window.location.pathname
    && url.search === window.location.search;

  if (!isSamePage || !url.hash || url.hash === "#") return;

  const target = document.querySelector(url.hash);
  if (!target) return;

  event.preventDefault();
  closeMobileNav();
  scrollToAnchor(target);
  updateHash(url.hash);
});

prepareRevealElements();
revealOnScroll();
trackActiveSections();

const scrollToInitialHash = () => {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (target) {
    scrollToAnchor(target, "instant");
    window.requestAnimationFrame(() => revealVisibleElements(true));
  }
};

if (window.location.hash) {
  window.requestAnimationFrame(scrollToInitialHash);
  window.addEventListener("load", scrollToInitialHash, { once: true });
}

if (briefForm) {
  briefForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!briefForm.checkValidity()) {
      briefForm.reportValidity();
      return;
    }

    const formData = new FormData(briefForm);
    const clean = (fieldName) => String(formData.get(fieldName) || "").trim();
    const messageLines = [
      `Name: ${clean("name")}`,
      `Organization: ${clean("organization")}`,
      `Email: ${clean("email")}`,
      `Interest Type: ${clean("interest")}`,
      "",
      `${clean("message")}`
    ];

    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(briefSubject)}&body=${encodeURIComponent(messageLines.join("\n"))}`;
    window.location.assign(mailto);
  });
}
