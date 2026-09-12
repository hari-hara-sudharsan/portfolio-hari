/**
 * PORTFOLIO CLIENT SCRIPTS
 * Theme Toggle, Mobile Menu, Active Scrollspy, Copy Email, Scroll-To-Top
 */

// Mobile Navigation Toggle
function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const icon = document.querySelector(".hamburger-icon");
  const isExpanded = icon.getAttribute("aria-expanded") === "true";
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  icon.setAttribute("aria-expanded", !isExpanded);
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const menu = document.getElementById("mobile-menu");
  const icon = document.querySelector(".hamburger-icon");
  
  if (hamburgerMenu && !hamburgerMenu.contains(e.target) && menu.classList.contains("open")) {
    menu.classList.remove("open");
    icon.classList.remove("open");
    icon.setAttribute("aria-expanded", "false");
  }
});

// Theme Management (Light / Dark mode)
function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  // Default to light unless user or system prefers dark
  const activeTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", activeTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
}

// Set up theme toggles
const themeToggleDesktop = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");

if (themeToggleDesktop) {
  themeToggleDesktop.addEventListener("click", toggleTheme);
}
if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", toggleTheme);
}

// Header scroll effect and Scroll-to-Top button
const header = document.getElementById("header");
const scrollTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // Header background blur on scroll
  if (scrollPosition > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll to top button visibility
  if (scrollPosition > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Active Nav Link Spy on Scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#desktop-nav .nav-link");

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavOnScroll);

// Toast Notification
let toastTimeout;
function showToast(message = "Email copied to clipboard!") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  
  if (!toast) return;

  if (toastMessage) {
    toastMessage.textContent = message;
  }

  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Copy Email to Clipboard
const copyEmailBtn = document.getElementById("copy-email-btn");
const emailAddressEl = document.getElementById("email-address");

if (copyEmailBtn && emailAddressEl) {
  copyEmailBtn.addEventListener("click", async () => {
    const emailText = emailAddressEl.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = emailText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast("Email copied to clipboard!");
    } catch (err) {
      showToast("Could not copy email");
    }
  });
}

// Current Year in Footer
const currentYearEl = document.getElementById("current-year");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Initialize theme on page load
initTheme();
