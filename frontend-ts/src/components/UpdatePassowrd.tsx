import instance from "../axios";
import { useState } from "react";

interface Props {
  id: string;
  onClose: () => void; // function with no arguments, returns nothing
}

const UpdatePassword: React.FC<Props> = ({ id,onClose }) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const update = async () => {
    if (!oldPassword || !newPassword) {
      setMessage("Please fill in both fields.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }

    try {
      const payload = {
        _id: id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      const response = await instance.put("/auth/updatepassword", payload);
      alert("Password updated successfully!");
      onClose();
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update password. Please try again.");
    }
  };

  return (
    <div className=" w-full">
      {/* <h2 className=" font-semibol ">Update Password</h2> */}

      <input
    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="password"
        placeholder="Enter old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <br />

      <input
className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />

      <button
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
              px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
              dark:focus:ring-blue-800 cursor-pointer"
      onClick={update}>Update Password</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePassword;
