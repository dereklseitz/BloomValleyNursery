document.addEventListener("DOMContentLoaded", () => {
  // Shopper Perks Carousel
  const perks = document.querySelectorAll(".perk-item");
  let currentIndexPerks = 0;

  function showNextPerk() {
    // Hide all perks
    perks.forEach(perk => {
      perk.classList.remove("visible"); // Hide by removing 'visible' class
      perk.style.display = "none"; // Set display to none
    });

    // Show the current perk
    perks[currentIndexPerks].classList.add("visible"); // Show current perk by adding 'visible' class
    perks[currentIndexPerks].style.display = "block"; // Explicitly set display to block

    console.log(`Showing perk ${currentIndexPerks}`); // Debugging line

    // Move to the next perk, loop back to the start if at the end
    currentIndexPerks = (currentIndexPerks + 1) % perks.length;
  }

  // Show the first perk initially
  showNextPerk();

  // Set an interval to cycle through the perks every 2.25 seconds (2250ms)
  setInterval(showNextPerk, 2250);

  // Customer Highlights Carousel
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndexTestimonials = 0;

  console.log("Testimonials found: ", testimonials.length); // Debugging line

  function showNextTestimonial() {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove("visible"); // Remove 'visible' class
      testimonial.style.display = "none"; // Set display to none
    });

    // Show the current testimonial
    testimonials[currentIndexTestimonials].classList.add("visible"); // Add 'visible' class to show current testimonial
    testimonials[currentIndexTestimonials].style.display = "block"; // Explicitly set display to block

    console.log(`Showing testimonial ${currentIndexTestimonials}`); // Debugging line

    // Move to the next testimonial, loop back to the start if at the end
    currentIndexTestimonials = (currentIndexTestimonials + 1) % testimonials.length;
  }

  // Show the first testimonial initially
  showNextTestimonial();

  // Set an interval to cycle through the testimonials every 3.5 seconds (3500ms)
  setInterval(showNextTestimonial, 3500);

  // Featured Items Carousel
  const featuredItems = document.querySelectorAll("#featured-images .featured-item");
  let currentIndex = 0;

  function showNextItem() {
    // Remove the 'active' class from the current image
    featuredItems[currentIndex].classList.remove("active");

    // Move to the next index, looping back to the start if necessary
    currentIndex = (currentIndex + 1) % featuredItems.length;

    // Add the 'active' class to the next image
    featuredItems[currentIndex].classList.add("active");
  }

  // Initially show the first image by adding 'active' class
  featuredItems[currentIndex].classList.add("active");

  // Cycle through images every 3 seconds
  setInterval(showNextItem, 3000);
});

// Featured Items Carousel
const featuredItems = document.querySelectorAll("#featured-images .featured-item");
let currentIndexFeatured = 0;

function updateFeaturedImages() {
  featuredItems.forEach((item, index) => {
    // Hide the text inside each <a> tag by setting the text's display to 'none'
    const text = item.closest('a');
    if (text) text.style.display = (index === currentIndexFeatured ? "block" : "none");

    // Show only the active image by setting display to block for the current image
    const image = item;
    image.style.display = (index === currentIndexFeatured ? "block" : "none");
  });
}

// Show next featured image
function showNextFeatured() {
  currentIndexFeatured = (currentIndexFeatured + 1) % featuredItems.length; // Loop to the start
  updateFeaturedImages();
}

// Initialize featured items carousel by showing the first image
updateFeaturedImages();

// Set up automatic cycling every 3 seconds
setInterval(showNextFeatured, 3000);
