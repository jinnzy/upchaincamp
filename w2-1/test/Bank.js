const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBank() {

    const [owner, otherAccount] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();

    return { owner, otherAccount, bank };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { bank, owner } = await loadFixture(deployBank);

      expect(await bank.owner()).to.equal(owner.address);
    });

  });

  describe("Transfer", function () {
    it("owner发送eth，并检测余额", async function () {
      const {owner, bank} = await loadFixture(deployBank);
      await owner.sendTransaction({
        to: bank.address,
        value: ethers.utils.parseEther("1")
      })
      expect(await bank.addressBalance(owner.address)).to.equal(ethers.utils.parseEther("1"));
    });
    it("其他地址发送eth，并检测余额", async function () {
      const {otherAccount, bank} = await loadFixture(deployBank);
      await otherAccount.sendTransaction({
        to: bank.address,
        value: ethers.utils.parseEther("2")
      })
      expect(await bank.addressBalance(otherAccount.address)).to.equal(ethers.utils.parseEther("2"));
    });
  });

  describe("Withdrawals", function () {

      it("0余额地址取出", async function () {
        const { bank, otherAccount } = await loadFixture(
          deployBank
        );
        // We use lock.connect() to send a transaction from another account
        await expect(bank.connect(otherAccount).withdraw()).to.be.revertedWith(
          "Insufficient balance"
        );
      });

      it("正常取出", async function () {
        const { bank, otherAccount } = await loadFixture(
            deployBank
        );
        await otherAccount.sendTransaction({
          to: bank.address,
          value: ethers.utils.parseEther("1")
        })

        await expect(bank.connect(otherAccount).withdraw()).not.to.be.reverted;
      });
  });
});
