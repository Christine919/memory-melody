document.getElementById("start-btn").addEventListener("click", playGame);

let level = 1;

function playGame() {
    const infoElement = document.getElementById("info");
    if (infoElement) { // Check if element exists
      infoElement.style.display = "none";
    }
    
    // Show the level display
    updateLevelDisplay(level);
  }

function updateLevelDisplay(currentLevel) {
    const levelElement = document.getElementById("level");
    levelElement.innerHTML = `LEVEL ${currentLevel}`;
    levelElement.style.display = "block";
}

// Function to move to the next level
function nextLevel() {
    level++;
    updateLevelDisplay(level);
}
