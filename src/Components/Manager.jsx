import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  let [passwordArray, setPasswordArray] = useState([]);
  const passwordRef = useRef();

  const showPassword = () => {
    if (passwordRef.current.type == "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
      console.log(form);
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, { ...form, id: uuidv4() }]);
      toast("Password Saved Successfully! 🔒");
    }
    else{
      toast("Error ‼️");
    }
    
  };

  const deletePassword = (id) => {
    console.log("Deleting Password with id ",id);
    setPasswordArray(passwordArray.filter(item => item.id!==id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div>
        <div className="container mx-auto bg-slate-0 max-w-lg">
          <h1 className="text-6xl font-bold text-center pt-10">Power Pass</h1>
          <p className="text-lg font-bold text-center pb-10">
            Your Own Password Manager
          </p>
          <div className="flex flex-col p-4 gap-6 items-center">
            <input
              className="rounded-lg border-2 border-purple-900 p-4 text-black py-3 w-full"
              type="text"
              id=""
              placeholder="Enter Website Name/URL"
              value={form.site}
              onChange={handleChange}
              name="site"
            />
            <div className="flex flex-col w-2/3 mx-auto gap-5">
              <input
                className="rounded-lg border-2 border-purple-900 p-4  text-black py-3 w-full"
                type="text"
                placeholder="Enter Your Username"
                value={form.username}
                onChange={handleChange}
                name="username"
              />
              <div className="relative">
                <input
                  className="rounded-lg border-2 border-purple-900 p-4 text-black py-3 w-full"
                  type="password"
                  placeholder="Enter Your Password"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  ref={passwordRef}
                />
                <span
                  className="absolute right-[13px] top-[13px] cursor-pointer text-gray-500"
                  onClick={showPassword}
                >
                  show
                </span>
              </div>
            </div>
            <button
              className="flex justify-center items-center bg-white rounded-lg px-4 py-3 w-fit text-black hover:bg-purple-900 hover:text-white"
              onClick={savePassword}
            >
              Add Password
            </button>
          </div>
        </div>
        <div className="passwords pt-10 mx-auto container max-w-4xl">
          <h2 className="text-center pb-10 pt-10 text-2xl">Saved Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-center pt-[15px] pb-[10px]">
              No Passwords To Show. Add Some Passwords To Display 👆{" "}
            </div>
          )}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-left py-2">Website Name/URL</th>
                  <th className="text-left py-2">Usernames</th>
                  <th className="text-left py-2">Passwords</th>
                  <th className="text-center py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2">{item.site}</td>
                      <td className="py-2">{item.username}</td>
                      <td className="py-2">{item.password}</td>
                      <td className="text-center py-2" onClick = {()=>{deletePassword(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/zxvuvcnc.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{"width":"35px","height":"35px"}}
                        ></lord-icon>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
