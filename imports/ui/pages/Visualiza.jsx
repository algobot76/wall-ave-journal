import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import Chart from '../components/Chart';
import NewsModal from '../components/NewsModal';
import FinancialStatements from '../components/FinancialStatements';

import {
  fetchCompanies,
  specificStockRequest,
  updateIndices,
  fetchNewsBySymbol
} from '../actions';

const Title = styled.p`
  text-align: center;
`;

function Visualiza() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  const namesMap = new Map();
  const names = useSelector(state => state.companies.names);
  if (names && names.length > 0) {
    names.forEach(name => {
      namesMap.set(name.symbol, name.fullName);
    });
  }
  const company = useSelector(state => state.companies.selectedCompany);
  const data = useSelector(state => state.stocks.prices);
  const startIndex = useSelector(state => state.chart.startIndex);
  const endIndex = useSelector(state => state.chart.endIndex);
  const news = useSelector(state => state.news.articles);

  useEffect(() => {
    dispatch(specificStockRequest(company));
    dispatch(fetchNewsBySymbol(company));
  }, [company]);
  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(updateIndices(0, data.length - 1));
    }
  }, [data]);

  let startDate = '';
  let endDate = '';
  if (data && data.length > 0) {
    startDate = data[startIndex]['date'];
    endDate = data[endIndex]['date'];
  }

  const filteredNews = [];
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (news && news.length > 0) {
      news.forEach(article => {
        const curr = new Date(article['publishedAt']);
        if (
          curr.getTime() >= start.getTime() &&
          curr.getTime() <= end.getTime()
        ) {
          filteredNews.push(article);
        }
      });
    }
  }

  return (
    <div className="section has-background-light">
      <div className="columns">
        <Sidebar names={names} />
        <div className="column">
          <Title className="title">{company}</Title>
          {namesMap.get(company) && (
            <Title className="subtitle">({namesMap.get(company)})</Title>
          )}
          <NewsModal
            buttonName="News"
            title={
              startDate && endDate
                ? `News from ${startDate} to ${endDate}`
                : 'News'
            }
            content={filteredNews}
          />
          <FinancialStatements symbol={company} />
          <Chart data={data ? data : []} />
        </div>
      </div>
    </div>
  );
}

export default Visualiza;
