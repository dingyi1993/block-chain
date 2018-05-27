/**
 * pow
 */

const BlockChain = require('./block-chain')
const Block = require('./block')

// TODO 修改难度
let dyCoin = new BlockChain(5)
dyCoin.addBlock(new Block({ amount: 4 }))
dyCoin.addBlock(new Block({ amount: 8 }))
