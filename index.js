let selectedAvatar = "";
let wrapperBackground = document.querySelector(".wrapper");

function showAvatarSelection() {
  const characterName = document.querySelector(
    'input[placeholder="Hero Name"]'
  ).value;
  if (characterName) {
    document.getElementById("nameContainer").style.display = "none";
    document.getElementById("avatarContainer").style.display = "block";
    wrapperBackground.style.backgroundImage = `url('./assets/img/installation/Registration.jpg')`;
  } else {
    document.querySelector(".form-box__error").style.display = "block";
    document.querySelector(".form-box__input").classList.add("error-input");
  }
}

function selectAvatar(avatarSrc) {
  document.querySelectorAll(".avatar-options img").forEach((img) => {
    img.classList.remove("selected");
  });
  const selectedImg = Array.from(
    document.querySelectorAll(".avatar-options img")
  ).find((img) => img.src === avatarSrc);
  if (selectedImg) {
    selectedImg.classList.add("selected");
    selectedAvatar = avatarSrc;
    document.getElementById("displayAvatar").src = selectedAvatar;
    document.getElementById("startButton").style.display = "block";
  }
}

function startGame() {
  const characterName = document.querySelector(
    'input[placeholder="Hero Name"]'
  ).value;
  if (selectedAvatar) {
    localStorage.setItem("characterName", characterName);
    localStorage.setItem("selectedAvatar", selectedAvatar);
    wrapperBackground.style.backgroundImage = `url('./assets/img/installation/home.jpg')`;

    document.getElementById("avatarContainer").style.display = "none";
    document.getElementById("homePage").style.display = "block";
    document.getElementById("stats").style.display = "block";
    document.querySelector(".container-fight").style.display = "block";
    document.getElementById("displayName").textContent = `${characterName}`;
  } else {
    alert("Please select an avatar.");
  }
}

function changeName() {
  const currentName = localStorage.getItem("characterName") || "Guest";
  const newName = prompt("Enter your name:", currentName);

  if (newName && newName.trim() !== "") {
    localStorage.setItem("characterName", newName);
    document.getElementById("displayName").textContent = newName;
  } else {
    alert("Name cannot be empty!");
  }
}

function showFightButton() {
  const fightButton = document.querySelector(".fight-btn");
  fightButton.style.display = "block";
  document.getElementById("stats").style.display = "block";
  wrapperBackground.style.backgroundImage = `url('./assets/img/installation/home.jpg')`;
}

function init() {
  document
    .querySelector(".btn-box__button")
    .addEventListener("click", showAvatarSelection);
  document.querySelectorAll(".avatar-options img").forEach((img) => {
    img.addEventListener("click", () => selectAvatar(img.src));
  });
  document.getElementById("startButton").addEventListener("click", startGame);
  document
    .querySelector(".displayName-btn")
    .addEventListener("click", changeName);
  document
    .querySelector(".change-avatar")
    .addEventListener("click", showAvatarSelection);
  document.getElementById("displayAvatar").addEventListener("click", showAvatarSelection);
  
  const navItems = document.querySelectorAll('.nav-item');
  const fightButton = document.querySelector(".fight-btn");
  
  navItems.forEach(navItem => {
    navItem.addEventListener('click', showFightButton);
  });

  fightButton.addEventListener("click", () => {
    const statsContainer = document.getElementById("stats");
    statsContainer.style.display = "none";
    fightButton.style.display = "none";
    wrapperBackground.style.backgroundImage = `url('./assets/img/installation/arena-mortal-combat.jpg')`;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const isWelcomeShown = localStorage.getItem("welcomeShown");

  const homePage = document.getElementById("homePage");
  const welcomeMessage = document.getElementById("welcomeMessage");

  if (isWelcomeShown) {
    homePage.style.display = "none";
  } else {
    homePage.style.display = "block";
    
    localStorage.setItem("welcomeShown", "true");
  }
});

window.onload = init;
