import axios from "axios";

const initialState = {
  bills: [],
};

const REQUEST_BILLS = "REQUEST_BILLS",
  ADD_BILL = "ADD_BILL",
  REMOVE_BILL = "REMOVE_BILL";

export const requestAllBills = () => {
  let data = axios.get("/api/bills").then((res) => res.data);
  return {
    type: REQUEST_BILLS,
    payload: data,
  };
};

export const addBill = (name, cost, date, type) => {
  let data = axios
    .post("/api/bills/add", {
      name,
      cost,
      date,
      type,
    })
    .then((res) => res.data);
  return {
    type: ADD_BILL,
    payload: data,
  };
};

export const removeBill = (id) => {
  axios.delete(`/api/bills/${id}`)
  return {
    type: REMOVE_BILL,
    payload: id
  };
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_BILLS + "_FULFILLED":
      return { ...state, bills: payload };
    case ADD_BILL + "_FULFILLED":
      return { ...state, bills: [...state.bills, payload] };
    case REMOVE_BILL + "_FULFILLED":
      return { ...state, bills: state.bills.filter(el => el.bill_id !== payload) };
    default:
      return state;
  }
}
