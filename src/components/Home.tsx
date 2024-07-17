import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to FindMyEvents</h1>
      <Link to="/events" className="btn btn-primary">View Events</Link>
    </div>
  );
};

export default Home;