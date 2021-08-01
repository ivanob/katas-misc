pragma solidity ^0.4.0;
import "../contracts/CrowdfundingWithDeadline.sol";

contract TestCrowdfundingWithDeadline is CrowdfundingWithDeadline {
    uint time;

    constructor(string contractName, uint targetAmountWei,
            uint durationInMin, address beneficiaryAddress) 
            CrowdfundingWithDeadline(contractName, 
                                    targetAmountWei, 
                                    durationInMin, 
                                    beneficiaryAddress) public {
        
    }

    function currentTime() internal view returns(uint) {
        return time;
    }

    function setCurrentTime(uint newTime) public {
        time = newTime;
    }
}