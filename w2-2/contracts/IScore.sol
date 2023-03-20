// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IScore {
    function addScore(address student, uint score) external;
    function updateScore(address student, uint score) external;
    function getScore(address student, uint score) external view;
    }
