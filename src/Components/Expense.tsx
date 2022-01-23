import { IExpense } from '../Interfaces';

interface Props {
    expense: IExpense;
}

const Expense = ({expense}: Props) => {
  return (
    <div className='expense'>
        <div className='content'>
            <span>{expense.expenseName}</span>
            <span>{expense.expenseAmount}</span>
            <span>{expense.expenseCategory}</span>
        </div>
        <button>X</button>
    </div>
  );
};

export default Expense;