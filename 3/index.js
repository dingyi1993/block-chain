/**
 * trade
 */

const BlockChain = require('./block-chain')
const Transaction = require('./transaction')

let dyCoin = new BlockChain(3)
dyCoin.createTransaction(new Transaction('dy', 'ohh', 200))
dyCoin.createTransaction(new Transaction('ohh', 'qxj', 100))
dyCoin.minePendingTransactions('cjb')

console.log(dyCoin.getBalanceOfAddress('ohh'))
console.log(dyCoin.getBalanceOfAddress('qxj'))
