const express = require("express");
const bodyParser = require("body-parser");

const { UserModel } = require("./database");
var cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(`<h1>welcome home <h1/>`);
});

app.get("/register", async (req, res) => {
  const allUserData = await UserModel.find({});
  res.status(200).send(allUserData);
});

app.post("/register", async (req, res) => {
  const findData = await UserModel.find({
    email: req.body.email,
  }).countDocuments();
  if (findData === 0) {
    if (req.body.password === req.body.confPassword) {
      const userData = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confPassword: req.body.confPassword,
      });
      const data = await userData.save();
      res.status(200).json(data);
    } else {
      res.status(400).send({
        message: "Password not match",
      });
    }
  } else {
    res.status(400).send({ massage: "user already exit" });
  }
});

app.delete("/deleteData/userId/:userId", async (req, res) => {
  const userid = req.params.userId;
  console.log(userid);
  const deleteData = await UserModel.remove({ _id: userid }, { justOne: true });
  res.status(200).send({ deleteData });
});

app.patch("/updateData/userId/:userId", async (req, res) => {
  const userid = req.params.userId;
  if (req.body.password == req.body.confPassword) {
    const updatedData = await UserModel.findOneAndUpdate(
      { _id: userid },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confPassword: req.body.confPassword,
      },
      { new: true }
    );
    res.status(200).send(updatedData);
  } else {
    res.status(400).send({ message: "password is now match" });
  }
});

app.listen(4000, () => {
  console.log("server connected on port 4000 ");
});
