import React, { useEffect, useState } from "react";
import { Input } from "../UI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import {
  authUserFailure,
  authUserStart,
  authUserSuccess,
} from "../slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(authUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(authUserSuccess(response.user));
      navigate('/')
    } catch (error) {
      dispatch(authUserFailure(error.response.data.errors));
    }
  };


  // Tokenni 
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
            <h1 className="h3 mb-3 fw-normal">Please login</h1>
            <ValidationError />
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
              onClick={loginHandler}
              disabled={isLoading}>
              {isLoading ? "loading..." : "Log in"}
            </button>
            <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
          </form>
        </main>
      </div>
    </>
  );
};

export default Login;
