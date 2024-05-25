import { useState, useEffect } from "react";
import { logo_default_text } from "../../assets/logo";
import { Link } from "react-router-dom";
import { MailIcon, KeyIcon, EyeIcon, EyeClosedIcon } from "@primer/octicons-react";

const Login = () => {
  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    //change base to white
    document.body.style.backgroundColor = 'white';
    document.body.style.overflow = 'hidden';
    
    //cleanup function 
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleHide = () => {
    setHidePass(!hidePass);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className='flex flex-col'>
      <Link to='/' className="flex justify-end pb-2 hover:text-primary">Create Account</Link>
      <hr className="left-0 right-0 h-px border-0 bg-black"/>
      </div>
      <div className='my-auto flex justify-center'>
      <div className="flex flex-col text-primary justify-center items-center">
        <img src={logo_default_text} width={345} alt="Logo" />
        <div>
          <div className="pt-4 space-y-4">
            <label className="daisy-input daisy-input-bordered flex items-center gap-2 bg-white">
              <MailIcon size={16} />
              <input type="email" className="grow" placeholder="Email" />
            </label>

            <label className="daisy-input daisy-input-bordered flex items-center gap-2 bg-white">
                <KeyIcon size={16} />
                <input type={hidePass ? "password" : "text"} className="grow" placeholder="Password" />
                <button type="button" onClick={handleHide} className="mb-1">
                  {hidePass ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              </label>
            <div>
            <Link to="/" className="daisy-btn daisy-btn-secondary px-10 text-white hover:bg-base-200">
              Login
            </Link>
            </div>
            <div>
            <Link to="/" className=" font-medium underline underline-offset-1">
              Can't login??
            </Link>
            </div>


          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
