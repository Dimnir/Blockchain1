const {Blockchain,Block} = require('./Blockchain.js') // 

let micaCoin = new Blockchain();
micaCoin.addBlock(new Block(1,"2/11/2020",{amount:4})) // adds new block 
micaCoin.addBlock(new Block(2,"2/11/2020",{amount:9}))

console.log('Blockchain valid ' + micaCoin.isChainValid()) // blockchain validation: "Blockchain valid T/F"
console.log(JSON.stringify(micaCoin,null,4))

// changing a block will lead to a false validation
// console.log('changing a block ...')
// micaCoin.chain[1].data = {amount:69}
// console.log('Blockchain valid ' + micaCoin.isChainValid())
