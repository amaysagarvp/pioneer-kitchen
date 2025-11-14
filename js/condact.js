// Initialize EmailJS 
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); //  public key
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get Form Fields
  const name = document.querySelector("input[name='name']").value.trim();
  const email = document.querySelector("input[name='email']").value.trim();
  const title = document.querySelector("input[name='title']").value.trim();
  const message = document.querySelector("textarea[name='message']").value.trim();

  // Validation
  if (name === "") {
    alert("Please enter your name");
    return;
  }

  if (email === "") {
    alert("Please enter your email");
    return;
  }

  // Email Format Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (message === "") {
    alert("Message cannot be empty");
    return;
  }

  // Send email using EmailJS
  const templateParams = {
    from_name: name,
    email_id: email,
    subject: title,
    message: message
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(function (response) {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    }, function (error) {
      alert("Failed to send message. Please try again.");
      console.log("FAILED:", error);
    });

});
