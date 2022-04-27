
// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

const new1 = numberWithSpaces([4659447675283013])
const new2 = numberWithSpaces(4485923027932671)
const new3 = numberWithSpaces(4024007175133890342)
const new4 = numberWithSpaces([6011714107782368691])
const new5 = numberWithSpaces([3529444860866611])
const new6 = numberWithSpaces([6304166473967874])
const new7 = numberWithSpaces([370161517281533])
const new8 = numberWithSpaces([4026934401438538])
const new9 = numberWithSpaces([5537944379858368])
const new10 = numberWithSpaces('7563456712897645')

//this function accepts a number  withouth spaces, both in number and string format and returns array of single digits
function numberWithSpaces(x) {
    let str = x.toString().replace(/\B(?=(\d{1})+(?!\d))/g, " ");
    return (str.split(' ').map(Number))
}

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

const newBatch = [new1, new2, new3, new4, new5, new6, new7, new8, new9, new10]

// Add your functions below:

const validateCred = arr => {
    let luhnArr = [];
    let count = 0;
    //following are steps of Luhn algorithm
    for(i=arr.length-1; i>=0; i--) {
        count++;
        if(count % 2 !== 0) {
            luhnArr.push(arr[i])
        } else {
            if(arr[i]*2 > 9) {
                luhnArr.push(arr[i]*2 - 9)
            } else {
                luhnArr.push(arr[i]*2)
            }
        }
    }
    luhnArr = luhnArr.reduce((previousValue, currentValue) => previousValue + currentValue);
    if(luhnArr % 10 === 0) {
        //console.log(`card with numbers ${arr} is valid`);
        return [true, sum]
    } else {
        //console.log(`card with numbers ${arr} is not valid`);
        return [false, sum]
    }
}

const findInvalidCards = arr => {
    validCards = [];
    invalidCards = [];
    for(let i=0; i<arr.length; i++) {
        if(validateCred(arr[i])) {
            validCards.push(arr[i])
        } else {
            invalidCards.push(arr[i])         
        }
    }
    
    console.log("valid card numbers:");
    console.table(validCards);
    console.log("invalid card numbers:");
    console.table(invalidCards);
    
    return invalidCards
}

const idInvalidCardCompanies = arr => {
    const companies = [];
    const invalidCards = findInvalidCards(arr);
    //console.log("Invalid card numbers:")
    //console.table(invalidCards);
    for(i=0; i<arr.length; i++){
        if(invalidCards[i]?.[0] === 3) {
            if(companies.includes('Amex')) continue;
            companies.push('Amex')
        } else if(invalidCards[i]?.[0] === 4) {
            if(companies.includes('Visa')) continue;
            companies.push('Visa')
        } else if(invalidCards[i]?.[0] === 5) {
            if(companies.includes('Mastercard')) continue;
            companies.push('Mastercard')
        } else if(invalidCards[i]?.[0] === 6) {
            if(companies.includes('Discover')) continue;
            companies.push('Discover')
        } else if(invalidCards[i]?.[0] < 3 || invalidCards[i]?.[0] > 6) console.log('Company that issued', invalidCards[i], 'not found')       
    }
    console.log("Companies that issued faulty cards are:", companies)
    return companies
}

/*
const numberFixer = arr => {
    if(validateCred(arr) === false) {
        //let sum = arr.reduce((previousValue, currentValue) => previousValue + currentValue);
        let diff = 10 - (sum % 10);
        if(diff===10) diff=0;
        console.log(sum, diff);
        let count = 0;
        for(i=arr.length-1; i>=0; i--){
            count++;
            while(diff>0){
                let previousDigit;
                if(count%2 !== 0){
                    previousDigit = arr[i];
                    arr[i] = arr[i]+9-diff;
                    diff -= 9 - previousDigit
                }           
            }
            
        }
    }
    return arr
}


//findInvalidCards(newBatch);
//idInvalidCardCompanies(batch);
//console.log(invalidCards);
//validateCred(newBatch)*/