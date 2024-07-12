import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, ModalContent } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

const Login = ({
  openLogin,
  setOpenLogin,
  handleRegisterOpen,
  user,
  setUser,
  submitting,
  handleLoginUser,
}) => {
  useEffect(() => {
    if (openLogin) {
      setOpenLogin(true);
    }
  }, [openLogin, setOpenLogin]);
  // Ensure modal opens when openModal prop is true

  const handleModelClose = () => {
    setOpenLogin(false); // Close the modal by updating the state
  };

  return (
    <Modal backdrop="blur" isOpen={openLogin} onClose={handleModelClose}>
      <ModalContent>
        <div className="relative z-10 my-4 h-fit w-full max-w-md overflow-hidden sm:rounded-2xl">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 pt-8 text-center sm:px-16">
            <Link href="/">
              <Image
                src="/to.png"
                alt="Logo"
                width={65}
                height={65}
                className="object-contain"
              />
            </Link>
            <h3 className="text-xl font-semibold text-gray-300">
              Sign in to DoneZone
            </h3>
            <p className="text-sm font-semibold text-gray-500">
              Start creating to-do list for more productivity
            </p>
          </div>
          <form onSubmit={handleLoginUser} className="p-5 px-10">
            <Input
              type="text"
              className="mb-5 "
              variant="underlined"
              label="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <Input
              type="password"
              className="mb-5 "
              variant="underlined"
              label="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex h-10 mx-auto w-full items-center justify-center space-x-2 rounded-md px-4 text-sm font-semibold transition-all bg-white-500 text-gray-600 bg-gray-300"
            >
              {submitting ? "Sign in..." : "Sign in"}
            </button>
          </form>
          {/* <div className="flex flex-col space-y-3 px-4 pb-8 pt-5 sm:px-16">
            {providers &&
            Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => handleLogin(provider)}
              className="group flex h-10 w-full items-center justify-center space-x-2 rounded-md px-4 text-sm transition-all bg-white-500 text-gray-600 bg-gray-300"
            >
              <FcGoogle className="mr-1.5 size-5" /> Continue with Google
            </button>
            ))}
          </div> */}
          <p className="text-center text-sm font-semibold text-gray-500">
            Don't have an account?
            <span
              className="font-semibold text-gray-500 transition-colors hover:text-gray-400 cursor-pointer"
              onClick={handleRegisterOpen}
            >
              {" "}
              Sign up
            </span>
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default Login;
