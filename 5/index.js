const Transaction = require('./transaction')
const BlockChain = require('./block-chain')
const Wallet = require('./wallet')

// const b1 = new Block(0, "01/01/2017", "Genesis block", "0")
// console.log(b1.calculateHash())

let dyCoin = new BlockChain(3)
const dyWallet = dyCoin.genNewWallet()
// const cjbWallet = dyCoin.genNewWallet()
const cjbWallet = dyCoin.genFakeWallet({ address: 'qwe', privateKey: 'asd' })
const ohhAddress = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOQ4nnIVHbO9UdmYJqBGrVx0GCGWObkr
L4uxazERcM1lFsThopQqtMHUzVp4xJHic2gW7BIv8LIOr5kBbOxDNOsCAwEAAQ==
-----END PUBLIC KEY-----`
const ohhPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAOQ4nnIVHbO9UdmYJqBGrVx0GCGWObkrL4uxazERcM1lFsThopQq
tMHUzVp4xJHic2gW7BIv8LIOr5kBbOxDNOsCAwEAAQJAPaeSHo3X1Vv7BcbWAIy3
fveaIVC9TWn+UUXgCISGreXzuVugnIs+BhGMqbJiJDuZksk4zeF/S9TmOqAw2/mD
+QIhAPuTMtgKiqgFaX864mGC7e9C8RMRU+MSoiq/o5u2TwhvAiEA6DxDBvl7zorj
XR0vwggtceCoWQm7sOQlRxJjMGSqgUUCIEEZmzuaprzKAb3BwBkZp3aVrQqRHlMR
XFORmcXOjG8TAiAp6dZfB9/kYwSt5XqdFkS9bMJ1b2BEiKiBrzvfnAt50QIgd45c
+PGpOEcBcSa2k7mlEmoVC2cbIfoJnPgwIa8tr4Q=
-----END RSA PRIVATE KEY-----`
const ohhWallet = dyCoin.getMyWallet({ address: ohhAddress, privateKey: ohhPrivateKey })
const qxjWallet = dyCoin.genNewWallet()

dyCoin.giveCoin(dyWallet.getMyAddress(), 1000)
dyWallet.transferAccount(cjbWallet.getMyAddress(), 500)
dyCoin.minePendingTransactions(ohhWallet.getMyAddress())
cjbWallet.transferAccount(ohhWallet.getMyAddress(), 100)
dyCoin.minePendingTransactions(qxjWallet.getMyAddress())
// console.log(dyWallet.getMyAddress())
// BlockChain.getMyWallet({ privateKey })
// savjeeCoin.addBlock(new Block("20/07/2017", { amount: 4 }))
// savjeeCoin.addBlock(new Block("20/07/2017", { amount: 8 }))
// console.log(savjeeCoin.isChainValid())
// savjeeCoin.chain[1].transactions = { amount: 100 }
// console.log(savjeeCoin.isChainValid())

// console.log('----------------------------')

// savjeeCoin.chain.forEach((item) => {
//   console.log(item.hash + '+' + item.nonce)
// })
// dyCoin.giveCoin(dyWallet.getMyAddress(), 1000)
// dyCoin.giveCoin('haohui', 1000)

// dyCoin.createTransaction(new Transaction('dingyi', 'haohui', 500))
// dyCoin.createTransaction(new Transaction('haohui', 'dingyi', 200))
// dyCoin.minePendingTransactions('jianbang')
// dyCoin.createTransaction(new Transaction('haohui', 'xingjun', 100))
// dyCoin.minePendingTransactions('jianbang')

console.log('dyWallet', dyCoin.getBalanceOfAddress(dyWallet.getMyAddress()))
console.log('cjbWallet', dyCoin.getBalanceOfAddress(cjbWallet.getMyAddress()))
console.log('ohhWallet', dyCoin.getBalanceOfAddress(ohhWallet.getMyAddress()))
console.log('qxjWallet', dyCoin.getBalanceOfAddress(qxjWallet.getMyAddress()))