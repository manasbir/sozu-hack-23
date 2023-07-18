//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "solady/tokens/ERC721.sol";

contract NFT is ERC721 {
    address public faucet;
    uint256 public currId;
    uint256 public totalSupply;

    constructor() {
        faucet = msg.sender;
    }

    function drip(address user) public {
        uint256 id = currId;
        for (uint256 i = 0; i < 10; i++) {
            _mint(user, id + i);
        }
        currId += 10;
        totalSupply += 10;
    }
        
    function name() public pure override returns (string memory) {
        return "MANTLE FAUCET NFT";
    }

    function symbol() public pure override returns (string memory) {
        return "NFT";
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmeWrRd9yQk3HbCHW3p7dgj5ZWHvdNpuR9jDXra8hWn5o1";
    }
}