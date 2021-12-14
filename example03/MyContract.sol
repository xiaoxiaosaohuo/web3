pragma solidity 0.8.10;
import './ERC20Token.sol';
contract MyContract{
    address public token;
    address payable wallet;
    constructor(address payable _wallet, address _token) public{
        wallet = _wallet;
        token = _token;
    }
    function buyToken() public payable {
        ERC20Token _token = ERC20Token(address(token));
        _token.mint();
        wallet.transfer(msg.value);
    }
}