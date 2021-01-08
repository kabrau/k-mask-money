const {MoneyMask, Money} = require("../src/index")

console.log("Values")

const values = [1, 0.01, 0.003, 0.0004, 100, 200.12, 1234.56, -257, 1200300.45]

values.forEach(v => {
    console.log(v, "=>", MoneyMask(v))
    
});

const m = new Money(
    prefix = "R$",
    decimalSeparator = ",",
    thousandsSeparator = "."
)

values.forEach(v => {
    console.log(v, "=>", m.Mask(v))    
});

m.decimalSize = 2
//m.maxDecimalSize = 2


values.forEach(v => {
    console.log(v, "=>", m.Mask(v))    
});


