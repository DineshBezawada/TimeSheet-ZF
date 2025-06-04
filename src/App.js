import LocationSelector from './features/CountriesDropdown/CountriesDropdown';
import ExcelDataReader from './features/ExcelDataReader';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <ExcelDataReader/>
      <LocationSelector/>
    </div>
  );
}

export default App;
