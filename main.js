const {Blockchain,Block} = require('./Blockchain.js') // 

let LiraCoin = new Blockchain();

LiraCoin.addBlock(new Block(1,"2/11/2020",{amount:4})) // adds new block 
LiraCoin.addBlock(new Block(2,"2/11/2020",{amount:9}))

console.log('Blockchain valid ' + LiraCoin.isChainValid()) // blockchain validation: "Blockchain valid T/F"
console.log(JSON.stringify(LiraCoin,null,4))


/* changing a block will lead to a false validation

 console.log('changing a block ...')
 LiraCoin.chain[1].data = {amount:69}
 console.log('Blockchain valid ' + LiraCoin.isChainValid())
 */


