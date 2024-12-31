// Gallery Carousel .js
const products = {
  trees: [
    { id: 1, name: "Maple Tree", description: "Beautiful maple tree.", price: 55.00, image: "images/trees/MapleTree.png" },
    { id: 2, name: "Birch Tree", description: "Sturdy birch tree.", price: 45.00, image: "images/trees/BirchTree.png" },
    { id: 3, name: "Apple Tree", description: "Fruitful apple tree.", price: 35.00, image: "images/trees/AppleTree.png" }
  ],
  indoor: [
    { id: 4, name: "Aloe Plant", description: "Thrives with 6-8 hours of direct sunlight a day.", price: 15.00, image: "images/indoor/AloePlant.png" },
    { id: 5, name: "Spider Plant", description: "Low-maintenance and perfect for spaces with lots of natural light.", price: 12.50, image: "images/indoor/SpiderPlant.png" },
    { id: 6, name: "String-of-Pearls Plant", description: "Best placed in east-facing windows or on shaded patios and balconies.", price: 20.00, image: "images/indoor/StringofPearls.png" }
  ],
  tools: [
    { id: 7, name: "Watering Can", description: "Galvanized aluminum watering can.", price: 15.00, image: "images/accessories/WateringCan.png" },
    { id: 8, name: "Potting Soil", description: "Premium-blend of nutrient-rich potting soil - 10 lb bag.", price: 8.00, image: "images/accessories/PottingSoil.png" },
    { id: 9, name: "Bird House", description: "Handmade wooden bird house for hanging or mounting.", price: 11.00, image: "images/accessories/BirdHouse.png" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed"); // Check if the DOM is ready

  const productCarousel = document.getElementById('product-carousel');
  const scrollLeftButton = document.getElementById('scroll-left');
  const scrollRightButton = document.getElementById('scroll-right');
  const categoryButtons = document.querySelectorAll('.cat-btn');

  // Scroll button functionality
  scrollLeftButton.addEventListener('click', () => {
    productCarousel.scrollBy({ left: -300, behavior: 'smooth' });
  });

  scrollRightButton.addEventListener('click', () => {
    productCarousel.scrollBy({ left: 300, behavior: 'smooth' });
  });

  // Map buttons to categories
  categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default navigation
      const url = new URL(button.href); // Parse the URL
      const category = url.searchParams.get('category'); // Get category from the query parameter
      updateProductList(category); // Update the product list
    });
  });

  // Load default category or the one from the current URL
  const currentUrl = new URL(window.location.href);
  const defaultCategory = currentUrl.searchParams.get('category') || 'trees';
  updateProductList(defaultCategory);
});

function updateScrollButtons() {
  const scrollLeftButton = document.getElementById('scroll-left');
  const scrollRightButton = document.getElementById('scroll-right');
  const productCarousel = document.getElementById('product-carousel');

  scrollLeftButton.style.display = productCarousel.scrollLeft === 0 ? 'none' : 'block';
  scrollRightButton.style.display =
    productCarousel.scrollWidth - productCarousel.clientWidth === productCarousel.scrollLeft
      ? 'none'
      : 'block';
}

function updateProductList(category) {
  const productList = document.getElementById("product-list");
  if (!productList) {
    console.error("Element with ID 'product-list' not found in the DOM.");
    return;
  }

  productList.innerHTML = ""; // Clear existing products
  console.log(`Updating product list for category: ${category}`);  // Debugging line

  const selectedProducts = products[category];

  if (selectedProducts) {
    selectedProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      console.log(`Creating product card for: ${product.name}`); // Debugging line

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(productCard);

      // Add event listener for "Add to Cart" button
      const addToCartButton = productCard.querySelector('.add-to-cart-btn');
      addToCartButton.addEventListener('click', () => {
        addToCart(product.id);
      });
    });
  } else {
    console.error(`No products found for category: ${category}`);
  }
}

function addToCart(productId) {
  const product = findProductById(productId);
  if (product) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
  }
}

function findProductById(productId) {
  for (let category in products) {
    const product = products[category].find(item => item.id === productId);
    if (product) return product;
  }
  return null;
}
