//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "KYCat/interfaces/IAggregator.sol";
import "KYCat/constants/SourceId.sol";

contract TestKYCat {
    address public KYCat = 0xf78249b2D762C86C9699ff9BA74C5dbf9b4c168a;

    function getKYCStatus(address user) public view returns (uint256) {
        return IAggregator(KYCat).isSynced(SourceId.BAB, user).timestamp;
    }
}