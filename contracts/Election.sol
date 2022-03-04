// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    uint public candidatesCount;

    mapping(uint => Candidate) public candidates;

    mapping(address => bool) public voted;

    event electionupdated(uint id, string name, uint voteCount);
    event voteAvaliable(bool avaliable); 
    address owner;

    constructor() {
        owner = msg.sender;
        addCandidate("Prayuth");
        addCandidate("Donald Duck");
    }

    function addCandidate(string memory name) private { //private only smartcontact can interact
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function startVote() private {
        require(owner == msg.sender, "Only owner can start this vote");
        emit voteAvaliable(true);
    }

    function closeVote() private {
        require(owner == msg.sender, "Only owner can close this vote");
        emit voteAvaliable(false);
    }

    function vote(uint _id) public {
        require(!voted[msg.sender], "You already voted!");
        require(candidates[_id].id !=0, "participant's id not exist");
        candidates[_id].voteCount++;
        voted[msg.sender] = true;
        emit electionupdated(_id,  candidates[_id].name,  candidates[_id].voteCount);
    }

}