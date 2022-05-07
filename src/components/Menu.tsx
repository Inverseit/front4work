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
  const unauthorizedItems = [
    {
      label: "Home",
      icon: PrimeIcons.HOME,
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Sign in",
      icon: PrimeIcons.SIGN_IN,
      command: () => {
        navigate("/signin");
      },
    },
    // {
    //   label: "Sign up",
    //   icon: "pi pi-fw pi-sign-in",
    //   command: () => {navigate('/signup') }
    // },
  ];

  const authorizedItems = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-sign-in",
    },
    {
      label: "Time entry",
      icon: "pi pi-fw pi-calendar-plus",
    },
    {
      label: "Account",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Settings",
          icon: "pi pi-fw pi-user-edit",
        },
        {
          label: "Sign out",
          icon: "pi pi-fw pi-sign-out",
        },
      ],
    },
  ];
  const items = { unauthorizedItems, authorizedItems };
  let logout = (
    <div>
      <Button label="Exit" icon={PrimeIcons.SIGN_OUT} />
    </div>
  );

  const { auth } = React.useContext(authContext);

  const authorizedMenu = <Menubar model={items.authorizedItems} end={logout} />;
  const unauthorizedMenu = <Menubar model={items.unauthorizedItems} />;

  return (
    <div className="my-menu">
      {auth.cookie ? authorizedMenu : unauthorizedMenu}
    </div>
  );
};

export default Menu;
