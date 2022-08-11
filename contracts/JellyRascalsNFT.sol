// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.4 <=0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol'; //defines functions that only the owner can use

contract JellyRascalsNFT is ERC721, Ownable {
  uint256 public mintPrice; //storage variables
  uint256 public totalSupply;
  uint256 public maxSupply;
  uint256 public maxPerWallet;
  bool public isPublicMintEnabled; //determine when users can mint
  string internal baseTokenUri; //url for where images are located
  address payable public withdrawWallet; //amount of money to withdraw
  mapping(address => uint256) public walletMints;

  constructor() payable ERC721('JellyRascalsNFT', 'JR'){
    //takes two parameters: name and symbol
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;
    // set withdraw wallet address
  }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        //underscore is for naming conventions
        //only owner of contract can call this function
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_; //url of image location
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!'); //makes sure token exists
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(''); 
        //allows us to withdraw the funds to the correct wallet
        require(success, 'withdraw failed'); //fail check
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');
            //keep track of # of mints in wallet
        for (uint256 i = 0; i < quantity_; i++) { //where we are actually doing the mint
            uint256 newTokenId = totalSupply + 1; //keep track of tokenIDs that we are going to mint
            totalSupply++; 
            _safeMint(msg.sender, newTokenId); //msg.sender will receive the NFT
        }
    }
  }



