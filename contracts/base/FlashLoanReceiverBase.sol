// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../interfaces/IFlashLoanReceiver.sol";
import "../interfaces/ILendingPoolAddressesProvider.sol";

contract FlashLoanReceiverBase is IFlashLoanReceiver {
    using SafeERC20 for IERC20;

    ILendingPoolAddressesProvider public addressesProvider;

    address public constant BNB_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    constructor(ILendingPoolAddressesProvider _provider) {
        addressesProvider = _provider;
    }

    fallback() external payable {}

    receive() external payable {}

    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    ) external virtual override {}

    function transferFundsBackToPoolInternal(address _reserve, uint256 _amount)
        internal
    {
        address payable core = addressesProvider.getLendingPoolCore();
        transferInternal(core, _reserve, _amount);
    }

    function transferInternal(
        address payable _destination,
        address _reserve,
        uint256 _amount
    ) internal {
        if (_reserve == BNB_ADDRESS) {
            //solium-disable-next-line
            (bool success, ) = _destination.call{value: _amount, gas: 50000}(
                ""
            );
            if (success) return;
        }
        IERC20(_reserve).safeTransfer(_destination, _amount);
    }

    function getBalanceInternal(address _target, address _reserve)
        internal
        view
        returns (uint256)
    {
        if (_reserve == BNB_ADDRESS) {
            return _target.balance;
        }
        return IERC20(_reserve).balanceOf(_target);
    }
}
