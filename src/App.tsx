
import { Routes, Route, Link } from "react-router-dom";
import { FC } from "react";
import './App.css';
import ExpenseCard from "./components/ExpenseCard";
import ExpenseInput from "./components/ExpenseInput";
import ExpenseList from "./components/ExpenseList";


const App: FC = () => {

  return (
    <div>
      <nav>
        <a href="/expenses">
          Budget Magic
        </a>
        <div>
          <li>
            <Link to={"/expenses"}>
              Expenses
            </Link>
          </li>
          <li>
            <Link to={"/add"}>
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path={"/expenses"} element={ExpenseList} />
          <Route path ="/add" element={ExpenseInput} />
          <Route path="/expenses/:id" element={ExpenseCard} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
