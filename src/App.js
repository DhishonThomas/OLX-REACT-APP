import './App.css';
import Body from './components/Body';
import { UserProvider } from './utils/UserContext';
import { ProductProvider } from './utils/ProductsContext';

function App(){
  return(<>
  <ProductProvider>
  <UserProvider>
  <Body/>


  </UserProvider>
  </ProductProvider>
{/* <Navbar/> */}

  </>)
}

export default App;
