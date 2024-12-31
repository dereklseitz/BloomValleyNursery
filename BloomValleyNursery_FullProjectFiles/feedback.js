document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.querySelector('#feedback-form form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('tel');
  const messageInput = document.getElementById('message');

  const alertBox = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const alertOkButton = document.getElementById('alert-ok-button');
  const alertCloseButton = document.getElementById('alert-close-btn');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation regex
  const phoneRegex = /^[0-9]{10,15}$/; // Phone validation regex (10-15 digits)
  const nameRegex = /^[a-zA-Z\s]{2,}$/; // Name validation regex (at least 2 letters)
  const sqlInjectionRegex = /[;'"\\]/; // Prevent SQL injection-like characters

  // Form submission handler
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission and page refresh

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    // Validate each field
    if (!nameRegex.test(name)) {
      showCustomAlert('Please enter a valid name (letters and spaces only).');
      return;
    }

    if (!emailRegex.test(email)) {
      showCustomAlert('Please enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      showCustomAlert('Please enter a valid phone number (10-15 digits).');
      return;
    }

    if (sqlInjectionRegex.test(message)) {
      showCustomAlert('Your message contains invalid characters.');
      return;
    }

    // Save feedback to localStorage
    const feedbackData = {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    };

    // Retrieve existing feedback data or initialize an empty array
    const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    feedbackList.push(feedbackData); // Add new feedback to the list
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList)); // Save updated list to localStorage
    console.log('Feedback saved to localStorage:', feedbackList);

    // Show success message
    showCustomAlert('Thank you for your feedback! We appreciate hearing from you.');
    feedbackForm.reset(); // Clear the input fields after submission
  });

  // Function to show the custom alert modal
  function showCustomAlert(message) {
    alertMessage.textContent = message; // Set modal message
    alertBox.classList.remove('hidden'); // Display the modal
    alertBox.style.display = 'flex'; // Ensure the modal is visible
  }

  // Function to close the custom alert modal
  function closeCustomAlert() {
    alertBox.classList.add('hidden'); // Hide the modal
    alertBox.style.display = 'none'; // Ensure it's hidden
  }

  // Close modal on "OK" button click
  alertOkButton.addEventListener('click', closeCustomAlert);

  // Close modal on "X" button click
  alertCloseButton.addEventListener('click', closeCustomAlert);

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === alertBox) {
      closeCustomAlert();
    }
  });
});
