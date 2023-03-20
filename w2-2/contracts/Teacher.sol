// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Score.sol";
import "./IScore.sol";

contract Teacher {
    IScore public score;
    constructor(){
        score = IScore(address(new Score()));
    }

    function addScore(address student, uint newScore) public {
        score.addScore(student, newScore);
    }

    function updateScore(address student, uint newScore) public {
        score.addScore(student, newScore);
    }
}
