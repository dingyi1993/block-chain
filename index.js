const Transaction = require('./transaction')
const BlockChain = require('./block-chain')

// const b1 = new Block(0, "01/01/2017", "Genesis block", "0")
// console.log(b1.calculateHash())

let dyCoin = new BlockChain(4);
// savjeeCoin.addBlock(new Block("20/07/2017", { amount: 4 }));
// savjeeCoin.addBlock(new Block("20/07/2017", { amount: 8 }));
// console.log(savjeeCoin.isChainValid());
// savjeeCoin.chain[1].transactions = { amount: 100 }
// console.log(savjeeCoin.isChainValid());

// console.log('----------------------------');

// savjeeCoin.chain.forEach((item) => {
//   console.log(item.hash + '+' + item.nonce);
// })
dyCoin.giveCoin('dingyi', 1000)
dyCoin.giveCoin('haohui', 1000)

dyCoin.createTransaction(new Transaction('dingyi', 'haohui', 500));
dyCoin.createTransaction(new Transaction('haohui', 'dingyi', 200));
dyCoin.minePendingTransactions('jianbang')
dyCoin.createTransaction(new Transaction('haohui', 'xingjun', 100));
dyCoin.minePendingTransactions('jianbang')

console.log(dyCoin.getBalanceOfAddress('dingyi'), dyCoin.getBalanceOfAddress('haohui'), dyCoin.getBalanceOfAddress('jianbang'));