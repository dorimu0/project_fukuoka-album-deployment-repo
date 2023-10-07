import React, { useState, useEffect } from "react";
import Card from "../Card";
import { getUser } from "../../services/user.service";
import { User } from "../../types/user.interface";

const Profile = () => {
  const [user, setUser] = useState<User>(); // API로 받아온 위치 정보

  // API로부터 위치 정보를 받아옴
  useEffect(() => {
    (async () => {
      const user = await getUser("1");
      setUser(user);
    })();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* <Card /> */}
    </div>
  );
};

export default Profile;
