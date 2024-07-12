import { connectToDB } from "@/utils/database";
import Item from "@/models/items";

export const POST = async (req) => {
  const { userId, item } = await req.json();

  try {
    await connectToDB();
    const newItem = new Item({
      creator: userId,
      item,
    });

    await newItem.save();

    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new item", { status: 500 });
  }
};
