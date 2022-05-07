import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

type Props = {};

const Landing = (props: Props) => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <h2>Welcome to landing</h2>
      <p>Cmon you should use this UI for Tech4Work!</p>
      <div className="text-center">
        <Button
          label="Sign In"
          icon="pi pi-sign-in"
          onClick={() => navigate("/signin", { replace: true })}
        ></Button>
      </div>
    </div>
  );
};

export default Landing;
