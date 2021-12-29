import ApiClient from "./index";

export const getUsersData = async (query) => {
  try {
    const res = await ApiClient.users.getUsers({ query });
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error(
      "Something went wrong while getting users, please try again later!"
    );
  }
};

export const getUserData = async (user_id) => {
  try {
    const res = await ApiClient.users.getUser({ param: { user_id } });
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error(
      "Something went wrong while getting user, please try again later!"
    );
  }
};
