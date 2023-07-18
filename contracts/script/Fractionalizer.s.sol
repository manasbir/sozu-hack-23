// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Fractionalizer.sol";
import "../src/TestNFT.sol";

contract FractionalizerScript is Script {

    function run() public returns (address addr, address addr2) {
        vm.startBroadcast();
        addr = address(new Fractionalizer());
        TestNFT nft = new TestNFT();
        nft.mint(msg.sender, 1);
        nft.approve(addr, 1);
        addr2 = Fractionalizer(addr).createFractionalizedNFT(address(nft), 1);
    }
}
