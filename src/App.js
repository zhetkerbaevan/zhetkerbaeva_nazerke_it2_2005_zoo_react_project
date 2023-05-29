import React from 'react';
import './App.css'
import ListAnimals from "./components/ListAnimals/ListAnimals";
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import ListUsers from "./components/Users/ListUsers";
import Footer from "./components/Footer/Footer";
import AddAnimal from "./components/AddAnimal/AddAnimal";
import EditAnimal from "./components/EditAnimal/EditAnimal";
import SearchFilter from "./components/SearchFilter/SearchFilter";
import ErrorBoundry from "./components/ErrorHandling/ErrorBoundry";


const App = (props) => {
  return (
      <div className="div-body">
          <ErrorBoundry>
          <Router>
          <Navbar />
          <main>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/users" element={<ListUsers />} />
                  <Route path="/animals" element={<ListAnimals />} />
                  <Route path="/add/animal" element={<AddAnimal />} />
                  <Route path="/search" element={<SearchFilter />} />
                  <Route path="/edit/animal/:animal_id" element={<EditAnimal />}/>
              </Routes>
          </main>
          <Footer/>
      </Router>
          </ErrorBoundry>
      </div>
  );
}

export default App;
