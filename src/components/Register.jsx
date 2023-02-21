import React, { useState } from "react";
import { Input } from "../UI";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUserStart());

    const user = { username: name, email, password };

    try {
      const response = await AuthService.userRegister(user);
      dispatch(registerUserSuccess(response.user));
    } catch (error) {
      dispatch(registerUserFailure(error.response.data.errors));
    }
  };

  return (
    <>
      <div className="text-center">
        <main className="form-signin w-25 m-auto">
          <form>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <ValidationError />
            <Input
              type={"text"}
              label={"Username"}
              state={name}
              setState={setName}
            />
            <Input
              type={"email"}
              label={"Email address"}
              state={email}
              setState={setEmail}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
            />

            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              disabled={isLoading}
              onClick={registerHandler}>
              {isLoading ? "loading..." : "Register"}
            </button>
            <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
          </form>
        </main>
      </div>
    </>
  );
};

export default Register;
