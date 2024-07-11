import "./globals.css";

export const metadata = {
  title: "DoneZone",
  description: "To-Do list web application",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="relative w-full h-screen bg-zinc-800">{children}</body>
    </html>
  );
};

export default RootLayout;
