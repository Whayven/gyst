import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { requestAllBills } from "../../redux/billReducer";
import { getUser } from "../../redux/userReducer";
import Bill from "../Bill/Bill";
import CreateBill from "./CreateBill";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 10px auto;
  background: #fdfefe;
  border: 4px solid #00bcd8;
  border-radius: 8px;
  box-shadow: 5px 8px #888;
`;

const ProfileForm = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  padding: 5px;
  margin: 10px;
  label {
    font-size: 26px;
    font-weight: bold;
    margin-right: 5px;
  }

  input {
    width: 30%;
    font-size: 20px;
    margin-right: 10px;
  }
`;

const Header = styled.h1`
  border-bottom: 3px solid black;
  padding-top: 15px;
  margin-bottom: 15px;
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

const Info = styled.span`
  font-size: 24px;
  padding-left: 5px;
`;

const Manage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const bills = useSelector((state) => state.bill.bills);

  const [income, setIncome] = useState(user.income);
  const [userName, setUserName] = useState(user.name);
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    refreshBills();
  }, []);

  useEffect(() => {
    refreshUser();
  }, []);

  const updateUser = () => {
    axios
      .put("/api/user/profile", { income, userName })
      .then((res) => {
        toggleEdit();
        dispatch(
          getUser({ ...user, income: res.data.income, name: res.data.name })
        );
      })
      .catch((err) => console.log(err));
  };

  const refreshUser = () => {
    axios
      .get("/api/auth/me")
      .then((res) => {
        dispatch(getUser(res.data));
      })
      .catch((err) => console.log(err));
  };

  const refreshBills = () => {
    dispatch(requestAllBills());
  };

  const toggleEdit = () => {
    setIncome(user.income);
    setUserName(user.name);
    setEditProfile((curr) => !curr);
  };

  const incomeField = editProfile ? (
    <>
      <input
        value={income}
        type="number"
        min="0"
        max="999999"
        onChange={(e) => setIncome(e.target.value)}
      />
    </>
  ) : (
    <Info>${user.income}</Info>
  );

  const nameField = editProfile ? (
    <>
      <input
        value={userName}
        type="text"
        onChange={(e) => setUserName(e.target.value)}
      />
    </>
  ) : (
    <Info>{user.name}</Info>
  );

  const profileButtons = editProfile ? (
    <div>
      <Button onClick={updateUser}>Confirm</Button>{" "}
      <Button onClick={toggleEdit}>Cancel</Button>
    </div>
  ) : (
    <>
      <Button onClick={toggleEdit}>Edit</Button>
    </>
  );
  /*
   bill {
     bill_id,
     cost,
     due_date,
     bill_list_id,
     name,
     type   
   }
   */
  const mappedBills = bills.map((bill) => {
    return (
      <Bill
        id={bill.bill_id}
        key={bill.bill_id}
        name={bill.name}
        cost={bill.cost}
        dueDate={bill.due_date}
        type={bill.type}
        refreshBills={refreshBills}
      />
    );
  });

  return (
    <Container>
      <Header>Manage Profile</Header>
      {profileButtons}
      <ProfileForm>
        <label>Monthly Income:</label>
        {incomeField}
      </ProfileForm>
      <ProfileForm>
        <label>Name:</label>
        {nameField}
      </ProfileForm>
      <Header>Manage Bills</Header>
      <CreateBill refreshBills={refreshBills} />
      {mappedBills}
      <br />
    </Container>
  );
};

export default Manage;
