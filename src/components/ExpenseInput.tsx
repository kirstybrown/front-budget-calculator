import { FC, useState, ChangeEvent} from "react";
import ExpenseService from "../services/ExpenseService";
import ExpenseInterface from '../domain/Expense';

const ExpenseInput: FC = () => {

  const initialExpenseState = {
    id: null,
    name: "",
    amount: 0,
    category: ""
  };
  const [expense, setExpense] = useState<ExpenseInterface>(initialExpenseState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const saveExpense = () => {
    let data = {
      name: expense.name,
      amount: expense.amount,
      category: expense.category
    };

    ExpenseService.create(data)
      .then((response: any) => {
        setExpense({
          id: response.data.id,
          name: response.data.name,
          amount: response.data.amount,
          category: response.data.category,
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
          <h4>Expense submitted successfully!</h4>
          <button className="btn btn-success" onClick={newExpense}>
            Add Another Expense
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Expense Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              required
              value={expense.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Expense Category</label>
            <input
              type="text"
              id="category"
              className="form-control"
              required
              value={expense.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              required
              value={expense.amount}
              onChange={handleInputChange}
              name="amount"
            />
          </div>

          <button onClick={saveExpense} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>

  );
};

export default ExpenseInput;