var ursa = require('ursa')
const crypto = require('crypto')
const Transaction = require('./transaction')

class Wallet {
  constructor(chain, publicKey = '', privateKey = '', isFake = false) {
    this.chain = chain
    if (!publicKey || !privateKey) {
      const { publicKey, privateKey } = Wallet.genNewWallet()
      this.publicKey = publicKey
      this.sign = crypto.privateEncrypt(privateKey, Buffer.from('666'))
      this.privateKey = privateKey
    } else {
      if (isFake) {
        this.publicKey = publicKey
        this.sign = publicKey + 'fake'
        this.privateKey = privateKey
      } else {
        try {
          const encrypt = crypto.privateEncrypt(privateKey, Buffer.from('666'))
          const decrypt = crypto.publicDecrypt(publicKey, encrypt)
          // console.log('encrypt', encrypt.toString())
          console.log('decrypt', decrypt.toString())
          this.publicKey = publicKey
          this.sign = encrypt
          this.privateKey = privateKey
        } catch (error) {
          console.log('地址或秘钥不正确', error)
        }
      }
    }
  }
  getMyAddress() {
    return this.publicKey
  }
  static genNewWallet() {
    var modulusBit = 512
    var key  = ursa.generatePrivateKey(modulusBit, 65537)

    var privatePem = ursa.createPrivateKey(key.toPrivatePem())
    var privateKey = privatePem.toPrivatePem('utf8')
    // console.log(privateKey)

    var publicPem = ursa.createPublicKey(key.toPublicPem())
    var publicKey = publicPem.toPublicPem('utf8')
    // console.log(publicKey)
    return { publicKey, privateKey }
  }
  transferAccount(targetAddress, amount) {
    this.chain.createTransaction(new Transaction(this.publicKey, targetAddress, amount, this.sign))
  }
}

module.exports = Wallet