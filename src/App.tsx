import { FC, ChangeEvent, useState } from "react";
import './App.css';
import Expense from "./components/expense.component";
import {IExpense} from './Interfaces';

const App: FC = () => {

  const [expense, setExpense] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [expenseList, setExpenseList] = useState<IExpense[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "expense") {
      setExpense(event.target.value);
    };
    if (event.target.name === "amount") {
      setAmount(Number(event.target.value));
    };
    if (event.target.name === "category") {
      setCategory(event.target.value);
    };
  };

  const addExpense = (): void => {
    const newExpense = {expenseName: expense, expenseAmount: amount, expenseCategory: category};
    setExpenseList([...expenseList, newExpense]);
    setExpense("");
    setAmount(0);
    setCategory("");
  }

  const deleteExpense = (expenseToDelete: string) : void => {
    setExpenseList(expenseList.filter((expense) => {
      return expense.expenseName !== expenseToDelete;
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Expense" 
            name="expense" 
            value={expense}
            onChange={handleChange}
          />
          <input 
            type="number" 
            placeholder="Amount" 
            name="amount"
            value={amount}
            onChange={handleChange}
          />
          <input 
            type="text" 
            placeholder="Category" 
            name="category"
            value={category}
            onChange={handleChange}
          />
        </div>
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div className='expense-list'>
        {expenseList.map((expense: IExpense, key: number) => {
          return <Expense key={key} expense={expense} deleteExpense={deleteExpense}/>;
        })}
      </div>
    </div>
  );
}

export default App;
