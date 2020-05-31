import SHA256 from "crypto-js/sha256"
class Block {
    index:number
    timestamp:string
    data:any
    previousHash:string
    hash:string
    constructor(index:number,timestamp:string,data:any,previousHash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }
    calculateHash (){
        return SHA256(this.index.toString()+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    chain : Block[]
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock(){
        return new Block (0,"01/01/2020","this is the genesis block","0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock:Block){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }
}

//creating 2 blocks
let block1 = new Block(1,"01/01/2020",{myBalance : 100})
let block2 = new Block(1,"02/01/2020",{myBalance : 200})

//creating a new chaine
let myBlockChaine = new BlockChain()
myBlockChaine.addBlock(block1)
myBlockChaine.addBlock(block2)

console.log(JSON.stringify(myBlockChaine,null,4))