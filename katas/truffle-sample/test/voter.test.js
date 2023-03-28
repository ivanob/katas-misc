let Voter = artifacts.require('./Voter.sol');

contract('Voter', function(accounts){
    let voter;
    let firstAccount;

    beforeEach(async function(){
        firstAccount = accounts[0];
        voter = await Voter.new();
        await setOptions(firstAccount, ['coffee', 'tea'])
    });

    it('has no votes by default', async function(){
        let votes = await voter.getVotes.call();
        
        expect(toNumbers(votes)).to.deep.equal([0,0]);
    })

    it('can vote with a string option', async function(){
        await voter.vote(0, {from: firstAccount});
        let votes = await voter.getVotes.call();
        expect(toNumbers(votes)).to.deep.equal([1,0]);
    })

    const ERROR_MSG = 'Returned error: VM Exception while processing transaction: revert The sender has already voted -- Reason given: The sender has already voted.'

    //Test a revert transaction, for example when we try to vote twice.
    it('cannot vote twice from the same contract', async function(){
        try{
            await voter.vote(0, {from: firstAccount});
            await voter.vote(0, {from: firstAccount});
            expect.fail(); //It should never reach this point
        } catch(error){
            //It should enter here
            expect(error.message).to.equal(ERROR_MSG)
        }
    })

    async function setOptions(account, options) {
        for(pos in options) {
            await voter.addOption(options[pos], {from: account});
        }
        await voter.startVoting({from: account, gas: 600000})
    }

    function toNumbers(bigNumbers){
        return bigNumbers.map(function(bigNumber){
            return bigNumber.toNumber();
        })
    }

})