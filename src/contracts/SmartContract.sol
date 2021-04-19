pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";

contract SmartContract is ERC721Full {
    uint256 public userCount = 0;
    mapping(uint256 => User) public users;

    constructor() public ERC721Full("User", "USER") {}

    struct User {
        uint256 id;
        string fName;
        string lName;
        string gender;
    }

    event userCreated(uint256 id, string fName, string lName, string gender);

    function createUser(
        string memory _fName,
        string memory _lName,
        string memory _gender
    ) public {
        require(
            bytes(_fName).length > 1,
            "error: product name length too short"
        );
        require(
            bytes(_lName).length > 1,
            "error: product name length too short"
        );
        require(
            bytes(_gender).length > 1,
            "error: product name length too short"
        );
        userCount = userCount + 1;
        // _mint(msg.sender, userCount);
        users[userCount] = User(userCount, _fName, _lName, _gender);
        emit userCreated(userCount, _fName, _lName, _gender);
    }
}
