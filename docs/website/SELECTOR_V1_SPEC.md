# ArchoTank Selector V1 — Product and Calculation Specification

## 1. Purpose

Selector V1 turns basic project requirements into a transparent preliminary ArchoTank configuration. It helps a customer understand the relationship between capacity, diameter, height, freeboard, hydrostatic demand, service class, stored contents, climate, access, and protection.

It is a planning and lead-qualification tool. It is not:

- a final engineering design;
- a code-compliance determination;
- a certified product schedule;
- a chemical-compatibility approval;
- a quote;
- a fabrication drawing;
- a warranty commitment;
- an AI design authority.

---

## 2. User experience

### Step 1 — Required capacity

Input:

- gallons, cubic feet, cubic meters, or liters;
- unit conversion happens immediately;
- optional target working capacity versus nominal capacity selection.

### Step 2 — Site constraint

Choose one primary constraint:

- limited footprint;
- limited height;
- restricted transport or access;
- weak or sensitive ground;
- rapid deployment;
- permanent installation;
- no primary constraint.

Optional numeric inputs:

- maximum diameter;
- maximum height;
- available rectangular footprint;
- minimum clearance.

### Step 3 — Stored contents

Initial categories:

- potable-water application;
- raw or process water;
- fire water;
- wastewater;
- agricultural liquids;
- industrial liquids;
- fuel-support application;
- thermal liquid;
- other / engineering review.

The selector does not certify compatibility. It recommends a barrier-family review.

### Step 4 — Service class

- rapid;
- reusable;
- semi-permanent;
- permanent;
- hardened / engineering inquiry.

### Step 5 — Climate and environment

- standard temperate;
- freezing;
- extreme cold / engineering review;
- warm and humid;
- high heat / desert;
- marine or coastal;
- industrial exposure;
- other.

### Step 6 — Exterior protection

- standard weather and UV;
- rugged abrasion;
- vandal and cut resistance;
- thermal or insulated;
- high-visibility/safety identity;
- low-visibility/environmental identity;
- hardened / defined-threat engineering review.

### Step 7 — Result

Show:

- recommended diameter;
- recommended wall height;
- working liquid depth;
- nominal geometric capacity;
- estimated working capacity;
- freeboard assumption;
- base hydrostatic pressure;
- alternate low-and-wide configuration;
- alternate compact-footprint configuration;
- service class;
- inner-barrier family for review;
- climate-package category;
- exterior-protection tier;
- preliminary accessory package;
- engineering and compatibility warnings;
- call to action.

---

## 3. Core calculations

### 3.1 Cylindrical nominal volume

For diameter `D` and wall height `H` in feet:

```text
volume_cubic_feet = π × (D / 2)^2 × H
nominal_gallons = volume_cubic_feet × 7.48051948
```

### 3.2 Working capacity

```text
working_liquid_height = wall_height - freeboard_height
working_gallons = π × (D / 2)^2 × working_liquid_height × 7.48051948
```

The launch value for default freeboard must be approved during the content and engineering gate. It must be visible and editable or clearly identified as a planning assumption. The tool must not hide it inside the calculation.

### 3.3 Solve diameter from capacity and working height

```text
required_cubic_feet = target_working_gallons / 7.48051948
required_diameter = 2 × sqrt(required_cubic_feet / (π × working_liquid_height))
```

### 3.4 Solve working height from capacity and diameter

```text
required_cubic_feet = target_working_gallons / 7.48051948
required_working_height = required_cubic_feet / (π × (diameter / 2)^2)
wall_height = required_working_height + freeboard_height
```

### 3.5 Hydrostatic pressure

For liquid specific gravity `SG` and working depth `h` in feet:

```text
base_pressure_psi = 0.4335275 × SG × h
```

V1 may use a visible water-equivalent default of `SG = 1.0` when the exact liquid is unknown. A non-water content category must display a warning that actual density and pressure require engineering confirmation.

### 3.6 Capacity examples

The published example table is a validation fixture for nominal water volume, not a list of fixed products.

| Diameter | 4 ft high | 8 ft high | 12 ft high | 16 ft high |
|---:|---:|---:|---:|---:|
| 15 ft | 5,300 gal | 10,600 gal | 15,900 gal | 21,100 gal |
| 20 ft | 9,400 gal | 18,800 gal | 28,200 gal | 37,600 gal |
| 30 ft | 21,100 gal | 42,300 gal | 63,400 gal | 84,600 gal |
| 40 ft | 37,600 gal | 75,200 gal | 112,800 gal | 150,400 gal |
| 60 ft | 84,600 gal | 169,200 gal | 253,800 gal | 338,400 gal |
| 80 ft | 150,400 gal | 300,800 gal | 451,200 gal | 601,600 gal |

Values are rounded. Automated tests use the unrounded formula.

---

## 4. Geometry recommendation logic

The selector must not assume four-foot height increments.

Candidate heights are drawn from an approved configuration list that may include:

- standard manufacturing heights;
- full-height material options;
- factory-joined courses;
- engineering-defined custom heights.

### 4.1 Balanced recommendation

Choose a geometry that:

- meets target working capacity;
- stays within user height and diameter limits;
- avoids extreme aspect ratios;
- minimizes hydrostatic pressure when there is no footprint penalty;
- remains within the current engineering status envelope.

### 4.2 Low-and-wide alternative

Prioritize:

- lower working depth;
- lower base pressure;
- greater footprint;
- easier access and inspection;
- weak-ground or height-restricted sites.

### 4.3 Compact-footprint alternative

Prioritize:

- smaller diameter;
- increased height;
- higher pressure and structural review;
- sites with limited land.

### 4.4 No feasible result

Do not force a geometry. Return:

- the conflicting constraints;
- the minimum diameter at the height limit;
- the minimum height at the diameter limit;
- multi-unit option;
- engineering-review call to action.

---

## 5. Preliminary configuration rules

These are product-routing rules, not engineering approval.

| User selection | Preliminary result language |
|---|---|
| Rapid | Rapid-deployment structural configuration; short-duration operating review required |
| Reusable | Recoverable and redeployable configuration under validation |
| Semi-permanent | Extended-duration configuration with enhanced base, protection, and inspection package |
| Permanent | Permanent cementitious configuration; project engineering required |
| Hardened | Defined-threat engineering inquiry; no automatic performance claim |

### Inner-barrier output

- potable-water family — sanitation and regulatory qualification required;
- general water family;
- wastewater/process family;
- agricultural family;
- hydrocarbon/fuel-support family;
- industrial-chemical family;
- thermal family;
- custom engineering review.

### Climate output

- standard;
- freeze-protection formulation review;
- extreme-cold engineering review;
- biological and warm-climate stability review;
- high-temperature and expansion review;
- marine/coastal protection review;
- industrial-exposure review.

### Exterior output

- standard weather/UV;
- rugged abrasion;
- cut/vandal resistance;
- insulated/thermal;
- high-visibility identity;
- environmental/low-visibility identity;
- hardened defined-threat engineering review.

---

## 6. Accessory routing

The result may recommend categories, not final parts:

- ladder or stair access;
- platform and handrail;
- vent and pressure/vacuum relief;
- overflow;
- drain;
- inlet/outlet package;
- sampling;
- level and pressure monitoring;
- sensor rail;
- pipe supports;
- anchoring and restraint;
- pump, hose, or deployment skid;
- exterior identity skin;
- repair and replacement inventory.

---

## 7. Status and warning system

Every result receives one status:

- **Planning fit** — geometry calculation is within published planning limits; engineering still required.
- **Engineering review** — one or more inputs require material, structural, compatibility, climate, code, or site analysis.
- **Outside current development envelope** — do not present a recommended configuration; collect the requirement for review.

Warnings must be specific:

- nominal capacity, not guaranteed usable capacity;
- freeboard assumption;
- liquid density not confirmed;
- chemical compatibility not confirmed;
- climate formulation not qualified;
- material supplier and fabrication limits not applied;
- foundation, wind, seismic, uplift, flood, and code review not included;
- hardened performance not defined or tested.

---

## 8. Lead workflow

The result page offers:

- “Discuss this configuration”;
- “Request technical review”;
- “Explore a pilot”;
- “Investor or strategic-partner inquiry.”

Submitted data should include the complete selector state so the user does not need to re-enter it.

V1 must not require an account.

---

## 9. Acceptance tests

### Calculation tests

- formula results match independent reference calculations;
- unit conversions round-trip correctly;
- all example-table values match within the displayed rounding tolerance;
- diameter solving returns the target capacity within tolerance;
- height solving returns the target capacity within tolerance;
- hydrostatic pressure scales linearly with depth and specific gravity;
- freeboard is applied to working capacity and pressure, not only displayed;
- multiple-unit configurations sum correctly.

### Constraint tests

- height limit respected;
- diameter limit respected;
- no-feasible-result state works;
- target capacity is never silently reduced;
- alternate geometry results are distinct and logical;
- custom/other contents route to review.

### UX and accessibility tests

- usable by keyboard;
- labels and units are explicit;
- result changes are announced accessibly;
- no meaning depends only on color;
- mobile controls are large enough and do not require horizontal scrolling;
- all assumptions are visible before the lead is submitted.

### Claims tests

- no result states that a configuration is certified, approved, code-compliant, ballistic-rated, blast-rated, or chemically compatible;
- all result wording matches the claims ledger;
- million-gallon outputs are identified as engineered planning configurations unless validated.

---

## 10. Definition of done for Selector V1

Selector V1 is complete when:

- formulas and units pass independent checks;
- freeboard and density assumptions are visible;
- constraints produce correct alternatives or a no-fit response;
- preliminary configuration routing is consistent;
- lead data is captured with the result;
- public disclaimers are clear;
- keyboard, mobile, tablet, and desktop QA passes;
- no final-design, quote, certification, or compatibility claim is created;
- the selector can be maintained through a documented configuration file rather than hard-coded scattered values.
