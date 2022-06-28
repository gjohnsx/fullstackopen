const LogoutButton = props => {
    const setUser = props.setUser;

    const logout = () => {
        window.localStorage.removeItem('loggedInBlogAppUser');
        setUser(null);
    };

    return (
        <button onClick={logout}>Logout</button>
    );
};

export default LogoutButton;