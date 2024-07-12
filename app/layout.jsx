import "./globals.css";
import { UserContextProvider } from "@/components/Provider";

export const metadata = {
  title: "DoneZone",
  description: "To-Do list web application",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="dark relative w-full min-h-screen bg-zinc-800">
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
