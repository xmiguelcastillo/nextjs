"use client";

import { useState, useEffect } from "react";

export default function DeleteContact() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch("/api/contacts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setContacts(contacts.filter((contact) => contact.id !== id));
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col  w-[600px] rounded-lg">
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 rounded-lg bg-white w-full h-auto border border-[#444] text-black shadow-lg"
                >
                  <div className="flex flex-row h-[50px] rounded-t-lg">
                    <div className="w-[70%] flex items-center pl-2">
                      <h3 className="font-bold text-xl text-black">
                        {contact.firstName.charAt(0).toUpperCase() +
                          contact.firstName.slice(1)}{" "}
                        {contact.lastName.charAt(0).toUpperCase() +
                          contact.lastName.slice(1)}
                      </h3>
                    </div>
                    <div className="w-[30%] flex justify-center items-center">
                      {contact.imageUrl && (
                        <img
                          src={contact.imageUrl}
                          alt="Profile"
                          className="w-[50px] h-[50px] rounded-[1px]"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-3 text-[#646464] text-sm p-2 rounded-lg">
                    <p>{contact.info}</p>
                  </div>

                  <div className="mt-3 mb-2">
                    {contact.backgroundUrl && (
                      <img
                        src={contact.backgroundUrl}
                        alt="Profile"
                        className="w-[300px] h-[80px] rounded-[1px]"
                      />
                    )}
                  </div>

                  <div className="flex justify-center items-center bg-black text-white py-2 rounded-b-lg">
                    {contact.phoneNumber.slice(0, 3)}-
                    {contact.phoneNumber.slice(3, 6)}-
                    {contact.phoneNumber.slice(6)}
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      className="bg-red-500  text-white py-2 px-4 rounded-lg mt-4"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white text-center">No contacts yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
