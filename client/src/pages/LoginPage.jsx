import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useContext(UserContext);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5555/api/user/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrUsername,
            password,
          }),
          credentials: "include",
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        login(responseData.token);
        enqueueSnackbar("login successfull", { variant: "success" });
      } else {
        enqueueSnackbar("invalid credentials", { variant: "error" });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container position-relative">
      <h2 className="my-4 position-absolute start-50 translate-middle">
        login to your account
      </h2>
      <form className="py-5 my-4" onSubmit={handleSubmitFunction}>
        <div className="mb-3">
          <label htmlFor="emailOrUsername" className="form-label">
            username or email address
          </label>
          <input
            type="text"
            className="form-control"
            id="emailOrUsername"
            name="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default LoginPage;
