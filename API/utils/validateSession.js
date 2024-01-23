const validateSessionUtility = (action) => {
  const { userID } = req.session;
  if (action === userID) {
    return true;
  }
  return false;
};
