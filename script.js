const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const leftArrowBtn = document.getElementById("left-arrow");
const rightArrowBtn = document.getElementById("right-arrow");
const card = document.getElementById("card");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
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

const isMonsterNotExist = (dataMonster) => dataMonster.every((monster) => monster.id != searchInput.value && monster.name != searchInput.value)


const fetchData = async (value) => {
  const creatureName = creature + value
  try {
    const res = await fetch(creatureName);
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    alert("Monster not found");
    card.style.display = "none";
    leftArrowBtn.style.display = "none";
    rightArrowBtn.style.display = "none";
    resetUI();
    console.log(err)
  }
}

const fillAllTypes = (types) => types.forEach((type) => {
  allTypes += `<p class="type" id="${type.name}">${type.name}</p>`;
});


const fillTable = (stats) => {
  stats.forEach((stat) => {
    switch (stat.name) {
      case 'hp':
        creatureHp.innerHTML = stat.base_stat;
        break;
      case 'attack':
        creatureAttack.innerHTML = stat.base_stat;
        break;
      case 'defense':
        creatureDefense.innerHTML = stat.base_stat;
        break;
      case 'special-attack':
        creaturespecialAttack.innerHTML = stat.base_stat;
        break;
      case 'special-defense':
        creatureSpecialDefense.innerHTML = stat.base_stat;
        break;
      case 'speed':
        creatureSpeed.innerHTML = stat.base_stat;
        break;
    }
  })
}


const updateUI = (monster) => {
  card.style.display = "block";
  leftArrowBtn.style.display = "block";
  rightArrowBtn.style.display = "block";
  const { name, id, weight, height, types, special, stats } = monster;
  indexId = id;
  console.log(indexId)

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



searchBtn.addEventListener("click", () => fetchData(searchInput.value))
leftArrowBtn.addEventListener("click", () => {
  if (indexId === 1) {
    leftArrowBtn.style.cursor = "not-allowed";
    return
  }
  rightArrowBtn.style.cursor = "pointer";
  fetchData(indexId - 1)
})
rightArrowBtn.addEventListener("click", () => {
  if (indexId === 20) {
    rightArrowBtn.style.cursor = "not-allowed";
    return
  }
  leftArrowBtn.style.cursor = "pointer";
  fetchData(indexId + 1)
})