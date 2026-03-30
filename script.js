    // ===== PARALLAX EFFECT =====
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    function updateParallax() {
      parallaxBgs.forEach(bg => {
        const section = bg.parentElement;
        const rect = section.getBoundingClientRect();
        const speed = parseFloat(bg.dataset.speed) || 0.4;
        const yPos = -(rect.top * speed);
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
        if (top < windowHeight - 100) {
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

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ===== PARTICLES =====
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

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
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(60, Math.floor(canvas.width * canvas.height / 20000));
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

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

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