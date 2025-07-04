import './loader.css'

const Loader = () => {
  return (
    <div className="loader" data-testid="loader">
      <span className="element"></span>
      <span className="element "></span>
      <span className="element"></span>
    </div>
  );
};

export default Loader;