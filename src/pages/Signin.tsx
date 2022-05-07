import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

export interface ISignupProps {}

export default function Signin(props: ISignupProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div className="text-center mb-5">
        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span className="text-600 font-medium line-height-3">
          Insert your cridentials from Tech4Work
        </span>
      </div>

      <div>
        <label htmlFor="username" className="block text-900 font-medium mb-2">
          Username
        </label>
        <InputText type="text" className="w-full mb-3" />

        <label htmlFor="password" className="block text-900 font-medium mb-2">
          Password
        </label>
        <InputText type="password" className="w-full mb-3" />

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
          <Link
            to="/forget"
            className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >
            Forgot your password?
          </Link>
        </div>

        <Button
          label="Sign In"
          icon="pi pi-user"
          className="w-full"
          tooltip="We do not store your personal information, please check the privacy note in the footer"
          tooltipOptions={{ className: 'yellow-tooltip', position: 'top' }}
        />
      </div>
    </div>
  );
}
