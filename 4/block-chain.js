const crypto = require('crypto')
const Block = require('./block')
const Transaction = require('./transaction')
const Wallet = require('./wallet')

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

  giveCoin(address, amount) {
    let block = new Block([new Transaction(null, address, amount)])
    block.mineBlock(0)
    this.chain.push(block)
  }

  minePendingTransactions(miningAddress) {
    const validTransactions = this.pendingTransactions.filter(item => {
      if (BlockChain.isTransactionValid(item)) {
        // item.confirmNum++
        return true
      }
      return false
    })
    if (validTransactions.length === 0) {
      console.log('没有合法的待确认交易，无需挖矿')
      return
    }

    const newBlock = new Block(this.pendingTransactions)
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.mineBlock(this.difficulty)
    console.log(newBlock.hash)
    this.chain.push(newBlock)
    this.pendingTransactions = [new Transaction(null, this.minePendingTransactions, this.reward)]
  }

  static isTransactionValid(transaction) {
    if (transaction.fromAddress) {
      try {
        const decrypt = crypto.publicDecrypt(transaction.fromAddress, transaction.sign)
        if (decrypt.toString() === '666') {
          return true
        }
        return false
      } catch (error) {
        console.log('交易不合法')
        return false
      }
    }
    return true
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

  genNewWallet() {
    return new Wallet(this)
  }
}

module.exports = BlockChain