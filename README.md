
# Own Blockchain

Creating an Own Blockchain using a javascript from scratch.




## Block.js

-> It has a class name Block that contains:

~ **Constructor:** Initializes a block with properties like timestamp, prevHash, hash, data, nonce, and difficulty.

~ **static genesis():** A static method that creates and returns the genesis block using the data from Genesis_data.

~ **static mineBlock({prevBlock,data}):** Another static method used to mine a new block. It takes the previous block and new data as parameters. It iteratively calculates the hash until a hash is found that meets the required difficulty criteria. This is the **Proof of Work mechanism.**

~ **static adjustDifficulty(originalBlock,timestamp):** Adjusts the difficulty of mining the next block based on the time taken to mine the previous block. It increases the difficulty if the time is less than MINE_RATE and decreases it otherwise.
## Chain.js

-> It has a class name Blockchain that contains:

~ **Constructor**: Initializes the blockchain with an array containing the genesis block.

~ **addBlock({data}):** Method to add a new block to the blockchain. It mines a new block using the mineBlock method of the Block class and then adds it to the chain.

~ **replaceChain(chain):** Replaces the current blockchain with a new chain if certain conditions are met. It checks if the new chain is longer and valid, and then replaces the current chain with it if conditions are satisfied.

~ **static isValidChain(chain):** Static method to validate a chain. It checks if the genesis block matches, if each block's prevHash matches the previous block's hash, if each block's hash is correctly calculated, and if the difficulty of each block does not have a sudden jump.
## Index.js

**const blockchain = new Blockchain();:** Instantiates a new blockchain.

**const pubsub = new PubSub({blockchain});:** Instantiates a publish-subscribe system with the blockchain instance.


**GET /api/blocks:** Endpoint to retrieve the blockchain. Returns the current state of the blockchain.

**POST /api/mine:** Endpoint to mine a new block. Expects a JSON payload containing the block data. Adds the block to the blockchain and broadcasts the updated chain to all nodes.


**syncChains:** A function that sends a request to the root node to fetch its blockchain and replaces the local blockchain with the fetched one if it's longer and valid.
## Publish.js

-> It has a class name Blockchain that contains:


~ **Constructor:** Initializes the PubSub instance with a reference to the blockchain object and creates publisher and subscriber clients.

~ **handleMessage(channel, message):** Method for handling incoming messages. If the message is intended for the blockchain channel, it replaces the current blockchain with the received one.

~ **publish({channel, message}):** Method for publishing a message to a specified channel.

~ **broadcastChain():** Method for broadcasting the current blockchain to all subscribers.
