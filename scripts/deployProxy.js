const { ethers, upgrades } = require("hardhat");
const IERC20 = hre.artifacts.readArtifact("IERC20");
const Escrow = hre.artifacts.readArtifact("Escrow");
const getDai = require('./getDai')

  async function deploy() {

    const poolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
    const aDaiAddress = "0x028171bCA77440897B824Ca71D1c56caC55b68A3";
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const arbiter =  "0x4D326be40DD82Bf91b523F7A0aef25C0606AfFED";
    const beneficiary = "0x86b4ce2779A59F7D352bcbFE904A4388C3f2D461";
    const depositorAddr = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503"
    const value = ethers.utils.parseEther("1");
    const daiContract = await ethers.getContractAt("IERC20", daiAddress);
    const signer = ethers.provider.getSigner(0);
    const address1 = await signer.getAddress();

    dai = await ethers.getContractAt("IERC20", "0x6b175474e89094c44da98b954eedeac495271d0f", signer);
    aDai = await ethers.getContractAt("IERC20", "0x028171bCA77440897B824Ca71D1c56caC55b68A3");


    await dai.approve('0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f', value);


    await getDai(daiContract, [address1, arbiter]);
    const Escrow = await ethers.getContractFactory("Escrow");
    const instance = await upgrades.deployProxy(Escrow, [poolAddress, aDaiAddress, daiAddress, arbiter, beneficiary, value]);
    await instance.deployed();
    console.log(instance.address); 
  
    
 
    
  }
  
  async function transferDai() {
  
    const arbiter =  "0x4D326be40DD82Bf91b523F7A0aef25C0606AfFED";
    const beneficiary = "0x86b4ce2779A59F7D352bcbFE904A4388C3f2D461";
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const daiContract = await ethers.getContractAt("IERC20", daiAddress);
    const signer = ethers.provider.getSigner(0);
    const address1 = await signer.getAddress();
    await getDai(daiContract, [address1, arbiter])
    console.log(await dai.balanceOf(addr1) );

  }
  deploy();
 
  


