pragma solidity ^0.4.0;

library Utils {
    function minutesToSeconds(uint timeInMin) public pure returns(uint){
        return timeInMin * 1 minutes;
    }
}