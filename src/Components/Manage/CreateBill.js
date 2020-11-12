import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addBill } from "../../redux/billReducer";
import styled from "styled-components";

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
  padding: 15px 0;
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

const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${yyyy}-${mm}-${dd}`;
};

const CreateBill = (props) => {
  const dispatch = useDispatch();
  const today = new Date();
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [type, setType] = useState("");
  const [payBy, setPayBy] = useState(formatDate(today));
  const [types] = useState(["Utility", "Credit", "Insurance", "Miscellaneous"]);

  const add = () => {
    dispatch(addBill(name, cost, payBy, type));
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setCost(0);
    setPayBy(formatDate(today));
    setType("");
  };

  const mappedTypes = types.map((type) => <option value={type}>{type}</option>);

  return (
    <>
      <CreateContainer>
        <label>Name:</label>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Cost:</label>
        <input
          value={cost}
          type="number"
          onChange={(e) => setCost(e.target.value)}
        />
        <label>Pay by:</label>
        <input
          value={payBy}
          type="date"
          onChange={(e) => setPayBy(e.target.value)}
        />
        <label>Type:</label>
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {mappedTypes}
        </select>
      </CreateContainer>
      <Button onClick={() => add()}>Add</Button>
    </>
  );
};

export default CreateBill;
