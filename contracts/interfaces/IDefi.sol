// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

interface IDefi {
    function depositBNB(uint256 _amount) external payable;

    function withdraw(uint256 _amount) external;
}
