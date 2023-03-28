let fs = require("fs");
let solc = require("solc");
let Web3 = require("web3");

let web3 = createWeb3(); //To programmatically access ethereum network
let fromAddress = '0xc655638c4c8610126f9f571837c20ac891b59708';
let contractAddress = "0x7478Ea53d22E168822eD3b4EB59D42c76220f619"

let abiStr = fs.readFileSync('abi.json', 'utf8');
let abi = JSON.parse(abiStr);

let voter = new web3.eth.Contract(abi, contractAddress);

function compileContract(){
    let compilerInput = {
        'Voter': fs.readFileSync('Voter.sol', 'utf8')
    }
    console.log('Compiling the contract');
    //Compile and optimize the contract
    let compiledContract = solc.compile({sources: compilerInput}, 1)
    
    //Get compiled contract
    let contract = compiledContract.contracts['Voter:Voter'] //Voter contract from the voter file
    
    // //Save contract's ABI
    let abi = contract.interface
    fs.writeFileSync('abi.json', abi);

    return contract
}

function createWeb3(){
    let web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    return web3;
}

sendTransactions()
    .then(function(){
        console.log("Done");
    })
    .catch(function(error){
        console.log(error)
    })

async function sendTransactions(){
    console.log("Adding option 'coffee'");
    await voter.methods.addOption("coffee").send({from: fromAddress})

    console.log("Adding option 'tea'");
    await voter.methods.addOption("tea").send({from: fromAddress})

    await voter.methods.startVoting()
        .send({from: fromAddress, gas: 600000});

    console.log("Voting");
    await voter.methods['vote(uint256)'](0)
        .send({from: fromAddress, gas: 600000});
    
    console.log("Getting votes");
    let votes = await voter.methods.getVotes().call({from: fromAddress});
    console.log(`Votes: ${votes}`)
}