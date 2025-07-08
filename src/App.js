import CountryDropdown from './features/CountriesDropdown/CountriesDropdown';
import ExcelDataReader from './features/ExcelDataReader';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from './features/InfiniteScroll/InfiniteScroll';
import DivInfinite from './features/DivInfiniteScroll/DivInfiniteScroll';

function App() {
  return (
    <div>
      {/* <ExcelDataReader/>
      <CountryDropdown/> */}
      {/* <InfiniteScroll/> */}
      <DivInfinite />
    </div>
  );
}

export default App;
