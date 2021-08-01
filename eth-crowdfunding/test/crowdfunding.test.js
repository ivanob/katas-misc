let CrowdfundingWithDeadline = artifacts.require('./TestCrowdfundingWithDeadline')

contract('CrowdfundingWithDeadline', function(accounts){
    let contract;
    let contractCreator = accounts[0];
    let beneficiary = accounts[1];

    const ETH_TO_FUND = 5;
    const ONE_ETH = 100000000000000000000;
    const ERROR_MSG = "Returned error: VM Exception while processing transaction: revert"

    const ONGOING_STATE = 0;
    const FAILED_STATE = 1;
    const SUCCEDED_STATE = 2;
    const PAID_OUT_STATE = 3;

    beforeEach(async function(){
        contract = await CrowdfundingWithDeadline.new('funding', ETH_TO_FUND, 10, beneficiary, {
            from: contractCreator,
            gas: 2000000
        })
    });

    it('contract is initialized', async function () {
        let campaignName = await contract.name.call()
        expect(campaignName).to.equal('funding');
        
        let targetAmount = await contract.targetAmount.call()
        expect(targetAmount.toNumber()).to.equal(ETH_TO_FUND);

        let actualBeneficiary = await contract.beneficiary.call()
        expect(actualBeneficiary).to.equal(beneficiary);

        //This can only be tested thanks to the TestCrowdfundingWithDeadline.sol
        let fundingDeadline = await contract.fundingDeadline.call()
        expect(fundingDeadline.toNumber()).to.equal(600);

        let state = await contract.state.call()
        expect(state.toNumber()).to.equal(ONGOING_STATE);
    })

    it('funds are contributed', async function() {
        const contribution = 2;
        await contract.contribute({value: contribution, from: contractCreator});
        let contributed = await contract.amounts.call(contractCreator);
        expect(contributed.toNumber()).to.equal(contribution);

        let totalCollected = await contract.totalCollected.call();
        expect(totalCollected.toNumber()).to.equal(contribution);

        let isCollected = await contract.collected.call();
        expect(isCollected).to.equal(false);
    });

    it('cannot contribute after deadline', async function(){
        try{
            await contract.setCurrentTime(601);
            await contract.sendTransaction({
                value: ETH_TO_FUND,
                from: contractCreator
            })
            expect.fail();
        }catch(error){
            expect(error.message).to.equal(ERROR_MSG);
        }
    })

    it('crowdfounding Succeeded', async function(){
        await contract.contribute({value: ETH_TO_FUND, from: contractCreator});
        //I contribute with the funds needed and then finish the campaing
        //straight after
        await contract.setCurrentTime(601);
        await contract.finishCrowdfunding();
        let state = await contract.state.call();

        expect(state.toNumber()).to.equal(SUCCEDED_STATE);
    })

    it('crowdfounding Fails', async function(){
        //This is same as the previous test, but in this case we dont 
        //contribute anything, so it should fail the campaign
        await contract.setCurrentTime(601);
        await contract.finishCrowdfunding();
        let state = await contract.state.call();

        expect(state.toNumber()).to.equal(FAILED_STATE);
    })

    //Checks if the money is sent to the beneficiary if the campaign finishes
    //in a successful state
    it("collected money paid out", async function(){
        await contract.contribute({value: ETH_TO_FUND, from: contractCreator});
        await contract.setCurrentTime(601);
        await contract.finishCrowdfunding();

        let initAmount = await web3.eth.getBalance(beneficiary);
        await contract.collect({from: contractCreator});

        let newBalance = await web3.eth.getBalance(beneficiary);
        //expect(newBalance - initAmount).to.equal(ETH_TO_FUND);

        let fundingState = await contract.state.call();
        expect(fundingState.toNumber()).to.equal(PAID_OUT_STATE);
    })

    //In this test I dont fund the campaign enough to reach the goal
    //and then I finish it. The contributor then can claim back his funds
    it("withdraw funds from the contract", async function(){
        await contract.contribute({value: 4, from: contractCreator});
        await contract.setCurrentTime(601);
        await contract.finishCrowdfunding();

        await contract.withdraw({from: contractCreator});
        //Then we check that the amount of funds associated with a particular
        //account is 0 as we claimed then back.
        let amount = await contract.amounts.call(contractCreator);
        expect(amount.toNumber()).to.equal(0);
    })

    // it("event is emitted", async function(){
    //     let watcher = contract.CampaignFinished();
    //     await contract.setCurrentTime(601);
    //     await contract.finishCrowdfunding();

    //     let events = await watcher.get(); //I get the events that this watcher has received
    //     //Other option would be to subscribe to the events, but this way is easier for testing.
    //     let event = events[0]
    //     expect(event.args.totalCollected.toNumber()).to.equal(0);
    //     expect(event.args.succeeded).to.equal(false);
    // })
});