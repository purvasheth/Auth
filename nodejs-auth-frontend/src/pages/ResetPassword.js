import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import { FormBg } from "../components/FormBg";
import { FormHeading } from "../components/Heading";
import { TextFeild } from "../components/TextField";

function ResetPassword() {
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

  const handleReset = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    fetch("http://localhost:4000/user/reset", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setPasswordError("");
        setEmailError("");

        const { message } = json;
        if (message) {
          if (message.includes("successfully")) {
            toast.success(message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            history.push(`/login`);
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
      });
  };

  return (
    <FormBg>
      <FormHeading text="Reset Password" />
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
      <TextFeild
        type="password"
        id="cpassword"
        label="Confirm Password"
        value={cpassword}
        callback={setCpassword}
        error={cpasswordError}
      />
      <div className="flex justify-center mx-2 w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2 ">
        <Button
          handleClick={handleReset}
          text="Reset"
          disabled={!email || !password || password !== cpassword}
        />
      </div>
    </FormBg>
  );
}

export default ResetPassword;
