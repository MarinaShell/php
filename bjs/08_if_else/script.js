let minValueStart;
let maxValueStart;
let minValue;
let maxValue;
let answerNumber;
let orderNumber = 1;
let gameRun = true;
let answerPhrase = '';
const minValueDefault = '-999';
const maxValueDefault = '999';
let textAnswer = '';


function startGame()
{
    minValueStart = parseInt(prompt('Минимальное значение числа для игры', minValueDefault) );
    maxValueStart = parseInt(prompt('Максимальное значение числа для игры',maxValueDefault));
    minValueStart = (minValueStart > 1000)? 999 : minValueStart;
    minValueStart = (minValueStart <-1000)? -999 : minValueStart;
    maxValueStart = (maxValueStart > 1000)? 999 : maxValueStart;
    maxValueStart = (maxValueStart <-1000)? -999 : maxValueStart;

    if (minValueStart == NaN)
        minValueStart = parseInt(minValueDefault);
    if (minValueStart == NaN)
        maxValueStart = parseInt(maxValueDefault);

    minValue = minValueStart;
    maxValue = maxValueStart;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');

    orderNumberField.innerText = orderNumber;
    chooseAnswer();
    answerField.innerText = answerPhrase;
    //answerField.innerText = `Вы загадали число ${answerNumber }?`;
}


document.getElementById('btnRetry').addEventListener('click', function () {
    startGame();
 })

function returnTextAnswerLess20(number)
{
    let textAnswer_tmp = '';
    switch (Math.abs(number)) 
    {
        case  1: textAnswer_tmp = 'один';break;
        case  2: textAnswer_tmp = 'два';break;
        case  3: textAnswer_tmp = 'три';break;
        case  4: textAnswer_tmp = 'четыре';break;
        case  5: textAnswer_tmp = 'пять';break;
        case  6: textAnswer_tmp = 'шесть';break;
        case  7: textAnswer_tmp = 'семь';break;
        case  8: textAnswer_tmp = 'восемь';break;
        case  9: textAnswer_tmp = 'девять';break;
        case 10: textAnswer_tmp = 'десять';break;
        case 11: textAnswer_tmp = 'одиннадцать';break;
        case 12: textAnswer_tmp = 'двенадцать';break;
        case 13: textAnswer_tmp = 'тринадцать';break;
        case 14: textAnswer_tmp = 'четырнадцать';break;
        case 15: textAnswer_tmp = 'пятнадцать';break;
        case 16: textAnswer_tmp = 'шестнадцать';break;
        case 17: textAnswer_tmp = 'семнадцать';break;
        case 18: textAnswer_tmp = 'восемнадцать';break;
        case 19: textAnswer_tmp = 'девятнадцать';break;
        case 20: textAnswer_tmp = 'двадцать';break;
        default:' ';break;
    }
  
    return  textAnswer_tmp;  
}

function returnTextAnswerBetween20_100(number)
{
    let edNumber = number%10;
    let desNumber = (number - edNumber)/10;
    let textAnswer_tmp = '';
    switch (Math.abs(desNumber)) 
    {
        case 2: textAnswer_tmp = 'двадцать';break;
        case 3: textAnswer_tmp = 'тридцать';break;
        case 4: textAnswer_tmp = 'сорок';break;
        case 5: textAnswer_tmp = 'пятьдесят';break;
        case 6: textAnswer_tmp = 'шестьдцать';break;
        case 7: textAnswer_tmp = 'семьдцать';break;
        case 8: textAnswer_tmp = 'восемьдцать';break;
        case 9: textAnswer_tmp = 'девяносто';break;
        default:textAnswer_tmp = '';break;
    }
 
    textAnswer_tmp  = textAnswer_tmp + ' '+ returnTextAnswerLess20(edNumber);    
    return textAnswer_tmp;    
}

function returnTextAnswerMore100(number)
{
    let edNumber = number%10; 
    let desNumber = ((number - edNumber)%100)/10;
    let sotNumber = (number - desNumber*10 - edNumber)/100;
    let textAnswer_tmp = '';
    switch (Math.abs(sotNumber)) 
    {
        case 1: textAnswer_tmp = 'сто';break;
        case 2: textAnswer_tmp = 'двести';break;
        case 3: textAnswer_tmp = 'триста';break;
        case 4: textAnswer_tmp = 'четыреста';break;
        case 5: textAnswer_tmp = 'пятьсот';break;
        case 6: textAnswer_tmp = 'шестьсот';break;
        case 7: textAnswer_tmp = 'семьсот';break;
        case 8: textAnswer_tmp = 'восемьсот';break;
        case 9: textAnswer_tmp = 'девятьсот';break;
    }

    textAnswer_tmp  = textAnswer_tmp + ' '+
                      returnTextAnswerBetween20_100(desNumber*10+edNumber);    
    return textAnswer_tmp;    
}


function getTextNumber()
{
    if (answerNumber == 0)
        textAnswer = '0';
    if (answerNumber>0 && answerNumber<20)
        textAnswer = returnTextAnswerLess20(answerNumber);
    else if (answerNumber<0 && answerNumber>-20)
        textAnswer = returnTextAnswerLess20(answerNumber);
    else if (answerNumber>=20 && answerNumber<100)
        textAnswer = returnTextAnswerBetween20_100(answerNumber);
    else if (answerNumber<-20 && answerNumber>-100)
        textAnswer = returnTextAnswerBetween20_100(answerNumber);
    else if (answerNumber>100)
        textAnswer = returnTextAnswerMore100(answerNumber);
    else if (answerNumber<-100)
        textAnswer = returnTextAnswerMore100(answerNumber);

    if (answerNumber<0)
        textAnswer = 'минус ' + textAnswer;
    if (textAnswer.length>20)
        textAnswer = String(answerNumber);
    
}

function chooseAnswer()
{
    const phraseRandom = Math.round(Math.random() * 2)+1;
    getTextNumber();

    switch (phraseRandom)
    {
        case 1: answerPhrase = 'Вы загадали число ' + textAnswer +'?';
        break;
        case 2: answerPhrase ='Да это легко! Ты загадал ' +  textAnswer + '?';
        break;
        case 3: answerPhrase = 'Наверное, это число ' +  textAnswer + '?';
        break;
        default:
            answerPhrase =  'Вы загадали число ' + textAnswer +'?';
        break;    
    }
}

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } 
        else 
        {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            chooseAnswer();
            answerField.innerText = answerPhrase;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue)
        {
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } 
        else 
        {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            chooseAnswer();
            answerField.innerText = answerPhrase;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun)
    {
        const phraseRandom = Math.round(Math.random() * 2)+1;
        let answerPhrase = '';
        switch (phraseRandom)
        {
            case 1: answerPhrase = `Я всегда угадываю\n\u{1F60E}`;
            break;
            case 2: answerPhrase = `Я так и знал\n\u{1f638}`;
            break;
            case 3: answerPhrase = `Я молодец\n\u{1f61c}`;
            break;
            default:
                answerPhrase =  `Я всегда угадываю\n\u{1F60E}`;
            break;    
        }
        answerField.innerText = answerPhrase;    
        gameRun = false;
    }
})


startGame();

