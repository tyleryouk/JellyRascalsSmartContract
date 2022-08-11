
const hre = require("hardhat");

async function main() {
  const JellyRascalsNFT = await hre.ethers.getContractFactory("JellyRascalsNFT"); 
  const jellyRascalsNFT = await JellyRascalsNFT.deploy();

  await jellyRascalsNFT.deployed();

  console.log("JellyRascalsNFT deployed to:", jellyRascalsNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
/*
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});*/

