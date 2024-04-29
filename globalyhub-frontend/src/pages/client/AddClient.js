import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { insertClient } from "../../redux/thunk/clientThunk";
import { errorToast, successToast } from "../../utils/toastify";


const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [formFieldData, setFormFieldData] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    date_of_birth: "",
    education_background: "",
    preferred_contact: "",
  });
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFieldData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
 const handleSubmit = async (event) => {
    event.preventDefault();
    for (const key in formFieldData) {
        if (formFieldData[key] === "") {
          errorToast(`${key} field is required.`);
          return;
        }
      }
    try {
     

      if (formFieldData) {
        dispatch(insertClient({ data: formFieldData, callback: successAdd }));
      }
    } catch (err) {}
  };
  const successAdd = () => {
    successToast("Client Added Successfully");
    navigate("/");
  };

  return (
    <>
      {/* {loading && <Loader isActive={true} />} */}
      <div className="addeditclient" style={{ margin: "0 10rem" }}>
        <h1 className="addeditclient-clienttext1">Add Client </h1>
        <h1 className="addeditclient-clienttext2">
          Here you can add your client
        </h1>
        <form className="addeditclient-clientform" onSubmit={handleSubmit}>
            
          <div className="addeditclient-clientform--left">
            <div>
              <label htmlFor="name" data-after=" *">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name..."
                value={formFieldData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" data-after=" *">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email..."
                value={formFieldData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="phone" data-after=" *">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Your phone..."
                value={formFieldData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="date_of_birth" data-after=" *">
                D.O.B
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                placeholder="Your full date_of_birth..."
                value={formFieldData.date_of_birth}
                onChange={handleInputChange}
              />
            </div>
<div>
            <label htmlFor="gender">Gender</label>
            <div
                style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}
              >
               
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="Male"
                      value="Male"
                      checked={formFieldData?.gender === "Male"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Male">Male</label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="Female"
                      value="Female"
                      checked={formFieldData?.gender === "Female"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Female">Female</label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="Others"
                      value="Others"
                      checked={formFieldData?.gender === "Others"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Others">Others</label>
                  </div>
            
              </div>
              </div>

              <div style={{ marginTop:"1rem" }}>
            <label htmlFor="preferred_contact">Preferred Contact</label>
            <div
                style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem" }}
              >
               
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="preferred_contact"
                      id="Email"
                      value="email"
                      checked={formFieldData?.preferred_contact === "email"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Email">Email</label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="preferred_contact"
                      id="Phone"
                      value="phone"
                      checked={formFieldData?.preferred_contact === "phone"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Phone">Phone</label>
                  </div>

                 
            
              </div>
              </div>
          </div>
          <div className="addeditclient-clientform--right">
            <div>
              <label htmlFor="nationality" data-after=" *">
                Nationality
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                placeholder="Your full nationality..."
                value={formFieldData.nationality}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address" data-after=" *">
                Address
              </label>
              <textarea
                name="address"
                id="address"
                cols="30"
                rows="4"
                placeholder="Your address here ..."
                value={formFieldData.address}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="education_background" data-after=" *">
                Education Background
              </label>
              <textarea
                name="education_background"
                id="education_background"
                cols="30"
                rows="4"
                placeholder="Your education background here ..."
                value={formFieldData.education_background}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="submitbtn">
              <input
                type="submit"
                value="Add Client "
                className="secondary-button"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClient;
