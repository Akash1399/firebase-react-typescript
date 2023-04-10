import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "../images/87OcbZNm_400x400.jpg";
import "./style.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebsae";
type userListType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  id: string;
  createdAt: string;
  profilePhoto: string;
};
function UserDetailPage() {
  const history = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState<userListType | undefined>(undefined);
  useEffect(() => {
    getUserData();
  }, [id]);
  const getUserData = async () => {
    const docRef = doc(db, "users", `${id}`);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const data = {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      password: userData?.password,
      gender: userData?.gender,
      dateOfBirth: userData?.dateOfBirth,
      id: userData?.id,
      createdAt: userData?.createdAt,
      profilePhoto: userData?.profilePhoto,
    };
    if (userData) {
      setUserData(data);
    }
  };
  return (
    <div>
      {/* Heading COntainer */}
      <div className="flex justify-between items-center py-2 px-6 border-b-2">
        <h2>User Detail</h2>
        <div className="flex gap-4">
          <button
            className="py-2 px-8 rounded-2xl bg-blue-400"
            onClick={() => history("/", { state: userData })}
          >
            Edit User
          </button>
          <button
            className="py-2 px-8 rounded-2xl bg-blue-400"
            onClick={() => history("/userList")}
          >
            Go To Users List
          </button>
        </div>
      </div>
      {/* CONTENT BOX */}
      <div className="flex justify-center align-center py-8">
        <div className="w-6/12 flex flex-col items-center bg-gray-200 gap-4 py-4 rounded-md">
          <img className="detailUserImage" src={userData?.profilePhoto} />
          <p>
            Name:{userData?.firstName} {userData?.lastName}
          </p>
          <p>Email:{userData?.email}</p>
          <p>gender: {userData?.gender}</p>
          <p>D.O.B:{userData?.dateOfBirth}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
