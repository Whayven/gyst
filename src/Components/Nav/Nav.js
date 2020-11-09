import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { getUser, clearUser } from "../../redux/userReducer";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 118, 188, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  color: white;
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  width: 30%;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Nav = (props) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => console.log(state, "Lol"));
  const user = useSelector((state) => {
    return state.user.user;
  });

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = () => {
    axios
      .get("/api/auth/me")
      .then((res) => {
        dispatch(getUser(res.data));
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    axios
      .post("/api/auth/logout")
      .then((_) => {
        dispatch(clearUser());
      })
      .catch((err) => console.log(err));
  };

  if (props.location.pathname !== "/") {
    return (
      <NavContainer>
        <h2>Welcome, {user.name}</h2>
        <NavLinksContainer>
          <NavLink to="/dash">Home</NavLink>
          <NavLink to="/manage">Manage</NavLink>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </NavLinksContainer>
      </NavContainer>
    );
  } else {
    return <></>;
  }
};

export default withRouter(Nav);
