// Lab 3: Photo Carousel
// Technical focus: variables, functions, event listeners, and DOM manipulation.

const stories = {
  storyA: {
    name: "SECOND CHANCE",
    scenes: [
      {
        image: "images/show.png",
        alt: "A boy proudly showing a tall rainbow ice cream cone.",
        tag: "BEGINNING",
        title: "The perfect cone.",
        text: "He is happily showing off the ice cream cone he bought."
      },
      {
        image: "images/drop.png",
        alt: "The rainbow ice cream has fallen onto the sidewalk.",
        tag: "MIDDLE",
        title: "Then—disaster.",
        text: "Oh no! The ice cream fell to the ground!"
      },
      {
        image: "images/eat.png",
        alt: "The boy eating a rainbow ice cream cone.",
        tag: "END",
        title: "A second chance.",
        text: "Fortunately, he bought another ice cream cone!"
      }
    ]
  },

  storyB: {
    name: "TOO GOOD TO LAST",
    scenes: [
      {
        image: "images/show.png",
        alt: "A boy proudly showing a tall rainbow ice cream cone.",
        tag: "BEGINNING",
        title: "The perfect cone.",
        text: "He cannot wait to show everyone his colorful summer treat."
      },
      {
        image: "images/eat.png",
        alt: "The boy eating a rainbow ice cream cone.",
        tag: "MIDDLE",
        title: "One happy bite.",
        text: "He starts eating it right away, enjoying every layer before it melts."
      },
      {
        image: "images/drop.png",
        alt: "The rainbow ice cream has fallen onto the sidewalk.",
        tag: "END",
        title: "Too good to last.",
        text: "Unfortunately, the ice cream cone fell to the ground."
      }
    ]
  }
};

let currentStory = "storyA";
let currentIndex = 0;

const storyImage = document.getElementById("storyImage");
const sceneTag = document.getElementById("sceneTag");
const storyName = document.getElementById("storyName");
const captionTitle = document.getElementById("captionTitle");
const captionText = document.getElementById("captionText");
const currentNumber = document.getElementById("currentNumber");
const imageWrap = document.getElementById("imageWrap");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");
const storyButtons = document.querySelectorAll(".story-btn");

function renderScene() {
  const scene = stories[currentStory].scenes[currentIndex];

  storyImage.classList.add("fade-out");

  setTimeout(() => {
    storyImage.src = scene.image;
    storyImage.alt = scene.alt;
    sceneTag.textContent = scene.tag;
    storyName.textContent = stories[currentStory].name;
    captionTitle.textContent = scene.title;
    captionText.textContent = scene.text;
    currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    storyImage.classList.remove("fade-out");
  }, 180);
}

function nextScene() {
  currentIndex = (currentIndex + 1) % stories[currentStory].scenes.length;
  renderScene();
}

function previousScene() {
  currentIndex =
    (currentIndex - 1 + stories[currentStory].scenes.length) %
    stories[currentStory].scenes.length;
  renderScene();
}

function switchStory(storyKey) {
  currentStory = storyKey;
  currentIndex = 0;

  storyButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.story === storyKey);
  });

  renderScene();
}

// Event listeners
nextBtn.addEventListener("click", nextScene);
prevBtn.addEventListener("click", previousScene);
imageWrap.addEventListener("click", nextScene);

imageWrap.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    nextScene();
  }
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = Number(dot.dataset.index);
    renderScene();
  });
});

storyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchStory(button.dataset.story);
  });
});

// Optional keyboard navigation for the whole page
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextScene();
  if (event.key === "ArrowLeft") previousScene();
});

renderScene();
