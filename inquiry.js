"use strict";

const ARCHO_INQUIRY_EMAIL = "info@archosystem.com";

function archoBuildInquiry(values) {
  const clean = (key) => String(values[key] || "").trim();
  const fields = {
    name: clean("name"), organization: clean("organization"), email: clean("email"),
    interest: clean("interest"), message: clean("message")
  };
  if (!fields.name || !fields.email || !fields.interest || !fields.message) {
    throw new Error("Complete your name, email, interest and message before preparing a draft.");
  }
  const subject = `ArchoSystem — ${fields.interest}`;
  const body = [
    `Name: ${fields.name}`, `Organization: ${fields.organization}`, `Email: ${fields.email}`,
    `Interest: ${fields.interest}`, "", fields.message
  ].join("\n");
  return {
    subject, body,
    text: `To: ${ARCHO_INQUIRY_EMAIL}\nSubject: ${subject}\n\n${body}`,
    mailto: `mailto:${ARCHO_INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  };
}

function archoSetupInquiry(doc) {
  const form = doc.getElementById("brief-form");
  const preview = doc.getElementById("inquiry-preview");
  const draft = doc.getElementById("inquiry-draft");
  const status = doc.getElementById("inquiry-status");
  const openEmail = doc.getElementById("inquiry-open-email");
  const copy = doc.getElementById("inquiry-copy");
  if (!form || !preview || !draft || !status || !openEmail || !copy) return;

  let prepared = false;
  const invalidate = () => {
    if (!prepared) return;
    prepared = false;
    preview.hidden = true;
    draft.value = "";
    openEmail.setAttribute("href", `mailto:${ARCHO_INQUIRY_EMAIL}`);
  };

  form.addEventListener("input", (event) => {
    if (event.target === draft) return;
    event.target.setCustomValidity?.("");
    invalidate();
  });
  form.addEventListener("change", (event) => {
    if (event.target !== draft) invalidate();
  });

  doc.querySelectorAll("a[data-inquiry-interest]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
      const interest = form.elements.namedItem("interest");
      const requested = link.dataset.inquiryInterest;
      if (interest && Array.from(interest.options).some((option) => option.value === requested)) {
        invalidate();
        interest.value = requested;
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    for (const name of ["name", "message"]) {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
    }
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    const result = archoBuildInquiry(values);
    draft.value = result.text;
    openEmail.setAttribute("href", result.mailto);
    preview.hidden = false;
    prepared = true;
    status.textContent = "Your email draft is ready. No message has been sent. Open your email app or copy the text to review and send it.";
    draft.focus({ preventScroll: true });
    preview.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  });

  copy.addEventListener("click", async () => {
    if (!prepared) return;
    const text = draft.value;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard is unavailable");
      await navigator.clipboard.writeText(text);
      if (prepared && draft.value === text) {
        status.textContent = "Email text copied. Paste it into your preferred email service, review it and send. No message has been sent by this website.";
      }
    } catch {
      if (prepared && draft.value === text) {
        draft.focus();
        draft.select();
        status.textContent = "Automatic copying is unavailable. The draft is selected; copy it and paste it into your email service. No message has been sent.";
      }
    }
  });
}

if (typeof module !== "undefined" && module.exports) module.exports = { archoBuildInquiry };
if (typeof document !== "undefined") archoSetupInquiry(document);
