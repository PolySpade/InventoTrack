import { useState, useEffect } from "react";
import { logo_default_text } from "../assets/logo";
import { Link, useNavigate } from "react-router-dom";
import {
  MailIcon,
  KeyIcon,
  EyeIcon,
  EyeClosedIcon,
  PersonIcon,
} from "@primer/octicons-react";
import axios from "axios";

const CreateAccount = () => {
  const [hidePass, setHidePass] = useState(true);
  const [roledata, setRoleData] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleHide = () => {
    setHidePass(!hidePass);
  };

  const getRoleData = () => {
    axios
      .get(`${API_URL}/roles/`)
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    getRoleData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(event.target);

    if(formData.get('role') === null){
      setError('Select A Role!');
    }else if (formData.get('name') === null) {
      setError("Input your name!");
    }else if (password !== confirmPassword) {
      setError("Passwords do not match");
    }else if (formData.get('email') === null) {
      setError("Input your email!");
    }
    else {
      setError("");
      const data = {
        email: formData.get("email"),
        name: formData.get('name'),
        password: formData.get('password'),
        role: formData.get('role')
      }
      try{
        const response = await axios.post(`${API_URL}/accounts/CreateAccount`,data);
        if(response.status === 201){
          navigate('/login');
        }
      }catch(err){
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col mx-5">
      <div className="flex flex-col max-w-full">
        <Link to="/login" className="flex justify-end pt-2 pb-1 hover:text-primary">
          Login
        </Link>
        <hr className="h-px border-0 bg-black" />
      </div>
      <form className="my-auto flex justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col text-primary justify-center items-center w-full">
          <img src={logo_default_text} width={345} alt="Logo" />
          <div className="pt-4 space-y-4 w-full max-w-xs">
            <div className="flex justify-center text-lg font-semibold">
              Create Account
            </div>

            <div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="warehouse">
                Role
              </label>
              <select name='role' id="role" className="input input-bordered w-full max-w-xs bg-white">
                <option disabled selected value="">
                  Select a Role
                </option>
                {roledata.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.roleName}
                  </option>
                ))}
              </select>
            </div>

            <label className="input input-bordered flex items-center gap-2 bg-white">
              <PersonIcon size={16} />
              <input name="name" type="name" className="grow border-none" placeholder="Name" />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-white">
              <MailIcon size={16} />
              <input name="email" type="email" className="grow border-none" placeholder="Email" />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-white">
              <KeyIcon size={16} />
              <input
                name="password"
                type={hidePass ? "password" : "text"}
                className="grow border-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={handleHide} className="mb-1">
                {hidePass ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-white">
              <KeyIcon size={16} />
              <input
                type={hidePass ? "password" : "text"}
                className="grow border-none"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" onClick={handleHide} className="mb-1">
                {hidePass ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </label>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex flex-col justify-center">
              <span className="text-xs mb-3">
                By creating an account, you agree to the Terms of use and Privacy Policy.
              </span>
              {/* #TODO insert hyperlink in terms of use */}
              <button
                type="submit"
                className="btn btn-secondary px-10 text-white transition ease-in-out delay-150 hover:bg-base-200 hover:-translate-y-1 hover:scale-105"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
