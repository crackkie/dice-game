var coin = document.getElementById('coin-count');
var coin_count = 100;
var bet = 0;
var totalBet = 0;
var hamBtn = document.getElementById('ham-btn');
var hamMenu = document.getElementById('ham-menu');
var header = document.querySelector('h1');
var betBtn = document.getElementById('bet');
var minBet = document.getElementById('btn-bet-');
var plusBet = document.getElementById('btn-bet+');
var doubleBtn = document.getElementById('btn-double');
var throwBtn = document.getElementById('btn-trow');
var totalBetDisplay = document.getElementById('totalBet');
var totalPlayerDice = 0;
var totalDealerDice = 0;
var gameOver = true;
var gamePlayed = 0;

function coinUpdate(){
    coin.textContent = coin_count;
}
coinUpdate();

// BUTTON MENU
hamBtn.addEventListener('click', () =>{
    hamMenu.classList.toggle('active');
});

// redeem code
var codes = ['HESOYAM','BADBADEST'];
var speecialCode = ['THELOSTANDDAMNED']
var submitCode = document.getElementById('btn-redeem');
var alertNotif = document.getElementById('alert')
submitCode.addEventListener('click', () =>{
    var inputCode = document.getElementById('unix-code').value;
    codes.forEach((code) =>{
        if(code === inputCode){
            coin_count += 100;
            coinUpdate();
            var index = codes.indexOf(inputCode)
            codes.splice(index, 1);
        };
    });
    if(inputCode === speecialCode[0]){
        coin_count += 9990;
        speecialCode.splice(0,1);
        coinUpdate();
    }
});

function dice(dice){
    var dice = document.getElementById(dice);
    var random = Math.round(Math.random() * 5 ) +1;
    if (random === 1){
        dice.setAttribute('src', './asets/dice/dice1.png');
    }else if(random === 2){
        dice.setAttribute('src', './asets/dice/dice2.png');
    }else if(random === 3){
        dice.setAttribute('src', './asets/dice/dice3.png');
    }else if(random === 4){
        dice.setAttribute('src', './asets/dice/dice4.png');
    }else if(random === 5){
        dice.setAttribute('src', './asets/dice/dice5.png');
    }else{
        dice.setAttribute('src', './asets/dice/dice6.png');
    }
 
    return random;
}

function throw_dice(target){
    return new Promise((resolve) => {
        throwBtn.addEventListener('click', () =>{
           var player = dice(target);
           totalPlayerDice += player;
        resolve();
        },{once : true});
    });
}

// bet function 
var bet = 10;
document.getElementById('bet-count').textContent = bet;

function betCount(n){
    bet += n;
    if (bet > coin_count){
        bet = 10;
    }else if(bet < 10){
        bet = coin_count;
    }
    document.getElementById('bet-count').textContent = bet;
    return bet;
}

function doubleBet(){
    bet *= 2;
    if(bet > coin_count){
        bet = coin_count;
    }
    document.getElementById('bet-count').textContent = bet;
    return bet;
}

throwBtn.disabled = true;
async function main(){
    if(bet > coin_count){
        header.textContent = 'Not Enough Coins';
    }else{
    gamePlayed += 1;
    console.log('Game : ',gamePlayed);
    header.textContent = 'Game Start';
    betBtn.disabled= true;
    minBet.disabled = true;
    plusBet.disabled = true;
    doubleBtn.disabled = true;
    throwBtn.disabled = true;
    totalBetDisplay.textContent = bet * 2;
    totalBet = bet *2;
    coin_count -= bet;
    coinUpdate();

    var dealer_dice1 = dice('dealer_dice1');
    totalDealerDice += dealer_dice1;
    throwBtn.disabled = false;

    await throw_dice('player_dice1');
    var dealer_dice2 = dice('dealer_dice2');
    totalDealerDice += dealer_dice2;
    throwBtn.disabled = false;
    await throw_dice('player_dice2');
    throwBtn.disabled = true;
    if (totalPlayerDice > totalDealerDice){
        header.textContent = 'Player Win';
        coin_count += totalBet;
    }else if (totalPlayerDice < totalDealerDice){
            header.textContent = 'Dealer Win';
    }else{
        header.textContent = 'Draw';
        coin_count += bet;
    }

    setTimeout(()=>{
        document.getElementById('dealer_dice1').setAttribute('src', '');
        document.getElementById('dealer_dice2').setAttribute('src', '');
        document.getElementById('player_dice1').setAttribute('src', '');
        document.getElementById('player_dice2').setAttribute('src', '');
        header.textContent = 'Bet to play again';
        betBtn.disabled= false;
        minBet.disabled = false;
        plusBet.disabled = false;
        doubleBtn.disabled = false;
        throwBtn.disabled = true;
        }, 5000);

        totalPlayerDice = 0;
        totalDealerDice = 0;
        coinUpdate();
    }
}