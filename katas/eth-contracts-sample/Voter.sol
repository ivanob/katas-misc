pragma solidity ^0.4.0;

contract Voter {
    
    struct OptionPos {
        uint pos;
        bool exists;
    }
    
    uint[] public votes;
    string[] public options;
    mapping(address => bool) hasVoted; //It gets automatically initialized with default values (false)
    mapping(string => OptionPos) posOfOption;
    bool votingStarted;

    function addOption(string option) public {
        require(!votingStarted);
        options.push(option);
    }

    function startVoting() public {
        require(!votingStarted);
        votes.length = options.length;
        for(uint i=0; i<options.length; i++){
            OptionPos memory option = OptionPos(i, true);
            posOfOption[options[i]] = option;
        }
        votingStarted = true;
    }
    
    function vote(uint option) public {
        require(hasVoted[msg.sender] == false, "The sender has already voted");
        require(0 <= option && option < options.length, "The option does not exists");
        votes[option] = votes[option] + 1;
        hasVoted[msg.sender] = true;
    }
    
    function getVotes() public view returns (uint[]) {
        return votes;
    }
    
}