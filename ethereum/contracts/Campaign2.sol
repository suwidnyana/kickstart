// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }
    mapping(uint256 => Request) public requests;
    // ==> array is used in 0.4.17
    // Request[] public requests;

    // =======> for version 0.8 code
    uint256 public numRequests; //to track the index sort of

    address public manager;
    mapping(address => bool) public approvers;
    uint256 public minimumContribution;
    uint256 public numApprovers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers[msg.sender] = true;
        numApprovers++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public restricted {
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage r = requests[index];
        require(approvers[msg.sender]);
        require(!r.approvals[msg.sender]);

        r.approvals[msg.sender] = true;
        r.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage r = requests[index];
        require(!r.complete);
        require(r.approvalCount > (numApprovers / 2));

        r.recipient.transfer(r.value);
        r.complete = true;
    }
}
