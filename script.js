    // ===== PARALLAX EFFECT =====
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    function updateParallax() {
      parallaxBgs.forEach(bg => {
        const section = bg.parentElement;
        const rect = section.getBoundingClientRect();
        const speed = parseFloat(bg.dataset.speed) || 0.4;
        const yPos = Math.max(-300, Math.min(300, -(rect.top * speed)));
        bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    }

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');

    function handleNavbar() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // ===== REVEAL ON SCROLL =====
    const reveals = document.querySelectorAll('.reveal');

    function handleReveal() {
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 50) {
          el.classList.add('active');

          // Animate skill bars
          const bar = el.querySelector('.skill-bar');
          if (bar) {
            bar.style.width = el.dataset.skill + '%';
          }
        }
      });
    }

    // ===== CUSTOM CURSOR =====
    const cursor = document.getElementById('cursor');

    if (window.innerWidth > 900) {
    document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    });
    }

    document.querySelectorAll('iframe').forEach(frame => {
    frame.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0';
    });

    frame.addEventListener('mouseleave', () => {
    cursor.style.opacity = '1';
    });
    });

    document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ===== PARTICLES =====
    const canvas = document.getElementById('particles-canvas');

let ctx = null;
let particles = [];

if (canvas) {
  ctx = canvas.getContext('2d');

  if (ctx) {

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(40, Math.floor(canvas.width * canvas.height / 30000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }
}

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    // ===== COUNTER ANIMATION =====
    function animateCounters() {
      document.querySelectorAll('.stat-number').forEach(counter => {
        if (counter.dataset.animated) return;
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          counter.dataset.animated = 'true';
          const text = counter.textContent;
          const target = parseInt(text);
          const suffix = text.replace(/[0-9]/g, '');
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
          }, 25);
        }
      });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // ===== SCROLL EVENT =====
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          handleNavbar();
          handleReveal();
          animateCounters();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial calls
    updateParallax();
    handleNavbar();
    handleReveal();

  function attachFormHandler(form) {
  if (!form) return;

  const originalForm = form.innerHTML;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      form.innerHTML = `
        <div class="success-message">
          <h3>Спасибо!</h3>
          <p>Ваш запрос отправлен. Я свяжусь с вами в ближайшее время.</p>
          <button class="submit-btn resend-btn">Отправить ещё</button>
        </div>
      `;

      const resendBtn = document.querySelector('.resend-btn');

      resendBtn.addEventListener('click', () => {
        form.innerHTML = originalForm;
        attachFormHandler(form);
      });
    }
  });
}
    
  const form = document.querySelector('.contact-form');
  attachFormHandler(form);

  const percentEl = document.getElementById('loader-percent');
  const preloader = document.getElementById('preloader');

  let percent = 0;

  const interval = setInterval(() => {
  percent++;
  if (percentEl) {
    percentEl.textContent = percent + '%';
  }

  if (percent >= 100) {
    clearInterval(interval);

    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 300);
  }
  }, 20);