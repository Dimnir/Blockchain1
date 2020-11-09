const {Blockchain,
        Block,
        Transaction} = require('./Blockchain.js')

let LiraCoin = new Blockchain();

LiraCoin.createTransaction(new Transaction('address1','address2',100)) 
LiraCoin.createTransaction(new Transaction('address2','address1',50)) 

console.log('Start Mining:')
LiraCoin.miningPendingTransactions('Bob') // bob is the miner
console.log('\n balance of bob: ', LiraCoin.getBalanceOfAddress('Bob'))



console.log('Start Mining again:')
LiraCoin.createTransaction(new Transaction('Bob','address1',50))
LiraCoin.miningPendingTransactions('Bob') // bob is the miner
console.log('\n balance of bob: ', LiraCoin.getBalanceOfAddress('Bob'))



console.log('Blockchain valid ' + LiraCoin.isChainValid()) // blockchain validation: "Blockchain valid T/F"
console.log(JSON.stringify(LiraCoin,null,4))


/* changing a block will lead to a false validation
---------------------------------------------------
 console.log('changing a block ...')
 LiraCoin.chain[1].data = {amount:69}
 console.log('Blockchain valid ' + LiraCoin.isChainValid())
 */

