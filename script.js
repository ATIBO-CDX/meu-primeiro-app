const animatedElements = document.querySelectorAll('[data-animate]');
const contactForm = document.querySelector('.contact-form');
const formFeedback = document.querySelector('.form-feedback');
const cursorGlow = document.querySelector('.cursor-glow');
const interactiveCards = document.querySelectorAll('.service-card, .about-card, .why-card, .method-timeline article, .testimonial-card, .contact-form');


const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

animatedElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
  revealObserver.observe(element);
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const whatsappNumber = contactForm.dataset.whatsapp;
  const whatsappMessage = [
    'Olá, quero falar sobre um projeto de copywriting.',
    `Nome: ${formData.get('name')}`,
    `Email: ${formData.get('email')}`,
    `Orçamento: ${formData.get('budget')}`,
    `Mensagem: ${formData.get('message')}`,
  ].join('\n');

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');

  if (formFeedback) {
    formFeedback.textContent = 'Mensagem pronta. O WhatsApp foi aberto para concluir o envio.';
    formFeedback.classList.add('is-success');
  }

  contactForm.reset();
});

window.addEventListener('pointermove', (event) => {
  if (cursorGlow) {
    cursorGlow.classList.add('is-active');
    cursorGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  }
});

interactiveCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// FAQ INTERATIVO

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

const button = item.querySelector(".faq-question");

button.addEventListener("click", () => {

const activeItem =
document.querySelector(".faq-item.active");

if(activeItem && activeItem !== item){

activeItem.classList.remove("active");

}

item.classList.toggle("active");

});

});

// RESULTADOS ANIMADOS

const counters =
document.querySelectorAll(".counter");

const observer =
new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter =
entry.target;

const target =
+counter.dataset.target;

let current = 0;

const increment =
target / 60;

function updateCounter(){

if(current < target){

current += increment;

counter.innerText =
Math.ceil(current);

requestAnimationFrame(
updateCounter
);

}else{

counter.innerText =
target;

}

}

updateCounter();

observer.unobserve(counter);

}

});

},

{

threshold:0.5

}

);

counters.forEach(counter=>{

observer.observe(counter);

});
