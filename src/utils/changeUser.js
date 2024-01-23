export const changeUserUtility = () => {
  const user = localStorage?.user ? JSON.parse(localStorage?.user) : false;
  if (user) {
    if (localStorage?.savedUsers) {
      const savedUser = JSON.parse(localStorage?.savedUsers);
      if (savedUser.some((x) => x?.Email === user?.Email)) {
        localStorage.setItem("savedUsers", JSON.stringify([...savedUser]));
      } else {
        localStorage.setItem(
          "savedUsers",
          JSON.stringify([...savedUser, user])
        );
      }
    } else {
      localStorage.setItem("savedUsers", JSON.stringify([user]));
    }

    return {
      navigate: `/user/savedUsers`,
      users: localStorage?.savedUsers,
    };
  }
};
