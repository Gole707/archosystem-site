# ArchoSystem Website Rebuild — Wireframe Specification v1

**Status:** Gate 2 baseline  
**Purpose:** Lock page flow, hierarchy, component reuse, and responsive order before visual polish or production implementation

---

## 1. Wireframe rules

- Wireframes evaluate hierarchy, sequence, density, image role, conversion, and mobile order.
- Wireframes do not evaluate final color grading, cinematic image quality, micro-spacing, animation, or decorative polish.
- Every page uses the shared component library.
- A new one-off layout requires a documented functional reason.
- Content comes from `PUBLIC_SITE_COPY_V1.md` and `INVESTOR_PORTAL_CONTENT_V1.md`.
- Images use placeholders tied to approved image IDs until canonical references are locked.
- Page review occurs at 1440, 1024, 768, and 390 px only.

---

## 2. Shared public shell

### Header

Desktop:

- 82 px target height;
- ArchoSystem mark at left;
- navigation centered/right;
- primary action “Discuss a requirement” at far right;
- active page indicator uses a restrained line or text change, not a large pill.

Mobile:

- 70 px target height;
- mark at left;
- menu control at right;
- full-width dark menu below header;
- contact action remains visible inside the menu;
- body scroll locks when menu is open.

### Public navigation

`ArchoTank · Configurations · Capacity · Applications · Validation · ArchoOS · Company`

### Footer

Four-column desktop, stacked mobile:

1. company and development-status note;
2. product and configuration links;
3. validation, ArchoOS, company, and contact;
4. legal, privacy, concept-image, and claims notice.

### Content widths

- standard text/content: 1180 px maximum;
- wide media and data sections: 1600 px maximum;
- readable text line: 58–72 characters where practical;
- edge padding: 20 px mobile, 28–40 px tablet/desktop.

### Vertical rhythm

- major desktop section spacing: 104–128 px;
- tablet: 80–96 px;
- mobile: 56–72 px;
- section introduction followed by one primary content pattern, not multiple competing layouts.

---

## 3. Shared component library

### C-01 Hero

- eyebrow;
- one H1;
- one lead paragraph;
- no more than two primary actions;
- one cinematic or product visual;
- optional concise development-status line.

Desktop variants:

- split 52/48 or 56/44;
- full-bleed image with protected text area;
- centered technical/data hero for Capacity, Validation, and ArchoOS.

Mobile:

- text first;
- actions second;
- image third;
- no overlay text on a complex image.

### C-02 Proof strip

Three to five concise items in one horizontal strip:

- configurable geometry;
- application-specific containment;
- compact transport concept;
- validation-first development;
- lifecycle evidence.

No unsupported performance numbers.

### C-03 Section intro

- eyebrow optional;
- H2;
- one concise explanatory paragraph;
- optional action link.

### C-04 Configuration card

- icon or restrained technical illustration;
- title;
- one-sentence purpose;
- status label where needed;
- optional detail link.

Desktop: three columns.  
Tablet: two columns.  
Mobile: one column.

### C-05 Application card

- cinematic crop or sector icon;
- sector title;
- infrastructure problem;
- ArchoTank development fit;
- no market numbers on public cards.

### C-06 Capacity table

- sticky first column on small screens where practical;
- horizontal scroll container on mobile;
- nominal-capacity label always visible;
- freeboard/working-capacity note directly below;
- million-gallon note separated from the table body.

### C-07 Comparison split

Two balanced columns for:

- transported versus deployed;
- low-and-wide versus compact footprint;
- public versus private information layer;
- current alternative versus proposed workflow.

### C-08 Process timeline

- three to seven stages;
- horizontal desktop, vertical mobile;
- each stage contains action, evidence, and current status;
- no ornamental timeline complexity.

### C-09 Functional layer diagram

Public simplified diagram only:

1. stored contents;
2. inner containment barrier;
3. structural wall system;
4. selected structural/activation medium;
5. exterior protection;
6. base and interfaces;
7. monitoring and lifecycle record.

Exact construction is not shown.

### C-10 CTA panel

- one outcome-focused heading;
- short explanation;
- one primary action;
- optional secondary action;
- no generic “Learn more” as the main button.

### C-11 Status and evidence badge

Approved labels:

- Verified;
- Calculated;
- Supported concept;
- In development;
- Planned;
- Third-party review required.

Never use “proven,” “certified,” or “ready” without evidence.

### C-12 Data/evidence drawer

Used primarily in private pages:

- sources;
- assumptions;
- calculation method;
- confidence;
- exclusions;
- unresolved questions.

---

# 4. Public page wireframes

## 4.1 Home

### H-01 Hero

Layout: full-width 56/44 split.

Left:

- eyebrow;
- approved H1;
- lead;
- Explore ArchoTank;
- Discuss a requirement;
- development note.

Right:

- `PUB-01` canonical tank hero placeholder;
- image has open negative space and no text baked into it.

Mobile order: text → actions → development note → image.

### H-02 Proof strip

Four items:

- Configurable geometry
- Application-specific containment
- Compact transport concept
- Validation-first development

### H-03 The asset should fit the mission—not the truck

Layout: 45/55 split.

Left: section copy and six project questions.  
Right: `PUB-02` transport-to-deployment placeholder.

Mobile: copy → questions → visual.

### H-04 Configuration model

Section intro plus six `C-04` cards:

- capacity and geometry;
- stored contents;
- service class;
- climate and exposure;
- accessories and operations;
- monitoring and evidence.

### H-05 Capacity and scale

Layout:

- section intro;
- full-width capacity table;
- low-and-wide versus taller compact comparison;
- button to Capacity/Selector.

Optional side visual: `PUB-03` only if the table remains dominant.

### H-06 Transport-to-deployment sequence

Full-width cinematic sequence with three labeled stages:

1. staged package;
2. site activation and assembly;
3. deployed asset.

No exact time, crew, or truck count.

### H-07 Selected applications

Seven cards.

Desktop: first six in 3 × 2 grid, seventh full-width or centered two-column feature.  
Mobile: one vertical list.

### H-08 Validation before claims

Layout: 40/60 split.

Left: validation statement and action.  
Right: `PUB-08` test-yard image plus condensed validation timeline.

### H-09 ArchoOS

Dark elevated panel with restrained system visualization.

Left: configure, identify, inspect, monitor, record, readiness.  
Right: conceptual asset record interface, clearly identified as planned.

### H-10 Closing CTA

Requirement-routing panel with primary action and six inquiry paths.

---

## 4.2 ArchoTank

### AT-01 Hero

Split hero using `REF-01` or a clean canonical product view.

### AT-02 Functional architecture

Simplified layer diagram `C-09` with text descriptions.

### AT-03 Service classes

Five cards or a horizontal ladder:

- Rapid;
- Reusable;
- Semi-permanent;
- Permanent;
- Hardened.

Each includes current status, primary objective, and next validation milestone.

### AT-04 Independent choices

Two-column text and configuration matrix explaining why identical gallons do not produce identical tanks.

### AT-05 Full-height wall direction

Wide technical visual showing one continuous wall and factory joining in abstract form; no exact seam detail.

### AT-06 Exterior protection and identity

`REF-04` identity-skin sheet plus package categories.

### AT-07 Accessory ecosystem

Catalog grid grouped by:

- access;
- process;
- structure/restraint;
- environment;
- deployment equipment.

### AT-08 Current validation status

Condensed status board and CTA to Validation.

### AT-09 Closing CTA

Explore configurations / Request technical review.

---

## 4.3 Configurations

### CFG-01 Centered hero

Text-led; small configuration diagram rather than cinematic image.

### CFG-02 Seven-step path

Large vertical or horizontal process:

1. capacity;
2. site envelope;
3. contents;
4. service class;
5. climate/exposure;
6. operations;
7. readiness/records.

### CFG-03 Interactive-feeling card groups

Static launch cards arranged by decision axis. They preview the logic later used by Selector V1.

### CFG-04 Configuration output example

One fictional example card showing:

- input constraints;
- resulting preliminary geometry;
- barrier/climate/protection classes;
- engineering-review warning.

No price or certification.

### CFG-05 CTA

Open Selector / Discuss requirement.

---

## 4.4 Capacity and Selector

### CAP-01 Centered technical hero

H1, short explanation, no large cinematic image.

### CAP-02 Formula and assumptions

Formula card, unit explanation, nominal versus working capacity, freeboard note.

### CAP-03 Capacity table

Full width.

### CAP-04 Geometry tradeoff

Two-column low-and-wide versus taller/compact comparison with simple silhouettes.

### CAP-05 Selector V1

Desktop:

- left 40% input panel;
- right 60% results and geometry illustration.

Tablet/mobile:

- inputs first;
- calculate action;
- recommended option;
- alternate options;
- assumptions and warnings;
- inquiry action.

### CAP-06 Disclaimer and evidence

Visible, not hidden in tiny footer text.

---

## 4.5 Applications

### APP-01 Hero

Wide sector landscape, preferably one coherent infrastructure panorama rather than collage.

### APP-02 Sector index

Seven cards with anchor navigation.

### APP-03 through APP-09 Sector modules

Each uses the same three-part structure:

1. infrastructure need;
2. ArchoTank development fit;
3. required qualification and inquiry action.

Alternating layout is allowed, but component structure remains constant.

### APP-10 No-endorsement note and CTA

Visible note for agency/defense contexts.

---

## 4.6 Validation

### VAL-01 Centered hero

Text and `PUB-08` test-yard image.

### VAL-02 Current focus

Four status cards:

- supplier data;
- analysis;
- prototype definition;
- instrumentation/pass-fail criteria.

### VAL-03 Validation lanes

Nine-stage evidence timeline.

### VAL-04 Evidence states

Explain Verified, Calculated, Supported concept, In development, Planned.

### VAL-05 Test-result register preview

Empty-state or future structure showing how results will be reported:

- test ID;
- configuration;
- objective;
- result;
- limitation;
- next action.

Do not fake results.

### VAL-06 Partner CTA

Technical review / material / fabrication / instrumentation / testing / pilot.

---

## 4.7 ArchoOS

### OS-01 Hero

Text-led with restrained conceptual interface.

### OS-02 Asset lifecycle

Configure → stage → inspect → deploy → monitor → repair → recover → recertify → redeploy.

### OS-03 Planned functions

Six cards:

- configure;
- identify;
- inspect;
- monitor;
- record;
- readiness.

### OS-04 Installed-base relationship

Physical asset on left; subscription/readiness/service layers on right.

### OS-05 Claims boundary

Clearly state planned software status.

### OS-06 CTA

Discuss fleet, readiness, or software partnership.

---

## 4.8 Company and Contact

### CO-01 Hero

Founder/company mission with restrained portrait or working-environment image after biography is verified.

### CO-02 What is being built

ArchoSystem → ArchoTank → ArchoOS → future platform.

### CO-03 Current stage

Product architecture, patent discipline, material qualification, calculations, prototype, testing, suppliers, pilots.

### CO-04 Partnership map

Six partner types.

### CO-05 Routed contact form

First required choice:

- project requirement;
- technical review;
- prototype/pilot;
- supplier/fabrication;
- readiness/deployment;
- investment.

Form fields change only where necessary. Keep the base form short.

---

# 5. Private investor shell

## Authentication boundary

The investor experience uses a separate authenticated shell or separate controlled deployment.

### Desktop layout

- narrow persistent left navigation or top navigation with section index;
- main content area up to 1440 px;
- evidence drawer on right where data density requires it;
- public-site brand preserved but data mode is denser.

### Mobile/tablet

- private navigation collapses to a section selector;
- evidence drawers become inline expandable panels;
- no complex map interaction required for first launch on small screens.

---

# 6. Private investor page wireframes

## INV-01 Investment Overview

1. platform hero `INV-01`;
2. physical entry product;
3. configuration architecture;
4. logistics advantage;
5. installed-base engine;
6. validation state;
7. funding objective;
8. private contact/data-room CTA.

## INV-02 Opportunity Atlas

1. global cinematic view `INV-02`;
2. filter rail;
3. 12 sector cards;
4. priority matrix;
5. evidence-confidence legend;
6. selected-sector drilldown.

V1 may be card-led with a non-interactive map background. The map does not need full GIS behavior at launch.

## INV-03 Sector Explorer

1. executive summary card;
2. geography and buyer map;
3. use-case matrix;
4. product fit;
5. current alternatives;
6. procurement route;
7. revenue stack;
8. capture scenarios;
9. barriers and milestones;
10. evidence drawer.

## INV-04 Product Map

1. rapid-to-hardened ladder `INV-03`;
2. configuration axes;
3. sector-to-configuration matrix;
4. status/evidence matrix;
5. next milestone by product class.

## INV-05 Revenue Engine

1. installed-base flywheel;
2. seven revenue layers;
3. staged-readiness facility `INV-04`;
4. accessory shop `INV-08`;
5. aesthetic package sheet;
6. ArchoOS and service relationship;
7. scenario placeholders pending validated pricing.

## INV-06 Economics

1. representative configuration selector;
2. initial revenue bridge;
3. accessory attach;
4. annual installed-base revenue;
5. margin drivers;
6. sensitivity chart;
7. lifecycle-comparison assumptions;
8. evidence and confidence.

No polished economics are displayed until source assumptions are approved.

## INV-07 Competition

1. job-based comparison table;
2. where ArchoTank may win;
3. where incumbents remain better;
4. adoption barriers;
5. differentiation evidence required.

## INV-08 Validation and Roadmap

1. capital-to-risk-removal timeline;
2. milestone cards;
3. evidence status;
4. market unlocked by each milestone;
5. test and pilot register.

## INV-09 IP

1. system-integration thesis;
2. patent strategy summary;
3. know-how/data/software/service defensibility;
4. public/private/NDA boundary;
5. counsel and diligence materials link.

## INV-10 Capital Plan

1. capital requested;
2. use-of-funds categories;
3. milestone delivered;
4. risk removed;
5. evidence created;
6. market/procurement path unlocked;
7. next financing or revenue decision.

## INV-11 Data Room

1. access status;
2. categorized document index;
3. version/date/owner;
4. view/download permissions;
5. access log and revocation notice.

---

## 7. Motion and interaction limits

Approved:

- restrained section reveal;
- simple card hover;
- capacity slider and selector transitions;
- evidence drawer expansion;
- map/card focus transitions;
- image comparison scrubber if it materially explains transport versus deployment.

Not approved for launch:

- cinematic scroll-jacking;
- long autoplay video backgrounds on mobile;
- complex 3D tank configurator;
- continuous parallax on every section;
- decorative cursor effects;
- animations that delay access to content;
- interactive globe requiring WebGL as the only investor navigation.

---

## 8. Gate 2 acceptance criteria

Wireframes are accepted when:

- each page has one clear purpose;
- the approved copy fits without structural rewriting;
- the same components solve repeated content jobs;
- image roles and IDs are assigned;
- mobile order is explicit;
- CTAs are visible and routed;
- public/private disclosure remains separated;
- the selector has a workable input/result layout;
- the investor Atlas works even before advanced map interaction;
- no page depends on unvalidated data or nonexistent media;
- no remaining layout question requires the founder to manually tune CSS.
