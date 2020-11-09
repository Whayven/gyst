import React from "react";
import {useDispatch} from "react-redux";
import { removeBill } from "../../redux/billReducer";
import styled from "styled-components";

const BillContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 140px;
  width: 200px;
  margin: 5px auto;
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

  const ButtonPanel = (
    <>
      {/* <Button>Edit</Button> */}
      <Button onClick={() => dispatch(removeBill(props.id))}>Delete</Button>
    </>
  );

  return (
    <BillContainer>
      <h3>Name: {props.name}</h3>
      <h3>Cost: ${props.cost}</h3>
      {ButtonPanel}
    </BillContainer>
  );
};

export default Bill;