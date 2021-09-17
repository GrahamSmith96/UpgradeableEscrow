pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/ILendingPool.sol";


contract EscrowV2 is Initializable {
    address arbiter;
    address depositor;
    address beneficiary;
    uint initialDeposit;
    ILendingPool pool;
    IERC20 aDai;
    IERC20 dai;

    IERC20 aTether;
    IERC20 tether;

    function initialize(ILendingPool _pool, IERC20 _aDai, IERC20 _dai, address _arbiter, address _beneficiary, uint _amount) public initializer {
		pool = _pool;
		aDai = _aDai;
		dai = _dai;
        
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
        
        initialDeposit = _amount;
        
        dai.transferFrom(msg.sender, address(this), _amount);
        
        dai.approve(address(pool), _amount);

        pool.deposit(address(dai), _amount, address(this), 0); 
   	}

	 	event Approved();
   
  	function approveDai() external {
        require(msg.sender == arbiter, "Approve must be called by the arbiter!");

        uint balance = aDai.balanceOf(address(this));

        aDai.approve(address(pool), balance);

        pool.withdraw(address(dai), initialDeposit, beneficiary);

        pool.withdraw(address(dai), type(uint).max, depositor);

		emit Approved();
    }

    function depositTether(ILendingPool _pool, IERC20 _aTether, IERC20 _tether, address _arbiter, address _beneficiary, uint _amount) external {
        pool = _pool;
		aTether = _aTether;
		tether = _tether;
        
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
        
        initialDeposit = _amount;
        
        tether.transferFrom(msg.sender, address(this), _amount);
        
        tether.approve(address(pool), _amount);

        pool.deposit(address(tether), _amount, address(this), 0); 
    }

    function approveTether() external {
        require(msg.sender == arbiter, "Approve must be called by the arbiter!");

        uint balance = aTether.balanceOf(address(this));

        aTether.approve(address(pool), balance);

        pool.withdraw(address(tether), initialDeposit, beneficiary);

        pool.withdraw(address(tether), type(uint).max, depositor);

		emit Approved();
    }

    
}