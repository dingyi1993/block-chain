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
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM1iZnegECJBt50QpEh9zCEG/jIy6Vp8
rkOlyWaNZJFEr6WyvBVfggdhLBIDQmtLIpkRflvlGItXhpWki5JrfuUCAwEAAQ==
-----END PUBLIC KEY-----`
const ohhPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBPAIBAAJBAM1iZnegECJBt50QpEh9zCEG/jIy6Vp8rkOlyWaNZJFEr6WyvBVf
ggdhLBIDQmtLIpkRflvlGItXhpWki5JrfuUCAwEAAQJAOSyfYcXJOAAbYTn0wclj
Pf54XPkXRP1YdbR9MHND/7wji7RdvuOVIkKQTcBSc9U0DCSShdIbDgiMvgr5s+V4
gQIhAOifIwRcZZAUGVr2ra9BYBErKKAEZ2ZyUq4+fiZx/6WtAiEA4gaBqlGDg76/
ufpEHb3gZ8qf3VqgFwOVZFfwkmG1tRkCIQCaXdA8+pujKtNQm9XSMQ3xFrTUy1da
ko7vdiT8mjXN2QIhALPvdBhv7h/aoe1fdAytVVGreFsSw3Gu06Zfb9BI4ww5AiEA
qwHt7zDE9zU0fXAR+Hu4WOdat2yXP2QftdPIGBHSv7Q=
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