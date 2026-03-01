const io = new IntersectionObserver(
      e => {
        e.forEach(x => {
          if (x.isIntersecting) x.target.classList.add("show");
        });
      },
      { threshold: .1 }
    );
    document.querySelectorAll(".reveal").forEach(x => io.observe(x));

    // Improved Mobile Menu
    function toggleMenu() {
      const m = document.getElementById("menu"),
        b = document.getElementById("menuBtn");
      if (m.classList.contains("hidden")) {
        m.classList.replace("hidden", "flex");
        b.innerHTML = "✕";
        document.body.style.overflow = "hidden";
      } else {
        closeMenu();
      }
    }

    function closeMenu() {
      const m = document.getElementById("menu"),
        b = document.getElementById("menuBtn");
      m.classList.replace("flex", "hidden");
      b.innerHTML = "☰";
      document.body.style.overflow = "auto";
    }

    // Lightbox Logic
    let current = 0;
    const imgs = [...document.querySelectorAll(".gallery-item")];
    const box = document.getElementById("lightbox"),
      boxImg = document.getElementById("lightImg");

    function openLightbox(i) {
      current = i;
      boxImg.src = imgs[current].src;
      box.style.display = "grid";
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      box.style.display = "none";
      document.body.style.overflow = "auto";
    }

    function changeImage(s) {
      current = (current + s + imgs.length) % imgs.length;
      boxImg.src = imgs[current].src;
    }

    // Close on background click
    box.addEventListener("click", e => { if (e.target === box) closeLightbox(); });

    // Keyboard navigation
    document.addEventListener("keydown", e => {
      if (box.style.display === "grid") {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeLightbox();
      }
    });

    // FUNCTIONAL UPGRADE: Contact Form to WhatsApp

    // document.getElementById('contactForm').addEventListener('submit', function(e) {
    //   e.preventDefault();
    //   const name = document.getElementById('formName').value;
    //   const email = document.getElementById('formEmail').value;
    //   const message = document.getElementById('formMessage').value;
      
    //   const encodedMsg = encodeURIComponent(
    //     `*New Inquiry from Website*\n\n` +
    //     `*Name:* ${name}\n` +
    //     `*Email:* ${email}\n` +
    //     `*Message:* ${message}`
    //   );
      
    //   const whatsappUrl = `https://wa.me/919045490430?text=${encodedMsg}`;
    //   window.open(whatsappUrl, '_blank');
    // });
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const phone = document.getElementById('formPhone').value;
      const message = document.getElementById('formMessage').value;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10 digit contact number");
        return;
      }

      const encodedMsg = encodeURIComponent(
        `*New Inquiry from Website*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Message:* ${message}`
      );

      const whatsappUrl = `https://wa.me/918791768468?text=${encodedMsg}`;

      alert("WhatsApp is opening. Please tap Send to complete your message.");
      window.open(whatsappUrl, '_blank');
    });
    window.addEventListener("load", () => {
     document.getElementById("loader").style.display="none";
     document.body.style.overflow="auto";
    });