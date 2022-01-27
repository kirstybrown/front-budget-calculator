import { FC } from "react";
import React, { Switch, Route, Link } from "react-router-dom";
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
        <Switch>
          <Route exact path={["/", "/expenses"]} component={ExpenseList} />
          <Route exact path="/add" component={ExpenseInput} />
          <Route exact path="/expenses/:id" component={ExpenseCard} />
        </Switch>
      </div>

    </div>
  );
}

export default App;
