import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { FormBg } from "../components/FormBg";
import { FormHeading } from "../components/Heading";
import { TextFeild } from "../components/TextField";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = () => {
    history.push(`/signup`);
  };
  const handleLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    fetch("http://localhost:4000/user/login", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        const { token } = json;
        console.log(token);
        setPasswordError("");
        setEmailError("");
        if (token) {
          localStorage.setItem("token", token);
          history.push("/");
        } else {
          const { message } = json;
          if (message) {
            if (message.includes("Password")) {
              setPasswordError(message);
            } else {
              setEmailError(message);
            }
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

  return (
    <FormBg>
      <FormHeading text="Login" />
      <TextFeild
        type="email"
        id="email"
        label="Email"
        value={email}
        callback={setEmail}
        error={emailError}
      />
      <TextFeild
        type="password"
        id="password"
        label="Password"
        value={password}
        callback={setPassword}
        error={passwordError}
      />
      <Link
        className=" flex justify-end underline text-sm text-blue-600 hover:text-blue-800 visited:text-purple-600 mx-2 w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2"
        to="/reset"
      >
        Forgot Password?
      </Link>
      <div className="flex sm:mx-2 mt-6 justify-between sm:justify-around w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2 ">
        <Button
          handleClick={handleLogin}
          text="Login"
          disabled={!email || !password}
        />
        <Button secondary handleClick={handleSignup} text="Sign Up" />
      </div>
    </FormBg>
  );
}

export default Login;
