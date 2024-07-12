const cookie = require("cookie");

export const GET = async (req) => {
  try {
    // Clear the token by setting an expired cookie
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
      })
    );

    return new Response("Logged out successfully", {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Logout error", error);
    return new Response("Failed to logout", { status: 500 });
  }
};
