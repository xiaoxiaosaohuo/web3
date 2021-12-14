pragma solidity 0.8.10;
// inheritance
contract ERC20Token {
    string public name;
    mapping(address => uint256) public balances;

    constructor(string memory _name) public{
        name = _name;
    }
    
    function mint() public {
       balances[tx.origin] += 1;
    }
}