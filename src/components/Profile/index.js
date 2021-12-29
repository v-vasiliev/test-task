import React, { useState } from "react";
import "./style.scss";

const Profile = ({ userData }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="profile__img_container">
        <img
          className={isImageLoaded ? "profile__img" : "profile__img loader"}
          alt="avatar"
          onLoad={() => setImageLoaded(true)}
          src={userData.avatar}
        />
      </div>
      <div className="profile-description">
        <span className="profile-description__elem">
          {userData.first_name}&nbsp;
        </span>
        <span className="profile-description__elem">{userData.last_name}</span>
        <a
          className="profile-description__elem profile-description__elem_email"
          href={`mailto:${userData.email}`}
        >
          {userData.email}
        </a>
      </div>
    </>
  );
};

export default Profile;
