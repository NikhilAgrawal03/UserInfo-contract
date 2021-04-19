import React from "react";

const MainTest = ({ users, createUser, token, receipt }) => {
  //const ToWEI  = window.web3.utils.toWei(productPrice.toString(), "Ether")
  //   let productName = "";
  //   let productPrice = 0;
  console.log(users);
  console.log(receipt);
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [gender, setgender] = React.useState("");
  return (
    <div id="content">
      <h1>Add User</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const fName = firstName;
          const lName = lastName;
          const usergender = gender;
          console.log(fName);
          console.log(lName);
          console.log(usergender);
          createUser(fName, lName, usergender);
        }}
      >
        <div className="form-group mr-sm-2">
          <input
            id="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            className="form-control"
            placeholder="first Name"
            required
          />
          <input
            id="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            className="form-control"
            placeholder="last Name"
            required
          />
          <input
            id="gender"
            type="text"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
            className="form-control"
            placeholder="gender"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
      <p>&nbsp;</p>
      <h2>Buy Product</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">last Name</th>
            <th scope="col">gender</th>
            <th scope="col">to Address</th>
            <th scope="col">receipt</th>
          </tr>
        </thead>
        <tbody id="productList">
          {users ? (
            users.map((p, key) => (
              <tr key={key}>
                <th scope="row">{p.id.toString()}</th>
                <td>{p.fName}</td>
                <td>{p.lName}</td>
                <td>{p.gender}</td>
                <td>{token}</td>
                <td>{receipt}</td>
              </tr>
            ))
          ) : (
            <h1>No Records</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainTest;
