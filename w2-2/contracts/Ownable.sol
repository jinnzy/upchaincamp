pragma solidity ^0.8.0;

contract Ownable {
    address private owner;
    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        _checkOwner();
        _;
    }
    function _checkOwner() internal view virtual {
        require(owner == msg.sender, "Ownable: caller is not the owner");
    }

}