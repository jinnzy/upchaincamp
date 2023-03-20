// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Ownable.sol";

contract Score is Ownable {
    mapping(address => uint) public students;

    constructor(){
    }
    modifier checkScore(uint score) {
        require (score < 0 || score > 100, "score out of range") ;
        _;
        }

    function addScore(address student, uint score) public checkScore(score) onlyOwner   {
        students[student] += score;
    }

    function updateScore(address student, uint score) public checkScore(score) onlyOwner  {
        students[student] = score;
    }

    function getScore(address student) public view onlyOwner returns (uint) {
        return students[student];
    }
}
