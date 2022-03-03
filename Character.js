import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

class Character {
  constructor(data) {
    Object.assign(this, data);
    this.diceArray = getDicePlaceholderHtml(this.diceCount);
    this.maxHealth = this.health;
  }

  getDiceHtml() {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((num) => `<div class="dice">${num}</div>`)
      .join(``);
  }

  takeDamage(attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce(
      (total, num) => total + num
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  }

  getHealthBarHtml() {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
    <div class="health-bar-inner ${percent < 26 ? "danger" : ""} " 
        style="width: ${percent}%;">
    </div>
</div>`;
  }

  getCharacterHtml() {
    const { elementId, name, avatar, health, diceCount, diceHtml } = this;
    const healthBar = this.getHealthBarHtml();
    return `
        <div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            ${healthBar}
            <div class="dice-container">
                ${this.diceArray}
            </div>
        </div>`;
  }
}

// function Character(data) {
//   // this.elementId = data.elementId;
//   // this.name = data.name;
//   // this.avatar = data.avatar;
//   // this.health = data.health;
//   // this.diceCount = data.diceCount;

//   Object.assign(this, data);
//   this.diceArray = getDicePlaceholderHtml(this.diceCount);
//   this.maxHealth = this.health;

//   //we need to incorporate our dice roll values into our HTML
//   //lets make a new function to do this called getDiceHTML
//   //we can use the diceCount parameter from before
//   //since this will dictate the value of the dice
//   //we use our old getDiceRollArray function with that parameter from before
//   //and attach a .map to it taking in the nunber as a variable from the
//   //array. Then we return our html with our num variable and we
//   //use a .join to finish it off

//   this.getDiceHtml = function () {
//     this.currentDiceScore = getDiceRollArray(this.diceCount);
//     this.diceArray = this.currentDiceScore
//       .map((num) => {
//         return `<div class="dice">${num}</div>`;
//       })
//       .join(``);

//     this.takeDamage = function (attackScoreArray) {
//       const totalAttackScore = attackScoreArray.reduce((total, num) => {
//         return total + num;
//       });
//       this.health -= totalAttackScore;
//       if (this.health <= 0) {
//         this.dead = true;
//         this.health = 0;
//         console.log(this.dead);
//       }
//     };
//   };

//   this.getHealthBarHtml = function () {
//     const percent = getPercentage(this.health, this.maxHealth);
//     return `<div class="health-bar-outer">
//     <div class="health-bar-inner ${percent < 26 ? "danger" : ""} "
//         style="width: ${percent}%">
//     </div>
// </div>`;
//     console.log(percent);
//   };

//   this.getCharacterHtml = function () {
//     const { elementId, name, avatar, health, diceCount } = this;
//     const healthBar = this.getHealthBarHtml();
//     return `
//         <div class="character-card">
//             <h4 class="name"> ${name} </h4>
//             <img class="avatar" src="${avatar}" />
//             <div class="health">health: <b> ${health} </b></div>
//             ${healthBar}
//             <div class="dice-container">
//                 ${this.diceArray}
//             </div>
//         </div>`;
//   };
// }

export default Character;
