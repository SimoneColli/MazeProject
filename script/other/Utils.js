
function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generateRandomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}
function generateRandomIntegerCheated(perc){
    
    let numbers = [];
    for (let i = 0; i < perc; i++) {
        numbers.push(1);
    }
    for (let i = 0; i < 100-perc; i++) {
        numbers.push(0);
    }
    return numbers[Math.floor(Math.random() * numbers.length)];
}
