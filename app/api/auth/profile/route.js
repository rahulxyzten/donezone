const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { promisify } = require("util");

const verifyToken = promisify(jwt.verify);

export const GET = async (req) => {
  const secret = process.env.SECRET_KEY;

  try {
    const cookies = cookie.parse(req.headers.get("cookie") || "");

    if (!cookies.token) {
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
      });
    }

    const info = await verifyToken(cookies.token, secret);

    return new Response(JSON.stringify(info), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the cookies", { status: 500 });
  }
};
