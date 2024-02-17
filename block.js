const {Genesis_data, MINE_RATE}=require('./config');
const cryptoHash=require('./crypto-hash');
const hexToBinary=require('hex-to-binary');

class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){
        this.timestamp=timestamp;
        this.prevHash=prevHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }
    static genesis(){
        return new this(Genesis_data);
    }
    static mineBlock({prevBlock,data}){
        let timestamp,hash;
        const prevHash = prevBlock.hash;
        let {difficulty}=prevBlock;
        let nonce=0;
        do{
        nonce++;
        timestamp=Date.now()
        difficulty=Block.adjustDifficulty(prevBlock,timestamp);
        hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty)
        }while(hexToBinary(hash).substring(0,difficulty)!=="0".repeat(difficulty))
        // const hash=cryptoHash(timestamp,prevHash,data);
        return new this({timestamp,prevHash,hash,data,nonce,difficulty});
    }
    static adjustDifficulty(originalBlock,timestamp){
        const {difficulty} = originalBlock;
        const difference = timestamp-originalBlock.timestamp;
        if(difficulty<1) return 1;
        if(difference>MINE_RATE){
           return difficulty-1;
        }
        else{
           return difficulty+1;
        }
    }
}

module.exports=Block;

// const block1=new Block({timestamp:'01/01/2021',prevHash:'0x0000',hash:'0x0001',data:'100'});
// console.log(block1);

// const genesisBlock=Block.genesis();
// console.log(genesisBlock);

// const block2=Block.mineBlock({prevBlock:genesisBlock,data:'hello'});
// console.log(block2);