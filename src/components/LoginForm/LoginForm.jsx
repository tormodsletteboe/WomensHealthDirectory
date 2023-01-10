import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login
  function fillData(event) {
    event.preventDefault();
    setUsername("Tia Theisen");
    setPassword("tia123");
  }
  function loginAsAdmin(event) {
    event.preventDefault();
    setUsername("admin");
    setPassword("admin");
  }
  return (
    <form className="formPanel" onSubmit={login} >
      <h2 onClick={fillData}   >
        Sign in to the Vifi
      </h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Grid container direction="column" spacing={5} mt={5}>
        <Grid item >
          <TextField
            sx={{ width: "100%" }}
            label={"Username"}
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            mb={3}
            onClick={loginAsAdmin}
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: "100%" }}
            label={"Password"}
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            mt={3}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ width: "100%", minHeight: "50px" }}
            className="btn"
            type="submit"
            name="submit"
            value="Log In"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
