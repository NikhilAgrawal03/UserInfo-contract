const { assert } = require("chai");

const SmartContract = artifacts.require("./SmartContract.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("SmartContract", (accounts) => {
  let contract;

  before(async () => {
    contract = await SmartContract.deployed();
  });

  describe("deployment", async () => {
    it("contract deployed", async () => {
      const address = await contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has name", async () => {
      const name = await contract.name();
      assert.equal(name, "User");
    });

    it("has symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "USER");
    });
  });

  describe("creation of user", async () => {
    let result, userCount;
    before(async () => {
      result = await contract.createUser("nikhil", "agrawal", "male");
      console.log(result);
      userCount = await contract.userCount();
      console.log(userCount);
    });

    it("user created", async () => {
      assert.equal(userCount, 1, "id is correct");
      const event = result.logs[0].args;
      console.log(event);
      assert.equal(event.id.toNumber(), userCount.toNumber(), "id is correct");
      assert.equal(event.fName, "nikhil", "first name is correct");
      assert.equal(event.lName, "agrawal", "last name is correct");
      assert.equal(event.gender, "male", "gender is correct");

      //failure
      await contract.createUser("", "agrawal", "male").should.be.rejected;
      await contract.createUser("nikhil", "", "male").should.be.rejected;
      await contract.createUser("nikhil", "agrawal", "").should.be.rejected;
    });
    it("lists users", async () => {
      //success
      const user = await contract.users(userCount);
      assert.equal(user.id.toNumber(), userCount.toNumber(), "id is correct");
      assert.equal(user.fName, "nikhil", "first name is correct");
      assert.equal(user.lName, "agrawal", "last name is correct");
      assert.equal(user.gender, "male", "gender is correct");
    });
  });
});
