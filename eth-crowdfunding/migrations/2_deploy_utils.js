let Utils = artifacts.require("./Utils.sol");
let CrowdfundingWithDeadline = artifacts.require("./CrowdFundingWithDeadline.sol");
let TestCrowdfundingWithDeadline = artifacts.require("./TestCrowdFundingWithDeadline.sol");

module.exports = async function(deployer){
    await deployer.deploy(Utils);
    deployer.link(Utils, CrowdfundingWithDeadline);
    deployer.link(Utils, TestCrowdfundingWithDeadline);
}