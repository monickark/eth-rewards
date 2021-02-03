pragma solidity ^0.6.2;

contract SlenToken {

	string public name = 'Slencoin';
	string public symbol = 'SLN';
    string public standard = 'Slencoin V1.0';
    
    address public owner; 
    uint256 public totalSupply = 1e16;

	event Transfer (address indexed _from, address indexed _to,	uint256 _value);
	mapping(address => uint256) public balanceOf;

	constructor() public {
		owner = msg.sender;
	}
	
	 // Creates an amount of new tokens and sends them to an address.
    function mint(address receiver, uint256 amount) public{
    //     // Only the contract owner can call this function
       require(msg.sender == owner, "You are not the owner.");

    //     // Ensures a maximum amount of tokens
        require(amount < totalSupply, "Maximum issuance succeeded");

        // Increases the balance of `receiver` by `amount`
        balanceOf[receiver] += amount;
    }
    
	
	 // Sends an amount of existing tokens from any caller to an address.
    function transfer(address receiver, uint256 amount) public {
        // The sender must have enough tokens to send
       require(amount <= balanceOf[msg.sender], "Insufficient balance.");

        // Adjusts token balances of the two addresses
        balanceOf[msg.sender] -= amount;
        balanceOf[receiver] += amount;

        // Emits the event defined earlier
        emit Transfer(msg.sender, receiver, amount);
    }

}