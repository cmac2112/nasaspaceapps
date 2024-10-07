import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <h1>Whoops, lets get you back</h1>
      <Link to="/solareyes">Home</Link>
    </div>
  );
};

export default NotFound;
