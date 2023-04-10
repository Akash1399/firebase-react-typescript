import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/87OcbZNm_400x400.jpg";
import "./style.css";
import { collection, getDocs } from "firebase/firestore";
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
}[];
function UsersListPage() {
  const history = useNavigate();
  const [usersList, setUsersList] = useState<userListType>([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    try {
      const docRef = collection(db, "users");
      const docSnap = await getDocs(docRef);
      const list = docSnap.docs.map((doc) => {
        const data = doc.data();
        return {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          id: data.id,
          createdAt: data.createdAt,
          profilePhoto: data.profilePhoto,
        };
      });
      setUsersList(list);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center py-2 px-6 border-b-2">
        <h2>Users List</h2>
        <div>
          <button
            className="py-2 px-8 rounded-2xl bg-blue-400"
            onClick={() => history("/")}
          >
            Go To Register
          </button>
        </div>
      </div>
      <div className="grid  gap-6 py-4 sm:grid-cols-1 sm:px-1 md:grid-cols-2 xl:grid-cols-3  xl:px-6">
        {usersList.map((doc) => {
          return (
            <div
              className="userCard"
              key={doc.id}
              onClick={() => history(`/userDetail/${doc.id}`)}
            >
              <div>
                <img src={doc?.profilePhoto} alt="" className="userImage" />
              </div>
              <div className="contentBox">
                <p>
                  Name:{doc.firstName} {doc.lastName}
                </p>
                <p>Email:{doc.email}</p>
                <p>gender: {doc.gender}</p>
                <p>D.O.B:{doc.dateOfBirth}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UsersListPage;
