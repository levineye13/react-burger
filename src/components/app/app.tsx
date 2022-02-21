import React from 'react';

import style from './app.module.css';
import AppHeader from '../app-header/app-header';

function App() {
  return (
    <div className={style.page}>
      <AppHeader />
    </div>
  );
}

export default App;
