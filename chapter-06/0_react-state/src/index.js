import React from 'react';
import ReactDOM from 'react-dom/client';

import TodoList from './TodoList';
import App from './App';
import AppUseRef from './AppUseRef';
import AppUseRefVar from './AppUseRefVar';
import AppUseRefDOM from './AppUseRefDOM';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AppUseRefDOM />

);

