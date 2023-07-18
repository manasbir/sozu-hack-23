// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "solady/tokens/ERC721.sol";

contract FractionalizedNFT is ERC721 {
    string NAME;
    string SYMBOL;

    constructor (string memory _name, string memory _symbol) {
        NAME = "F" + _name;
        _symbol = "FNFT";
    }
        
        
    function name() public pure override returns (string memory) {
        return "FractionalizedNFT";
    }

    function symbol() public pure override returns (string memory) {
        return "FNFT";
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        return "";
    }
}
