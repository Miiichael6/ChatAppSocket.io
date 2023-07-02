import { model, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    para: {
      type: String,
      ref: "User",
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.method("toJSON", function () {
  const { __v, password, ...object } = this.toObject();

  return object;
});

const Message = model("Message", MessageSchema);

export default Message;
