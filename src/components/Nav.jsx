import React from "react";
import Link from "next/link";

function Nav() {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="flex justify-center items-center flex-row h-10  sm:w-[600px]  font-light rounded-lg shadow shadow-black bg-[#111111] border-[1px] border-[#222224] text-md">
        <Link
          href="/delete"
          className="text-white flex justify-center items-center w-1/5 hover:text-[#0191ff]"
        >
          Delete
        </Link>

        <Link
          href="/add-contact"
          className="text-white flex justify-center items-center w-1/5 hover:text-[#00ff80]"
        >
          Add
        </Link>

        <Link
          href="/"
          className="text-white flex justify-center items-center w-1/5 hover:text-[#6373ff]"
        >
          Contacts
        </Link>

        <Link
          href="/edit"
          className="text-white flex justify-center items-center w-1/5 hover:text-[#ff0028]"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default Nav;
