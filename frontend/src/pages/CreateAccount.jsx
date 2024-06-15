import { useState, useEffect } from "react";
import { logo_default_text } from "../assets/logo";
import { Link } from "react-router-dom";
import {
  MailIcon,
  KeyIcon,
  EyeIcon,
  EyeClosedIcon,
  PersonIcon,
} from "@primer/octicons-react";

const CreateAccount = () => {
  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    //change base to white
    document.body.style.backgroundColor = "white";
    document.body.style.overflow = "hidden";

    //cleanup function
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleHide = () => {
    setHidePass(!hidePass);
  };

  return (
    <div className="min-h-screen flex flex-col mx-5">
      <div className="flex flex-col max-w-full">
        <Link to="/login" className="flex justify-end pt-2 pb-1 hover:text-primary">
          Login
        </Link>
        <hr className="h-px border-0 bg-black" />
      </div>
      <div className="my-auto flex justify-center">
        <div className="flex flex-col text-primary justify-center items-center w-full">
          <img src={logo_default_text} width={345} alt="Logo" />
          <div className="pt-4 space-y-4 w-full max-w-xs">
            
            <div className="flex justify-center text-lg font-semibold">
              Create Account
            </div>

            <label className="input input-bordered flex items-center gap-2 bg-white">
              <PersonIcon size={16} />
              <input type="name" className="grow border-none" placeholder="Username" />
            </label>


            <label className="input input-bordered flex items-center gap-2 bg-white">
              <MailIcon size={16} />
              <input type="email" className="grow border-none" placeholder="Email" />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-white">
              <KeyIcon size={16} />
              <input
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

            <label className="input input-bordered flex items-center gap-2 bg-white">
              <KeyIcon size={16} />
              <input
                type={hidePass ? "password" : "text"}
                className="grow border-none"
                placeholder="Confirm Password"
              />
              <button type="button" onClick={handleHide} className="mb-1">
                {hidePass ? (
                  <EyeClosedIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </button>
            </label>

            <div className="flex flex-col justify-center">
                <span className='text-xs mb-3'>
                By creating an account, you agree to the Terms of use and Privacy Policy. 
                </span>
                {/* #TODO insert hyperlink in terms of use */}
                <Link
                  to="/"
                  className="btn btn-secondary px-10 text-white transition ease-in-out delay-150 hover:bg-base-200 hover:-translate-y-1 hover:scale-105"
                >
                  Create Account
                </Link>
              </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
