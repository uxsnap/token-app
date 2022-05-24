import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { TOKEN_NAME, TOKEN_AMOUNT, TOKEN_SYMBOL, TOKEN_DECIMALS } from '../config/token';
import { SampleToken, SampleToken__factory } from "../typechain";

describe("SampleToken",() => {
  let SampleToken: SampleToken__factory;
  let token: SampleToken;
  let owner: SignerWithAddress;
  let testAddr1: SignerWithAddress;
  let testAddr2: SignerWithAddress;

  beforeEach(async function () {
    SampleToken = await ethers.getContractFactory("SampleToken");

    [owner, testAddr1, testAddr2] = await ethers.getSigners();

    token = await SampleToken.deploy(
      TOKEN_NAME,
      TOKEN_AMOUNT,
      TOKEN_SYMBOL,
      TOKEN_DECIMALS
    );
  });


  it("Should return it's name", async () => {
    expect(await token.name);
  });

  it("Should return it's totalSupply", async () => {
    expect(await token.totalSupply);
  });

  it("Should has the right owner", async () => {
    expect(await token.owner()).to.equal(owner.address);
  });

  it("Should add allowance to another contract", async () => {
    await token.approve(testAddr1.address, 1000);  

    expect(await token.allowance(owner.address, testAddr1.address)).to.equal(1000);
  });

  it("Should transfer tokens without any problems", async () => {
    await token.transfer(testAddr1.address, 500);

    await token.connect(testAddr1).approve(testAddr2.address, 500);

    await token.transferFrom(testAddr1.address, testAddr2.address, 200);

    expect(await token.balanceOf(testAddr1.address)).equal(300);
    expect(await token.balanceOf(testAddr2.address)).equal(200);
  });
});
