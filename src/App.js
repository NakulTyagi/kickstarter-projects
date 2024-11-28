import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import fetchProjects from './service/apiService'; // Import the service
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const recordsPerPage = 5;

  useEffect(() => {
    // Fetch data using the API service
    fetchProjects(
      (data) => {
        setProjects(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    );
  }, []);

  // Pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = projects.slice(firstIndex, lastIndex);

  return (
    <div className="app-container">
      <h1>Kickstarter Projects</h1>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <Table data={currentRecords} />
          <Pagination
            totalRecords={projects.length}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
