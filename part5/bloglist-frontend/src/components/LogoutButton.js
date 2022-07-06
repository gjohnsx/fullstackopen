const LogoutButton = props => {
  const setUser = props.setUser;

  const logout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    setUser(null);
  };

  return (
    <button
      onClick={logout}
      className='border border-black py-1 px-2 rounded-md mt-2'
    >
            Logout
    </button>
  );
};

export default LogoutButton;