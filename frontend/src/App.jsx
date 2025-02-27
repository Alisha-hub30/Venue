import "./App.css";
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Welcome to My Website</h1>
        <p>Scroll down to see the content.</p>
        {/* Your other components or content goes here */}
      </div>
    </div>
  );
};

export default App;
