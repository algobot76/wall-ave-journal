import {
  FETCH_STOCKS_BEGIN,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_FAILURE,
  SELECT_STOCK
} from '../actions/stockActions';

import stocks from '../seeds/stocks';

const initialState = {
  names: [],
  selectedStock: 'AAPL',
  data: stocks
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STOCK:
      return {
        ...state,
        selectedCompany: action.payload.company,
        data: action.payload.prices
      };
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        names: action.payload.stocks.map(stock => stock.company),
        prices: action.payload.stocks.map(stock => stock.prices)
      };

    case FETCH_STOCKS_BEGIN:
    default:
      return state;

    case FETCH_STOCKS_FAILURE:
      return action.payload.error;
  }
};

export default stockReducer;
