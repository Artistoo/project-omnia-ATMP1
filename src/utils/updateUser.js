import { useAccountConfigureMutation } from "../redux/API";
const updateUserUtility = async (update) => {
  try {
    localStorage.setItem("user", JSON.stringify(update));
  } catch (err) {
    console.log(err);
  }
};

export default updateUserUtility;

/*  try {
    if (localStorage?.currentUser) {
      const [
        updateUserData,
        { isLoading: isUpdatingUser, error, data: userData, isSuccess },
      ] = useAccountConfigureMutation();

      const updateUser = await updateUserData({
        UserID: currentUser?._id,
        categories: {
          Account: {
            ...updateFields,
          },
        },
      });
      if (userData && userData?.user) {
        const newUser = localStorage.setItem(
          "currentUser",
          JSON.stringify(userData?.user)
        );
      } else if (userData?.error) {
        alert("something went wrong");
      }
    }
  } catch (err) {
    console.log(err);
  } */
