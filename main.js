const menuToggle=document.querySelector('.menu-toggle');
const siteNav=document.querySelector('.site-nav');
const navLinks=document.querySelectorAll('.site-nav a');
const capacityInput=document.querySelector('#capacity-input');
const heightInput=document.querySelector('#height-input');
const diameterOutput=document.querySelector('#diameter-output');
const pressureOutput=document.querySelector('#pressure-output');
const targetOutput=document.querySelector('#target-output');
const heightOutput=document.querySelector('#height-output');
const briefForm=document.querySelector('#brief-form');
const familyButtons=document.querySelectorAll('.requirement-button');
const familyOutput=document.querySelector('#family-output');
const familyDescription=document.querySelector('#family-description');

function closeNav(){
  if(!menuToggle||!siteNav)return;
  siteNav.classList.remove('is-open');
  document.body.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Open navigation');
}

if(menuToggle&&siteNav){
  menuToggle.addEventListener('click',()=>{
    const open=!siteNav.classList.contains('is-open');
    siteNav.classList.toggle('is-open',open);
    document.body.classList.toggle('nav-open',open);
    menuToggle.setAttribute('aria-expanded',String(open));
    menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  navLinks.forEach(link=>link.addEventListener('click',closeNav));
  window.addEventListener('resize',()=>{if(window.innerWidth>820)closeNav()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeNav()});
  document.addEventListener('click',event=>{
    if(!siteNav.classList.contains('is-open'))return;
    if(siteNav.contains(event.target)||menuToggle.contains(event.target))return;
    closeNav();
  });
}

const familyCopy={
  Rapid:'A temporary-storage development pathway organized around compact transport, deployment planning, recovery, and staged readiness.',
  Fire:'A fire-water development pathway organized around reserve capacity, flow interfaces, access, monitoring, climate, and site conditions.',
  Process:'A process-containment development pathway for equalization, bypass, holding, mixing, temporary treatment, and rehabilitation support.',
  Storage:'A liquid-storage development pathway organized by contents, capacity, duration, site, protection, and lifecycle requirements.',
  Permanent:'A long-duration development pathway requiring project-specific foundations, permanent interfaces, exterior systems, engineering, and validation.'
};

familyButtons.forEach(button=>{
  button.addEventListener('click',()=>{
    const family=button.dataset.family;
    familyButtons.forEach(item=>item.classList.toggle('is-active',item===button));
    if(familyOutput)familyOutput.textContent=`ArchoTank ${family}`;
    if(familyDescription)familyDescription.textContent=familyCopy[family]||'';
  });
});

function updateSelector(){
  if(!capacityInput||!heightInput||!diameterOutput||!pressureOutput)return;
  const min=Number(capacityInput.min)||1000;
  const max=Number(capacityInput.max)||2000000;
  const gallons=Math.min(max,Math.max(min,Number(capacityInput.value)||min));
  const height=Math.max(1,Number(heightInput.value)||1);
  const cubicFeet=gallons/7.48052;
  const diameter=Math.sqrt((4*cubicFeet)/(Math.PI*height));
  const psi=height*.433;
  diameterOutput.textContent=`${Math.ceil(diameter)} ft`;
  pressureOutput.textContent=`Water-equivalent pressure at full wall height: ${psi.toFixed(1)} psi`;
  if(targetOutput)targetOutput.textContent=`Target: ${Math.round(gallons).toLocaleString('en-US')} gal`;
  if(heightOutput)heightOutput.textContent=`Wall height: ${height} ft`;
}

capacityInput?.addEventListener('input',updateSelector);
heightInput?.addEventListener('change',updateSelector);
capacityInput?.addEventListener('blur',()=>{
  const min=Number(capacityInput.min)||1000;
  const max=Number(capacityInput.max)||2000000;
  const value=Math.min(max,Math.max(min,Number(capacityInput.value)||min));
  capacityInput.value=String(value);
  updateSelector();
});
updateSelector();

if(briefForm){
  briefForm.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(briefForm);
    const subject=`ArchoSystem — ${data.get('conversation')||'Project inquiry'}`;
    const body=[`Name: ${data.get('name')||''}`,`Email: ${data.get('email')||''}`,`Organization: ${data.get('organization')||''}`,`Conversation: ${data.get('conversation')||''}`,'',String(data.get('brief')||'')].join('\n');
    window.location.href=`mailto:info@archosystem.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
