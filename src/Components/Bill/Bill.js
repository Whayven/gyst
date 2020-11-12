import React from "react";
import { useDispatch } from "react-redux";
import { removeBill } from "../../redux/billReducer";
import styled from "styled-components";

const BillContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 65%;
  margin: 10px auto 10px auto;
  padding-top: 15px;
  border-top: 2px solid black;

  span {
    font-weight: 600;
    margin: 0 5px;
  }
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

const Bill = (props) => {
  const dispatch = useDispatch();

  const { id, name, cost, dueDate, type } = props;

  const remove = () => {
    dispatch(removeBill(id));
  };

  const formatDate = (date) => {
    // return date.substring(0, 10);
    const dateObj = new Date(date);
    let dd = dateObj.getDate();
    let mm = dateObj.getMonth() + 1;
    let yyyy = dateObj.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${mm}-${dd}-${yyyy}`;
  };

  return (
    <BillContainer>
      <div>
        <span>{name}</span>
        <span>/</span>
        <span>${cost}</span>
        <br />
        <span>{formatDate(dueDate)}</span>
        <span>/</span>
        <span>{type}</span>
      </div>
      <Button onClick={() => remove()}>Delete</Button>
    </BillContainer>
  );
};

export default Bill;
