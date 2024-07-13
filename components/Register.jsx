import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

const Register = ({
  openRegister,
  setOpenRegister,
  handleLoingOpen,
  user,
  setUser,
  submitting,
  handleRegisterUser,
}) => {
  useEffect(() => {
    if (openRegister) {
      setOpenRegister(true);
    }
  }, [openRegister, setOpenRegister]);
  // Ensure modal opens when openModal prop is true

  const handleModelClose = () => {
    setOpenRegister(false); // Close the modal by updating the state
  };

  return (
    <Modal backdrop="blur" isOpen={openRegister} onClose={handleModelClose}>
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
              Create your DoneZone account
            </h3>
            {/* <p className="text-sm font-bold text-gray-500">
              Get Started for free. No credit card required.
            </p> */}
          </div>
          <form onSubmit={handleRegisterUser} className="p-5 px-10">
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
            <Input
              type="password"
              className="mb-5 "
              variant="underlined"
              label="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex h-10 mx-auto w-full items-center justify-center space-x-2 rounded-md px-4 text-sm font-semibold transition-all bg-white-500 text-gray-600 bg-gray-300"
            >
              {submitting ? "Register.... " : "Register"}
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
            Already have an account?
            <span
              className="font-semibold cursor-pointer text-gray-500 transition-colors hover:text-gray-400"
              onClick={handleLoingOpen}
            >
              {" "}
              Sign in
            </span>
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default Register;
