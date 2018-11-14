export const isLoggedIn = () => {
  if (localStorage.getItem('token') !== null) {
    return true;
  }
  return false;
};
