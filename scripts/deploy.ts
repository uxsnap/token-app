import { ethers } from "hardhat";

import { TOKEN_NAME, TOKEN_AMOUNT, TOKEN_SYMBOL, TOKEN_DECIMALS } from '../config/token';

async function main() {
  const SampleToken = await ethers.getContractFactory("SampleToken");
  const token = await SampleToken.deploy(
    TOKEN_NAME,
    TOKEN_AMOUNT,
    TOKEN_SYMBOL,
    TOKEN_DECIMALS
  );
  
  await token.deployed();
  
  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
