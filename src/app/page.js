"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const response = await fetch("/api/contacts");
    const data = await response.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex justify-center items-center  mt-10">
      <div className="flex flex-col  sm:w-[600px] w-[500px] rounded-lg   ">
        <div className="">
          <div className="grid grid-cols-2 gap-4">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 rounded-lg bg-white h-[300px] w-full h-auto border border-[#444] border-[3px] text-black shadow-lg"
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
