pragma solidity 0.8.18;

contract Counter {
    uint256 public total;
    address public owner;

    constructor(uint256 x) {
        owner = msg.sender;
        total = x;
    }
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    function count() public isOwner {
        total += 1;
    }
}