"use client";

import { useRef, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { VscPassFilled } from "react-icons/vsc";
import { MdCancel } from "react-icons/md";
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
  const [allItems, setAllItems] = useState([]);
  const [showAddInput, setShowAddInput] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editItemId, setEditItemId] = useState("");
  const [item, setItem] = useState("");

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

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/users/${id}/items`);
      const data = await response.json();

      setAllItems(data.reverse());
    };

    if (id) fetchItems();
  }, [id]);

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setUserInfo(null);
        setAllItems([]);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    // Check if the length of allItems is 10 or more
    if (allItems.length >= 10) {
      alert("Maximum 10 items allowed");
      return;
    }

    try {
      const response = await fetch("/api/item/new", {
        method: "POST",
        body: JSON.stringify({
          userId: id,
          item: item,
        }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setAllItems((prevItems) => [newItem, ...prevItems]);
        setShowAddInput(false);
        setItem("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (item) => {
    try {
      await fetch(`/api/item/${item._id.toString()}`, {
        method: "DELETE",
      });

      const filteredItems = allItems.filter((p) => p._id !== item._id);

      setAllItems(filteredItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (item) => {
    setShowAddInput(true);
    setShowEditForm(true);
    setItem(item.item);
    setEditItemId(item._id);
  };

  const handleEditToDatabase = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/item/${editItemId.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          item: item,
        }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setAllItems((prevItems) =>
          prevItems.map((itm) =>
            itm._id === updatedItem._id ? updatedItem : itm
          )
        );
        setShowAddInput(false);
        setShowEditForm(false);
        setItem("");
        setEditItemId("");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    setShowAddInput(false);
    setShowEditForm(false);
    setEditItemId("");
    setItem("");
  };

  return (
    <>
      <div
        ref={ref}
        className="fixed top-0 left-0 z-[3] w-full h-full flex gap-10 flex-wrap p-5"
      >
        {allItems.map((item, index) => (
          <Card
            key={item._id}
            data={item}
            reference={ref}
            handleDelete={() => handleDelete(item)}
            handleEdit={() => handleEdit(item)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 right-0 z-[3]">
        {username ? (
          <div className="flex justify-between items-center">
            {showAddInput ? (
              showEditForm ? (
                <form
                  onSubmit={handleEditToDatabase}
                  className="flex justify-between items-center mr-6"
                >
                  <Input
                    type="text"
                    className=" mr-3"
                    variant="underlined"
                    // label=""
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEditToDatabase(e);
                      }
                    }}
                  />
                  <button
                    onClick={handleClose}
                    className="translation mr-1 duration-500 text-white font-bold rounded active:scale-95 hover:text-gray-400"
                  >
                    <MdCancel size="1.6em" />
                  </button>
                  <button
                    type="submit"
                    className="translation duration-500 text-white font-bold rounded active:scale-95 hover:text-gray-400"
                  >
                    <VscPassFilled size="1.5em" />
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleAddItem}
                  className="flex justify-between items-center mr-6"
                >
                  <Input
                    type="text"
                    className=" mr-3"
                    variant="underlined"
                    // label=""
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddItem(e);
                      }
                    }}
                  />
                  <button
                    onClick={handleClose}
                    className="translation mr-1 duration-500 text-white font-bold rounded active:scale-95 hover:text-gray-400"
                  >
                    <MdCancel size="1.6em" />
                  </button>
                  <button
                    type="submit"
                    className="translation duration-500 text-white font-bold rounded active:scale-95 hover:text-gray-400"
                  >
                    <VscPassFilled size="1.5em" />
                  </button>
                </form>
              )
            ) : (
              <button
                onClick={() => setShowAddInput(true)}
                className="translation duration-500 text-white font-bold py-2 px-2 rounded my-8 active:scale-95 hover:text-gray-400"
              >
                Add item
              </button>
            )}

            <button
              onClick={handleLogOut}
              className="translation text-yellow-500 duration-500 font-bold py-2 px-2 mr-4 rounded my-8 active:scale-95 hover:text-gray-400"
            >
              Logout
            </button>
          </div>
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
          setOpenRegister={setOpenRegister}
          user={user}
          setUser={setUser}
          submitting={submitting}
          setSubmitting={setSubmitting}
          setUserInfo={setUserInfo}
        />
      )}
      {openRegister && (
        <Register
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
          setOpenLogin={setOpenLogin}
          user={user}
          setUser={setUser}
          submitting={submitting}
          setSubmitting={setSubmitting}
          setUserInfo={setUserInfo}
        />
      )}
    </>
  );
};

export default Foreground;
