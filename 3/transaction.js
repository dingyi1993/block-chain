class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
    this.timestamp = new Date().getTime()
  }
}
module.exports = Transaction