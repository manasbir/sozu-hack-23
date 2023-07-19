// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

import "./WMNT.sol";
import "./Dai.sol";
import "./NFT.sol";



contract SozuFaucet {
    address public dai;
    address public wMNT;
    address public nft;
    address public owner;

    uint256 baseDripRate = 0.1 ether;

    // this important
    bool public isSolvent;

    event Drip(address indexed user);
    event OutOfFunds();
    
    constructor() {
        owner = msg.sender;
        dai = address(new Dai());
        wMNT = address(new WMNT());
        nft = address(new NFT());
    }

    // amount in wei
    function drip(address user, uint256 amount) public onlyOwner {
        Dai(dai).mint(user, 1e21);
        NFT(nft).drip(user);

        if (address(this).balance < amount) {
            if (address(this).balance >= baseDripRate) {
                WMNT(payable(wMNT)).transfer(user, baseDripRate);
                payable(user).transfer(baseDripRate);
            }

            isSolvent = false;
            emit OutOfFunds();
        } else {
            WMNT(payable(wMNT)).transfer(user, amount);
            payable(user).transfer(amount);

            emit Drip(user);
        }
    }

    function donate() public payable {
        require(msg.value > 0, "NO_DONATION");
        WMNT(payable(wMNT)).deposit{value: msg.value/2}();
        if (address(this).balance > baseDripRate) {
            isSolvent = true;
        }
    }

    receive() external payable {
        donate();
    }

    function changeBaseDripRate(uint256 newRate) public onlyOwner {
        baseDripRate = newRate;
    }

    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }
        
}