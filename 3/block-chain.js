const Block = require('./block')
const Transaction = require('./transaction')

class BlockChain {
  constructor(difficulty = 2) {
    this.difficulty = difficulty
    this.chain = [new Block()]
    this.pendingTransactions = []
    this.reward = 100
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash
  //   newBlock.mineBlock(this.difficulty)
  //   console.log(newBlock.hash)
  //   this.chain.push(newBlock)
  // }

  minePendingTransactions(miningAddress) {
    const newBlock = new Block(this.pendingTransactions)
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.mineBlock(this.difficulty)
    console.log(newBlock.hash)
    this.chain.push(newBlock)
    this.pendingTransactions = [new Transaction(null, this.minePendingTransactions, this.reward)]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
  }


  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }

  getBalanceOfAddress(address) {
    let balance = 0
    this.chain.forEach(chain => {
      chain.transaction.forEach(transaction => {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount
        }
      })
    })
    return balance
  }
}

module.exports = BlockChain