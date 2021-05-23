import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { FormBg } from "../components/FormBg";
import { FormHeading } from "../components/Heading";
import { TextFeild } from "../components/TextField";

function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (cpassword && password !== cpassword) {
      setCpasswordError("Passwords dont match");
    } else {
      setCpasswordError("");
    }
  }, [cpassword, password, setCpasswordError]);
  const handleSignup = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        email,
        password,
      }),
    };
    fetch("http://localhost:4000/user/signup", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        const { token } = json;
        setPasswordError("");
        setEmailError("");

        if (token) {
          localStorage.setItem("token", token);
          history.push(`/`);
        } else {
          const { message } = json;
          if (message) {
            setEmailError(message);
          } else {
            const { errors } = json;
            const { msg } = errors[0];
            if (msg.toLowerCase().includes("email")) {
              setEmailError(msg);
            } else {
              setPasswordError(msg);
            }
          }
        }
      });
  };
  const handleLogin = () => {
    history.push(`/login`);
  };

  return (
    <FormBg>
      <FormHeading text="SignUp" />
      <TextFeild
        type="email"
        id="email"
        label="Email"
        value={email}
        callback={setEmail}
        error={emailError}
      />
      <TextFeild
        type="text"
        id="fname"
        label="First Name"
        value={fname}
        callback={setFname}
      />
      <TextFeild
        type="text"
        id="lname"
        label="Last Name"
        value={lname}
        callback={setLname}
      />
      <TextFeild
        type="password"
        id="password"
        label="Password"
        value={password}
        callback={setPassword}
        error={passwordError}
      />
      <TextFeild
        type="password"
        id="cpassword"
        label="Confirm Password"
        value={cpassword}
        callback={setCpassword}
        error={cpasswordError}
      />

      <div className="flex justify-between sm:mx-2 sm:justify-around w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2 ">
        <Button
          handleClick={handleSignup}
          disabled={
            !lname || !fname || !email || !password || password !== cpassword
          }
          text="Sign Up"
        />
        <Button secondary handleClick={handleLogin} text="Login" />
      </div>
    </FormBg>
  );
}

export default Signup;
