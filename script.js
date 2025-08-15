
/* Navigation: client-side section switching for single-page areas */
function initSectionNav(){
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')){
        e.preventDefault();
        links.forEach(l=>l.classList.remove('active'));
        sections.forEach(s=>s.classList.remove('active'));
        link.classList.add('active');
        const id = href.substring(1);
        const target = document.getElementById(id);
        if (target) target.classList.add('active');
        history.replaceState(null, "", href);
      }
    });
  });
}

/* Reveal on scroll */
function initReveals(){
  const els = document.querySelectorAll('.project-card, .showcase-item, .hobby-card');
  els.forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(12px)'; el.style.transition='all .45s ease';
  });
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.style.opacity='1';
        entry.target.style.transform='none';
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
  els.forEach(el=>io.observe(el));
}

/* Contact form enhanced UX (works with Formspree) */
function initContactForm(){
  const form = document.querySelector('form[data-enhanced-contact]');
  if(!form) return;
  const status = form.querySelector('[data-status]');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = "Sending...";
    try{
      const data = new FormData(form);
      const endpoint = form.getAttribute('action');
      const res = await fetch(endpoint, { method:'POST', body: data, headers: { 'Accept':'application/json' }});
      if (res.ok){
        status.textContent = "Thanks! Your message was sent.";
        form.reset();
      } else {
        status.textContent = "Hmm, something went wrong. You can also email me directly.";
      }
    }catch(err){
      status.textContent = "Network error. Please try again or email me directly.";
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initSectionNav();
  initReveals();
  initContactForm();
});
