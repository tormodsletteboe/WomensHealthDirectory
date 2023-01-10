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
    dispatch({ type: 'ADD_TO_NEWSLETTER', payload: email });
  }; // end registerUser
  
  function autfillRegister() {
    setUsername("Tia Theisen");
    setPassword("tia123");
    setEmail("tiatheisen@gmail.com");
    setAge("35");
    setZip("55401");
  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 onClick={autfillRegister}>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Grid container direction="column" spacing={2} mt={5}>
        <Grid item>
         
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
