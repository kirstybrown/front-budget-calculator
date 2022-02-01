import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExpenseService from '../services/ExpenseService';
import ExpenseInterface from '../domain/Expense';
import ExpenseCard from "./ExpenseCard";

const ExpenseList: FC = () => {
  const [ expenses, setExpenses ] = useState<Array<ExpenseInterface>>([]);
  const [ currentExpense, setCurrentExpense ] = useState<ExpenseInterface | null>(null);
  const [ currentIndex, setCurrentIndex ] = useState<number>(-1);

  useEffect(() => {
    retrieveExpenses();
  }, []);

  const retrieveExpenses = () => {
    ExpenseService.getAll()
      .then((response: any) => {
        setExpenses(response.data);
        console.log(expenses);
        console.log("expenses[0].name");
        console.log(expenses[0]?.name);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

 const refreshList = () => {
    retrieveExpenses();
    setCurrentExpense(null);
    setCurrentIndex(-1);
  };

  const setActiveExpense = (expense: ExpenseInterface, index: number) => {
    setCurrentExpense(expense);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>List of Expenses</h4>

        <ul className="list-group">
          {expenses &&
          expenses.map((expense, index) => (
            <li
            className={
              "list-group-item " + (index === currentIndex ? "active" : "")
            }
            onClick={() => setActiveExpense(expense, index)}
            key={index}
            >
              {expense.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentExpense ? (
          <div>
            <h4>Expense</h4>
            <div>
              <label>
                <strong>Expense:</strong>
              </label>{" "}
              {currentExpense.name}
            </div>
            <div>
              <label>
                  <strong>Category:</strong>
              </label>{" "}
              {currentExpense.category}
            </div>
            <div>
              <label>
                  <strong>Amount:</strong>
              </label>{" "}
              {currentExpense.amount}
            </div>

            <Link
              to={"/expenses/" + currentExpense.id} // Need to change this link - where does it go??
              className="badge badge-warning"
            >
            Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Expense...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExpenseList;