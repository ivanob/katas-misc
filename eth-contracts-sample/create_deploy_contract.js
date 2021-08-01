let fs = require("fs");
let solc = require("solc");
let Web3 = require("web3");

let contract = compileContract();
let web3 = createWeb3(); //To programmatically access ethereum network
let sender = '0xc655638c4c8610126f9f571837c20ac891b59708';

deployContract(web3, contract, sender)
    .then(function(){
        console.log("Deployment finished")
    })
    .catch(function(error){
        console.log(`failed to deploy contract: ${error}`)
    })

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

async function deployContract(web3, contract, sender){
    let Voter = new web3.eth.Contract(JSON.parse(contract.interface));
    let bytecode = '0x' + contract.bytecode;
    //ask web3 how much gas we will need
    let gasEstimate = await web3.eth.estimateGas({data: bytecode});

    console.log("Deploying the contract");
    const contractInstance = await Voter.deploy({
        data: bytecode
    })
    .send({
        from: sender,
        gas: gasEstimate
    })
    .on('transactionHash', function(transactionHash){
        console.log(`Transaction hash: ${transactionHash}`)
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log(`Confirmation number: ${confirmationNumber}`)
    })

    console.log(`Contract address: ${contractInstance.options.address}`)
}