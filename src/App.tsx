import { FC } from "react";
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
      <div className='header'>
        <div className="input-container">
          <input type="text" placeholder="Expense" />
          <input type="number" placeholder="Amount" />
        </div>
        <button>Add Expense</button>
      </div>
      <div className='expense-list'></div>
    </div>
  );
}

export default App;
