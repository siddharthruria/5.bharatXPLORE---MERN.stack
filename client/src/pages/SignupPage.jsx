import React, { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { UserContext } from "../context/UserContext";

const SignupPage = () => {
  const { login } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });


  const handleSubmitFunction = async (e) => {
    e.preventDefault();
    const { username, email, password } = credentials;
    const response = await fetch("https://bharatxplore-backend7.onrender.com/api/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      login(responseData.newToken.token);
      enqueueSnackbar("account created successfully", { variant: "success" });
    } else {
      enqueueSnackbar("email/username already exists,", { variant: "error" });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    // signup form taken straight from bootstrap website
    <div className="container position-relative">
      <h2 className="my-4 position-absolute start-50 translate-middle">
        signup to start contributing!
      </h2>
      <form className="py-5 my-4" onSubmit={handleSubmitFunction}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary my-3">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
