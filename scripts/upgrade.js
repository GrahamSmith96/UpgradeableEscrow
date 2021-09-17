const proxyAddress = '0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f';

async function main() {
    



    const poolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
    const aTetherAddress = "0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811";
    const tetherAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const arbiter =  "0x4D326be40DD82Bf91b523F7A0aef25C0606AfFED";
    const beneficiary = "0x86b4ce2779A59F7D352bcbFE904A4388C3f2D461";
    const depositorAddr = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503"
    const value = ethers.utils.parseEther("1");
    const tetherContract = await ethers.getContractAt("IERC20", tetherAddress);
    const signer = ethers.provider.getSigner(0);
    const address1 = await signer.getAddress();

    tether = await ethers.getContractAt("IERC20", "0xdAC17F958D2ee523a2206206994597C13D831ec7", signer);
    aTether = await ethers.getContractAt("IERC20", "0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811");


    await tether.approve('0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f', value);
   
    console.log(instance.address); 
    
    const EscrowV2 = await ethers.getContractFactory("EscrowV2");
    const upgraded = await upgrades.upgradeProxy(proxyAddress, EscrowV2);
    console.log(upgraded.address); 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });