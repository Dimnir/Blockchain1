const {Blockchain,
        Block,
        Transaction} = require('./Blockchain.js')

let LiraCoin = new Blockchain(); // create new blockchain


// first blocks
LiraCoin.createTransaction(new Transaction('Alice','Charlie',100)) // transactions
LiraCoin.createTransaction(new Transaction('Charlie','Alice',50)) 

console.log('Start Mining:')
LiraCoin.miningPendingTransactions('Bob') // // mining of the first block, bob is the miner
console.log('\n Balance of bob: ', LiraCoin.getBalanceOfAddress('Bob')) // show Bobs balance


// second block
LiraCoin.createTransaction(new Transaction('Bob','Alice',50)) // transactions

console.log('Start Mining again:') 
LiraCoin.miningPendingTransactions('Bob') // // mining of the second block, bob is the miner
console.log('\nBalance of bob: ', LiraCoin.getBalanceOfAddress('Bob')) // show Bobs balance


console.log('Blockchain validation: ' + LiraCoin.isChainValid()) // blockchain validation: "Blockchain valid T/F"

console.log(JSON.stringify(LiraCoin,null,4)) // prints all the blocks in chain 




/* changing a block will lead to a false validation
---------------------------------------------------
 console.log('changing a block ...')
 LiraCoin.chain[1].data = {amount:69}
 console.log('Blockchain valid ' + LiraCoin.isChainValid())
 */

