import {render, screen, cleanup} from '@testing-library/react';
import Login from '../Login';

import store, { persistor } from '../../Store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { Navbar } from 'react-bootstrap';
import Navbarr from '../Navbarr';

// test('should return the view component', () => {

//     render (
//         <Provider store ={store}>
//         <PersistGate persistor={persistor}> 
//         <Login />
//         </PersistGate>
//         </Provider>
//     )
    
//     const loginElement = screen.getByTestId('login-test');
//     expect(loginElement).toBeInTheDocument();
// })

test('should return the view of Navbarr component',()=>{
    render(<Navbarr/>)
    const navbarrElement = screen.getByTestId('navbarr-test');
    expect(navbarrElement).toBeInTheDocument();
})