import { useState, useEffect } from "react";
import { logo_default_text } from "../assets/logo";
import { Link, useNavigate } from "react-router-dom";
import {
  MailIcon,
  KeyIcon,
  EyeIcon,
  EyeClosedIcon,
} from "@primer/octicons-react";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import axios from "axios";
import { useAuth } from "../routes/AuthContext";

const Login = () => {
  const API_URL =import.meta.env.VITE_API_URL;
  const [hidePass, setHidePass] = useState(true);
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { refreshPermissions } = useAuth();

  useEffect(() => {
    // Change base to white
    document.body.style.backgroundColor = "white";
    document.body.style.overflow = "hidden";

    // Cleanup function
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleHide = () => {
    setHidePass(!hidePass);
  };

  const handleCreate = () => {
    alert("Contact Admin to Create an Account");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    };
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, data);
      if (response.status === 200) {
        signIn({
          auth: {
            token: response.data.token,
            type: "bearer"
          },
          expiresIn: response.data.expiresIn,
          tokenType: "bearer",
          userState: {
            email: response.data.user.email,
            role_id: response.data.user.role,
            name: response.data.user.name
          }
        });
        refreshPermissions();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col mx-5">
      <div className="flex flex-col max-w-full">
        <button onClick={handleCreate} className="flex justify-end pt-2 pb-1 hover:text-primary">
          Create Account
        </button>
        <hr className="h-px border-0 bg-black" />
      </div>
      <form onSubmit={handleSubmit} method="post" className="my-auto flex justify-center">
        <div className="flex flex-col text-primary justify-center items-center w-full">
          <img src={logo_default_text} width={345} alt="Logo" />
          <div>
            <div className="pt-4 space-y-4 w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2 bg-white">
                <MailIcon size={16} />
                <input name="email" type="email" className="grow border-none" placeholder="Email" />
              </label>

              <label className="input input-bordered flex items-center gap-2 bg-white">
                <KeyIcon size={16} />
                <input name="password"
                  type={hidePass ? "password" : "text"}
                  className="grow border-none"
                  placeholder="Password"
                />
                <button type="button" onClick={handleHide} className="mb-1">
                  {hidePass ? (
                    <EyeClosedIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </label>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div className="flex justify-center">
                <button type="submit"
                  className="btn btn-secondary px-10 text-white transition ease-in-out delay-150 hover:bg-base-200 hover:-translate-y-1 hover:scale-105"
                >
                  Login
                </button>
              </div>

              <div className="flex justify-center">
                <a onClick={() => alert("Contact Admin!")} className=" hover:cursor-pointer">
                  Can't login?
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
