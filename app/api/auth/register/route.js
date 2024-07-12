const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  const { username, password } = await req.json();
  await connectToDB();
  const secret = process.env.SECRET_KEY;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return new Response(
      JSON.stringify({ message: "Username is already taken" }),
      { status: 400 }
    );
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });

    if (userDoc) {
      const token = jwt.sign({ username, id: userDoc._id }, secret, {});

      // Setting the cookie using Response
      const response = new Response(
        JSON.stringify({
          id: userDoc._id,
          username,
        }),
        { status: 201 }
      );

      response.headers.set(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 3600, // 1 hour
          path: "/",
        })
      );

      return response;
    }
  } catch (error) {
    return new Response("Failed to create a new user.", { status: 500 });
  }
};
