// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/TestKYCat.sol";

contract TestScript is Script {

    function run() public returns (address, uint256) {
        vm.startBroadcast();
        TestKYCat kYCat = new TestKYCat();
        uint256 payload = kYCat.getKYCStatus(0x9696bc05C4E9B8992059915eA69EF4cDf391116B);
        vm.stopBroadcast();
        return (address(kYCat), payload);
    }
}
