//===================================================
const mask = (
  amount,
  prefix = "",
  decimalSeparator = ".",
  thousandsSeparator = ",",
  decimalSize = 2,
  maxDecimalSize = 3
) => {
  var i = parseFloat(amount);
  if (isNaN(i)) i = 0.0;

  var minus = i < 0 ? "-" : "";
  i = Math.abs(i);

  var intValue = parseInt(i).toString();

  var size = maxDecimalSize ? maxDecimalSize : decimalSize;
  var mult = 10 ** size;
  var decimalValue = parseInt((i - intValue).toFixed(size) * mult)
    .toString()
    .padStart(size, "0")
    .toString();
  for (let index = size - 1; index >= decimalSize; index--) {
    if (decimalValue.substr(index, 1) == "0")
      decimalValue = decimalValue.substr(0, index);
    else break;
  }
  if (!decimalValue) decimalSeparator = "";

  if (thousandsSeparator) {
    var tmp = "";
    var _count = 0;
    for (let index = intValue.length - 1; index >= 0; index--) {
      if (_count == 3) {
        tmp = thousandsSeparator + tmp;
        _count = 0;
      }
      tmp = intValue.substr(index, 1) + tmp;
      _count++;
    }
    intValue = tmp;
  }

  return `${prefix} ${minus}${intValue}${decimalSeparator}${decimalValue}`.trim();
};

//===================================================
module.exports.MoneyMask = (
  amount,
  prefix,
  decimalSeparator,
  thousandsSeparator,
  decimalSize,
  maxDecimalSize
) =>
  mask(
    amount,
    prefix,
    decimalSeparator,
    thousandsSeparator,
    decimalSize,
    maxDecimalSize
  );

//===================================================
class Money {
  constructor(
    prefix,
    decimalSeparator,
    thousandsSeparator,
    decimalSize,
    maxDecimalSize
  ) {
    this.prefix = prefix;
    this.decimalSeparator = decimalSeparator;
    this.thousandsSeparator = thousandsSeparator;
    this.decimalSize = decimalSize;
    this.maxDecimalSize = maxDecimalSize;
  }

  Mask(amount) {
    return mask(
      amount,
      this.prefix,
      this.decimalSeparator,
      this.thousandsSeparator,
      this.decimalSize,
      this.maxDecimalSize
    );
  }
}

module.exports.Money = Money;
