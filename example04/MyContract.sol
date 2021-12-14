pragma solidity 0.8.10;
import './ERC20Token.sol';
// Override parent variable
contract MyContract is ERC20Token{
    string public symbol;
    address[] public owners;
    uint256 public ownerCount;
    constructor(string memory _name,string memory _symbol) ERC20Token(_name) public {
        symbol = _symbol;
    }

    function mint() public override{
        super.mint();
        ownerCount ++;
        owners.push(msg.sender);
    }
}