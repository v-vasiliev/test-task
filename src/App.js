import React, { useState, useEffect } from "react";

import Modal from "./components/Modal";
import Profile from "./components/Profile";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

import { getUsersData, getUserData } from "./api/routes";

import "./index.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenModal = async (item) => {
    try {
      const { data } = await getUserData(item);

      setCurrentUser(data);
      setOpenModal(true);
    } catch (error) {
      alert(
        error?.message ||
          "Something went wrong while getting user, please try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderUserTable = () => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        {users.map((item) => (
          <span
            className="people-list__element"
            onClick={() => handleOpenModal(item.id)}
            key={item.id}
          >
            {item.first_name} {item.last_name}
          </span>
        ))}
        <Pagination
          settings={paginationData}
          handleChoosePage={(page) => getUsers(page)}
          setUsers={setUsers}
        />
      </>
    );
  };

  const getUsers = async (currentPage = 1) => {
    setLoading(true);

    try {
      const { data, page, per_page, total, total_pages } = await getUsersData({
        page: currentPage,
      });

      setPaginationData({
        page,
        per_page,
        total,
        total_pages,
      });
      setUsers(data);
      setLoading(false);
    } catch (error) {
      alert(
        error?.message ||
          "Something went wrong while getting users, please try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="people">
      <h1 className="people__title">List people</h1>
      <div className="people-list">
        {renderUserTable()}
      </div>
      <Modal isActive={isOpenModal} handleClose={() => setOpenModal(false)}>
        <Profile userData={currentUser} />
      </Modal>
    </div>
  );
};

export default App;
