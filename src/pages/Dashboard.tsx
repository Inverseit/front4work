import React, { useState } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
type Props = {};

const Dashboard = (props: Props) => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <h2>Welcome to the homepage!</h2>
      <p>You can do this, I believe in you.</p>
      <div className="text-center">
        <Button
          label="Click"
          icon="pi pi-plus"
          onClick={(e) => setCount(count + 1)}
        ></Button>
        <div className="text-2xl text-900 mt-3">{count}</div>
      </div>
      <nav>
        <Link to="/signup">Signup</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
