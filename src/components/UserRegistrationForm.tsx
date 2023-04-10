import React, { useEffect } from "react";
import { useFormik } from "formik";
import { firebaseAuth, db, storageRef } from "../lib/firebsae";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { validate } from "./FormValidation";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

type formValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  id?: string;
  profilePhoto?: File | string;
};

type docValues = formValues & { id: string };
function UserRegistrationForm() {
  const history = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      formik.setValues(location.state);
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      profilePhoto: new File([], "", { type: "" }),
    },
    // validate,
    onSubmit: async (values: formValues) => {
      if (!location.state) {
        const pictureURL = await uploadProfilePhoto(values?.profilePhoto);
        // const data={...values,profilePhoto:pictureURL}
        // formik.setFieldValue("profilePhoto", pictureURL);

        createUser(values, pictureURL);
      } else {
        updateUser(values);
      }
    },
  });
  const uploadProfilePhoto = async (file?: File | string) => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const fileObject =
        typeof file === "string"
          ? new File([await fetch(file).then((r) => r.blob())], "filename.jpg")
          : file;
      const imageRef = ref(storageRef, `profilePhotos/${fileObject.name}`);
      const snapshot = await uploadBytes(imageRef, fileObject);
      const pictureURL = await getDownloadURL(snapshot.ref);
      return pictureURL;
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const updateUser = async (values: formValues) => {
    try {
      const docRef = doc(db, "users", `${values?.id}`);
      await updateDoc(docRef, values);

      history("/userList");
    } catch (err) {
      console.log(err);
    }
  };
  const createUser = async (
    values: formValues,
    pictureURl: string | undefined
  ) => {
    try {
      console.log(values);
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      saveUserData({ ...values, id: res.user.uid, profilePhoto: pictureURl });
      history("/userList");
    } catch (err) {
      console.log(err);
    }
  };

  const saveUserData = async (values: docValues) => {
    try {
      const docRef = doc(db, "users", values.id);
      await setDoc(docRef, { ...values, createdAt: new Date() });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // MainContainer
    <div className="">
      {/* Heading COntainer */}
      <div className="flex justify-between items-center py-2 px-6 border-b-2">
        <h2>Registration Form</h2>
        <div>
          <button
            className="py-2 px-8 rounded-2xl bg-blue-400"
            onClick={() => history("/userList")}
          >
            Go To Users List
          </button>
        </div>
      </div>
      {/* Content Box */}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-6/12 flex flex-col gap-8 my-2 mx-auto bg-slate-300 py-6 px-4">
          <div className=" grid grid-cols-2 gap-6">
            <div>
              <input
                onChange={formik.handleChange}
                type="text"
                name="firstName"
                value={formik.values.firstName}
                className=" border border-gray-400 py-1 px-2 rounded-md "
                placeholder="First Name"
              />{" "}
              {formik.errors.firstName ? (
                <div style={{ color: "red" }}>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div>
              <input
                onChange={formik.handleChange}
                type="text"
                name="lastName"
                value={formik.values.lastName}
                className=" border border-gray-400 py-1 px-2 rounded-md "
                placeholder="Last Name"
              />{" "}
              {formik.errors.lastName ? (
                <div style={{ color: "red" }}>{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div>
              <input
                onChange={formik.handleChange}
                type="text"
                value={formik.values.email}
                name="email"
                className=" border border-gray-400 py-1 px-2 rounded-md "
                placeholder="Email"
              />
              {formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <input
                onChange={formik.handleChange}
                type="text"
                value={formik.values.password}
                name="password"
                className=" border border-gray-400 py-1 px-2 rounded-md "
                placeholder="Password"
              />{" "}
              {formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <input
                onChange={formik.handleChange}
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                className=" border border-gray-400 py-1 px-2 rounded-md  w-full"
                placeholder="Password"
                type="date"
              />
              {formik.errors.dateOfBirth ? (
                <div style={{ color: "red" }}>{formik.errors.dateOfBirth}</div>
              ) : null}
            </div>
            <div>
              <select
                onChange={formik.handleChange}
                id="gender"
                value={formik.values.gender}
                defaultValue={"male"}
                name="gender"
                className=" border border-gray-400 py-1 px-2 rounded-md w-full"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>{" "}
              {formik.errors.gender ? (
                <div style={{ color: "red" }}>{formik.errors.gender}</div>
              ) : null}
            </div>
            <div>
              <input
                type="file"
                name="profilePhoto"
                onChange={(event) => {
                  formik.setFieldValue(
                    "profilePhoto",
                    event?.target?.files?.[0]
                  );
                }}
              />
            </div>
          </div>
          <button type="submit" className="py-2 px-4 bg-blue-400 rounded-xl">
            {location.state ? "UPDATE" : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRegistrationForm;
