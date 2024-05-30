import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Link to="/login">
        <div className="daisy-btn daisy-btn-secondary">Login</div>
      </Link>
      <Link to="/create-account">
        <div className="daisy-btn daisy-btn-secondary">Create Account</div>
      </Link>
      <Link to="/inventory">
        <div className="daisy-btn daisy-btn-secondary">Create Account</div>
      </Link>
    </>
  );
};

export default Home;
