pragma solidity ^0.4.0;

import 'truffle/Assert.sol';
import '../contracts/Voter.sol';

//This is a unit test written in solidity
contract TestVoter {
    function testVoteForAnOption() public {
        Voter voter = new Voter();
        voter.addOption("one");
        voter.addOption("two");
        voter.startVoting();

        voter.vote(0);
        uint[] memory votes = voter.getVotes();
        uint[] memory expected = new uint[](2);
        expected[0] = 1;
        expected[1] = 0;
        Assert.equal(votes, expected, "First option should be voted for");
    }
}