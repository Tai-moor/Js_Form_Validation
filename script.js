document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let errors = [];

    const name = form.querySelector('input[placeholder="Name"]');
    const email = form.querySelector('input[placeholder="Email Address"]');
    const phone = form.querySelector('input[placeholder="Phone Number"]');
const dropdown = form.querySelector("select");
    const org = form.querySelector('input[placeholder="Organisation"]');

    // For Name
    if (!name.value.trim()) {
      errors.push("Name is required.");
    } else {
      const nameValue = name.value.trim();
      if (nameValue.length < 3 || !/^[A-Za-z\s]+$/.test(nameValue)) {
        errors.push(
          "Name must contain only letters and spaces, and be at least 3 characters."
        );
      }
    }
    //For Number
if (!phone.value) {
  errors.push("Phone Number is required");
} else if (!phone.value.startsWith("03")) {
  errors.push("Number must start with 03");
} else if (phone.value.length !== 11 ) {
  errors.push("Number must be exactly 11 digits");
}

    // For Email
    if (!email.value.trim()) {
      errors.push("Email Address is required.");
    } else {
      const emailValue = email.value.trim();
      if (
        !emailValue.includes("@") ||
        !emailValue.includes(".") ||
        emailValue.startsWith("@") ||
        emailValue.endsWith("@")
      ) {
        errors.push("Please enter a valid email address.");
      }
    }

    //For Dropdown 
    if (!dropdown.value) {
    errors.push("Please select an option from the dropdown.");
  }
    //For Organization
    if (!org.value.trim()) {
      errors.push("Organisation is required.");
    }

    //For Award Checking
    const checkedAwards = [
      ...form.querySelectorAll('input[name="award"]:checked'),
    ];
    if (!checkedAwards.length) errors.push("Please select at least one award.");

    checkedAwards.forEach((cb) => {
      const textarea = cb.closest(".award-option").querySelector("textarea");
      if (!textarea.value.trim())
        errors.push(`Please provide a description for "${cb.value}".`);
    });

    if (errors.length) {
      alert(errors.join("\n"));
    } else {
      alert("Form submitted successfully!");
      form.submit();
    }
  });
});
