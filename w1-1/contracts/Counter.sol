pragma solidity 0.8.11;

contract Counter {
    uint256 public total;

    constructor() {}
    function add(uint256 x) public {
        total+=x;
    }
}