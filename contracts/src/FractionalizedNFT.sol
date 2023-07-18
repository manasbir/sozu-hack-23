// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "solady/tokens/ERC721.sol";

contract FractionalizedNFT is ERC721 {
    address fractionalizer;
    string _name;
    string _symbol;
    address baseNFT;
    uint256 id;
    uint256 amount;

    Proposal[] proposals;

    struct Proposal {
        string name;
        string description;
        bytes data;
        address to;
        uint256 value;
        uint256[] yesVoters;
        uint256[] noVoters;
    }

    function createProposal(string memory title, string memory description, bytes memory data, address to, uint256 value) public {
        Proposal memory proposal = Proposal(title, description, data, to, value, new uint256[](0), new uint256[](0));
        proposals.push(proposal);
    }

    function vote(uint256 proposalId, bool yesOrNo, uint256[] calldata ids) public {
        for (uint256 i = 0; i < ids.length; i++) {
            require(ownerOf(ids[i]) == msg.sender);
            yesOrNo ? proposals[proposalId].yesVoters.push(ids[i]) : proposals[proposalId].noVoters.push(ids[i]);
        }
        // make reclaim unanimous
        if (proposals[proposalId].yesVoters.length > (amount / 2) + 1) {
             _execute(proposalId);
        }
    }

    function _reclaim(uint256 proposalId) internal {
        ERC721(baseNFT).transferFrom(address(this), fractionalizer, id);
        for (uint256 i = 0; i < amount; i++) {
            _burn(i);
        }
    }

    function _execute(uint256 proposalId) internal {
        address to = proposals[proposalId].to;
        bytes memory data = proposals[proposalId].data;
        uint256 value = proposals[proposalId].value;
        (bool success, ) = to.call{value: value}(data);
        require(success);
    }


    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].yesVoters.length > (amount / 2 ) + 1);
        _execute(proposalId);
    }

    constructor () {
        fractionalizer = msg.sender;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function initialize(address _baseNFT, uint256 _id, uint256 _amount) public {
        require(msg.sender == fractionalizer);
        baseNFT = _baseNFT;
        id = _id;
        amount = _amount;
        for (uint256 i = 0; i < _amount; i++) {
            _mint(msg.sender, i);
        }
        ERC721(_baseNFT).transferFrom(fractionalizer, address(this), _id);
    }

    function tokenURI(uint256 id) public pure override returns (string memory) {
        return "";
    }
}
