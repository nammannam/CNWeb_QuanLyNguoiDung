import React from 'react';
import SearchForm from './SearchForm';
import ResultTable from './ResultTable';
import AddUser from './AddUser';
import '../styles.css';

function App() {
  const [kw, setKeyword] = React.useState('');
  const [newUser, setNewUser] = React.useState(null);

  return (
    <div className="container">
      <h1>Quản lý người dùng</h1>
      <SearchForm onChangeValue={setKeyword} />
      <AddUser onAdd={setNewUser} />
      <ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} />
    </div>
  );
}

export default App;
