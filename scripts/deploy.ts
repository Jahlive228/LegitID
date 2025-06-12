import { ethers, run } from "hardhat";
import "@nomicfoundation/hardhat-ethers";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Déploiement avec l'adresse:", deployer.address);

  // L'URI de base peut pointer vers votre API ou gateway IPFS
  const baseURI = "https://harlequin-electrical-bug-831.mypinata.cloud/ipfs/"; 

  console.log("Déploiement du contrat BlockchainIdSystem...");
  const BlockchainIdSystem = await ethers.getContractFactory("BlockchainIdSystem");
  const blockchainIdSystem = await BlockchainIdSystem.deploy(deployer.address, baseURI);

  console.log("En attente de la confirmation du déploiement...");
  await blockchainIdSystem.deployed();
  
  console.log("BlockchainIdSystem déployé à l'adresse:", blockchainIdSystem.address);

  // Configuration initiale des rôles
  console.log("Configuration des rôles initiaux...");
  
  // Accorder le rôle d'émetteur au déployeur
  const grantRoleTx = await blockchainIdSystem.grantIssuerRole(deployer.address);
  await grantRoleTx.wait();
  console.log("Rôle d'émetteur accordé au déployeur");

  // Attendre quelques blocs pour la vérification
  console.log("Attente de quelques blocs avant la vérification...");
  await new Promise(resolve => setTimeout(resolve, 30000)); // 30 secondes

  // Vérifier le contrat sur Etherscan
  try {
    await run("verify:verify", {
      address: blockchainIdSystem.address,
      constructorArguments: [deployer.address, baseURI],
    });
    console.log("Contrat vérifié avec succès sur Etherscan");
  } catch (error) {
    console.error("Erreur lors de la vérification du contrat:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erreur lors du déploiement:", error);
    process.exit(1);
  }); 