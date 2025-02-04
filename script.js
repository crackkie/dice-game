function dice(dice){
    var dice = document.getElementById(dice);
    var random = Math.round(Math.random() * 5 ) +1;


    if (random === 1){
        dice.setAttribute('src', './images/dice1.png');
    }else if(random === 2){
        dice.setAttribute('src', './images/dice2.png');
    }else if(random === 3){
        dice.setAttribute('src', './images/dice3.png');
    }else if(random === 4){
        dice.setAttribute('src', './images/dice4.png');
    }else if(random === 5){
        dice.setAttribute('src', './images/dice5.png');
    }else{
        dice.setAttribute('src', './images/dice6.png');
    }

    return random;
}
var a = dice('dice1');


function main(){
    var heading = document.querySelector('h1');
    var dice1 = dice('dice1');
    var dice2 = dice('dice2');
        
    if(dice1 > dice2){
        heading.textContent = 'Dicee1 Win!';
    }else if(dice1 < dice2){
        heading.textContent = 'Dicee2 Win!';
    }
    else{
        heading.textContent = ' Draw!';
    }
    
}