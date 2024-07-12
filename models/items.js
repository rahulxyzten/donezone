import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: String,
    required: [true, "Item is required."],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Item = models.Item || model("Item", ItemSchema);

export default Item;
