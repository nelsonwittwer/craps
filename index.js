function rollDie() {
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function rollDice() {
  return rollDie() + rollDie();
}

function fieldEarnings(roll, bet) {
  switch (roll) {
    case 2:
      return bet * 2;
    case 3:
      return bet;
    case 4:
      return bet;
    case 9:
      return bet;
    case 10:
      return bet;
    case 11:
      return bet;
    case 12:
      return bet * 3;
    default:
      return 0;
  }
}

function wonGame() {
  let roll;
  let chips = 150;
  let earnings;
  let baseBet = 5;
  let counter = 0;

  do {
    chips = chipsAfterFieldLoop(chips, baseBet);
  } while (chips > 0 && chips < 999)

  return chips > 0;
}

function rollRound(bet) {
  let roll = rollDice();
  let earnings = fieldEarnings(roll, bet);
  if (earnings > 0) {
    return bet + earnings;
  } else {
    return 0;
  }
}

function chipsAfterFieldLoop(chips, baseBet) {
  let bet = baseBet;
  let earnings = rollRound(bet);
  if (earnings > 0) {
    return earnings + chips
  }

  do {
    bet = (bet * 2) + baseBet;
    earnings = rollRound(bet);
  } while (earnings === 0 && bet < chips)

  if (bet > chips) {
    return 0
  } else {
    return earnings + chips;
  }
}

let results =  {win: 0, loss: 0}
for (let step = 0; step < 100000; step++) {
  if(wonGame()) {
    results.win = results.win + 1
  } else {
    results.loss = results.loss + 1
  }
}
console.log(JSON.stringify(results));
