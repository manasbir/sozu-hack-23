// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;
import "solady/tokens/WETH.sol";
import "./Dai.sol";
import "./NFT.sol";



contract Faucet {
    address public dai;
    address public wmnt;
    address public nft;
    address public owner;

    uint256 dripRate = 0.1 ether;

    // this important
    bool public isSolvent;

    event Drip(address indexed user);
    event OutOfFunds();
    
    constructor() {
        owner = msg.sender;
        dai = address(new Dai());
        wmnt = address(new WETH());
        nft = address(new NFT());
    }

    // call this !!!
    // multiplier should be 150 for 1.5x, 200 for 2x, etc.
    // so x100
    function drip(address user, uint256 multiplier) public onlyOwner {
        Dai(dai).mint(user, 1e20); 
        NFT(nft).drip(user);

        if (address(this).balance < dripRate * multiplier / 100) {
            if (address(this).balance >= dripRate) {
                WETH(payable(wmnt)).transfer(user, dripRate);
                payable(user).transfer(dripRate);
            }

            isSolvent = false;
            emit OutOfFunds();
        } else {
            WETH(payable(wmnt)).transfer(user, dripRate * multiplier / 100);
            payable(user).transfer(dripRate * multiplier / 100);

            emit Drip(user);
        }
    }

    function donate() public payable {
        require(msg.value > 0, "NO_DONATION");
        WETH(payable(wmnt)).deposit{value: msg.value/2}();
        if (address(this).balance > dripRate) {
            isSolvent = true;
        }
    }

    receive() external payable {
        donate();
    }

    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }
        
}