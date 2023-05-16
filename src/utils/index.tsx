function calculatePercentageOff(num:number, percent:number){
    return Math.floor(num -(num * (percent/100))).toFixed(2)
}
function calculatePercentageOn(num:number, percent:number){
    return Math.floor(num + (num * (percent/100))).toFixed(2)
}
export {calculatePercentageOff,calculatePercentageOn}