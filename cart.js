document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  // Get modal and cart-related elements
  const modal = document.getElementById('cart-modal');
  const closeModal = document.querySelector('.close-modal');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  const clearCartModalButton = document.getElementById('clear-cart-modal-btn');
  const processOrderModalButton = document.getElementById('process-order-modal-btn');

  // Custom confirmation modals for clear cart and process order
  const confirmationModal = document.getElementById('confirmation-modal');
  const confirmationMessage = document.getElementById('confirmation-message');
  const confirmationCloseButton = document.getElementById('confirmation-close-btn');
  const confirmationConfirmButton = document.getElementById('confirmation-confirm-btn');

  // Buttons
  const shoppingCartButton = document.getElementById('shopping-cart');
  const cartDetailsButton = document.getElementById('cart-details');

  // Custom alert modal for item added
  const itemAddedModal = document.getElementById('item-added-modal');
  const itemAddedMessage = document.getElementById('item-added-message');
  const itemAddedClose = document.getElementById('item-added-close');

  // Final confirmation modal for success messages
  const finalConfirmationModal = document.getElementById('final-confirmation-modal');
  const finalConfirmationMessage = document.getElementById('final-confirmation-message');
  const finalConfirmationCloseButton = document.getElementById('final-confirmation-close-btn');

  // Function to render the cart
  function renderCart() {
    cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
      cartTotalContainer.textContent = '';
      return;
    }

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} x ${item.quantity} - $${itemTotal.toFixed(2)}`;
      cartItemsContainer.appendChild(listItem);
    });

    cartTotalContainer.textContent = `Subtotal: $${total.toFixed(2)}`;
  }

  // Show cart modal with current cart content
  function showModal() {
    renderCart(); // Always render the latest cart
    modal.style.display = 'flex'; // Show the cart modal
  }

  // Show confirmation modal for actions (clear or process order)
  function showConfirmationModal(message, action) {
    confirmationMessage.textContent = message;
    confirmationModal.style.display = 'flex'; // Show the confirmation modal

    // Confirm action on the "Confirm" button
    confirmationConfirmButton.onclick = () => {
      action(); // Execute the passed action (clear cart, process order)
      confirmationModal.style.display = 'none'; // Close the confirmation modal after confirming
    };

    // Close confirmation modal without performing any action
    confirmationCloseButton.onclick = () => {
      confirmationModal.style.display = 'none';
    };
  }

  // Show final confirmation modal with success message
  function showFinalConfirmationModal(message) {
    finalConfirmationMessage.textContent = message;
    finalConfirmationModal.style.display = 'flex'; // Show the final confirmation modal
    finalConfirmationCloseButton.onclick = () => {
      finalConfirmationModal.style.display = 'none'; // Close final confirmation modal
    };
  }

  // Show custom modal when item is added to cart
  function showItemAddedModal(message) {
    itemAddedMessage.textContent = message;  // Set message dynamically
    itemAddedModal.style.display = 'flex';   // Show the modal
    itemAddedClose.addEventListener('click', () => {
      itemAddedModal.style.display = 'none'; // Close the modal
    });
  }

  // Attach event listeners to both cart buttons
  [shoppingCartButton, cartDetailsButton].forEach(button => {
    if (button) {
      button.addEventListener('click', showModal); // Open modal when clicked
    }
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close the modal by clicking the close button (for cart modal)
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.dataset.productId, 10);
      const product = products.find(item => item.id === productId);

      if (product) {
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        sessionStorage.setItem('cart', JSON.stringify(cart)); // Save cart to session storage
        showItemAddedModal(`${product.name} has been added to the cart!`); // Show custom modal
      }
    });
  });

  // Event listener for Clear Cart button in the modal
  if (clearCartModalButton) {
    clearCartModalButton.addEventListener('click', () => {
      showConfirmationModal('Are you sure you want to clear the cart?', () => {
        sessionStorage.removeItem('cart');
        cart = [];
        renderCart(); // Re-render cart after clearing it
        showFinalConfirmationModal('Cart has been cleared!'); // Show final confirmation for cart clearing
      });
    });
  }

  // Event listener for Process Order button in the modal
  if (processOrderModalButton) {
    processOrderModalButton.addEventListener('click', () => {
      if (cart.length === 0) {
        showItemAddedModal('Your cart is empty. Please add items to the cart before processing the order.');
        return;
      }

      showConfirmationModal('Are you sure you want to process your order?', () => {
        const receiptNumber = Math.floor(Math.random() * 1000000); // Generate receipt number
        showFinalConfirmationModal(`Thank you for your order!\nYour receipt number is ${receiptNumber}.`);
        sessionStorage.removeItem('cart');
        cart = [];
        renderCart(); // Re-render cart after processing the order
      });
    });
  }
});

const allCloseButtons = document.querySelectorAll('.close-modal');
allCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Close the parent modal of the button clicked
    const modal = button.closest('.modal');
    modal.style.display = 'none';
  });
});
