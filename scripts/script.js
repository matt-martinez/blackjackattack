//Once the game starts, player should see Title, New Game button, and empty board.
$(document).ready(function() {
  console.log('Ready to try your luck?');

//Code for New Game Event
  $('#newGame').click(function() {
    var $firstName = prompt("Please enter your name");
    $('h3').text($firstName + "'s Bankroll");
    Gameplay.resetGame();
  })
});

//Begin game object for Blackjack Attack
const Gameplay = {
//Array of deck of cards
//For testing purposes, only one suit will be included in deck
//For testing, face cards will be replaced by their numerical values
//                                    J   Q   K   A                               J   Q   K   A                               J   Q   K   A                               J   Q   K   A
  cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
  playerCards: [],
  dealerCards: [],
  //Shuffle function
  //Citation: Borrowed code from Marc's jQuery memory game solution
  shuffle: function(arr) {
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    console.log('Shuffling Cards');
    return arr;
  },
  //Function to reset game by bringing Bank Roll back to original amount and clearing the board.
  resetGame: function() {
    $('#bankRoll').html("1000");
    $('#playerCardOne').html("");
    $('#dealerCardOne').html("");
    $('#playerCardTwo').html("");
    $('#dealerCardTwo').html("");
    $('#playerCardThree').html("").addClass("hidden");
    $('#dealerCardThree').html("").addClass("hidden");
    $('#playerCardFour').html("").addClass("hidden");
    $('#dealerCardFour').html("").addClass("hidden");
    $('#playerCardFive').html("").addClass("hidden");
    $('#dealerCardFive').html("").addClass("hidden");
    Gameplay.playerCards = [];
    Gameplay.dealerCards = [];
    BoardEffect.clearMsg();
    BoardEffect.clearMsgPlayer();
    BoardEffect.clearMsgDealer();
    console.log('Welcome!')
  },

  //Below functions will allow player to place bet of their choice, subtracting from bank roll
  //Will also add to bank roll if player wins hand

  betTwentyFive: function() {
    var bankRoll = $('#bankRoll').html();
    var twentyFive = 25;
    $('#bankRoll').html(bankRoll - twentyFive);
  },
  betFifty: function() {
    var bankRoll = $('#bankRoll').html();
    var fifty = 50;
    $('#bankRoll').html(bankRoll - fifty);
  },
  betOneHundred: function() {
    var bankRoll = $('#bankRoll').html();
    var oneHundred = 100;
    $('#bankRoll').html(bankRoll - oneHundred);
  },

  winTwentyFive: function () {
    var bankRoll = $('#bankRoll').html();
    var twentyFive = 25;
    $('#bankRoll').html(bankRoll + twentyFive);
  },
  winFifty: function () {
    var bankRoll = $('#bankRoll').html();
    var fifty = 50;
    $('#bankRoll').html(bankRoll + fifty);
  },
  winOneHundred: function() {
    var bankRoll = $('#bankRoll').html();
    var oneHundred = 100;
    $('#bankRoll').html(bankRoll + oneHundred);
  },

  //Once bet is placed, this function will call first 4 cards in shuffled array
  dealCards: function() {
    //At the beginning of each hand, each card will have it's html cleared. This is different from resetGame so consecutive hands can be played.
    //To simulate real blackjack, cards dealt will be alternated to diversify odds
    //Once cards are dealt, they will be added to the empty playerCards and dealerCards arrays for later use.
    //The playerCards and dealerCards arrays will also be cleared at the beginning of each hand
    $('#playerCardOne').html("");
    $('#dealerCardOne').html("");
    $('#playerCardTwo').html("");
    $('#dealerCardTwo').html("");
    $('#playerCardThree').html("").addClass("hidden");
    $('#dealerCardThree').html("").addClass("hidden");
    $('#playerCardFour').html("").addClass("hidden");
    $('#dealerCardFour').html("").addClass("hidden");
    $('#playerCardFive').html("").addClass("hidden");
    $('#dealerCardFive').html("").addClass("hidden");
    Gameplay.playerCards = [];
    Gameplay.dealerCards = [];
    BoardEffect.clearMsg();
    BoardEffect.clearMsgPlayer();
    BoardEffect.clearMsgDealer();

    $('#playerCardOne').html(Gameplay.cards[0]);
    $('#dealerCardOne').html(Gameplay.cards[1]);
    $('#playerCardTwo').html(Gameplay.cards[2]);
    $('#dealerCardTwo').html(Gameplay.cards[3]);
    Gameplay.playerCards.push(Gameplay.cards[0], Gameplay.cards[2]);
    Gameplay.dealerCards.push(Gameplay.cards[1], Gameplay.cards[3]);
    console.log('Dealing Cards');
    //Assigning Card Images to Card Values

  },

  //If cards do not equal 21, player will call this function to deal next card value in array
  hit: function() {
    if (Gameplay.cards[0] + Gameplay.cards[2] < 21) {
      $('#playerCardThree').html(Gameplay.cards[4]);
      $('#playerCardThree').removeClass("hidden");
      Gameplay.playerCards.push(Gameplay.cards[4]);

    } if ((Gameplay.cards[0] + Gameplay.cards[2] + Gameplay.cards[4]) < 21) {
      $('#playerCardFour').html(Gameplay.cards[5]);
      $('#playerCardFour').removeClass("hidden");
      Gameplay.playerCards.push(Gameplay.cards[5]);

    } if ((Gameplay.cards[0] + Gameplay.cards[2] + Gameplay.cards[4] + Gameplay.cards[5]) < 21) {
      $('#playerCardFive').html(Gameplay.cards[6]);
      $('#playerCardFive').removeClass("hidden");
      Gameplay.playerCards.push(Gameplay.cards[6]);

    };
    console.log('Hit!');
  },

  //If player wishes to hold, this function will end player turn and begin dealer turn.
  hold: function() {
    if (Gameplay.cards[1] + Gameplay.cards[3] < 18) {
      $('#dealerCardThree').html(Gameplay.cards[7]);
      $('#dealerCardThree').removeClass("hidden");
      Gameplay.dealerCards.push(Gameplay.cards[7]);

    } if ((Gameplay.cards[1] + Gameplay.cards[3] + Gameplay.cards[7]) < 20) {
      $('#dealerCardFour').html(Gameplay.cards[8]);
      $('#dealerCardFour').removeClass("hidden");
      Gameplay.dealerCards.push(Gameplay.cards[8]);

    } if ((Gameplay.cards[1] + Gameplay.cards[3] + Gameplay.cards[7] + Gameplay.cards[8]) <= 21) {
      $('#dealerCardFive').html(Gameplay.cards[9]);
      $('#dealerCardFive').removeClass("hidden");
      Gameplay.dealerCards.push(Gameplay.cards[9]);

    };
    console.log('Hold!');
  },

  //This function will check to see if player card total is 21. If card total is over 21, player will "bust".
  checkForPlayerVictory: function() {
      var sumP = 0;
      for (i = 0; i < (Gameplay.playerCards).length; i++) {
        sumP += Gameplay.playerCards[i];
      } BoardEffect.flashMsgPlayer(sumP);

    if (sumP === 21) {
      BoardEffect.flashMsg(`Blackjack!`);
    } else if (sumP > 21) {
      BoardEffect.flashMsg('Bust! Play Again?');
    } else {
      BoardEffect.flashMsg(`Hit?`);
    };
    console.log('Checking for winner.')
  },

  checkForDealerVictory: function() {
    var sumD = 0;
    for (i = 0; i < (Gameplay.dealerCards).length; i++) {
      sumD += Gameplay.dealerCards[i];
    } BoardEffect.flashMsgDealer(sumD);

    if (sumD === 21) {
      BoardEffect.flashMsg(`Dealer Wins! Play Again?`);
    } else if (sumD > 21) {
      BoardEffect.flashMsg(`Dealer Bust! You Win!`);
    };
    console.log('Checking for winner.')
  },

//End of game object
};

//How the board changes based on Gameplay and flash messages
const BoardEffect = {
//Citation: I learned how to create flash messages from examining Matt's solution to the tic-tac-toe homework. The code below is based on what I learned.
  flashMsg: function(msg) {
    $('#flashMsg').html(msg);
  },

  clearMsg: function() {
    $('#flashMsg').html("");
  },

  flashMsgPlayer: function(msg) {
    $('#flashMsgPlayer').html(msg);
  },

  clearMsgPlayer: function() {
    $('#flashMsgPlayer').html(null);
  },

  flashMsgDealer: function(msg) {
    $('#flashMsgDealer').html(msg);
  },

  clearMsgDealer: function() {
    $('#flashMsgDealer').html(null);
  },

};

//Button Controls
$('#bet25').click(function() {
  Gameplay.betTwentyFive();
  Gameplay.shuffle(Gameplay.cards);
  Gameplay.dealCards();
  Gameplay.checkForPlayerVictory();
});
$('#bet50').click(function() {
  Gameplay.betFifty();
  Gameplay.shuffle(Gameplay.cards);
  Gameplay.dealCards();
  Gameplay.checkForPlayerVictory();
});
$('#bet100').click(function() {
  Gameplay.betOneHundred();
  Gameplay.shuffle(Gameplay.cards);
  Gameplay.dealCards();
  Gameplay.checkForPlayerVictory();
});
$('#hit').click(function() {
  Gameplay.hit();
  Gameplay.checkForPlayerVictory();
});
$('#hold').click(function() {
  Gameplay.hold();
  Gameplay.checkForDealerVictory();
});
