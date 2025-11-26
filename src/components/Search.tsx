import styled from "styled-components";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0;

  input {
    width: 300px;
    text-align: left
    padding: 0.2rem 1rem;
    font-size: 1rem;
    border: 4px solid #ccc;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.3s;

  }
`;

const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <SearchContainer>
      <h3>Consultar:</h3>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Digite para consultar"
      />
    </SearchContainer>
  );
};

export default Search;


