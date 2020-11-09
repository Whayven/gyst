import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/userReducer";
import styled from "styled-components";

import logo from "../../Assets/gyst-logo.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 0 50px 0;
  background: #e5e5e5;
`;

const AuthContainer = styled(Container)`
  height: 350px;
  width: 70%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 0;
  background: #fdfefe;
  border: 4px solid #00bcd8;
  border-radius: 8px;
  box-shadow: 5px 8px #888;
  transition: height 0.5s ease;

  img {
    height: 100px;
  }

  input,
  label {
    margin: 5px 0;
  }

  input {
    width: 200px;
  }

  ${({ register }) =>
    register &&
    `
    height: 400px;
  `}
`;

const AuthPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 250px;
  margin: 20px 0 10px 0;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 3px solid #0076bc;
  font-weight: 600;
  padding: 1px 3px;
  height: 30px;
  width: 80px;
  font-size: 16px;
  color: #0076bc;
  &:hover {
    background: #0076bc;
    color: #f5f5f5;
  }
`;

const InfoMessage = styled.h3`
  color: red;
`;

const Auth = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  const toggleRegister = () => {
    setRegister((curr) => !curr);
  };

  const loginUser = () => {
    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        dispatch(getUser(res.data));
        props.history.push("/dash");
      })
      .catch((err) => setError(err.response.data));
  };

  const registerUser = () => {
    if (!validateEmail(email)) {
      setError("Enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must contain a letter, number, and be at least 8 characters."
      );
      return;
    }

    if (password === cPassword) {
      axios
        .post("/api/auth/register", { email, password })
        .then((res) => {
          console.log(res.data);
          setEmail("");
          setPassword("");
          setCPassword("");
          setError("");
          toggleRegister();
        })
        .catch((err) => setError(err.response.data));
    } else {
    }
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const validateEmail = (email) => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
  };

  // Conditionally renders another input section for password confirmation when user is registering
  const ConfirmPassword = register ? (
    <>
      <label>Confirm Password:</label>
      <input
        value={cPassword}
        type="password"
        onChange={(e) => setCPassword(e.target.value)}
      />
    </>
  ) : (
    <></>
  );

  // Login / Register by default, renders Submit / Cancel instead when user is registering
  const ButtonContainer = register ? (
    <>
      <Button onClick={registerUser}>Submit</Button>
      <Button onClick={toggleRegister}>Cancel</Button>
    </>
  ) : (
    <>
      <Button onClick={loginUser}>Login</Button>
      <Button onClick={toggleRegister}>Register</Button>
    </>
  );

  return (
    <Container>
      <AuthContainer register={register}>
        <img src={logo} alt="gyst" />
        <InfoMessage>{error}</InfoMessage>
        <label>E-Mail:</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {ConfirmPassword}
        <AuthPanel>{ButtonContainer}</AuthPanel>
      </AuthContainer>
    </Container>
  );
};

export default Auth;
