// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Bank {
    uint public unlockTime;
    address public owner;
    mapping(address => uint256) public addressBalance;
    event Withdrawal(uint amount, uint when);
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    constructor() {
        owner = msg.sender;
    }

    receive () external payable {
        addressBalance[msg.sender] += msg.value;
    }

    // 提取用户所有eth
    function withdraw() public {
        require(addressBalance[msg.sender] > 0, "Insufficient balance");
        uint256 withdrawValue = addressBalance[msg.sender];
        delete addressBalance[msg.sender];
        safeTransferETH(msg.sender, withdrawValue);
    }

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper:safeTransferETH: ETH transfer failed');
    }
}
