import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Root from './pages/Root';
import Home from './pages/Home';
import Details from './components/Details';

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Root />,
      children:[
        {
          index:true,
          element:<Home />
        },
        {
          path:"/details",
          element:<Details />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
