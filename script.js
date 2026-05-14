const canvas = document.getElementById("noodle-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const currentFrame = index => (
  `frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const noodle = {
  frame: 0
};

// Preload images
let loadedCount = 0;
const progressElement = document.getElementById("progress");
const loaderText = document.getElementById("loader-text");
const loader = document.getElementById("loader");

function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
      loadedCount++;
      const progress = Math.floor((loadedCount / frameCount) * 100);
      progressElement.style.width = `${progress}%`;
      loaderText.innerText = `Preparing the feast... ${progress}%`;
      
      if (loadedCount === frameCount) {
        init();
      }
    };
    images.push(img);
  }
}

function init() {
  // Hide loader
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      loader.style.display = "none";
      startAnimations();
    }
  });

  // Initial draw
  render();
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const img = images[noodle.frame];
  
  // Draw image and cover canvas (object-fit: cover implementation)
  const canvasRatio = canvas.width / canvas.height;
  const imgRatio = img.width / img.height;
  let drawWidth, drawHeight, drawX, drawY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgRatio;
    drawX = 0;
    drawY = (canvas.height - drawHeight) / 2;
  } else {
    drawWidth = canvas.height * imgRatio;
    drawHeight = canvas.height;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = 0;
  }

  context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

function startAnimations() {
  // Scroll animation for frames
  gsap.to(noodle, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: ".scroll-trigger-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
    },
    onUpdate: render
  });

  // Animate overlay texts
  const textSections = [".section-1", ".section-2", ".section-3"];
  
  textSections.forEach((section, i) => {
    gsap.to(section, {
      opacity: 1,
      y: -50, // Move to center
      scrollTrigger: {
        trigger: ".scroll-trigger-section",
        start: `${35 + i * 20}% center`,
        end: `${45 + i * 20}% center`,
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    });
    
    // Fade out as well
    gsap.to(section, {
      opacity: 0,
      y: -100, // Move up
      scrollTrigger: {
        trigger: ".scroll-trigger-section",
        start: `${45 + i * 20}% center`,
        end: `${55 + i * 20}% center`,
        scrub: true,
      }
    });
  });

  // Hero text reveal (fade out at 35%)
  gsap.to(".hero-overlay", {
    opacity: 0,
    y: -100,
    scrollTrigger: {
      trigger: ".scroll-trigger-section",
      start: "top top",
      end: "30% center",
      scrub: true,
    }
  });
}

// Handle navbar background and height
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// Scroll Reveal Animations
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.gsap-reveal');
    
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 50 
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Simultaneous reveal for ritual steps
    gsap.fromTo(".ritual-step", 
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#spice-ritual",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );
}

// Add to init
const originalInit = init;
init = function() {
    originalInit();
    initScrollReveals();
};

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

preloadImages();

// Modal Logic
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

const recipes = [
  {
    title: "Spicy Ramen Stir-fry",
    time: "10 Min",
    intensity: "High",
    ingredients: ["1 pack Ramen", "1 cup Sliced Veggies (Bok Choy, Carrots)", "1 Large Egg", "1 tsp Sesame Seeds", "Spring Onions"],
    steps: [
      "Boil noodles for 3 minutes until al dente, then drain completely.",
      "Heat a splash of oil in a wok. Stir-fry veggies on high heat for 2 mins.",
      "Add noodles and half the spice seasoning. Toss vigorously.",
      "Top with a crispy fried egg, sesame seeds, and fresh spring onions."
    ]
  },
  {
    title: "Creamy Cheesy Ramen",
    time: "12 Min",
    intensity: "Medium",
    ingredients: ["1 pack Ramen", "1/2 cup Whole Milk", "1 slice Processed Cheese", "1 Egg Yolk", "Chopped Scallions"],
    steps: [
      "Boil noodles in 1.5 cups of water until half-done.",
      "Drain half the water, add milk and the full spice seasoning. Simmer.",
      "Turn off heat. Add egg yolk and cheese slice. Stir until velvety.",
      "Garnish with scallions and serve immediately while hot."
    ]
  },
  {
    title: "Seafood Spicy Bowl",
    time: "15 Min",
    intensity: "Extreme",
    ingredients: ["1 pack Ramen", "4 Large Tiger Shrimp", "1/4 cup Sweet Corn", "1 tsp Toasted Sesame Oil", "Dried Seaweed strips"],
    steps: [
      "Boil 2 cups of water with the spice seasoning and corn.",
      "Add shrimp and cook for 2 minutes until pink.",
      "Add noodles and cook for another 3 minutes.",
      "Drizzle sesame oil and top with seaweed strips for an authentic ocean kick."
    ]
  },
  {
    title: "Kimchi Pork Ramen",
    time: "15 Min",
    intensity: "Extreme",
    ingredients: ["1 pack Ramen", "1/2 cup Aged Kimchi", "100g Pork Belly (thinly sliced)", "1 tsp Minced Garlic", "1/2 tsp Ginger paste"],
    steps: [
      "Sauté pork belly with garlic and ginger until browned and crispy.",
      "Add kimchi and its juices. Stir-fry for 2 mins to develop deep flavor.",
      "Add 2 cups of water and spice seasoning. Bring to a vigorous boil.",
      "Add noodles and cook for 3 mins. The kimchi will add an authentic sour-spicy kick."
    ]
  },
  {
    title: "Tantanmen Nutty Ramen",
    time: "18 Min",
    intensity: "Medium",
    ingredients: ["1 pack Ramen", "1 tbsp Peanut Butter or Tahini", "1 tbsp Chili Oil (Laoganma)", "50g Minced Pork/Chicken", "Sichuan Pepper flakes"],
    steps: [
      "Stir-fry minced meat with a dash of soy sauce and sichuan pepper until dry.",
      "Whisk peanut butter and chili oil with 1.5 cups of boiling water and spice seasoning.",
      "Boil noodles separately for 2.5 minutes, then drain.",
      "Combine noodles with the nutty broth and top with the spicy minced meat."
    ]
  },
  {
    title: "Garlic Butter Heat",
    time: "8 Min",
    intensity: "High",
    ingredients: ["1 pack Ramen", "3 cloves Garlic (thinly sliced)", "1 tbsp Salted Butter", "1 soft-boiled Egg", "Toasted Nori strips"],
    steps: [
      "Boil noodles in 2 cups of water with the spice seasoning for 3 minutes.",
      "While boiling, melt butter in a small pan and fry garlic until golden and crispy.",
      "Pour the hot garlic butter (and the crispy bits) directly over the cooked noodles.",
      "Top with a halved soft-boiled egg and nori strips for a rich, silky finish."
    ]
  }
];

function openModal(content) {
  modalContent.innerHTML = content;
  modal.classList.remove("opacity-0", "pointer-events-none");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("opacity-0", "pointer-events-none");
  document.body.style.overflow = "auto";
}

function openNutritionModal() {
  const content = `
    <h2 class="text-4xl font-display font-bold text-primary mb-6 uppercase tracking-wider">Nutritional Facts</h2>
    <div class="grid grid-cols-2 gap-4 mb-8">
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Energy</p>
        <p class="text-2xl font-bold text-gray-900">485 kcal</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Protein</p>
        <p class="text-2xl font-bold text-gray-900">9.2g</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Fat</p>
        <p class="text-2xl font-bold text-gray-900">18.5g</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p class="text-gray-400 text-xs uppercase tracking-widest mb-1">Carbs</p>
        <p class="text-2xl font-bold text-gray-900">71.3g</p>
      </div>
    </div>
    <div class="space-y-4">
      <h3 class="text-xl font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">The Good Stuff</h3>
      <ul class="space-y-3">
        <li class="flex items-center gap-3 text-gray-600">
          <span class="material-icons text-green-600 text-sm">check_circle</span>
          <span><strong class="text-gray-900">No Trans Fat:</strong> Crafted with high-quality vegetable oils.</span>
        </li>
        <li class="flex items-center gap-3 text-gray-600">
          <span class="material-icons text-green-600 text-sm">check_circle</span>
          <span><strong class="text-gray-900">Vitamin Fortified:</strong> Enriched with Essential B-Vitamins and Iron.</span>
        </li>
        <li class="flex items-center gap-3 text-gray-600">
          <span class="material-icons text-green-600 text-sm">check_circle</span>
          <span><strong class="text-gray-900">Real Gochugaru:</strong> Authentic Korean chili flakes for natural heat.</span>
        </li>
      </ul>
    </div>
  `;
  openModal(content);
}

function openRecipeModal(index) {
  const recipe = recipes[index];
  const content = `
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-4xl font-display font-bold text-primary uppercase tracking-wider mb-2">${recipe.title}</h2>
        <div class="flex gap-4">
          <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase tracking-widest">${recipe.time}</span>
          <span class="text-xs bg-primary/10 px-2 py-1 rounded text-primary uppercase tracking-widest font-bold">${recipe.intensity} Heat</span>
        </div>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-10">
      <div>
        <h3 class="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Ingredients</h3>
        <ul class="space-y-2">
          ${recipe.ingredients.map(ing => `
            <li class="flex items-center gap-2 text-gray-600 text-sm">
              <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
              ${ing}
            </li>
          `).join('')}
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Preparation</h3>
        <ol class="space-y-4">
          ${recipe.steps.map((step, i) => `
            <li class="flex gap-4 text-sm">
              <span class="font-display text-primary text-2xl">${i + 1}</span>
              <p class="text-gray-600 leading-relaxed">${step}</p>
            </li>
          `).join('')}
        </ol>
      </div>
    </div>
  `;
  openModal(content);
}

// Store Search Logic
const storeBtn = document.getElementById("store-search-btn");
const storeInput = document.getElementById("store-input");
const storeResults = document.getElementById("store-results");

const storeNames = ["Gourmet Mart", "Fresh Stop", "Red Chili Express", "Asian Pantry", "The Ramen Hub", "Noodle Haven"];
const statuses = [
  { text: "In Stock", color: "text-green-500" },
  { text: "Limited Stock", color: "text-yellow-500" },
  { text: "Out of Stock", color: "text-red-500" }
];

storeBtn.addEventListener("click", () => {
  const query = storeInput.value.trim();
  if (!query) {
    alert("Please enter a zip code or city.");
    return;
  }

  // Show searching state
  storeBtn.disabled = true;
  storeBtn.innerText = "Searching...";
  storeResults.classList.add("hidden");

  setTimeout(() => {
    // Generate 2-3 random results
    const numResults = Math.floor(Math.random() * 2) + 2;
    let html = `<p class="text-xs text-gray-500 uppercase tracking-widest mb-3 font-bold">Stores near "${query}"</p><div class="space-y-3">`;

    for (let i = 0; i < numResults; i++) {
      const store = storeNames[Math.floor(Math.random() * storeNames.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      html += `
        <div class="flex justify-between items-center bg-gray-800/50 p-3 rounded border border-gray-700">
          <div>
            <p class="text-white font-bold text-sm">${store}</p>
            <p class="text-[10px] text-gray-500 uppercase tracking-widest">0.8 miles away</p>
          </div>
          <p class="${status.color} text-[10px] font-bold uppercase tracking-widest">${status.text}</p>
        </div>
      `;
    }
    html += `</div>`;

    storeResults.innerHTML = html;
    storeResults.classList.remove("hidden");
    storeBtn.disabled = false;
    storeBtn.innerText = "Search Stores";
  }, 1200);
});

// Contact Form Logic
const countrySelect = document.getElementById("country-select");
const countryCodeInput = document.getElementById("country-code");
const contactForm = document.getElementById("contact-form");
const contactFormContainer = document.getElementById("contact-form-container");

countrySelect.addEventListener("change", (e) => {
    countryCodeInput.value = e.target.value || "+91";
});

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Simulate loading
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-icons animate-spin">sync</span> Sending...';
    
    setTimeout(() => {
        // Success animation
        contactFormContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-700">
                <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/50">
                    <span class="material-icons text-white text-5xl">check</span>
                </div>
                <h3 class="text-3xl font-display font-bold text-white uppercase tracking-widest mb-4">Submitted Successfully!</h3>
                <p class="text-white/80 text-center max-w-sm mb-8">Thank you for reaching out. Our spice experts will get back to you within 24 hours.</p>
                <button onclick="location.reload()" class="bg-white text-primary font-bold px-8 py-3 rounded uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl">
                    Send Another Message
                </button>
            </div>
        `;
    }, 1500);
});
