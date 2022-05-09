import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import client from "../utils/axios";
import { Messages } from "primereact/messages";
import { authContext } from "../contexts/AuthContext";

export interface ISignupProps {}

export default function Signin(props: ISignupProps) {
  const { setAuthStatus } = React.useContext(authContext);
  const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const msgs: any = useRef(null);

  const showError = (message:string) => {
    msgs.current.show([
      {
        severity: "error",
        summary: "Error",
        detail: message,
        sticky: true,
      },
    ]);
  };

  const handleSubmit = async () => {
    console.log(`Submitting: ${username}, ${password}, ${checked}`);
    await setLoading(true);
    try {
      const res = await client.post(
        "login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res);
      await setAuthStatus({
        id: res.data.id,
        username: username,
        cookie: res.data.cookie,
      });
      await setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      await setLoading(false);
      showError("! Wrong credentials! Try again");
    }
  };

  return (
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
      <div className="text-center mb-5">
        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span className="text-600 font-medium line-height-3">
          Insert your credentials from Tech4Work
        </span>
      </div>

      <div>
        <div className="col-12 w-full mb-3">
          <Messages ref={msgs} />
        </div>
        <label htmlFor="username" className="block text-900 font-medium mb-2">
          Username
        </label>
        <InputText
          type="text"
          className="w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="block text-900 font-medium mb-2">
          Password
        </label>
        <Password
          className="w-full mb-3"
          inputClassName="w-full"
          value={password}
          toggleMask
          feedback={false}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex align-items-center justify-content-between mb-6">
          <div className="flex align-items-center">
            <Checkbox
              inputId="rememberme"
              className="mr-2"
              checked={checked}
              onChange={(e) => setChecked(e.checked)}
            />
            <label htmlFor="rememberme">Remember me</label>
          </div>
          <a
            href="https://www.tech4work.com/index.php?option=com_user&view=reset"
            className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >
            Forgot your password?
          </a>
        </div>

        <Button
          label="Sign In"
          icon="pi pi-user"
          className="w-full"
          tooltip="We do not store your personal information, please check the privacy note in the footer"
          tooltipOptions={{ className: "yellow-tooltip", position: "top" }}
          onClick={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
