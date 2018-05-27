/**
 * wallet
 */

const BlockChain = require('./block-chain')
const Transaction = require('./transaction')

let dyCoin = new BlockChain(3)

const dyWallet = dyCoin.genNewWallet()
const ohhWallet = dyCoin.genNewWallet()
const qxjWallet = dyCoin.genNewWallet()
const cjbWallet = dyCoin.genNewWallet()
// console.log(dyWallet)

dyCoin.giveCoin(dyWallet.getMyAddress(), 1000)

// dyCoin.createTransaction(new Transaction('dy', 'ohh', 200))
// dyCoin.createTransaction(new Transaction('ohh', 'qxj', 100))
dyWallet.transferAccount(ohhWallet.getMyAddress(), 200)
ohhWallet.transferAccount(qxjWallet.getMyAddress(), 100)
dyCoin.minePendingTransactions(cjbWallet.getMyAddress())

console.log(dyCoin.getBalanceOfAddress(ohhWallet.getMyAddress()))
console.log(dyCoin.getBalanceOfAddress(qxjWallet.getMyAddress()))
