import React, { useEffect } from "react";
import Web3 from "web3";
import logo from "../logo.png";
import SmartContract from "../abis/SmartContract.json";
import "./App.css";
import Navbar from "./Navbar";
import MainTest from "./maintest";

const TestComponent = () => {
  const [account, setAccount] = React.useState("");
  const [userCount, setUserCount] = React.useState(0);
  const [token, setToken] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [transactionReceipt, setReceipt] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [contract, setContract] = React.useState([]);

  useEffect(() => {
    loadWeb3();
    console.log(window.web3);
    loadBlockChainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockChainData = async () => {
    const web3 = window.web3;
    //load accounts
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);

    console.log(SmartContract.abi, SmartContract.networks[5777].address);
    const networkId = await web3.eth.net.getId();
    const networkData = SmartContract.networks[networkId];
    console.log(networkData);
    if (networkData) {
      const abi = SmartContract.abi;
      const address = networkData.address;
      const contractcopy = web3.eth.Contract(abi, address);
      console.log(contractcopy);
      setContract(contractcopy);
      setToken(address);
      const userCount = await contractcopy.methods.userCount().call();
      setUserCount(userCount);
      console.log(userCount);
      // load products from mapping in smartcontract.sol
      for (let i = 0; i <= userCount; i++) {
        const user = await contractcopy.methods.users(i).call();
        console.log(user);
        setUsers((users) => [...users, user]);
        console.log(users);
      }
      setLoading(false);
      console.log(users);
      console.log(transactionReceipt);
    } else {
      window.alert("Market contract is not deployed to the detected network");
    }
  };

  const createUser = (fName, lName, gender) => {
    setLoading(true);
    setContract(
      contract.methods
        .createUser(fName, lName, gender)
        .send({ from: account })
        .once("receipt", (receipt) => {
          setLoading(false);
          console.log(receipt);
          console.log(receipt.to);
          setReceipt(receipt);
          console.log(transactionReceipt);
        })
    );
  };

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex">
            {loading ? (
              <div className="text-center">
                <p>Loading ...</p>
              </div>
            ) : (
              <MainTest
                users={users}
                createUser={createUser}
                token={token}
                receipt={transactionReceipt}
              />
            )}
          </main>
        </div>
        <h3>{transactionReceipt}</h3>
      </div>
    </div>
  );
};

export default TestComponent;
