function getDiceRollArray(diceCount) {
  return new Array(diceCount).fill(0).map(function () {
    return Math.floor(Math.random() * 6) + 1;
  });
}

//above is the same as below. Both are used to generate a random number
//on the dice
// for (let i = 0; i < diceCount; i++) {
//   newDiceRolls.push(Math.floor(Math.random() * 6) + 1);
// }
//   return newDiceRolls;
// }

function getDicePlaceholderHtml(diceCount) {
  return new Array(diceCount)
    .fill(0)
    .map(function () {
      return `<div class="placeholder-dice"></div>`;
    })
    .join(``);
}

/*
CHALLENGE:
1. Create a new function called getDicePlaceholderHtml.
2. Make getDicePlaceholderHtml return a new array of diceCount 
length.
3. Each element of the array should include this
line of HTML: `<div class="placeholder-dice"></div>`
4. Remember to deal with the commas!
5. Think: Where should this function live??
*hint.md for help!!*
*/

const getPercentage = (remainingHealth, maximumHealth) =>
  (100 * remainingHealth) / maximumHealth;

export { getDiceRollArray, getDicePlaceholderHtml, getPercentage };
