import logo from './logo.svg';
import './App.css';
import TableComponent from './components/tableComponent';
import { getTransactionDetails } from './service/degiroServices';
import SinglePage from './components/singlePage';
import "react-datetime/css/react-datetime.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() 
{
  return (<>
        <div className="container">
          <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'>
            <h3 className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'>Degiro Transaction App</h3>
            <ul className="nav nav-pills">
            </ul>
          </header>
          <SinglePage/>
        </div>
        </>);
}


export default App;
