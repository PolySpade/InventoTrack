import { Link } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
const Home = () => {
  const auth = useAuthUser()
  console.log(auth.email);
  return (
    <>
      <h1 className=" text-white">Welcome {auth.email}</h1>
      <Link to="/login">
        <div className="btn btn-secondary">Login</div>
      </Link>
      <Link to="/create-account">
        <div className="btn btn-secondary">Create Account</div>
      </Link>
      <Link to="/inventory">
        <div className="btn btn-secondary">Inventory</div>
      </Link>
    </>
  );
};

export default Home;
