import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { requestAllBills } from "../../redux/billReducer";

const DashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 10px auto;
  padding: 15px 0;
  background: #fdfefe;
  border: 4px solid #00bcd8;
  border-radius: 8px;
  box-shadow: 5px 8px #888;
`;

const BalanceContainer = styled.div`
  width: 50%;
  padding: 12px;
  border: 4px solid black;
  border-radius: 3px;
  font-size: 30px;
  text-align: center;
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

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const BudgetChart = (props) => {
  return (
    <Doughnut
      data={props.data}
      options={{
        title: {
          display: true,
          text: "Bills Breakdown",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
      }}
    />
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const types = ["Utility", "Credit", "Insurance", "Miscellaneous"].reverse();

  const user = useSelector((state) => state.user.user);
  const bills = useSelector((state) => state.bill.bills);
  const [data, setData] = useState({});
  const [balance, setBalance] = useState(user.income);

  useEffect(() => {
    dispatch(requestAllBills());
  }, []);

  useEffect(() => {
    const tempData = [balance];
    let temp;
    for (let i = 0; i < types.length; i++) {
      temp = reduceCost(filterBills(types[i], bills));
      tempData.unshift(temp);
    }
    setData({
      labels: ["Utility", "Credit", "Insurance", "Miscellaneous", "Balance"],
      datasets: [
        {
          label: "Budget",
          backgroundColor: [
            "#B21F00",
            "#C9DE00",
            "#6800B4",
            "#00A6B4",
            "#2FDE00",
          ],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#35014F",
            "#003350",
            "#175000",
          ],
          data: tempData,
        },
      ],
    });
  }, [balance]);

  useEffect(() => {
    if (!isEmpty(bills))
    setBalance(user.income - reduceCost(bills))
    console.log(balance);
  }, [bills])

  const filterBills = (type, bills) => {
    return bills.filter((bill) => type === bill.type);
  };

  const reduceCost = (bills) => {
    return bills.reduce((acc, curr) => acc + curr.cost, 0);
  };

  const displayChart = isEmpty(data) ? <></> : <BudgetChart data={data} />;

  return (
    <DashContainer>
      <BalanceContainer>
        <strong>Balance:</strong> ${balance}
      </BalanceContainer>
      <br />
      {displayChart}
    </DashContainer>
  );
};

export default Dashboard;
