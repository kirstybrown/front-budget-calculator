import { FC, useState, ChangeEvent} from "react";
import ExpenseService from "../services/ExpenseService";
import ExpenseInterface from '../domain/Expense';

const ExpenseInput: FC = () => {

  const initialExpenseState = {
    id: null,
    expenseName: "",
    expenseAmount: 0,
    expenseCategory: "",
    published: false
  };
  const [expense, setExpense] = useState<ExpenseInterface>(initialExpenseState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const saveExpense = () => {
    let data = {
      expenseName: expense.expenseName,
      expenseAmount: expense.expenseAmount,
      expenseCategory: expense.expenseCategory
    };

    ExpenseService.create(data)
      .then((response: any) => {
        setExpense({
          id: response.data.id,
          expenseName: response.data.expenseName,
          expenseAmount: response.data.expenseAmount,
          expenseCategory: response.data.expenseCategory,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newExpense = () => {
    setExpense(initialExpenseState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Expense added successfully!</h4>
          <button className="btn btn-success" onClick={newExpense}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="expenseName">Expense Name</label>
            <input
              type="text"
              id="expenseName"
              placeholder="Expense name"
              className="form-control"
              required
              value={expense.expenseName}
              onChange={handleInputChange}
              name="expenseName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="expenseCategory">Expense Category</label>
            <input
              type="text"
              id="expenseCategory"
              placeholder="Expense Category"
              className="form-control"
              required
              value={expense.expenseCategory}
              onChange={handleInputChange}
              name="expenseCategory"
            />
          </div>

          <div className="form-group">
            <label htmlFor="expenseAmount">Amount</label>
            <input
              type="number"
              id="expenseAmount"
              placeholder="Amount"
              className="form-control"
              required
              value={expense.expenseAmount}
              onChange={handleInputChange}
              name="expenseAmount"
            />
          </div>

          <button onClick={saveExpense} className="btn btn-success">
            Add Expense
          </button>
        </div>
      )}
    </div>

  );
};

export default ExpenseInput;