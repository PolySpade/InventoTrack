import { Link } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import {
  logo_white,
} from "../assets/logo";

const Home = () => {
  const authUser = useAuthUser();
  let name;
  if (authUser) {
    name = authUser.name;
  } else {
    name = "N/a";
  }

  return (
    <div className='flex flex-row justify-center items-center min-h-screen bg-base-100'>
      <div className='m-10 w-full'>
        <div className="flex flex-col justify-center items-center">
          <img src={logo_white} className="w-96" alt="Inventotrack Logo" />
          <h1 className="text-6xl text-white font-extrabold mt-24 ">
            Welcome to Inventotrack
          </h1>
          <h2 className="text-3xl text-white mt-10 ">
            Hello, {name}!
          </h2>
          <div className=" bg-neutral mt-5 p-8 rounded-3xl shadow-lg ">
          <p className="text-white text-center">
            Inventotrack is a comprehensive order and inventory management software designed to streamline your business operations. Whether you're managing a small business or a large enterprise, our solution provides powerful tools to track orders, manage inventory levels, and optimize your supply chain.
          </p>
          <p className="text-white mt-5 text-center">
            Our features include real-time order and inventory tracking, automated stock alerts, detailed reporting, and more! Stay on top of your orders and inventory with ease and ensure you never run out of stock while efficiently fulfilling customer demands.
          </p>
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <Link to="/about-us" className=" text-accent hover:underline m-2">About Us</Link>
            <Link to="/terms-and-conditions" className="text-accent hover:underline m-2">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
