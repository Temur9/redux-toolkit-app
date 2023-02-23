import React, { useEffect, useState } from "react";
import { Input } from "../UI";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  authUserFailure,
  authUserStart,
  authUserSuccess,
} from "../slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";
import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(authUserStart());

    const user = { username: name, email, password };

    try {
      const response = await AuthService.userRegister(user);
      dispatch(authUserSuccess(response.user));
      navigate('/')
    } catch (error) {
      dispatch(authUserFailure(error.response.data.errors));
    }
  };

useEffect(()=>{
  if(loggedIn) {
    navigate('/')
  }
},[loggedIn])

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
