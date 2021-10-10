// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./interfaces/IDefi.sol";

contract Defi is IDefi {
    using Address for address;

    mapping(address => uint256) public bnbBank;

    address public constant BNB_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    event DepositBnbEvent(address indexed _user, uint256 _amount);
    event WithdrawBnbEvent(address indexed _user, uint256 _amount);

    function depositBNB(uint256 _amount) external payable override {
        require(msg.value == _amount, "Incorrect funds amount");
        bnbBank[msg.sender] = bnbBank[msg.sender] + _amount;

        emit DepositBnbEvent(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external override {
        require(_amount != 0, "Invalid withdrawal amount");
        require(
            bnbBank[msg.sender] >= _amount,
            "Insufficient amount to withdraw"
        );

        bnbBank[msg.sender] = bnbBank[msg.sender] - _amount;

        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Withdraw failed");

        emit WithdrawBnbEvent(msg.sender, _amount);
    }
}
