import React from "react";
import { Menubar } from "primereact/menubar";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
/** Context */
import { authContext } from "../contexts/AuthContext";

type Props = {};

const Menu = (props: Props) => {
  const navigate = useNavigate();
  const { auth, setUnauthStatus } = React.useContext(authContext);

  const items = [
    {
      label: "Dashboard",
      icon: PrimeIcons.HOME,
      command: () => {
        navigate("/dashboard");
      },
    },
    {
      label: "Time entry",
      icon: PrimeIcons.CALENDAR_PLUS,
      command: () => {
        navigate("/entry");
      },
    },
    {
      label: "Account",
      icon: PrimeIcons.USER,
      items: [
        {
          label: "Settings",
          icon: PrimeIcons.USER_EDIT,
          command: () => {
            navigate("/settings");
          },
        },
        {
          label: "Info",
          icon: PrimeIcons.INFO_CIRCLE,
          command: () => {
            navigate("/info");
          },
        },
      ],
    },
  ];
  let logout = (
    <div>
      <Button
        label="Exit"
        icon={PrimeIcons.SIGN_OUT}
        onClick={setUnauthStatus}
      />
    </div>
  );

  const authorizedMenu = <Menubar model={items} end={logout} />;
  return <div className="my-menu">{auth.id ? authorizedMenu : null}</div>;
};

export default Menu;
