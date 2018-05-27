class Transaction {
  constructor(fromAddress, toAddress, amount, sign) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
    this.sign = sign
    // TODO confirmNum
    this.timestamp = new Date().getTime()
  }
}
module.exports = Transaction