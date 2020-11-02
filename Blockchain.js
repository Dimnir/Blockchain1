const SHA256 = require('crypto-js/sha256') // sha256 = 2**256

// Block class
class Block{ 
    constructor(index,timeStamp,data,previousHash=''){ // prevHash '' cuz first has no prev
    this.index = index
    this.timeStamp = timeStamp
    this.data = data
    this.previousHash = previousHash
     this.hash = this.calculateHash()
}
// added "npm install crypto-js" in terminal

calculateHash(){ // calculates hash
    return SHA256(this.index + this.previousHash + this.timeStamp + + JSON.stringify(this.data)).toString()
}
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()] // chain is like a linked list of blocks
    }
    createGenesisBlock(){ // first block by "satoshi"
        return new Block(0,"01/01/2020","Genesis block", 'o') // made up values
    }

    getLatestBlock(){
     return this.chain[this.chain.length-1] 
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash // for current block we need the previous blocks hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
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
    }
}
module.exports.Blockchain = Blockchain // for export in different files (?)
module.exports.Block = Block 