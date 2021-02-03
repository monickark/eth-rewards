var SlenToken = artifacts.require("./SlenToken.sol");

module.exports = function(deployer) {    
   return deployer.deploy(SlenToken);
}