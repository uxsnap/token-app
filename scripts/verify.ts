import hre from 'hardhat';

import { TOKEN_NAME, TOKEN_AMOUNT, TOKEN_SYMBOL, TOKEN_DECIMALS } from '../config/token';

//0x3FEeca88F25aD8D6d0c1CCDa3b4380EaED8ed9c4

const verify = async (contractAddress: string) => {
  return hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [
      TOKEN_NAME, 
      TOKEN_AMOUNT, 
      TOKEN_SYMBOL, 
      TOKEN_DECIMALS
    ],
  });
};

verify('0x3FEeca88F25aD8D6d0c1CCDa3b4380EaED8ed9c4');