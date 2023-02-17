import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


// 1: / - путь к корневой папки Пример:
// import styles from '/dist/styles/main.min.css';

// 2: './' - путь относительно файла в котором мы находимся.
// Пример:
// import store from './store.js';

// 3: '../' - выходим из папки в которой находимся, т.е. путь на уровень выше.
// Пример:
// import store from '../store.js'; - импортируем файл из уровня выше

// 4: 'react' - путь к папке react в папке node_modules Пример:
// import React from 'react'; - импортируем файл из node_modules/react

