import { connectToDB } from "@/utils/database";
import Item from "@/models/items";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const item = await Item.findById(params.id).populate("creator");
    if (!item) return new Response("Item not found", { status: 404 });

    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the item", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { item } = await request.json();

  try {
    await connectToDB();

    const existingItem = await Item.findById(params.id);
    if (!existingItem) return new Response("Item not found", { status: 404 });

    existingItem.item = item;
    await existingItem.save();

    return new Response(JSON.stringify(existingItem), { status: 200 });
  } catch (error) {
    return new Response("Failed to update item", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Deleting project data from database
    await Item.deleteOne({ _id: params.id });

    return new Response("Item deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting item", { status: 500 });
  }
};
