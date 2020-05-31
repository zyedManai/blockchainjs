const SHA256 = require ("crypto-js/sha256");
class Block {
    constructor(index,timestamp,data,previousHash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }
    calculateHash (){
        return SHA256(this.index.toString()+this.timestamp+this.previousHash+JSON.stringify(this.data)+this.nonce).toString();
    }
    mineNewBlock (difficulty){
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0")){
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("a new blog was mined with hash", this.hash)
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty=7
    }

    createGenesisBlock(){
        return new Block (0,"01/01/2020","this is the genesis block","0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash()
        newBlock.mineNewBlock(this.difficulty)
        this.chain.push(newBlock)
    }
    checkBlockValid(){
        for (var i=1; i<this.chain.length; i++){
            var currentBlock = this.chain[i]
            var previousBlock = this.chain[i-1]
            if(currentBlock.previousHash!=previousBlock.calculateHash()){
                return false
            }
        }
        return true
    }
}

//creating 2 blocks
let block1 = new Block(1,"01/01/2020",{myBalance : 100})
let block2 = new Block(1,"02/01/2020",{myBalance : 200})

//creating a new chaine
let myBlockChaine = new BlockChain()
myBlockChaine.addBlock(block1)
myBlockChaine.addBlock(block2)

/*console.log(JSON.stringify(myBlockChaine,null,4))
console.log("Validity ",myBlockChaine.checkBlockValid())

myBlockChaine.chain[1].data = {myBalance : 1000}
console.log("Validity ",myBlockChaine.checkBlockValid())*/