const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/userDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
  confPassword: { type: String, required: true },
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = { UserModel };
