import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("ProtoCoin Tests", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const ProtoCoin = await ethers.getContractFactory("ProtoCoin")
    const protocoin = await ProtoCoin.deploy()

    return { protocoin, owner, otherAccount }
  }

  it("Should test", async function () {
    const { protocoin, owner, otherAccount } = await loadFixture(deployFixture)
    expect(true).to.equal(true)
  })
})
