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
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  pressureOutput.textContent=`Base liquid pressure: ${psi.toFixed(1)} psi`;
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
    const subject=`ArchoSystem — ${data.get('conversation')||'Website inquiry'}`;
    const body=[`Name: ${data.get('name')||''}`,`Email: ${data.get('email')||''}`,`Organization: ${data.get('organization')||''}`,`Conversation: ${data.get('conversation')||''}`,'',String(data.get('brief')||'')].join('\n');
    window.location.href=`mailto:info@archosystem.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const reveals=document.querySelectorAll('.reveal');
if(reduceMotion||!('IntersectionObserver'in window)){
  reveals.forEach(el=>el.classList.add('is-visible'));
}else{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px'});
  reveals.forEach(el=>observer.observe(el));
}
