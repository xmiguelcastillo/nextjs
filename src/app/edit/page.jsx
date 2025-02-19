"use client";

import { useState, useEffect } from "react";

export default function EditContact() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    info: "",
  });

  const fetchContacts = async () => {
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setUpdatedContact({ ...contact });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: editingContact.id,
      ...updatedContact,
      backgroundUrl:
        updatedContact.backgroundUrl || editingContact.backgroundUrl,
    };

    const res = await fetch("/api/contacts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const updated = await res.json();
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updated.id ? updated : contact,
        ),
      );
      setEditingContact(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-auto mt-5">
      <div className="flex flex-col p-6 w-[600px] rounded-lg ">
        <div className="flex items-center justify-center">
          <h1 className="text-white text-xl mb-4">Edit Contacts</h1>
        </div>

        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 rounded-lg bg-white w-full  border border-[#444] text-black  mb-4"
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
                  className="w-[500px] h-[200px] rounded-[1px]"
                />
              )}
            </div>

            <div className="flex justify-center items-center bg-black text-white py-2 rounded-b-lg">
              {contact.phoneNumber.slice(0, 3)}-
              {contact.phoneNumber.slice(3, 6)}-{contact.phoneNumber.slice(6)}
            </div>

            {/* Edit Button */}
            <div className="flex justify-center items-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
                onClick={() => handleEdit(contact)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        {editingContact && (
          <form onSubmit={handleSubmit} className="bg-black p-4">
            <div className="mb-4">
              <label className="text-white">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={updatedContact.firstName}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="text-white">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={updatedContact.lastName}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="text-white">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={updatedContact.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="text-white">Info:</label>
              <textarea
                name="info"
                value={updatedContact.info}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 text-black"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
