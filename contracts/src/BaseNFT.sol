// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "solady/tokens/ERC721.sol";

contract BaseNFT is ERC721 {
    
    function name() public pure override returns (string memory) {
        return "BaseNFT";
    }

    function symbol() public pure override returns (string memory) {
        return "BNFT";
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        return "";
    }
}
