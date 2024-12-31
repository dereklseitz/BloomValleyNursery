document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email-input');
  const alertBox = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const alertOkButton = document.getElementById('alert-ok-button');
  const alertCloseButton = document.getElementById('alert-close-btn');

  // Form submission handler
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    const email = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email is valid
    if (!emailRegex.test(email)) {
      showCustomAlert('Please enter a valid email address.');
      return;
    }

    // Show success message
    showCustomAlert(`Thank you for subscribing, ${email}!`);
    newsletterForm.reset(); // Clear the input field after submission
  });

  // Function to show the custom alert modal
  function showCustomAlert(message) {
    alertMessage.textContent = message; // Set the alert message
    alertBox.classList.remove('hidden'); // Show the alert modal
    alertBox.style.display = 'flex'; // Ensure the modal is displayed

    // Close the modal when the "OK" button is clicked
    alertOkButton.addEventListener('click', closeCustomAlert);
    alertCloseButton.addEventListener('click', closeCustomAlert);
  }

  // Function to hide the custom alert modal
  function closeCustomAlert() {
    alertBox.classList.add('hidden'); // Hide the alert modal
    alertBox.style.display = 'none'; // Ensure the modal is hidden
  }

  // Close the modal if clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === alertBox) {
      closeCustomAlert();
    }
  });
});
