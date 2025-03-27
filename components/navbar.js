import useOutsideDetect from "@/hooks/useOutSideDetect";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/");
  };

  const handleDeleteAccount = () => {
    const getUsers = JSON.parse(localStorage.getItem("users")) || [];
    const loggedinUser = JSON.parse(sessionStorage.getItem("user"));

    const updatedUsers = getUsers.filter(
      (user) => user.email !== loggedinUser.email
    );
    console.log(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    handleLogout();
  };
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const dropdownRef = useRef(null);
  useOutsideDetect(dropdownRef, () => {
    setDropdownOpen(false)
  })
  return (
    <nav className="bg-gray-800 p-2 px-12 md:p-4 md:px-20 ">
      <div className=" mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">
            <Image src="/algoroot.png" width={64} height={64} />
          </Link>
        </div>

        {/* User Icon Section */}
        <div className="relative">
          <button
            className="text-white text-xl flex items-center"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 text-gray-800" ref={dropdownRef}>
              <div className="px-4 py-2 font-semibold">{user?.name}</div>
              <div className="px-4 py-2 text-sm text-gray-500">
                {user?.email}
              </div>
              <hr className="my-2" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
