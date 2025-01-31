import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreateNewProject from './pages/CreateNewProject';
import MyProjects from './pages/MyProjects';
import ProjectDetail from './pages/ProjectDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='main'>
      <BrowserRouter>
    <Routes>
      <Route index element={<App/>}/>
      <Route path='NewProject' element={<CreateNewProject/>}/>
      <Route path='MyProjects' element={<MyProjects/>}/>
      <Route path='/ProjectDetail/:id' element={<ProjectDetail/>}/>
    </Routes>
  </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();