import AddTodo from '../features/AddTodo';
import TodoList from '../entities/TodoList';

function App() {
  return (
    <div className='App'>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;