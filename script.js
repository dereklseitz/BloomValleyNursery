document.addEventListener("DOMContentLoaded", () => {
    // ================== DEMO NOTICE MODAL ==================
    if (!sessionStorage.getItem("demoNoticeAcknowledged")) {
        let modal = document.createElement("div");
        modal.id = "demoModal";
        modal.style.position = "fixed";
        modal.style.left = "0";
        modal.style.top = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.background = "rgba(0, 0, 0, 0.7)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = "1000";

        let modalContent = document.createElement("div");
        modalContent.style.background = "white";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "10px";
        modalContent.style.textAlign = "center";
        modalContent.style.width = "80%";
        modalContent.style.maxWidth = "400px";

        let heading = document.createElement("h2");
        heading.innerText = "Demo Notice";

        let message = document.createElement("p");
        message.innerText =
            "This site is for demonstration purposes only and is not a real e-commerce store. No purchases can be made.";

        let closeButton = document.createElement("button");
        closeButton.innerText = "I Understand";
        closeButton.style.padding = "10px 20px";
        closeButton.style.marginTop = "15px";
        closeButton.style.border = "none";
        closeButton.style.background = "#007bff";
        closeButton.style.color = "white";
        closeButton.style.fontSize = "16px";
        closeButton.style.cursor = "pointer";
        closeButton.style.borderRadius = "5px";

        closeButton.addEventListener("click", function () {
            modal.style.display = "none";
            sessionStorage.setItem("demoNoticeAcknowledged", "true");
        });

        modalContent.appendChild(heading);
        modalContent.appendChild(message);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    // ================== SHOPPER PERKS CAROUSEL ==================
    const perks = document.querySelectorAll(".perk-item");
    let currentIndexPerks = 0;

    function showNextPerk() {
        perks.forEach(perk => {
            perk.classList.remove("visible");
            perk.style.display = "none";
        });

        perks[currentIndexPerks].classList.add("visible");
        perks[currentIndexPerks].style.display = "block";

        currentIndexPerks = (currentIndexPerks + 1) % perks.length;
    }

    showNextPerk();
    setInterval(showNextPerk, 2250);

    // ================== CUSTOMER HIGHLIGHTS CAROUSEL ==================
    const testimonials = document.querySelectorAll(".testimonial");
    let currentIndexTestimonials = 0;

    function showNextTestimonial() {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove("visible");
            testimonial.style.display = "none";
        });

        testimonials[currentIndexTestimonials].classList.add("visible");
        testimonials[currentIndexTestimonials].style.display = "block";

        currentIndexTestimonials = (currentIndexTestimonials + 1) % testimonials.length;
    }

    showNextTestimonial();
    setInterval(showNextTestimonial, 3500);

    // ================== FEATURED ITEMS CAROUSEL ==================
    const featuredItems = document.querySelectorAll("#featured-images .featured-item");
    let currentIndex = 0;

    function showNextItem() {
        featuredItems[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % featuredItems.length;
        featuredItems[currentIndex].classList.add("active");
    }

    featuredItems[currentIndex].classList.add("active");
    setInterval(showNextItem, 3000);

    // ================== UPDATED FEATURED ITEMS CAROUSEL ==================
    let currentIndexFeatured = 0;

    function updateFeaturedImages() {
        featuredItems.forEach((item, index) => {
            const text = item.closest('a');
            if (text) text.style.display = (index === currentIndexFeatured ? "block" : "none");

            const image = item;
            image.style.display = (index === currentIndexFeatured ? "block" : "none");
        });
    }

    function showNextFeatured() {
        currentIndexFeatured = (currentIndexFeatured + 1) % featuredItems.length;
        updateFeaturedImages();
    }

    updateFeaturedImages();
    setInterval(showNextFeatured, 3000);
});
