import { IExpense } from '../Interfaces';

interface Props {
    expense: IExpense;
    deleteExpense(expenseToDelete: string): void;
}

const Expense = ({expense, deleteExpense}: Props) => {
  return (
    <div className='expense'>
        <div className='content'>
            <span>{expense.expenseName}</span>
            <span>{expense.expenseAmount}</span>
            <span>{expense.expenseCategory}</span>
        </div>
        <button onClick={() => {
            deleteExpense(expense.expenseName);
        }}>X</button>
    </div>
  );
};

export default Expense;