
import { Routes, Route, Link } from "react-router-dom";
import { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ExpenseCard from "./components/ExpenseCard";
import ExpenseInput from "./components/ExpenseInput";
import ExpenseList from "./components/ExpenseList";


const App: FC = () => {

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <header className="navbar-brand">
          <h1>Budget Magic</h1>
        </header>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/expenses" className="nav-link">
              Expenses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path ="/add" element={<ExpenseInput />} />
          <Route path="/expenses/:expenseName" element={<ExpenseCard id="id"/>} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
