import Sidebar from "../../components/layout/Sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <a href="/login">
        <div className="daisy-btn daisy-btn-secondary">Login</div>
      </a>
      <a href="/create-account">
        <div className="daisy-btn daisy-btn-secondary">Create Account</div>
      </a>
    </>
  );
};

export default Home;
