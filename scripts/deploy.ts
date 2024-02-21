import { ethers } from "hardhat"

async function main() {
  const protocoin = await ethers.deployContract("ProtoCoin")

  await protocoin.waitForDeployment()

  const address = await protocoin.getAddress()

  console.log(`Contract deployed at ${address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
