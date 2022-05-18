const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  twitchId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  roles: [
    {
      type: String,
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
