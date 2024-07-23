import React from "react";

import { gameboytest } from "../assets"; // It seems you imported this but didn't use it
import {
  Danielle_Ang,
  Donald_Xu,
  Hanna_De_Los_Santos,
  Jersey_To,
  Matthew_Sanchez,
  Riley_Veracruz,
  Shanette_Presas,
  Sophia_Sarreal,
} from "../assets/member_photos";

const AboutUs = () => {
  const people = [
    {
      img: Jersey_To,
      name: "Jersey To",
      role: "Product Owner",
    },
    {
      img: Shanette_Presas, 
      name: "Shanette Presas",
      role: "Scrum Master",
    },
    {
      img: Hanna_De_Los_Santos, 
      name: "Hannah De Los Santos",
      role: "Software Quality Assurance ",
    },
    {
      img: Sophia_Sarreal, 
      name: "Sophia Sarreal",
      role: "Software Quality Assurance ",
    },
    {
      img: Danielle_Ang, 
      name: "Danielle Ang ",
      role: "Web Designer ",
    },
    {
      img: Donald_Xu, 
      name: "Donald Xu",
      role: "Frontend Developer",
    },
    {
      img: Matthew_Sanchez, 
      name: "Matthew  Sanchez",
      role: "Backend Developer",
    },
    {
      img: Riley_Veracruz, 
      name: "Riley Veracruz",
      role: "Backend Developer",
    },
  ];

  return (
    <div className="m-5 flex flex-wrap justify-center">
      {people.map((person, index) => (
        <PersonTemplate
          key={index}
          image={person.img}
          name={person.name}
          role={person.role}
        />
      ))}
    </div>
  );
};

const PersonTemplate = ({ image, name, role }) => {
  return (
    <div className="p-5 rounded-lg">
      <div className="w-80 h-80 overflow-clip rounded-full flex justify-center items-center">
      <img
        src={image}
        alt={`${name}`}
        className="w-80"
      />
      </div>
      <h2 className="text-xl font-bold text-center mt-4 text-white">{name}</h2>
      <p className="text-center text-white">{role}</p>
    </div>
  );
};

export default AboutUs;
