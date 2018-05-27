const crypto = require('crypto')
const Block = require('./block')
const Transaction = require('./transaction')

class BlockChain {
  constructor(difficulty = 2) {
    this.chain = [new Block([], "0")]
    this.difficulty = difficulty
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block([], "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
  }

  giveCoin(address, amount) {
    let block = new Block([new Transaction(null, address, amount)])
    block.mineBlock(0)
    this.chain.push(block)
  }

  minePendingTransactions(miningRewardAddress) {
    const validTransactions = this.pendingTransactions.filter(item => {
      if (BlockChain.isTransactionValid(item)) {
        item.confirmNum++
        return true
      }
      return false
    })
    if (validTransactions.length === 0) {
      console.log('没有合法的待确认交易，无需挖矿')
      return
    }
    let block = new Block(validTransactions)
    block.mineBlock(this.difficulty)
    this.chain.push(block)
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  static isTransactionValid(transaction) {
    if (transaction.fromAddress) {
      try {
        // console.log('fromAddress', transaction.fromAddress)
        const decrypt = crypto.publicDecrypt(transaction.fromAddress, transaction.sign)
        if (decrypt.toString() === BlockChain.keyStr) {
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

  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash
  //   newBlock.mineBlock(this.difficulty)
  //   this.chain.push(newBlock)
  // }

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

    for(const block of this.chain){
      for(const trans of block.transactions) {

        if(trans.fromAddress === address) {
          balance -= trans.amount
        }

        if(trans.toAddress === address) {
          balance += trans.amount
        }
      }
    }

    return balance
  }

  genNewWallet() {
    const Wallet = require('./wallet')
    return new Wallet(this)
  }
  genFakeWallet({ address, privateKey }) {
    const Wallet = require('./wallet')
    return new Wallet(this, address, privateKey, true)
  }
  getMyWallet({ address, privateKey }) {
    const Wallet = require('./wallet')
    return new Wallet(this, address, privateKey)
  }
}
BlockChain.keyStr = '666'

module.exports = BlockChain