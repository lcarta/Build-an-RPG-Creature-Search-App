const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const cardContainer = document.getElementById("card-container");
const backgroundCard = document.getElementById("background-card");
const leftArrowBtn = document.getElementById("left-arrow");
const rightArrowBtn = document.getElementById("right-arrow");
const card = document.getElementById("card");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const noMoreLoad = document.getElementById("no-more-load");
const specialWeapon = document.getElementById("special-weapon");
const creatureHp = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creaturespecialAttack = document.getElementById("special-attack");
const creatureSpecialDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");


const creaturesList = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creature = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";
let allTypes = "";
let indexId = 0;


const fetchData = async (value) => {
  const creatureName = creature + value
  try {
    const res = await fetch(creatureName);
    const data = await res.json();
    updateUI(data);
    searchInput.value = "";
  } catch (err) {
    console.log(err)
    alert("Monster not found");
    cardContainer.style.display = "none";
    resetUI();
  }
}

const fillAllTypes = (types) => {
  backgroundCard.style.background = `linear-gradient(180deg,pink,var(--background-color-${types[0].name}),var(--background-color-${types[1] ? types[1].name : types[0].name}))`;
  types.forEach((type) => {
    console.log(type);

    allTypes += `<p class="type" id="${type.name}">${type.name}</p>`;
  });
}

const fillTable = (stats) => {
  creatureHp.innerHTML = stats[0].base_stat;
  creatureAttack.innerHTML = stats[1].base_stat;
  creatureDefense.innerHTML = stats[2].base_stat;
  creaturespecialAttack.innerHTML = stats[3].base_stat;
  creatureSpecialDefense.innerHTML = stats[4].base_stat;
  creatureSpeed.innerHTML = stats[5].base_stat;
}


const updateUI = (monster) => {
  cardContainer.style.display = "block";
  noMoreLoad.innerText = "";
  card.style.opacity = 1;
  const { name, id, weight, height, types, special, stats } = monster;
  indexId = id;
  fillAllTypes(types);
  creatureName.innerText = name;
  creatureId.innerText = `#${id}`;
  creatureWeight.innerHTML = `<b>Weight:</b> ${weight} kg`;
  creatureHeight.innerHTML = `<b>Height:</b> ${height} cm`;
  creatureTypes.innerHTML = allTypes;
  specialWeapon.innerHTML = `
           <p><b>Special: "${special.name}"</b></p>
           <p>${special.description}</p>
      `;
  fillTable(stats);
  allTypes = "";
}


const resetUI = () => {
  creatureName.innerText = "";
  creatureId.innerText = "";
  creatureWeight.innerHTML = "";
  creatureHeight.innerHTML = "";
  creatureTypes.innerHTML = "";
  specialWeapon.innerHTML = ""
  creatureHp.innerHTML = "";
  creatureAttack.innerHTML = "";
  creatureDefense.innerHTML = "";
  creaturespecialAttack.innerHTML = "";
  creatureSpecialDefense.innerHTML = "";
  creatureSpeed.innerHTML = "";
}



const noMoreMonster = () => {
  noMoreLoad.innerText = "No more creatures to load";
  card.style.opacity = 0.3;
  setTimeout(() => {
    card.style.opacity = 1;
    noMoreLoad.innerText = "";
  }, 1500)
}

searchBtn.addEventListener("click", () => fetchData(searchInput.value));

leftArrowBtn.addEventListener("click", () => {
  if (indexId === 1) {
    noMoreMonster();
    return
  }
  fetchData(indexId - 1)
})
rightArrowBtn.addEventListener("click", () => {
  if (indexId === 20) {
    noMoreMonster();
    return
  }
  fetchData(indexId + 1)
})

class Swipe {
  constructor() {
    this.positionXStart = 0;
    this.positionXEnd = 0;
  }
  touchStart(event) {
    this.positionXStart = event.changedTouches[0].screenX;
  }
  touchEnd(event) {
    this.positionXEnd = event.changedTouches[0].screenX;
    if (this.positionXStart < this.positionXEnd) {
      if (indexId > 1) {
        noMoreLoad.innerText = "";
        fetchData(indexId - 1);
      } else noMoreMonster();
    }
    if (this.positionXStart > this.positionXEnd) {
      if (indexId < 20) {
        noMoreLoad.innerText = "";
        fetchData(indexId + 1);
      } else noMoreMonster();
    }
  }
}


const feelSwipe = new Swipe;

card.addEventListener('touchstart', (event) => feelSwipe.touchStart(event));

card.addEventListener('touchend', (event) => feelSwipe.touchEnd(event));