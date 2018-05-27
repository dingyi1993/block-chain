/**
 * base
 */

const BlockChain = require('./block-chain')
const Block = require('./block')

let dyCoin = new BlockChain()
dyCoin.addBlock(new Block({ amount: 4 }))
dyCoin.addBlock(new Block({ amount: 8 }))

// valid