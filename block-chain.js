const Block = require('./block')
const Transaction = require('./transaction')

class BlockChain{
  constructor(difficulty = 2) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block([], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  giveCoin(address, amount) {
    let block = new Block([new Transaction(null, address, amount)]);
    block.mineBlock(0);
    this.chain.push(block);
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(this.pendingTransactions);
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getBalanceOfAddress(address){
    let balance = 0; // you start at zero!

    // 遍历每个区块以及每个区块内的交易
    for(const block of this.chain){
      for(const trans of block.transactions){

        // 如果地址是发起方 -> 减少余额
        if(trans.fromAddress === address){
          balance -= trans.amount;
        }

        // 如果地址是接收方 -> 增加余额
        if(trans.toAddress === address){
          balance += trans.amount;
        }
      }
    }

    return balance;
  }
}
module.exports = BlockChain