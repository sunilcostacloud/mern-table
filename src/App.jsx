import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeesTable from './components/employeesTable/EmployeesTable';
import EmployeesProfile from './components/employeesTable/EmployeesProfile';
import WeatherApiPage from "weatherApi/WeatherApiPage"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeesTable />} />
          <Route path="/employee/:id" element={<EmployeesProfile />} />
          <Route path="*" element={<div> <h1>Page Not Found</h1> </div>} />
        </Routes>
      </BrowserRouter>
      <WeatherApiPage />
    </>
  )
}

export default App