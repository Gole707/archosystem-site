"use strict";

function archoBuildInquiry(values) {
  const clean = key => String(values[key] || "").trim();
  const fields = Object.fromEntries(["name", "email", "organization", "interest", "message"].map(k => [k, clean(k)]));
  if (!fields.name || !fields.email || !fields.interest || !fields.message) throw new Error("Complete your name, email, interest and message before preparing a draft.");
  const subject = `ArchoSystem — ${fields.interest}`;
  const body = [`Name: ${fields.name}`, `Organization: ${fields.organization}`, `Email: ${fields.email}`, `Interest: ${fields.interest}`, "", fields.message].join("\n");
  const to = "goran@archosystem.com";
  return {text:`To: ${to}\nSubject: ${subject}\n\n${body}`,mailto:`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}
if (typeof module !== "undefined" && module.exports) module.exports = { archoBuildInquiry };

if (typeof document !== "undefined") (() => {
  const portable = Boolean(window.ARCHO_PREVIEW_PAGES);
  const main = document.getElementById("main-content");
  const contactMemory = {fields:null,snapshot:null};
  let route = document.body.dataset.route || "/";
  const asset = value => window.ARCHO_PREVIEW_ASSETS?.[value] || value;
  const interestMap = {"intelligence-demo":"Intelligence demonstration","archotank-application":"ArchoTank application","collaboration":"Collaboration","investment":"Investment","general":"General inquiry"};

  function applyAssets(root=document) {
    root.querySelectorAll("img[src]").forEach(img => { const source = img.getAttribute("src"); if (window.ARCHO_PREVIEW_ASSETS?.[source]) img.src = asset(source); });
    root.querySelectorAll("[data-earth-globe]").forEach(canvas => { for(const key of ["texture","clouds","poster"]){const source=canvas.dataset[key];if(source)canvas.dataset[key]=asset(source);} });
    root.querySelectorAll("[data-open-image]").forEach(button=> { const source=button.dataset.openImage; if(source) button.dataset.openImage=asset(source); });
    root.querySelectorAll("a[data-offline-asset]").forEach(a=> { const source=a.getAttribute("href"); if(window.ARCHO_PREVIEW_ASSETS?.[source]) a.href=asset(source); });
  }
  function closeMenu(returnFocus=false) {
    const toggle=document.querySelector(".menu-toggle");
    toggle?.setAttribute("aria-expanded","false");
    document.getElementById("site-nav")?.classList.remove("open");
    document.body.classList.remove("menu-open");
    if(returnFocus) toggle?.focus();
  }
  function setupMenu() {
    const toggle=document.querySelector(".menu-toggle");
    const nav=document.getElementById("site-nav");
    toggle?.addEventListener("click",()=>{
      const opening=toggle.getAttribute("aria-expanded")!=="true";
      toggle.setAttribute("aria-expanded",String(opening));
      nav.classList.toggle("open",opening);
      document.body.classList.toggle("menu-open",opening);
      if(opening) nav.querySelector("a")?.focus();
    });
    document.addEventListener("keydown",event=>{
      if(toggle?.getAttribute("aria-expanded")!=="true") return;
      if(event.key==="Escape") {event.preventDefault();closeMenu(true);}
      if(event.key==="Tab"){
        const items=[toggle,...nav.querySelectorAll("a")].filter(x=>x.offsetParent!==null);
        const first=items[0],last=items[items.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    });
    nav?.addEventListener("click",event=>{if(event.target.closest("a")) closeMenu();});
    window.matchMedia("(min-width:821px)").addEventListener?.("change",event=>{if(event.matches)closeMenu();});
  }
  function setupMedia() {
    const dialog=document.getElementById("media-dialog");
    let opener=null;
    document.addEventListener("click",event=>{
      const button=event.target.closest("[data-open-image]");
      if(!button)return;
      opener=button;
      dialog.querySelector("img").src=asset(button.dataset.openImage);
      dialog.querySelector("img").alt=button.dataset.imageAlt || "Archo software capture";
      dialog.querySelector("h2").textContent=button.dataset.imageTitle || "Software capture";
      dialog.querySelector(".caption").textContent=button.dataset.imageCaption || "";
      dialog.showModal();
    });
    dialog.querySelector("[data-close-dialog]").addEventListener("click",()=>dialog.close());
    dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener("close",()=>{if(opener?.isConnected)opener.focus({preventScroll:true});opener=null;});
  }
  function setupSources() {
    const dialog=document.getElementById("sources-dialog");
    if(!dialog)return;
    let opener=null;
    document.addEventListener("click",event=>{
      const button=event.target.closest("[data-open-sources],[data-source-focus]");
      if(!button)return;
      opener=button;dialog.showModal();
      const entry=button.dataset.sourceFocus&&dialog.querySelector("#source-"+button.dataset.sourceFocus);
      if(entry){entry.focus({preventScroll:true});entry.scrollIntoView({block:"nearest"});}
      else dialog.querySelector("[data-close-sources]").focus();
    });
    dialog.querySelector("[data-close-sources]").addEventListener("click",()=>dialog.close());
    dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener("close",()=>{if(opener?.isConnected)opener.focus({preventScroll:true});opener=null;});
  }
  function setupCaptures(root) {
    root.querySelectorAll("[data-intelligence-scene]").forEach(scene=>{
      const tabs=[...scene.querySelectorAll("[data-capture-view]")];
      const activate=tab=>{
        tabs.forEach(t=>{const active=t===tab;t.setAttribute("aria-selected",String(active));t.tabIndex=active?0:-1;});
        const selected=tab.dataset;
        const image=scene.querySelector('.intelligence-capture');
        image.src=asset(selected.captureSrc);image.alt=selected.captureAlt;
        image.removeAttribute('width');image.removeAttribute('height');
        scene.querySelector('[data-capture-caption]:not([data-capture-view])').textContent=selected.captureCaption;
        scene.querySelector('[role=tabpanel]').setAttribute('aria-labelledby',tab.id);
        scene.querySelectorAll('[data-capture-enlarge]').forEach(button=>{
          button.dataset.openImage=asset(selected.captureSrc);button.dataset.imageTitle=selected.captureTitle;
          button.dataset.imageCaption=selected.captureCaption;button.dataset.imageAlt=selected.captureAlt;
        });
      };
      tabs.forEach((tab,index)=>{
        tab.addEventListener("click",()=>activate(tab));
        tab.addEventListener("keydown",event=>{
          const next=event.key==="ArrowRight"?(index+1)%tabs.length:event.key==="ArrowLeft"?(index-1+tabs.length)%tabs.length:event.key==="Home"?0:event.key==="End"?tabs.length-1:-1;
          if(next<0)return;event.preventDefault();activate(tabs[next]);tabs[next].focus();
        });
      });
    });
  }
  function setupPopulation() {
    const button=document.getElementById('population-open'),dialog=document.getElementById('population-dialog');
    if(!button||!dialog)return;
    const model=JSON.parse(button.dataset.populationModel),start=Date.parse(model.start),end=Date.parse(model.end);
    const value=document.getElementById('population-value'),status=document.getElementById('population-status'),pause=document.getElementById('population-pause');
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused=motion.matches,timer=null;
    function render(){
      const now=Date.now(),clamped=Math.min(end,Math.max(start,now)),inRange=now>=start&&now<end;
      const total=Math.floor(model.startPopulation+(model.endPopulation-model.startPopulation)*(clamped-start)/(end-start));
      const date=new Date(clamped),formatted=total.toLocaleString('en-US');
      value.textContent=formatted;
      status.textContent=inRange?(paused?'Estimated · Paused':'Estimated'):'Projection · '+date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
      button.setAttribute('aria-label','Estimated world population '+formatted+'. Open source and method');
      document.getElementById('population-asof').textContent=(inRange?'Modeled as of ':'Nearest dated projection: ')+date.toISOString().replace('T',' ').slice(0,19)+' UTC'+(paused&&inRange?' · paused.':'.');
      pause.hidden=!inRange;
      return inRange;
    }
    function startTimer(){
      clearInterval(timer);timer=null;
      const inRange=render();pause.textContent=paused?'Resume counter':'Pause counter';pause.setAttribute('aria-pressed',String(paused));
      if(!paused&&!document.hidden&&inRange)timer=setInterval(()=>{if(!render()){clearInterval(timer);timer=null;}},1000);
    }
    pause.addEventListener('click',()=>{paused=!paused;startTimer();});
    button.addEventListener('click',()=>dialog.showModal());
    dialog.querySelector('[data-close-population]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener('close',()=>button.focus({preventScroll:true}));
    document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(timer);timer=null;}else if(!paused)startTimer();});
    motion.addEventListener?.('change',event=>{if(event.matches){paused=true;startTimer();}});
    startTimer();
  }
  function routeFragment() {
    if(!portable)return location.hash.slice(1);
    try{return new URL(location.hash.slice(1)||"/","https://archosystem.com").hash.slice(1);}catch{return "";}
  }
  function showDiscoveryFragment(root=document) {
    const id=routeFragment();
    root.querySelectorAll("[data-tab-group]").forEach(group=>{
      const requested=[...group.querySelectorAll("[role=tab]")].find(t=>t.getAttribute("aria-controls")===id);
      if(requested){requested.click();document.getElementById(id)?.scrollIntoView({block:"start",behavior:"auto"});}
    });
  }
  function setupTabs(root) {
    root.querySelectorAll("[data-tab-group]").forEach(group=>{
      const tabs=[...group.querySelectorAll("[role=tab]")];
      const activate=tab=>{
        tabs.forEach(t=>{const active=t===tab;t.setAttribute("aria-selected",String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute("aria-controls")).hidden=!active;});
      };
      tabs.forEach((tab,index)=>{
        tab.addEventListener("click",()=>activate(tab));
        tab.addEventListener("keydown",event=>{
          let next=index;
          if(event.key==="ArrowRight")next=(index+1)%tabs.length;
          else if(event.key==="ArrowLeft")next=(index-1+tabs.length)%tabs.length;
          else if(event.key==="Home")next=0;
          else if(event.key==="End")next=tabs.length-1;
          else return;
          event.preventDefault();activate(tabs[next]);tabs[next].focus();
        });
      });
    });
  }
  function setupInquiry(root,query="") {
    const form=root.querySelector("#brief-form");if(!form)return;
    const preview=root.querySelector("#inquiry-preview"), draft=root.querySelector("#inquiry-draft"),status=root.querySelector("#inquiry-status"),open=root.querySelector("#inquiry-open-email");
    const builder=root.querySelector("#contact-draft-builder"), direct=root.querySelector("#contact-direct-email"), addressStatus=root.querySelector("#contact-address-status");
    let snapshot=null;
    if(contactMemory.fields)for(const [name,value] of Object.entries(contactMemory.fields)){if(form.elements.namedItem(name))form.elements.namedItem(name).value=value;}
    const requested=new URLSearchParams(query||location.search).get("interest");
    if(interestMap[requested]){const interest=form.elements.namedItem("interest");if(interest.value!==interestMap[requested])contactMemory.snapshot=null;interest.value=interestMap[requested];}
    if(direct&&interestMap[requested])direct.href=`mailto:goran@archosystem.com?subject=${encodeURIComponent("ArchoSystem — "+interestMap[requested])}`;
    if(builder&&(interestMap[requested]||contactMemory.fields||contactMemory.snapshot))builder.open=true;
    root.querySelector("#contact-copy-address")?.addEventListener("click",async()=>{
      try{if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");await navigator.clipboard.writeText("goran@archosystem.com");addressStatus.textContent="Email address copied.";}
      catch{addressStatus.textContent="Copy this address: goran@archosystem.com";}
    });
    const setSnapshot=result=>{snapshot=result;contactMemory.snapshot=result;draft.value=result.text;open.href=result.mailto;preview.hidden=false;if(builder)builder.open=true;status.textContent="Draft ready. Open it in your email app or copy it into your email service, then review and send.";};
    if(contactMemory.snapshot)setSnapshot(contactMemory.snapshot);
    const remember=()=>{contactMemory.fields=Object.fromEntries(new FormData(form));};
    const invalidate=()=>{remember();if(!snapshot)return;snapshot=null;contactMemory.snapshot=null;preview.hidden=true;draft.value="";open.removeAttribute("href");};
    form.addEventListener("input",event=>{event.target.setCustomValidity?.("");invalidate();});
    form.addEventListener("change",invalidate);
    form.addEventListener("submit",event=>{
      event.preventDefault();
      for(const name of ["name","message"]){const field=form.elements.namedItem(name);field.setCustomValidity(field.value.trim()?"":"Please complete this field.");}
      if(!form.reportValidity())return;
      remember();setSnapshot(archoBuildInquiry(contactMemory.fields));
      draft.focus({preventScroll:true});preview.scrollIntoView({block:"nearest",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
    });
    root.querySelector("#inquiry-edit").addEventListener("click",()=>{invalidate();form.elements.namedItem("message").focus();});
    root.querySelector("#inquiry-copy").addEventListener("click",async()=>{
      if(!snapshot)return;const current=snapshot;
      try{if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");await navigator.clipboard.writeText(current.text);if(snapshot===current)status.textContent="Draft copied. Paste it into your email service, review and send.";}
      catch{if(snapshot===current){draft.focus();draft.select();status.textContent="The draft is selected for manual copying. Paste it into your email service to send.";}}
    });
  }
  function mount(root=document,query="") {
    applyAssets(root);setupTabs(root);setupCaptures(root);setupInquiry(root,query);window.ArchoGlobe?.init(root);showDiscoveryFragment(root);
    window.ArchoIntelligence?.init(root.querySelector('[data-ai-public]'),asset,destination=>{if(portable)location.hash=destination;else location.assign(destination);});
  }
  function renderPortable(){
    let raw=location.hash.slice(1)||"/";
    if(!raw.startsWith("/"))return;
    const url=new URL(raw,"https://archosystem.com");
    const path=url.pathname.endsWith("/")?url.pathname:url.pathname+"/";
    const page=window.ARCHO_PREVIEW_PAGES[path]||window.ARCHO_PREVIEW_PAGES["/404.html"];
    const form=main.querySelector("#brief-form");if(form)contactMemory.fields=Object.fromEntries(new FormData(form));
    window.ArchoGlobe?.destroy?.();route=path;
    let markup=page.html;for(const [source,value] of Object.entries(window.ARCHO_PREVIEW_ASSETS||{}))markup=markup.split(source).join(value);
    main.innerHTML=markup;document.title=page.title+" | Archo System";document.body.dataset.route=path;
    document.querySelectorAll(".site-nav a").forEach(a=>{if(a.getAttribute("href")===path)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
    closeMenu();mount(main,url.search);window.scrollTo({top:0,behavior:"instant"});main.focus({preventScroll:true});if(url.hash){const target=document.getElementById(decodeURIComponent(url.hash.slice(1)));target?.scrollIntoView({behavior:"auto",block:"start"});}
  }
  function setupPortable(){
    document.addEventListener("click",event=>{
      const a=event.target.closest("a[href]");if(!a||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button>0)return;
      const href=a.getAttribute("href");
      if(href.startsWith("/")&&!href.startsWith("//")){
        const destination=new URL(href,"https://archosystem.com");
        const pathname=destination.pathname.endsWith("/")?destination.pathname:destination.pathname+"/";
        if(!window.ARCHO_PREVIEW_PAGES[pathname]&&!window.ARCHO_PREVIEW_PAGES[destination.pathname])return;
        event.preventDefault();location.hash=destination.pathname+destination.search+destination.hash;
      }else if(href.startsWith("#")&&!href.startsWith("#/")){
        const target=document.getElementById(href.slice(1));if(target){event.preventDefault();target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});if(target.id==="main-content")target.focus();}
      }
    });
    window.addEventListener("hashchange",renderPortable);renderPortable();
  }
  setupMenu();setupMedia();setupSources();setupPopulation();applyAssets(document);
  if(!portable)window.addEventListener("hashchange",()=>showDiscoveryFragment());
  if(portable)setupPortable();else mount(document);
})();
