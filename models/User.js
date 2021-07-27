const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter a userName"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// fire a function (not arrow), to be able to use (this), before doc saved to db:
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// firing a function after doc saved to db:
userSchema.post("save", (doc, next) => {
  console.log("user created and saved", doc);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
