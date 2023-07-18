// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;
import "solady/tokens/WETH.sol";
import "./Dai.sol";
import "./NFT.sol";



contract Faucet {
    address public dai;
    address public weth;
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
        weth = address(new WETH());
        nft = address(new NFT());
    }

    // call this !!!
    function drip(address user) public onlyOwner {
        Dai(dai).mint(user, 1e20); 
        NFT(nft).drip(user);

        if (address(this).balance < dripRate) {
            isSolvent = false;
            emit OutOfFunds();
        } else {
            WETH(payable(weth)).transfer(user, dripRate); //0.1 WETH
            payable(user).transfer(0.1 ether);
            emit Drip(user);
        }
    }

    function donate() public payable {
        require(msg.value > 0, "NO_DONATION");
        WETH(payable(weth)).deposit{value: msg.value/2}();
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