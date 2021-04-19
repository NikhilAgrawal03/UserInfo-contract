// pragma solidity >=0.4.21 <0.6.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";

// contract SmartContract is ERC721Full {
//     uint256 public userCount = 0;

//     constructor() public ERC721Full("User", "USER") {}

//     struct User {
//         uint256 id;
//         string fName;
//         string lName;
//         string gender;
//     }

//     User[] users;

//     event userCreated(uint256 id, string fName, string lName, string gender);

//     function createUser(
//         uint256 _id,
//         string memory _fName,
//         string memory _lName,
//         string memory _gender
//     ) public {
//         require(
//             bytes(_fName).length > 1,
//             "error: product name length too short"
//         );
//         require(
//             bytes(_fName).length > 1,
//             "error: product name length too short"
//         );
//         userCount = userCount + 1;
//         _id = userCount;
//         User memory user = User(_id, _fName, _lName, _gender);
//         users.push(user);
//         _mint(msg.sender, _id);
//         emit userCreated(userCount, _fName, _lName, _gender);
//     }

//     function getUser(uint256 _id)
//         public
//         view
//         returns (
//             string memory,
//             string memory,
//             string memory
//         )
//     {
//         uint256 i;
//         _id = userCount;
//         for (i = 0; i < users.length; i++) {
//             User memory user = users[i];
//             if (user.id == _id) {
//                 return (user.fName, user.lName, user.gender);
//             }
//         }
//     }
// }
