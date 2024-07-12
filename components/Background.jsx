"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Provider";

const Background = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

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

  const username = userInfo?.username;
  const id = userInfo?.id;

  return (
    <>
      <div className="fixed z-[2] w-full h-screen">
        <div className="absolute top-[5%] w-full py-10 flex justify-center text-zinc-600 text-xl font-semibold">
          {username ? username : "Login to donezone"}
        </div>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] leading-none tracking-tighter font-semibold text-zinc-900">
          DoneZone
        </h1>
      </div>
    </>
  );
};

export default Background;
