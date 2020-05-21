import React from 'react';
import Header from './components/header';
import DisplayBox from './components/displaybox';
import RegistryForm from './components/registry-form';
import SearchArea from './components/search-area';

function App() {
  return (
    <div>
     <Header />
     <SearchArea />
     <RegistryForm />
     <DisplayBox />
    </div>
  );
}

export default App;