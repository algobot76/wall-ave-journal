import {
  FETCH_COMPANIES_BEGIN,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
  SELECT_COMPANY
} from '../actions/companyActions';

import stocks from '../seeds/stocks';

const initialState = {
  names: [],
  selectedCompany: 'AAPL',
  data: stocks
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_COMPANY:
      return {
        ...state,
        selectedCompany: action.payload.company
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        names: action.payload.companies.map(company => company.symbol)
      };
    case FETCH_COMPANIES_BEGIN:
    default:
      return state;
  }
};

export default companyReducer;
