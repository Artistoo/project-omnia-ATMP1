import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styling/index.css';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

//__________PAGES_______________
import ErrorFallback from './pages/Error/ErrorFallback.jsx';

//__________CONTEXT_______________
import UserStateContext from './context/Data_context';
import FooterContentProvider from './context/footerContentProvider';
import PopUps from './context/Dialog.jsx';
import FooterVisibility from './context/showFooter_context.jsx';
//___________REDUX_______________
import store from './redux/store.js';
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={(message) => console.log({message})}>
        <UserStateContext>
          <FooterVisibility>
            <FooterContentProvider>
              <PopUps>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </PopUps>
            </FooterContentProvider>
          </FooterVisibility>
        </UserStateContext>
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
