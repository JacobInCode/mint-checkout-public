//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Sample is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private tokenCounter;

    string public baseURI;
    uint256 public immutable maxTokens;

    bool public isPublicSaleActive;
    uint256 public publicSalePrice = 0.0006 ether;

    // ============ ACCESS CONTROL/SANITY MODIFIERS ============

    modifier totalNotExceeded(uint256 numberOfTokens) {
        require(
            tokenCounter.current() + numberOfTokens <= maxTokens,
            "Not enough tokens remaining to claim"
        );
        _;
    }
    
    modifier publicSaleActive() {
        require(isPublicSaleActive, "Public sale not active");
        _;
    }

    modifier isCorrectPayment(uint256 price, uint256 numberOfTokens) {
        require(
            price * numberOfTokens == msg.value,
            "Incorrect ETH value sent"
        );
        _;
    }

    constructor(string memory _baseURI, uint256 _maxTokens) ERC721("Sample", "SMPL") {
        baseURI = _baseURI;
        maxTokens = _maxTokens;
    }

    // ============ PUBLIC READ-ONLY FUNCTIONS ============

    function totalSupply() external view returns (uint256) {
        return tokenCounter.current();
    }

    // Toggle Claiming Active / Inactive 

    function publicMint(uint256 numberOfTokens)
        external
        payable
        publicSaleActive
        isCorrectPayment(publicSalePrice, numberOfTokens)
        totalNotExceeded(numberOfTokens)
    {
        for (uint256 i = 0; i < numberOfTokens; i++) {
            _safeMint(msg.sender, nextTokenId());
        }
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============

    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function setPublicSalePrice(uint256 _price) external onlyOwner {
        publicSalePrice = _price;
    }

    function setPublicSaleActive(bool _isPublicSaleActive) external onlyOwner {
        isPublicSaleActive = _isPublicSaleActive;
    }

    // ============ SUPPORTING FUNCTIONS ============

    function nextTokenId() private returns (uint256) {
        tokenCounter.increment();
        return tokenCounter.current();
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Nonexistent token");

        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

}