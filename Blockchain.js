/***************************************
installs:
---------
 crypto:    npm install crypto-js
 elliptic:  npm install elliptic --save
****************************************/

const SHA256 = require('crypto-js/sha256') // hash, sha256 = 2**256


// Transaction class
class Transaction{ 
    constructor(fromAddress, toAddress, amount){ // each transaction has 2 addresses and the amount
        this.fromAddress = fromAddress  // sender address
        this.toAddress = toAddress  // receiver address
        this.amount = amount // amount sent
    }
}


// Block class
class Block{ 
    constructor(timeStamp,transactions,previousHash=''){ // prevHash '' cuz first has no prev
    this.timeStamp = timeStamp // blocks timestamp
    this.transactions = transactions // blocks data (transactions)
    this.previousHash = previousHash // previous block hash
    this.hash = this.calculateHash() // current blocks hash 
    this.nonce = 0  // blocks nonce
    }
    // added "npm install crypto-js" in terminal


    calculateHash(){ // calculates hash (prev hash + time + data + nonce)
        return SHA256(this.previousHash + this.timeStamp + + JSON.stringify(this.transactions)+this.nonce).toString()
    }


    mineBlock(difficulty){ // mining a block
        // the loop is going to increase the nonce until the block gets a hash with X amount of zeros at the beginning. X = 'difficulty'
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) { // checks if there are zeros from 0 to 'difficulty' in the hash
            this.nonce++ // increase nonce
            this.hash = this.calculateHash() // calculate hash again

        } // loop is over when it found the wanted amount of zeros at the start of a hash
    }
}


// Blockchain class
class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()] // chain is like a linked list of blocks
        this.difficulty = 2 // difficulty == amount of 0's in the start of a hash
        this.pendingTransactions = [] // mempool - transactions pool (doing it the wrong way -> EVERY transaction is entered to block)
        this.miningReward = 90 // reward for mining a block

    }

    createGenesisBlock(){ // first block
        return new Block(Date(Date.now()).toString(),"Genesis block", 'NONE') // made up values
    }

    getLatestBlock(){ // gets latest block
     return this.chain[this.chain.length-1] 
    }
    
    
    miningPendingTransactions(miningRewardAddress){ // gets address to reward the miner
        // each transaction enters the block and reward is sent to miners address

        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward) // reward for the miner
        this.pendingTransactions.push(rewardTx) // miner reward enters the transactions array

        let block = new Block(Date(Date.now()).toString(), this.pendingTransactions, this.getLatestBlock().hash) // ALL pending transactions are entered to block

        block.mineBlock(this.difficulty) // mine a new block (similar to old addBlock)
        
        console.log('Block successfully mined.') // successfully mined blocked msg

        this.chain.push(block) // pushes new block into the chain

        this.pendingTransactions=[] // new EMPTY array of transactions after all the transactions are entered to a block
    }


    createTransaction(transaction){ // create new transaction
        this.pendingTransactions.push(transaction)
    }

    
    getBalanceOfAddress(address){ // gets the balance of certain address (*ordinary blockchain wont have this function*)
        let balance = 0

        for(const block of this.chain){ // for each block in chain
            for(const trans of block.transactions){ // for each transaction

                if(trans.fromAddress == address){   // sender address 
                    balance -= trans.amount;
                }
                if(trans.toAddress == address){     // receiver address
                    balance += trans.amount;
                }
            }
        }
        return balance
    }


    isChainValid(){ // checks if curr.prevHash = prevHash to validate chain
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]
            if(currentBlock.hash !== currentBlock.calculateHash()){ // checks current hash
                return false
            }
            if(currentBlock.previousHash !== previousBlock.hash){ // checks curr.prev & real prev
                return false
            }
        }
        return true // no mistakes were found
    } // changing blocks data will lead to a false validation


    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash // for current block we need the previous blocks hash
    //     newBlock.mineBlock(this.difficulty) // mine a new block
    //     this.chain.push(newBlock) // insert new block to chain
    // }
}
module.exports.Blockchain = Blockchain // export in different files
module.exports.Block = Block 
module.exports.Transaction = Transaction