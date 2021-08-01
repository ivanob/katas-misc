pragma solidity ^0.8.6;

contract MultiSig{
    address payable public beneficiary;
    address payable public owner;
    uint8 public approvalsCount; //Current number of approvals
    uint256 public approvalsNum; //Minimum number of approvals needed
    
    mapping(address => bool) approvedBy;
    mapping(address => bool) isApprover;
    
    constructor(address payable _beneficiary, address[] memory _approvers) public payable {
        require(_approvers.length > 0, "There should be at least one approver");
        beneficiary = _beneficiary;
        for(uint8 i = 0; i < _approvers.length; i++) {
            isApprover[_approvers[i]] = true;
        }
        approvalsCount = 0;
        approvalsNum = _approvers.length;
        owner = payable(msg.sender);
    }
    
    function approve() public {
        require(isApprover[msg.sender], "Not an approver");
        if(!approvedBy[msg.sender]){
            approvalsCount++;
            approvedBy[msg.sender] = true;
        }
        if(approvalsNum == approvalsCount){
            beneficiary.send(address(this).balance);
            //If send fails, ie the address is invalid
            //We want to return all the funds to the owner
            //And destroy the contract
            selfdestruct(owner);
        }
    }
    
    function reject() public {
        require(isApprover[msg.sender], "Not an approver");
        selfdestruct(owner);
    }
}
