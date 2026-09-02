/**
 * Muhammad Mujasam — Contact Form & Quick Actions
 */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("contact-submit-btn");

  // --- Copy to Clipboard Functionality ---
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(
        () => {
          const originalText = btn.textContent;
          btn.textContent = "Copied!";
          btn.style.borderColor = "var(--color-primary-light)";
          btn.style.color = "var(--color-primary-light)";

          showToast(`Copied to clipboard: ${textToCopy}`);

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.borderColor = "";
            btn.style.color = "";
          }, 2000);
        },
        () => {
          showToast("Failed to copy. Please manually select the text.");
        }
      );
    });
  });

  // --- Contact Form Submission & Validation ---
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const projectType = document.getElementById("contact-type").value;
      const message = document.getElementById("contact-message").value.trim();

      // Basic validation
      if (!name || name.length < 2) {
        showToast("Please enter your name (at least 2 characters).", "error");
        document.getElementById("contact-name").focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error");
        document.getElementById("contact-email").focus();
        return;
      }

      if (!projectType) {
        showToast("Please select a project type.", "error");
        document.getElementById("contact-type").focus();
        return;
      }

      if (!message || message.length < 10) {
        showToast("Please provide a brief message (at least 10 characters).", "error");
        document.getElementById("contact-message").focus();
        return;
      }

      // UI Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          Preparing Message...
        `;
      }

      setTimeout(() => {
        // Construct mailto link
        const subject = encodeURIComponent(`Project Inquiry [${projectType}]: From ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`);
        const mailtoUrl = `mailto:muhammadmujasam4@gmail.com?subject=${subject}&body=${body}`;

        // Reset button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Message Prepared!</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
        }

        showToast("Thank you! Opening your email client to send message to Muhammad...", "success");

        // Trigger email client
        window.location.href = mailtoUrl;

        // Reset form after short delay
        setTimeout(() => {
          contactForm.reset();
          if (submitBtn) {
            submitBtn.innerHTML = `
              <span>Send Message</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            `;
          }
        }, 3500);
      }, 700);
    });
  }
});

/**
 * Display a toast alert notification
 */
function showToast(message, type = "info") {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary-light); flex-shrink: 0;">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.4s, transform 0.4s";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
