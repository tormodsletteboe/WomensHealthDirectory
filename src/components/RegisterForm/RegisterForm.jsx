import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        email: email,
        age: age,
        zip_code: zip,
      },
    });
  }; // end registerUser
  //TODO: this is where I am wednesday night styling register form
  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Grid container direction="column" spacing={2} mt={5}>
        <Grid item>
          {/* <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label> */}
          <TextField
          sx={{ width: "100%" }}
            label={"Username"}
            type={"text"}
            name={"username"}
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>
        <Grid item>
          {/* <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label> */}
          <TextField
          sx={{ width: "100%" }}
            label={"Password"}
            type={"password"}
            name={"password"}
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item>
          {/* <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label> */}
          <TextField
          sx={{ width: "100%" }}
            label={"Email"}
            type={"email"}
            name={"email"}
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item>
          {/* <label htmlFor="age">
            Age:
            <input
              type="age"
              name="age"
              value={age}
              required
              onChange={(event) => setAge(event.target.value)}
            />
          </label> */}
          <TextField
          sx={{ width: "100%" }}
            label={"Age"}
            type={"age"}
            name={"age"}
            value={age}
            required
            onChange={(event) => setAge(event.target.value)}
          />
        </Grid>
        <Grid item>
          {/* <label htmlFor="zip">
            Zip Code:
            <input
              type="zip"
              name="zip"
              value={zip}
              required
              onChange={(event) => setZip(event.target.value)}
            />
          </label> */}
          <TextField
          sx={{ width: "100%" }}
            label={"Zip Code"}
            type={"zip"}
            name={"zip"}
            value={zip}
            required
            onChange={(event) => setZip(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
          sx={{ width: "100%" }}
            variant="contained"
            className="btn"
            type="submit"
            name="submit"
            value="Register"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
