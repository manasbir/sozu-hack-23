// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Faucet.sol";

contract FaucetScript is Script {

    function run() public returns (address) {
        vm.startBroadcast();
        Faucet faucet = new Faucet();
        faucet.donate{value: .2 ether}();
        faucet.drip(msg.sender, 100);
        vm.stopBroadcast();
        return address(faucet);
    }
}
