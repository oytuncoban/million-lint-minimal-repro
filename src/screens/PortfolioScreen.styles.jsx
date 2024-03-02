import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px;
  background-color: white;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 0px 10px rgba(16, 28, 36, 0.06));
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding: 20px;
  border-bottom: 1px solid #eef2f5;
`;

export const Search = styled.div`
  display: flex;

  .search-input {
    display: flex;
    width: 100%;
  }
`;
