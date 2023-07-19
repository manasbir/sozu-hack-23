// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

import "./WMNT.sol";
import "./Dai.sol";
import "./NFT.sol";



contract SozuFaucet {
    address public dai;
    address public wMNT = 0x2C6db4f138A1336dB50Ab698cA70Cf99a37e1198;
    address public nft;
    address public owner;

    mapping (address => uint256) public lastDrip;

    uint256 baseDripRate = 1 ether;

    // this important
    bool public isSolvent;

    event Drip(address indexed user);
    event OutOfFunds();
    
    constructor() {
        owner = msg.sender;
        dai = address(new Dai());
        nft = address(new NFT());
    }

    // amount in wei
    function drip(address user, uint256 amount) public onlyOwner {
        require(lastDrip[user] + 1 days < block.timestamp, "TIMER_NOT_EXPIRED");
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
        lastDrip[user] = block.timestamp;

        if (owner.balance < baseDripRate) {
            WMNT(payable(wMNT)).withdraw(address(this).balance / 8);
            payable(owner).transfer(address(this).balance / 4);
        }
    }

    function donate() public payable {

        WMNT(payable(wMNT)).deposit{ value: (msg.value/2) }();

        if (address(this).balance > baseDripRate) {
            isSolvent = true;
        }
    }

    receive() external payable {
        donate();
    }

    function changeWMNT(address newWMNT) public onlyOwner {
        wMNT = newWMNT;
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