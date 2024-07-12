const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  const { username, password } = await req.json();
  await connectToDB();
  const secret = process.env.SECRET_KEY;

  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return new Response(JSON.stringify({ message1: "Username not found!" }), {
        status: 400,
      });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
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
    } else {
      return new Response(JSON.stringify({ message2: "Password not match!" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify(userDoc), { status: 201 });
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }
};
