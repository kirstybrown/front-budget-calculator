import http from "../http-common";
import ExpenseInterface from "../domain/Expense";

const getAll = () =>{
    return http.get<Array<ExpenseInterface>>("/expenses");
};

const get = (id: any) => {
    return http.get<ExpenseInterface>(`/expenses/${id}`);
};

const create = (data: ExpenseInterface) => {
    return http.post<ExpenseInterface>("/expenses", data);
};

const update = (id: any, data: ExpenseInterface) => {
    return http.put<any>(`/expenses/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/expenses/${id}`);
};

const ExpenseService = {
    getAll,
    get,
    create,
    update,
    remove
}

export default ExpenseService;