// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;
import "solady/tokens/ERC721.sol";
import "./FractionalizedNFT.sol";

contract Fractionalizer {
    // approve first
    function createFractionalizedNFT(address baseNFT, uint256 id, uint256 amount) public returns (address) {
        ERC721(baseNFT).transferFrom(msg.sender, address(this), id);
        FractionalizedNFT fractionalizedNFT = new FractionalizedNFT();
        ERC721(baseNFT).approve(address(fractionalizedNFT), id);
        fractionalizedNFT.initialize(baseNFT, id, amount);
        return address(fractionalizedNFT);
    }
}