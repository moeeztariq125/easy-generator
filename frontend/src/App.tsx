import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './configs';
import { Navbar } from './components';
import { AuthProvider } from './contexts/AuthContext';
import { AxiosInterceptor } from './api/axiosInstance';
function App() {
  return (
    <>
      <div className='bg-white'>
        <BrowserRouter>
          <AuthProvider>
            <AxiosInterceptor>
              <Navbar />
              <Routes>
                {publicRoutes.map((route, index) => (
                  <Route path={route.path} element={<route.component />} key={index} />
                ))}
              </Routes>
            </AxiosInterceptor>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
