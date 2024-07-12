"use client";

import { useRef, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./Provider";
import Card from "./Card";
import Login from "./Login";
import Register from "./Register";

const Foreground = () => {
  const ref = useRef(null);
  const router = useRouter();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetch("/api/auth/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data", error);
      });
  }, [setUserInfo]);

  const data = [
    {
      desc: "Eat",
      filesize: ".9mb",
      close: true,
      tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green" },
    },
    {
      desc: "Rahul industry.",
      filesize: ".9mb",
      close: false,
      tag: { isOpen: true, tagTitle: "Download Now", tagColor: "blue" },
    },
    {
      desc: "Sleep",
      filesize: ".9mb",
      close: true,
      tag: { isOpen: false, tagTitle: "Upload", tagColor: "green" },
    },
    {
      desc: "Code",
      filesize: ".9mb",
      close: true,
      tag: { isOpen: false, tagTitle: "Upload", tagColor: "green" },
    },
    {
      desc: "Projects",
      filesize: ".9mb",
      close: true,
      tag: { isOpen: false, tagTitle: "Upload", tagColor: "green" },
    },
  ];

  const handleLoingOpen = async () => {
    setOpenRegister(false);
    setOpenLogin(true);
    setUser({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegisterOpen = async () => {
    setOpenLogin(false);
    setOpenRegister(true);
    setUser({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (user.username.length > 12) {
      alert("Username must be less than 12 characters !");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Password is not match with confirm password !");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        setOpenRegister(false);
        router.push("/");
      } else {
        const data = await response.json();
        if (data.message === "Username is already taken") {
          alert("Username is already taken");
        } else {
          alert("registration failed");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setUser({
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        setOpenLogin(false);
        router.push("/");
      } else {
        const data = await response.json();
        if (data.message1 === "Username not found!") {
          alert("Username not found!");
        } else if (data.message2 === "Password not match!") {
          alert("Password not match!");
        } else {
          alert("Wrong credentials");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setUser({
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const username = userInfo?.username;
  const id = userInfo?.id;

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setUserInfo(null);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="fixed top-0 left-0 z-[3] w-full h-full flex gap-10 flex-wrap p-5"
      >
        {data.map((item, index) => (
          <Card key={index} data={item} reference={ref} />
        ))}
      </div>
      <div className="fixed bottom-0 right-0 z-[3]">
        {username ? (
          <button
            onClick={handleLogOut}
            className="translation duration-500 text-white font-bold py-2 px-6 rounded my-8 active:scale-95 hover:text-gray-400"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setOpenLogin(true)}
            className="translation duration-500 text-white font-bold py-2 px-6 rounded my-8 active:scale-95 hover:text-gray-400"
          >
            Login/Signup
          </button>
        )}
      </div>
      {openLogin && (
        <Login
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          handleRegisterOpen={handleRegisterOpen}
          user={user}
          setUser={setUser}
          submitting={submitting}
          handleLoginUser={handleLoginUser}
        />
      )}
      {openRegister && (
        <Register
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
          handleLoingOpen={handleLoingOpen}
          user={user}
          setUser={setUser}
          submitting={submitting}
          handleRegisterUser={handleRegisterUser}
        />
      )}
    </>
  );
};

export default Foreground;
