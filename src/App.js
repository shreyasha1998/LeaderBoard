import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import RootLayout from './components/RootLayout';
import ConfigurationScreen from './pages/ConfigurationScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path:"/",
    element:<RootLayout />,
    children: [
      {
        path: "configure",
        element: <ConfigurationScreen  />,
      }],
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
