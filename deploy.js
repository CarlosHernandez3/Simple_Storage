const { ethers, run, network } = require("hardhat");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:7545"
  );
  const wallet = new ethers.wallet(
    "34d8f2899bed877855f83bcf2fe9855e633912155683d06ee97ef5975780c174",
    provider
  );
  const abi = fs.readFileSync(); // need to compile the simple storage contract in order to get abi
  const binary = fs.readFileSync(); // need to compile the simple storage contract in order to get binary

  const contractFactory = new ethers.contractFactory(abi, binary, wallet); // object you can use to deploy contracts
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  //progromatically verify contracts on block explorer once deployed to a chain
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction(6);
    await verify(simpleStorage.address, []);
  }

  async function verify(contractAddress, args) {
    console.log("verifying contract...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        args: contractArgs,
      });
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!");
      } else {
        console.log(e);
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
