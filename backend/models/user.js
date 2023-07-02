import {model , Schema} from "mongoose"

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    required: false,
    default: false
  }

})

userSchema.method("toJSON", function() {
  const {__v, _id, password, ...object} = this.toObject();
  object.uid = _id;

  return object;
})

// userSchema.methods = function() {

// }

const User = model("User", userSchema);

export default User;