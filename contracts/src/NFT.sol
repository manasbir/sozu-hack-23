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

    function mint(address user, uint256 amount) public {
        for (uint256 i = 0; i < amount; i++) {
            _mint(user, currId + i);
        }
        currId += amount;
        totalSupply += amount;
    }
        
    function name() public pure override returns (string memory) {
        return "SOZU MULTIFAUCET NFT";
    }

    function symbol() public pure override returns (string memory) {
        return "SOZUMF";
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        return "ipfs://QmWThadEoYrWDu4JeB8abxLqARAMXs2MNS788QX1mQHXHP";
    }
}