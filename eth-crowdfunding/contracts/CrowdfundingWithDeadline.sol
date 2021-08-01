pragma solidity ^0.4.0;

import "./Utils.sol";

contract CrowdfundingWithDeadline {

    using Utils for *;

    enum State { Ongoing, Failed, Succeeded, PaidOut }

    //This is the event we will emit when the campaign is done
    event CampaignFinished( 
        address addr,
        uint totalCollected,
        bool succeeded
    );

    string public name;
    uint256 public targetAmount;
    uint256 public fundingDeadline;
    address public beneficiary;
    State public state;
    mapping(address => uint) public amounts;
    bool public collected; // Set to true once our smart contract collected all funds needed
    uint public totalCollected; //Total amount of funds collected so far

    //Modifier 
    modifier inState(State expectedState){
        require(state == expectedState, "Invalid state");
        //Apply this modifier to methods
        _;
    }

    //It is the method to send funds (only can be called if the state is OnGoing)
    //It is payable cause it will receive funds
    function contribute() public payable inState(State.Ongoing){
        //Users can only contribute before the deadline happened
        require(beforeDeadline(), "No contributions after deadline");
        amounts[msg.sender] += msg.value;
        totalCollected += msg.value;

        if(totalCollected >= targetAmount){
            collected = true;
        }
    }

    constructor(string contractName, uint targetAmountWei,
            uint durationInMin, address beneficiaryAddress) public {
        name = contractName;
        targetAmount = targetAmountWei * 1; //ether;
        fundingDeadline = currentTime() + Utils.minutesToSeconds(durationInMin);
        beneficiary = beneficiaryAddress;
        state = State.Ongoing;
     }

    function currentTime() internal view returns (uint) {
        return now;
    }

    function beforeDeadline() public view returns(bool){
        return currentTime() < fundingDeadline;
    }

    function collect() public inState(State.Succeeded){
        if(beneficiary.send(totalCollected)){
            state = State.PaidOut;
        }else{
            state = State.Failed;
        }

        //'this' keyword returns the address of the contract
        emit CampaignFinished(this, totalCollected, collected);
    }

    //Each user can claim the money they 
    function withdraw() public inState(State.Failed){
        require(amounts[msg.sender] > 0, "Nothing was contributed");
        uint contributed = amounts[msg.sender];
        amounts[msg.sender] = 0;

        if(!msg.sender.send(contributed)){
            //If it fails to send the funds back to the contributor, we revert it
            //and put the funds back in the contract
            amounts[msg.sender] = contributed;
        }
    }


    //Given that ethereum can not receive events from outside, so we need to explicitly
    //to notify the contract that the campaign finished
     function finishCrowdfunding() public inState(State.Ongoing){
         require(!beforeDeadline(), "Cannot finish campaign before a deadline");

         if(!collected){
             state = State.Failed;
         }else{
             state = State.Succeeded;
         }
     }
}