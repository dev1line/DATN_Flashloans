// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.4;

import "./base/FlashLoanReceiverBase.sol";
import "./interfaces/ILendingPoolAddressesProvider.sol";
import "./interfaces/ILendingPool.sol";
import "./interfaces/IDefi.sol";

contract Demo is FlashLoanReceiverBase {
    address public defi;

    constructor(ILendingPoolAddressesProvider _addressesProvider, address _defi)
        FlashLoanReceiverBase(_addressesProvider)
    {
        defi = _defi;
    }

    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    ) external override {
        require(
            _amount <= getBalanceInternal(address(this), _reserve),
            "Invalid balance, was the flashLoan successful?"
        );

        //
        // Your logic goes here.
        // !! Ensure that *this contract* has enough of `_reserve` funds to payback the `_fee` !!
        //

        IDefi app = IDefi(defi);
        // Todo: Deposit into defi smart contract
        app.depositBNB{value: _amount}(_amount);

        // Todo: Withdraw from defi smart contract
        app.withdraw(_amount);

        uint256 totalDebt = _amount + _fee;
        transferFundsBackToPoolInternal(_reserve, totalDebt);
    }

    function flashloanBnb(uint256 _amount) public {
        bytes memory data = "";

        ILendingPool lendingPool = ILendingPool(
            addressesProvider.getLendingPool()
        );
        lendingPool.flashLoan(address(this), BNB_ADDRESS, _amount, data);
    }
}
