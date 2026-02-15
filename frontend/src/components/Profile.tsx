import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectUser } from "../features/auth/auth.slice";

const Profile = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="p-2 shadow-sm w-fit">
      <p className="text-gray-600 gap-2">
        <span className="font-bold">Your Name</span>: {user?.name}
      </p>
      <p className="text-gray-500">
        <span className="font-bold">Your email</span>: {user?.email}
      </p>
    </div>
  );
};

export default Profile;
