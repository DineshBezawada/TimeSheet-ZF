import CountryDropdown from './features/CountriesDropdown/CountriesDropdown';
import ExcelDataReader from './features/ExcelDataReader';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from './features/InfiniteScroll/InfiniteScroll';

function App() {
  return (
    <div>
      {/* <ExcelDataReader/>
      <CountryDropdown/> */}
      <InfiniteScroll/>
    </div>
  );
}

export default App;
