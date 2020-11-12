import axios from "axios";

const initialState = {
  bills: [],
};

const REQUEST_BILLS = "REQUEST_BILLS",
  ADD_BILL = "ADD_BILL",
  REMOVE_BILL = "REMOVE_BILL";

export const requestAllBills = () => {
  return (dispatch) => {
    return axios.get("/api/bills").then(({ data }) => {
      dispatch(getAllBills(data));
    });
  };
};

const getAllBills = (data) => {
  return {
    type: REQUEST_BILLS,
    payload: data,
  };
};

export const addBill = (name, cost, date, type) => {
  return (dispatch) => {
    return axios
      .post("/api/bills/add", {
        name,
        cost,
        date,
        type,
      })
      .then(({ data }) => {
        dispatch(concatBill(data[0]));
      });
  };
};

const concatBill = (bill) => {
  return {
    type: ADD_BILL,
    payload: bill,
  };
};

export const removeBill = (id) => {
  return (dispatch) => {
    axios.delete(`/api/bills/${id}`)
    .then(res => dispatch(filterBill(id)))
  }
};

const filterBill = (id) => {
  return {
    type: REMOVE_BILL,
    payload: id,
  };
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_BILLS:
      return { ...state, bills: payload };
    case ADD_BILL:
      return { ...state, bills: [...state.bills, payload] };
    case REMOVE_BILL:
      return {
        ...state,
        bills: state.bills.filter((bill) => bill.bill_id !== payload),
      };
    default:
      return state;
  }
}
