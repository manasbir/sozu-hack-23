// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "solady/tokens/ERC721.sol";

contract FractionalizedNFT is ERC721 {
    address fractionalizer;
    string _name;
    string _symbol;
    address baseNFT;
    uint256 id;

    constructor () {
        fractionalizer = msg.sender;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function initialize(address _baseNFT, uint256 _id) public {
        require(msg.sender == fractionalizer, "1");
        baseNFT = _baseNFT;
        id = _id;
        ERC721(_baseNFT).transferFrom(fractionalizer, address(this), _id);
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        return "";
    }
}
