const depositorAddr = "0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503";

async function getTether(tether, accts) {
    const signer = await ethers.provider.getSigner(accts[0]);
    await signer.sendTransaction({ to: depositorAddr, value: ethers.utils.parseEther("5") });
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [depositorAddr]
    });
    depositorSigner = await ethers.provider.getSigner(depositorAddr);

    for (let i = 0; i < accts.length; i++) {
        await tether.connect(depositorSigner).transfer(accts[i], ethers.utils.parseEther("100"));
    }
}

module.exports = getTether;