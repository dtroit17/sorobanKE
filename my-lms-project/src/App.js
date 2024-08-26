// this file sets up the main application , including routing and context providers

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogList from './components/Blog/BlogList';
import CourseList from './components/Course/CourseList';
import CampaignList from './components/Crowdfunding/CampaignList';
import NFTList from './components/NFT/NFTList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import { IPFSProvider } from './context/IPFSContext';

const App = () => {
  return (
    <AuthProvider>
      <IPFSProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/blog" component={BlogList} />
            <Route path="/courses" component={CourseList} />
            <Route path="/crowdfunding" component={CampaignList} />
            <Route path="/nfts" component={NFTList} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" exact component={BlogList} />
          </Switch>
        </Router>
      </IPFSProvider>
    </AuthProvider>
  );
};

export default App;
