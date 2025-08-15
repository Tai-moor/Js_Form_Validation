document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const name = form.querySelector('input[placeholder="Name"]');
  const email = form.querySelector('input[placeholder="Email Address"]');
  const phone = form.querySelector('input[placeholder="Phone Number"]');
  const org = form.querySelector('input[placeholder="Organisation"]');
  const dropdown = form.querySelector("select");
  const awardOptions = form.querySelectorAll(".award-option");

  function showError(element, message) {
    const errorSpan = element.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("error-message")) {
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
    }
  }

  function clearError(element) {
    const errorSpan = element.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("error-message")) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  }

  function validateAwards() {
    let anyChecked = false;
    let hasAwardError = false;

    awardOptions.forEach((option) => {
      const checkbox = option.querySelector('input[name="award"]');
      const textarea = option.querySelector("textarea");
      const errorSpan = option.querySelector(".error-message");

      if (checkbox.checked) {
        anyChecked = true;
        if (!textarea.value.trim()) {
          errorSpan.textContent = `Please provide a description for "${checkbox.value}".`;
          errorSpan.style.display = "block";
          hasAwardError = true;
        } else {
          errorSpan.textContent = "";
          errorSpan.style.display = "none";
        }
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
      }
    });

    if (!anyChecked) {
      awardOptions.forEach((option) => {
        const errorSpan = option.querySelector(".error-message");
        errorSpan.textContent = "Please select at least one award.";
        errorSpan.style.display = "block";
      });
      return false;
    }

    return !hasAwardError;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let hasError = false;

    // Name
    if (!name.value.trim()) {
      showError(name, "Name is required.");
      hasError = true;
    } else if (
      name.value.trim().length < 3 ||
      !/^[A-Za-z\s]+$/.test(name.value.trim())
    ) {
      showError(
        name,
        "Name must contain only letters and be at least 3 characters."
      );
      hasError = true;
    } else {
      clearError(name);
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, "Email Address is required.");
      hasError = true;
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      hasError = true;
    } else {
      clearError(email);
    }

    // Phone
    const phoneRegex = /^03\d{9}$/;
    if (!phone.value.trim()) {
      showError(phone, "Phone Number is required.");
      hasError = true;
    } else if (!phoneRegex.test(phone.value.trim())) {
      showError(phone, "Number must start with 03 and be exactly 11 digits.");
      hasError = true;
    } else {
      clearError(phone);
    }
    // Organisation
    if (!org.value.trim()) {
      showError(org, "Organisation is required.");
      hasError = true;
    } else {
      clearError(org);
    }

    // Dropdown
    if (!dropdown.value) {
      showError(dropdown, "Please select a country.");
      hasError = true;
    } else {
      clearError(dropdown);
    }

    // Awards
    if (!validateAwards()) {
      hasError = true;
    }

    // If no errors, submit form
    if (!hasError) {
      alert("Form submitted successfully!");
      form.submit();
    }
  });
});
