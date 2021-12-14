pragma solidity 0.8.10;
contract ERC20Token {
    string name;
    mapping(address => uint256) public balances;

    function mint() public {
       balances[tx.origin] += 1;
    }
}