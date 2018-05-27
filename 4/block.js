const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(transaction = [], previousHash = '') {
    this.previousHash = previousHash
    this.timestamp = Date.now()
    this.transaction = transaction
    this.hash = this.calculateHash()
    this.tmp = 0
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transaction) + this.tmp).toString()
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.tmp++
      this.hash = this.calculateHash()
    }
  }
}
module.exports = Block