import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
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
