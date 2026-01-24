// Don't forget to paste your Web App URL here
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyCZsV8dWkktl4swFFZ3DRxQlCp_9jW1d-V3G-jh4Wiple8XYpQ1WzPEB4b0WuAVCmq/exec";

const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg"); // For the success message

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 1. Change button text so the user knows the process is running
  const submitButton = form.querySelector("button");
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = "Sending...";
  submitButton.disabled = true; // Disable the button to prevent double-clicking

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // 2. Clear the form here
      form.reset();

      // 3. Show Success Message
      if (msg) {
        msg.innerHTML = "Message sent successfully!";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 2000); // Message will disappear after 2 seconds
      } else {
        alert("Message sent successfully!");
      }

      // 4. Reset the button to its original state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    })
    .catch((error) => {
      console.error("Error!", error.message);
      if (msg) msg.innerHTML = "Error sending message.";
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    });
});
