import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const ref = useRef();
  const passwordRef = useRef();

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/cross-eye.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/cross-eye.png";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log(...passwordArray, form);
      setform({ site: "", username: "", password: "" });
      toast("Password saved", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error : Password not saved");
    }
  };

  const deletePassword = (id) => {
    console.log("deleting password with id : ", id);
    let c = confirm("Do you really wanna delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((items) => items.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((items) => items.id !== id))
      );
      toast("Delete sucessfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editpassword = (id) => {
    toast("Edit sucessfully!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log("editing password with id : ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((items) => items.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer />

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="p-3 md:my-container password-manager-container">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>Pass
          <span className="text-green-500">WORLD/&gt;</span>
        </h1>
        <p className="text-lg text-green-900 text-center">
          Your Own Password Manager
        </p>
        <div className=" flex  flex-col p-4 text-black gap-8 ">
          <input
            className="rounded-full border border-green-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
          />

          <div className="flex justify-between gap-5 md:flex-row flex-col">
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative ">
              <input
                className="rounded-full border border-green-500 w-full px-4 py-1"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                ref={passwordRef}
              />
              <span
                className="absolute right-[3px] top-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="justify-center items-center flex text-white rounded-full w-fit px-4 py-2 hover:bg-green-300 hover:text-green-700 mx-auto bg-green-700 font-bold uppercase gap-2 border border-green-700"
          >
            <BiSolidMessageSquareAdd />
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl pb-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show </div>}
          {passwordArray.length != 0 && (
            <div className="overflow-auto">
            <table className="table-auto w-full rounded-md mb-10  ">
              <thead className="bg-green-800 text-white ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200  ">
                {passwordArray.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center ">
                        <div className=" flex gap-4 items-center justify-center flex-wrap">
                        <a href={items.site} target="_blank">
                          {items.site}
                        </a>
                        <img
                          width="15"
                          height="15"
                          className="cursor-pointer"
                          src="https://img.icons8.com/ios/50/000000/copy--v2.png"
                          alt="copy--v2"
                          onClick={() => {
                            copyText(items.site);
                          }}
                        />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center ">
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                          {items.username}
                          <img
                            width="15"
                            height="15"
                            className="cursor-pointer"
                            src="https://img.icons8.com/ios/50/000000/copy--v2.png"
                            alt="copy--v2"
                            onClick={() => {
                              copyText(items.username);
                            }}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                          {items.password}
                          <img
                            width="15"
                            height="15"
                            className="cursor-pointer"
                            src="https://img.icons8.com/ios/50/000000/copy--v2.png"
                            alt="copy--v2"
                            onClick={() => {
                              copyText(items.password);
                            }}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex-wrap  flex justify-center items-center gap-4">
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            editpassword(items.id);
                          }}
                        >
                          <RiEdit2Fill />
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            deletePassword(items.id);
                          }}
                        >
                          <RiDeleteBin5Fill />
                        </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
