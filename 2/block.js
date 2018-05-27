const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(data, previousHash = '') {
    this.previousHash = previousHash
    this.timestamp = Date.now()
    this.data = data
    this.hash = this.calculateHash()
    this.tmp = 0
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.tmp).toString()
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.tmp++
      this.hash = this.calculateHash()
    }
  }
}
module.exports = Block