document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close')[0];
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentImageIndex = 0;


    const galleryItems = document.querySelectorAll('.gallery-item');


    function openModal(imageSrc, altText) {
        modal.style.display = 'block';
        modalImage.src = imageSrc;
        captionText.textContent = altText;
        currentImageIndex = Array.from(galleryItems).indexOf(document.querySelector(`img[src="${imageSrc}"]`)); // Update current image index
    }


    function closeModal() {
        modal.style.display = 'none';
    }


    closeBtn.onclick = closeModal;


    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const previousImage = galleryItems[currentImageIndex];
            openModal(previousImage.src, previousImage.alt);
        }
    }


    function nextImage() {
        if (currentImageIndex < galleryItems.length - 1) {
            currentImageIndex++;
            const nextImage = galleryItems[currentImageIndex];
            openModal(nextImage.src, nextImage.alt);
        }
    }

    prevBtn.onclick = prevImage;
    nextBtn.onclick = nextImage;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            openModal(item.src, item.alt);
        });
    });


    function smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }


    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScroll(targetId);
        });
    });


    const gallery = document.querySelector('.gallery');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
    });


    galleryItems.forEach(item => {
        observer.observe(item);
    });


    function preloadImages() {
        galleryItems.forEach(item => {
            const img = new Image();
            img.src = item.src;
        });
    }

    preloadImages();
});
