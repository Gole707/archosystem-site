# ArchoSystem Website Rebuild — Controlled Build Workflow

## 1. Purpose

This workflow exists to prevent the rebuild from becoming an open-ended cycle of moving sections, rewriting approved copy, regenerating images, tuning individual breakpoints, and reopening settled decisions.

The governing sequence is:

> Strategy → content → visual system → wireframe → components → implementation → QA → launch → freeze.

Work does not move backward without a documented reason.

---

## 2. Repository and branch strategy

### Production

- `main` remains the production baseline until final approval.
- Production defects unrelated to the rebuild are handled separately.
- Rebuild planning does not modify production files.

### Planning

- Planning documents live under `docs/website/`.
- Planning changes use a dedicated branch and draft pull request.

### Implementation

After planning approval:

- create a dedicated rebuild branch from the then-current `main`;
- use explicit commits by work package;
- avoid mixing copy, image, layout, selector, and unrelated maintenance in one commit;
- use a draft pull request throughout implementation;
- merge only after final gate approval.

---

## 3. Work packages

## WP-0 — Preserve the current baseline

**Actions**

- confirm production branch and deployment method;
- capture current desktop, tablet, and mobile screenshots;
- record current metadata, forms, analytics, and domain behavior;
- tag or otherwise preserve the current launch state;
- record known production defects separately.

**Exit criteria**

- current site can be restored;
- rebuild and production maintenance are separated;
- no unreviewed live change is included.

---

## WP-1 — Strategic brief and disclosure lock

**Inputs**

- master blueprint;
- decision ledger;
- claims ledger;
- terminology/disclosure rules.

**Actions**

- confirm audiences;
- confirm public versus private scope;
- confirm product hierarchy;
- confirm public sectors;
- confirm private sector atlas;
- confirm recurring-revenue model;
- confirm selector scope;
- confirm prohibited claims and terms.

**Exit criteria — Gate 1A**

- no unresolved strategic contradiction;
- every proposed page has a purpose and audience;
- private access method is selected;
- terminology and claim rules are approved.

---

## WP-2 — Complete content package

**Actions**

Write every page in plain text before design:

- page title and metadata;
- hero heading and lead;
- section headings;
- body copy;
- tables;
- calls to action;
- concept-image labels;
- disclaimers;
- source notes;
- form labels;
- selector result language;
- private investor content outline.

**Rules**

- no layout direction disguised as copy review;
- every claim must reference the claims ledger;
- public and private copy are stored separately;
- unresolved facts are marked, not filled with confident placeholders.

**Exit criteria — Gate 1B**

- all public launch copy approved;
- investor executive-level copy approved;
- source and evidence gaps listed;
- no page depends on unwritten “we will figure it out during design” content.

---

## WP-3 — Canonical visual bible

**Actions**

- approve rapid/reusable, permanent, and hardened product variants;
- lock proportions, wall finish, roof, base, fittings, logo, and scale;
- approve aesthetic and identity skin families;
- create the image register;
- confirm public/private visual boundaries.

**Exit criteria — Gate 2A**

- one canonical product family exists;
- every shot has a page, purpose, and disclosure status;
- AI image generation cannot invent a different tank on each page.

---

## WP-4 — Cinematic image masters

**Actions**

- generate only approved shot-list images;
- select one master per shot;
- perform no more than one substantive correction pass;
- create desktop, tablet, mobile, and social crops;
- write alt text and concept labels;
- record approvals in the image register.

**Exit criteria**

- complete public launch image set;
- investor priority image set or approved placeholders;
- no inconsistent product geometry;
- no unsupported performance depiction.

---

## WP-5 — Low-detail wireframes

**Actions**

Create structural wireframes for:

- all public pages;
- Selector V1 states;
- investor landing, atlas, sector, revenue, and diligence patterns;
- authenticated navigation;
- desktop and mobile content order.

Evaluate only:

- hierarchy;
- page flow;
- section length;
- image placement;
- table readability;
- call-to-action placement;
- mobile order;
- private drilldown.

Do not evaluate final typography, pixel spacing, decorative motion, or image micro-crops.

**Exit criteria — Gate 2B**

- every page is structurally approved;
- no section exists without a reason;
- mobile order is settled;
- no major page restructure is expected during implementation.

---

## WP-6 — Design system and reference page

**Actions**

Define reusable tokens and components:

- content widths;
- spacing scale;
- typography scale;
- buttons and links;
- navigation and footer;
- hero;
- section header;
- metric strip;
- card families;
- sector cards;
- comparison blocks;
- tables;
- image panels;
- forms;
- selector controls and result cards;
- status and warning components;
- concept-image label;
- citations/source notes;
- private-page shell;
- data-room list.

Build one reference page using the complete system.

**Exit criteria — Gate 2C**

- reference page approved at 1440, 1024, 768, and 390 widths;
- components cover planned pages;
- no section requires a custom visual language merely for preference.

---

## WP-7 — Public implementation

**Actions**

- build all public pages from approved components;
- add metadata and structured navigation;
- implement forms and contact routing;
- optimize approved image masters;
- add concept labels and claims-safe copy;
- preserve accessibility and performance.

**Rules**

- do not rewrite approved strategy during coding;
- do not add unapproved sections;
- do not create one-off CSS without a functional reason;
- log necessary changes in the decision or claims ledger.

**Exit criteria**

- all public pages function with approved content and components;
- no placeholder copy remains;
- production inquiry paths are testable.

---

## WP-8 — Selector V1 implementation

**Actions**

- implement formulas in a dedicated tested module;
- load configurable assumptions from a single documented source;
- build the guided input flow;
- build balanced, low-and-wide, compact-footprint, and no-fit states;
- implement disclaimers and lead handoff;
- add calculation and accessibility tests.

**Exit criteria**

- all tests in `SELECTOR_V1_SPEC.md` pass;
- no hard-coded scattered values;
- no output implies final engineering, certification, quote, or compatibility approval.

---

## WP-9 — Private investor experience

**Actions**

- implement authentication or separate controlled deployment;
- build investor navigation;
- build Opportunity Atlas and sector-card patterns;
- build revenue, competition, validation, IP, capital, and data-room pages;
- add source and confidence displays;
- separate executive, commercial, and diligence levels.

**Exit criteria**

- private content is not present in the public deployment bundle without effective access control;
- all market numbers include definition, date, source, assumption, and confidence;
- unit-based capture models are auditable.

---

## WP-10 — Consolidated QA and launch

### Functional

- navigation;
- links;
- forms;
- selector calculations;
- unit conversion;
- contact-state capture;
- private login and logout;
- access-control failure states;
- data-room links.

### Content and claims

- terminology consistency;
- claim-ledger match;
- public/private disclosure;
- source notes;
- concept labels;
- no outdated product narrative;
- no unsupported absolute claims.

### Accessibility

- keyboard navigation;
- focus state;
- semantic headings;
- labels and errors;
- contrast;
- reduced motion;
- image alt text;
- tables;
- selector result announcements.

### Responsive

Primary widths:

- 1440;
- 1024;
- 768;
- 390.

Check fluid behavior between targets without starting a separate design exercise for every device.

### Performance and security

- image size and loading;
- font loading;
- layout shift;
- script errors;
- CSP and form behavior;
- private-page cache and indexing controls;
- authentication and session behavior;
- no private source data embedded in public JavaScript.

### Issue severity

- **Critical** — security, privacy, data loss, broken access, wrong calculation, legal/claims problem, unusable core flow. Blocks launch.
- **Major** — materially harms understanding, conversion, accessibility, or common responsive use. Blocks launch.
- **Minor** — cosmetic or edge-case improvement. Goes to later-version backlog unless trivial and risk-free.

**Exit criteria — Gate 3**

- Critical issues: zero;
- Major issues: zero;
- Minor issues: recorded;
- production deployment and rollback are confirmed;
- final claims and disclosure review passes;
- founder approves launch.

---

## 4. Review and revision policy

### Planned review rounds

Each approval gate receives:

- **Revision A** — substantive correction;
- **Revision B** — final polish.

After Revision B, the gate closes.

### Valid reason to reopen

- factual error;
- engineering error;
- legal or patent issue;
- unsupported claim;
- accessibility failure;
- security or privacy problem;
- broken calculation;
- material user confusion proven by testing;
- required customer or partner condition.

### Invalid reason to reopen

- another image might be more dramatic;
- a heading might look better on two lines;
- a card could move slightly;
- a new market occurred to someone;
- an animation could be added;
- one uncommon screen wraps differently but remains usable;
- a closed decision feels less exciting today.

---

## 5. Work-session discipline

At the start of a work session:

1. read the relevant decision, claims, and terminology entries;
2. select one work package and one bounded objective;
3. confirm the files in scope;
4. make the change;
5. run the relevant validation;
6. record any decision or claim change;
7. stop when the objective is complete.

Do not combine strategy, copywriting, cinematic generation, CSS tuning, market sizing, and selector logic in one unbounded session.

---

## 6. Change-request template

```text
Requested change:

Reason:

Work package and gate affected:

Is a locked decision being reopened? [Yes/No]

Is a claim changing? [Yes/No]

Public, private, NDA, or engineering scope:

Evidence or user-testing basis:

Files affected:

Acceptance test:

Later-version alternative:
```

If the change cannot state a concrete acceptance test, it is probably preference rather than a requirement.

---

## 7. Roles

### Founder

Approves:

- strategy;
- disclosure;
- major claims;
- canonical product visual;
- final public and investor direction;
- launch.

### Content and claims lead

Owns:

- copy package;
- terminology;
- claims ledger;
- source and confidence notes;
- public/private separation.

### Design lead

Owns:

- visual bible;
- cinematic selection;
- design system;
- wireframes;
- responsive consistency.

### Engineering lead

Owns:

- implementation;
- selector calculations;
- accessibility;
- performance;
- authentication;
- deployment.

### QA lead

Owns:

- consolidated test plan;
- issue severity;
- regression check;
- launch recommendation.

One person or agent may perform multiple roles, but reviews must remain role-specific. Mobile QA does not reopen strategy. Image selection does not rewrite engineering claims.

---

## 8. Parking lot

Create a later-version backlog for:

- Selector V2 and V3;
- full ArchoOS application;
- customer accounts;
- quote automation;
- extensive animations;
- additional public markets;
- deeper technical diagrams;
- public case studies;
- expanded data room;
- more investor visualizations;
- optional languages;
- partner portal;
- service scheduling;
- e-commerce or accessory catalog checkout.

A parking-lot item does not enter the active build without explicit scope change.

---

## 9. Launch freeze

After production launch:

- fix genuine defects;
- collect real user, investor, partner, and analytics evidence;
- do not immediately redesign based on internal mood;
- create a versioned improvement backlog;
- release the next update as a deliberate change set.

The website is done when it meets the agreed definition of done, not when no further improvement can be imagined.
