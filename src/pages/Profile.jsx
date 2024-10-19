import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser); // you can get current user like this...

  return (
    <div>
      ye page pending hai aur user info ye sab milega:{" "}
      <p>{JSON.stringify(currentUser, null, 4)}</p>
    </div>
  );
};

export default Profile;
