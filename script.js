document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let hasError = false;

    const name = form.querySelector('input[placeholder="Name"]');
    const email = form.querySelector('input[placeholder="Email Address"]');
    const phone = form.querySelector('input[placeholder="Phone Number"]');
    const org = form.querySelector('input[placeholder="Organisation"]');
    const dropdown = form.querySelector("select");
    const awardOptions = form.querySelectorAll(".award-option");
    const checkedAwards = form.querySelectorAll('input[name="award"]:checked');

    // Show error in existing span
    function showError(input, message) {
      const errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains("error-message")) {
        errorSpan.textContent = message;
      }
      hasError = true;
    }

    // Clear existing error
    function clearError(input) {
      const errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains("error-message")) {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
      }
    }

    // Name validation
    if (!name.value.trim()) {
      showError(name, "Name is required.");
    } else if (
      name.value.trim().length < 3 ||
      !/^[A-Za-z\s]+$/.test(name.value.trim())
    ) {
      showError(
        name,
        "Name must contain only letters and be at least 3 characters."
      );
    } else {
      clearError(name);
    }

    // Email validation
    if (!email.value.trim()) {
      showError(email, "Email Address is required.");
    } else if (
      !email.value.includes("@") ||
      !email.value.includes(".") ||
      email.value.startsWith("@") ||
      email.value.endsWith("@")
    ) {
      showError(email, "Please enter a valid email address.");
    } else {
      clearError(email);
    }

    // Phone validation
    if (!phone.value) {
      showError(phone, "Phone Number is required.");
    } else if (!phone.value.startsWith("03")) {
      showError(phone, "Number must start with 03.");
    } else if (phone.value.length !== 11) {
      showError(phone, "Number must be exactly 11 digits.");
    } else {
      clearError(phone);
    }

    // Organisation validation
    if (!org.value.trim()) {
      showError(org, "Organisation is required.");
    } else {
      clearError(org);
    }

    // Dropdown validation
    if (!dropdown.value) {
      showError(dropdown, "Please select an option from the dropdown.");
    } else {
      clearError(dropdown);
    }

    // Award selection
    let anyChecked = false;

    for (let i = 0; i < awardOptions.length; i++) {
      const checkbox = awardOptions[i].querySelector('input[name="award"]');
      const textarea = awardOptions[i].querySelector("textarea");
      const errorSpan = awardOptions[i].querySelector(".error-message");

      if (checkbox.checked) {
        anyChecked = true;
        if (!textarea.value.trim()) {
          errorSpan.textContent = `Please provide a description for "${checkbox.value}".`;
          hasError = true;
        } else {
          errorSpan.textContent = "";
          errorSpan.style.display = "none";
        }
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
      }
    }

    if (!anyChecked) {
      for (let i = 0; i < awardOptions.length; i++) {
        const errorSpan = awardOptions[i].querySelector(".error-message");
        errorSpan.textContent = "Please select this award.";
        errorSpan.style.display = "block";
      }
      hasError = true;
    }

    if (!hasError) {
      alert("Form submitted successfully!");
      form.submit();
    }
  });
});
