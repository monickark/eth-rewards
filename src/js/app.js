
var Web3 = require('web3');

let web31;
let curacc;

  
App = {
    web3Provider: null,
    contracts: {},
    currentAccount:{},
    users: [],
    owner : null,
    tokenPrice: 0,  
    tokenSold: 0,    
    tokensAvailable: 50000,
    

    /* *****************************  WEB 3 & CONTRACT   *********************************** */

    initWeb3 : async function (){
        if(window.ethereum){
            console.log("inside etheerium");
            web31 = new Web3(window.ethereum)
            window.ethereum.enable()
        } else if(window.web3) {
            console.log("inside web3");
            web31 = new Wb3(window.web3.currentProvider);
        } else {
            console.log("inside console.log");
        }
        web3.eth.getAccounts(function (error,accounts){
            console.log("acc: "+ accounts);   
            App.currentAccount =    accounts[0]; 
            console.log("admin acc : "+  App.currentAccount);   
        })
        console.log("start");
        App.web3Provider = web31.currentProvider;
        console.log("inside ");
        web3 = new Web3(App.web3Provider);
        web3 = web31;
        return  await App.initContracts();
    },

    initContracts: function() {
        $.getJSON("SlenToken.json", function(SlenToken) {
          App.contracts.SlenToken = TruffleContract(SlenToken);
          App.contracts.SlenToken.setProvider(App.web3Provider);
          App.contracts.SlenToken.deployed().then(function(SlenToken) {
            console.log("Slen Token Sale Address:", SlenToken.address);
          });
        }).done(function() {
          $.getJSON("SlenToken.json", function(SlenToken) {
            App.contracts.SlenToken = TruffleContract(SlenToken);
            App.contracts.SlenToken.setProvider(App.web3Provider);
            App.contracts.SlenToken.deployed().then(function(SlenToken) {
              console.log("Slen Token Address:", SlenToken.address);
            });
    
            return App.render();
          });
        })
      },    

    /* *****************************  GENERAL FUNCTIONS   *********************************** */
   
  render: function() {
    var ownerAddr;
    client = App.currentAccount;
    App.contracts.SlenToken.deployed().then(function(instance) {  
      slenTokenInstance = instance; 
      return instance.owner();
    }).then(function(owner) {     
      ownerAddr = owner; 
      App.owner = owner;
      $(".owner").text("Pool Creator : " + owner); 
      return slenTokenInstance.balanceOf(client);
    }).then(function(balance) {
      console.log("balance : "+ balance);
      $(".client").text("Client Address : " + client )
      $(".client-bal").text("Client Token balance : " + balance + " tokens")
      return slenTokenInstance.balanceOf(ownerAddr);
    }).then(function(balance) {
      console.log("balance : "+ balance);
      $(".owner-bal").text("Tokens remaining in pool : " + balance + " tokens")
     return slenTokenInstance.address;
  }).then(function(address) {
    console.log("address : "+ address);
    $(".contract").text(address)
  })           
  },

  poolCreation: function() {
    var user_address = $('#user_address').val();
    var mint_value = $('#mint_value').val();
    console.log("user_address: " + user_address);
    console.log("App owner: " + App.owner);
    console.log("mint_value: " + mint_value);
    App.contracts.SlenToken.deployed().then(function(instance) {  
      return instance.mint(App.owner, mint_value, {from:App.currentAccount});
    }).then(function(result) {
      console.log("Tokens minted...")
      $(".mint-op").text("Minted " + mint_value + " tokens to the address " +
       App.owner + "successfully...");
    });
  },

  transferTokens: function() {
    var transfer_address = $('#transfer_address').val();
    var amount = $('#amount').val();
    console.log("transfer_address: " + transfer_address);
    console.log("amount: " + amount);
    App.contracts.SlenToken.deployed().then(function(instance) {  
      return instance.transfer(transfer_address, amount, {from:App.admin});
    }).then(function(result) {
      console.log("Tokens transferred...")
      $(".transfer-op").text("Transferred " + amount + " tokens to the address " + transfer_address + " successfully.");
    });
  },

    init : async function (){
        await App.initWeb3();       
    }
},

  /* ************************ SCRIPT FUNCTIONS *************************** */

$(function() {
    $(window).load(function() {
      App.init();  
    });
  });
