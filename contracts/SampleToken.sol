//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SampleToken {
  string public name;
  uint8 public decimals;
  string public symbol;
  uint public totalSupply;

  address public owner;

  mapping(address => uint) public balances;
  mapping(address => mapping(address => uint)) public allowances;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  constructor(string memory _name, uint256 _totalSupply, string memory _symbol, uint8 _decimals) {
    name = _name;
    decimals = _decimals;
    symbol = _symbol;
    totalSupply = _totalSupply;
    owner = msg.sender;

    balances[owner] = totalSupply;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can do that");
    _;
  }

  function _mint(address _account, uint256 _amount) internal onlyOwner {
    totalSupply += _amount;
    balances[_account] += _amount;

    emit Transfer(address(0), _account, _amount);
  }

  function _burn(address _account, uint256 _amount) internal onlyOwner {
    uint256 accountBalance = balances[_account];

    require(accountBalance >= _amount, "Burn amount exceeds balance");

    unchecked {
      balances[_account] = accountBalance - _amount;
    }
    
    totalSupply -= _amount;

    emit Transfer(_account, address(0), _amount);
  } 


  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }  
  
  function transfer(address _to, uint256 _value) public returns (bool) {
    address _from = msg.sender;

    require(balances[_from] >= _value, "Not enough tokens");
    require(_to != address(0), "Invalid address");

    unchecked {
      balances[_from] -= _value;
    }

    balances[_to] += _value;

    emit Transfer(_from, _to, _value);
    return true;
  }


  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(address(0) != _from, "Invalid address");
    require(address(0) != _to, "Invalid address");

    uint _fromBalance = balances[_from];
    uint _fromAllowance = allowances[_from][_to];

    require(_fromBalance >= _value, "Not enough tokens");
    require(_fromAllowance >= _value, "Not enough allowance");

    unchecked {
      balances[_from] = _fromBalance - _value;
      allowances[_from][_to] = _fromAllowance - _value;
    }

    balances[_to] += _value;

    emit Transfer(_from, _to, _value);

    return true;
  }

  function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
    return allowances[_owner][_spender];
  }

  function approve(address _spender, uint256 _value) public returns (bool success) {
    require(_spender != address(0), "Invalid address");
    require(balances[msg.sender] >= _value, "Not enough balance");

    allowances[msg.sender][_spender] = _value;

    emit Approval(msg.sender, _spender, _value);

    return true;
  }
}
