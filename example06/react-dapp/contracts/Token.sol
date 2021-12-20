//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

// custome token
// contract Token {
//     string public name = "Siven Token";
//     string public symbol = "Siven";
//     uint public totalSupply = 1000000;
//     mapping(address => uint) balances;

//     constructor(){
//         balances[msg.sender] = totalSupply;
//     }

//     function transfer(address to, uint amount) external {
//         require(balances[msg.sender] >=amount,"Not enough tokens");
//         balances[msg.sender] -= amount;
//         balances[to] += amount;
//     }

//     function balanceOf(address account) external view returns(uint) {
//         return balances[account];
//     }
// }

// inherited from OpenZeppelin

contract Token is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * (10 ** 18));
    }
}
