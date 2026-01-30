/* =========================================
   1. Mobile Navigation & Menu
   ========================================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking any nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

/* =========================================
   2. Smooth Scrolling
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Double check to ensure menu closes
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

/* =========================================
   3. Navbar Scroll Effect (Background Change)
   ========================================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.99)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "none";
  }
});

/* =========================================
   4. Highlight Active Link on Scroll
   ========================================= */
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // -200 offset helps trigger the active state a bit earlier
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================================
   5. Skill Bars Animation
   ========================================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          bar.style.width = width + "%";
        });
      }
    });
  },
  { threshold: 0.5 },
);

const skillsSection = document.getElementById("skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

/* =========================================
   6. Contact Form (Google Sheets Integration)
   ========================================= */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop page reload

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Change button text to indicate loading
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Your Google Apps Script URL
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyiYfpGBM_O7bq5_JgO5Uztk53PHYRMiFUDsbJDyuEjjSz1DXYEBURsY1K2T8Int0kz/exec";

    try {
      // Send data to Google Sheet
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(contactForm),
      });

      if (response.ok) {
        // Success Message
        formMessage.innerHTML = `
          <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; border: 1px solid #c3e6cb; margin-top: 1rem;">
            🎉 Message sent successfully! I'll get back to you soon.
          </div>
        `;
        contactForm.reset(); // Clear the form
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      // Error Message
      console.error("Error!", error.message);
      formMessage.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 8px; border: 1px solid #f5c6cb; margin-top: 1rem;">
          ❌ Something went wrong. Please try again.
        </div>
      `;
    } finally {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
