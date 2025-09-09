import { useState } from "react";

function App () {
  // state untuk menyimpan daftar tugas 
  const [todos, setTodos] = useState([
    { id: 1, text: 'Belajar Vite + React', completed: false},
    { id: 2, text: 'Configurasi Tailwind CSS', completed: true},
  ]);

  // state untuk mengontrol nilai input 
  const [inputValue, setInputValue] = useState('');

  // state untuk menampung input search
  const [searchQuery, setSearchQuery] = useState('');

  // fungsi untuk menambah tugas baru 
  const handleAddTodo = e => {
    e.preventDefault() // mencegah form merefresh halaman 
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    };
  };

  // fungsi untuk menandai tugas yang sudah di selesai (atau sebaliknya)
  const handleToggleComplete = id => {
    setTodos (
      todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )
    );
  };

  // fungsi untuk menghapus tugas
  const handleDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // logika fungsi search
  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans">
      <div className="w-full max-w-md bg-transparent border border-gray-400 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-300 mb-6">📝 My To-Do List</h1>

        {/* form input */}
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
          <input 
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Add new task here..."
          className="flex-grow p-3 border border-gray-400 bg-transparent text-gray-300 rounded-lg focus:outline-none focus:border-violet-600 transition-colors" 
          />
          <button
          type="submit"
          className="bg-gradient-to-br from-violet-700 to-blue-800 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gradient-to-bl from-blue-700 to-violet-800 transition-colors">
            Add
          </button>
        </form>

        {/* input search */}
        <div className="mb-4">
          <input 
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-400 bg-transparent text-gray-300 rounded-lg focus:outline-none focus:border-violet-600 transition-colors" 
          />
        </div>

        {/* Daftar tugas */}
        <ul>
          {filteredTodos.map(todo => (
            <li
            key={todo.id}
            className="flex items-center justify-between p-4 mb-3 bg-transparent border border-gray-400 rounded-lg border-gray-300 hover:bg-gray-700 transition-colors">
              <span
              onClick={() => handleToggleComplete(todo.id)}
              className={`cursor-pointer ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-200'
              }`}
              >
                {todo.text}
              </span>
              <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 font-bold transition-colors">
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-center text-gray-300">Made by Afryan</h2>
      </div>
    </div>
  );
}

export default App;