import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const email = useSelector(state => state.user.user.email);

  return (
    <div>
      This is the dashboard, {email}
    </div>
  );
};

export default Dashboard;