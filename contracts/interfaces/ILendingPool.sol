// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

interface ILendingPool {
    function flashLoan(
        address _receiver,
        address _reserve,
        uint256 _amount,
        bytes calldata _params
    ) external;
}
