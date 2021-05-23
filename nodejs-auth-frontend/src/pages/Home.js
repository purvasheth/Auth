import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import { FormHeading } from "../components/Heading";

function Home() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // TODO: check if its valid and get user info
      const requestOptions = {
        method: "GET",
        headers: { token },
      };
      fetch("http://localhost:4000/user/me", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          const { message } = json;
          if (message) {
            toast.success(message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            setUser(json);
          }
        });
    } else {
      history.push(`/login`);
    }
  }, [history]);
  const handleSignout = () => {
    localStorage.removeItem("token");
    history.push(`/login`);
  };
  return (
    <div className="m-8">
      <FormHeading text={`Welcome! ${user.firstname}`} />
      <Button text="Sign Out" handleClick={handleSignout} />
      {error && <p>{error}</p>}
    </div>
  );
}

export default Home;
