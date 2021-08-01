pragma solidity ^0.4.0;

//Very simple and silly contract, just to check the compiler works
contract Simple {
    
    uint8 public num;

    constructor() public {
        num = 2;
    }
    
    function getNum() public view returns (uint8){
        return num;
    }
    
}