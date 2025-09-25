document.addEventListener("DOMContentLoaded", function() {

  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }


  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });


  const typedTextSpan = document.querySelector("#typed-text-output");
  const words = ["Informatics", "Student", "Design", "UI/UX Enthusiast"];
  const typingDelay = 150;
  const erasingDelay = 100;
  const newWordDelay = 2000;
  let wordIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < words[wordIndex].length) {
      if (typedTextSpan) {
        typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
      }
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (typedTextSpan) {
        typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
      }
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      wordIndex++;
      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (typedTextSpan && words.length) {
    setTimeout(type, newWordDelay + 250);
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  // Amati setiap section
  sections.forEach(section => {
    observer.observe(section);
  });

});