const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers} = require("hardhat");

let counter;
let owner, otherAccount;

describe("Counter", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function init() {
     [owner, otherAccount] = await ethers.getSigners();
      const Counter = await ethers.getContractFactory("Counter");
      counter = await Counter.deploy(0);
      await counter.deployed();
      console.log("counter:" + counter.address);
      return counter, owner, otherAccount
  }

  before(async function () {
    await init();
  });

  it("count ok", async function () {
      expect(await counter.total()).to.equal(0);
      let tx = await counter.count();

      expect (await counter.total()).to.equal(1);

  });

    it("count with revert", async function () {
    let counter2 = counter.connect(otherAccount);

    expect(counter2.count()).to.be.revertedWith("Caller is not owner");
  });

});
