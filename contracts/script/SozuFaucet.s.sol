// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/SozuFaucet.sol";

contract FaucetScript is Script {

    function run() public returns (address, address , address) {
        vm.startBroadcast();
        SozuFaucet faucet = new SozuFaucet();
        faucet.donate{value: 10 ether}();
        faucet.drip(msg.sender, 100);
        vm.stopBroadcast();
        return (address(faucet), faucet.dai(), faucet.nft());
    }
}
