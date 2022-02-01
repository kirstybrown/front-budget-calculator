import { FC, useState, useEffect, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";

import ExpenseService from "../services/ExpenseService";
import ExpenseInterface from '../domain/Expense';

interface Props {
    id: string;
}

const ExpenseCard: FC<Props> = (props: Props) => {

  
  const { id } = useParams<string>();

  const initialExpenseState = {
    id: null,
    name: "",
    amount: 0,
    category: "",
    published: false
  };
  const [currentExpense, setCurrentExpense] = useState<ExpenseInterface>(initialExpenseState);
  const [message, setMessage] = useState<string>("");

  const getExpense = (id: string) => {
    ExpenseService.get(id)
      .then((response: any) => {
        setCurrentExpense(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {

    getExpense(currentExpense.id);
  }, [currentExpense]);

  const handleInputChange = (event: ChangeEvent) => {
    const { id } = event.target;
    setCurrentExpense({ ...currentExpense, [id]: id });
  };

 /*  const updatePublished = (status: boolean) => {
    let data = {
      id: currentExpense.id,
      name: currentExpense.name,
      amount: currentExpense.amount,
      category: currentExpense.category,
      published: status
    };
  

    ExpenseService.update(currentExpense.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentExpense({ ...currentExpense, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }; */

const updateExpense = () => {
  ExpenseService.update(currentExpense.id, currentExpense)
    .then((response: any) => {
      console.log(response.data);
      setMessage("The expense was updated successfully!")
    })
    .catch((e: Error) => {
      console.log(e);
    });
};

const deleteExpense = () => {
  ExpenseService.remove(currentExpense.id)
    .then((response: any) => {
      console.log(response.data);
      <Link to={"/expenses"}>Register</Link>
    })
    .catch((e: Error) => {
      console.log(e);
    });
};

return (

  <div>
      {currentExpense ? (
        <div className="edit-form">
          <h4>Expense</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name of Expense</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentExpense.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentExpense.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={currentExpense.amount}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentExpense.published ? "Published" : "Pending"}
            </div>
          </form>

         {/*  {currentExpense.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )} */}

          <button className="badge badge-danger mr-2" onClick={deleteExpense}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateExpense}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Expense...</p>
        </div>
      )}
    </div>
  );
};


export default ExpenseCard;