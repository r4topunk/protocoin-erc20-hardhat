import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("ProtoCoin Tests", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const ProtoCoin = await ethers.getContractFactory("ProtoCoin")
    const protoCoin = await ProtoCoin.deploy()

    return { protoCoin, owner, otherAccount }
  }

  it("Should have correct name", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture)
    const name = await protoCoin.name()
    expect(name).to.equal("ProtoCoin")
  })

  it("Should have correct symbol", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture)
    const symbol = await protoCoin.symbol()
    expect(symbol).to.equal("PRC")
  })

  it("Should have correct decimals", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture)
    const decimals = await protoCoin.decimals()
    expect(decimals).to.equal(18)
  })

  it("Should have correct totalSupply", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture)
    const totalSupply = await protoCoin.totalSupply()
    expect(totalSupply).to.equal(100n * 10n ** 18n)
  })

  it("Should get balance", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture)
    const balance = await protoCoin.balanceOf(owner)
    expect(balance).to.equal(100n * 10n ** 18n)
  })

  it("Should transfer", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture)

    const ownerBalanceBefore = await protoCoin.balanceOf(owner)
    const otherBalanceBefore = await protoCoin.balanceOf(otherAccount)

    await protoCoin.transfer(otherAccount, 1)

    const ownerBalanceAfter = await protoCoin.balanceOf(owner)
    const otherBalanceAfter = await protoCoin.balanceOf(otherAccount)

    expect(ownerBalanceBefore).to.equal(100n * 10n ** 18n)
    expect(otherBalanceBefore).to.equal(0)

    expect(ownerBalanceAfter).to.equal(100n * 10n ** 18n - 1n)
    expect(otherBalanceAfter).to.equal(1)
  })

  it("Should NOT transfer", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture)

    const instance = protoCoin.connect(otherAccount)
    await expect(instance.transfer(owner, 1)).to.be.revertedWith(
      "Insufficient balance."
    )
  })
})
