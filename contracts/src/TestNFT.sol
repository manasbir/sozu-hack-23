// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "solady/tokens/ERC721.sol";

contract TestNFT is ERC721 {
    function mint(address to, uint256 id) public {
        _mint(to, id);
    }
    
    function name() public pure override returns (string memory) {
        return "Test NFT";
    }

    function symbol() public pure override returns (string memory) {
        return "TEST";
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        return "";
    }
}
