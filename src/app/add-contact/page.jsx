"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddContact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [info, setInfo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(null);
  const [background, setBackground] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName.trim() && lastName.trim() && info.trim() && phoneNumber) {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("info", info);
      if (file && background) {
        formData.append("file", file);
        formData.append("background", background);
      }

      const response = await fetch("/api/contacts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newContact = await response.json();
        console.log("Contact Added:", newContact);

        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setInfo("");
        setFile(null);
        setBackground(null);

        router.push("/");
      } else {
        console.log("Failed to submit contact");
      }
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 ">
      <div className="flex flex-col p-6 w-[400px] rounded-lg shadow-lg bg-white  border-[#222224]">
        <div className="flex justify-center items-center">
          <h1 className="text-black  font-bold text-xl mb-4">
            Enter New Contact
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 rounded bg-[#222224] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 rounded bg-[#222224] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              const newPhoneNumber = e.target.value.replace(/\D/g, ""); // Only digits
              if (newPhoneNumber.length <= 10) {
                setPhoneNumber(newPhoneNumber);
              }
            }}
            className="p-2 rounded bg-[#222224] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Message"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="p-2 rounded bg-[#222224] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h1>Profile Image</h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-2 rounded bg-[#222224] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h1>Background Image</h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBackground(e.target.files[0])}
            className="p-2 rounded bg-[#222224] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
