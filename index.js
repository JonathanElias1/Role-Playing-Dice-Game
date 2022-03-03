import { characterData } from "./data.js";
import Character from "./Character.js";

let monstersArray = [`orc`, `demon`, `goblin`];
let isWaiting = false;

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];

  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  if (!isWaiting) {
    wizard.getDiceHtml();
    monster.getDiceHtml();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    render();
    if (wizard.dead) {
      endGame();
    } else if (monster.dead) {
      isWaiting = true;
      if (monstersArray.length > 0) {
        setTimeout(function () {
          monster = getNewMonster();
          render();
          isWaiting = false;
        }, 1500);
      } else {
        endGame();
      }
    }
  }
}

function endGame() {
  isWaiting = true;
  const endMessage =
    wizard.health === 0 && monster.health === 0
      ? `Nobody wins everyone is dead`
      : wizard.health > 0
      ? `The Wizard wins`
      : `The Monsters win`;
  console.log(endMessage);
  const endEmoji = wizard.health > 0 ? `🔮` : monster.health > 0 ? `☠️` : ``;
  setTimeout(function () {
    document.body.innerHTML = `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
</div>`;
  }, 1500);
}

//since the function attack ONLY initiates the endgame function
//when either the wizard or orc are dead
//this means that when we call the endGame function we know that condition is already
//true. Therefore we only need to check if either the wizard and orcs health are both zero
//or if one of their health's are greater than 0 because that means that character won

//To make the attack button trigger a dice roll for both wizard and orc
//getdiceHtml is called automatically when we call get character html
//so since our render function here uses getcharacterHtml we can use
//render to trigger a dice roll for our attack button

document.getElementById("attack-button").addEventListener("click", attack);

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
