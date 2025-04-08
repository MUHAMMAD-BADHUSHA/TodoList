import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  // Function to fetch todos
 


  const handleAdd = () => {
    if (!todo.trim()) {
      alert('Todo cannot be empty');
      return;
    }

    axios
      .post('http://localhost:3000/add', { todo: todo })
      .then((result) => {
        console.log(result)
        location.reload()// Refresh the todos list
      })
      .catch((err) => console.log(err));
  };

 
  useEffect(() => {
    axios
    .get('http://localhost:3000/get')
    .then((result) => setTodos(result.data))
    .catch((err) => console.log(err));
  }, []);

 const handleDelete=(id)=>{
    axios.delete('http://localhost:3000/delete/'+id)
    .then(result=>{location.reload()})
    .catch((err) => console.log(err));
 }
 const handleUpdate=(id)=>{
    axios.put('http://localhost:3000/update/'+id)
    .then(result=>{
        location.reload()
        console.log(result)})
    .catch((err) => console.log(err))
 }

 const date = new Date();
 const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const currentDay = daysOfWeek[date.getDay()];

  return (
    <div className="app">
      <h1 className="h1">Todo List</h1>
      <div className='day'>it's<h2>{currentDay}</h2></div>
      <div className="input">
        <input
          type="text"
          placeholder="🖊️ Add item..."
          value={todo} 
          onChange={(e) => setTodo(e.target.value)}
        />
        <i className="fas fa-plus" onClick={handleAdd}></i>
      </div>
      <div>
        {todos.length === 0 ? (
          <div className="h1" style={{paddingTop:'40px'}}>
            <h1>Add Todo</h1>
          </div>
        ) : (
          todos.map((todo,index) => (
            <div className="todos" key={index}>
              <div className="todo">
                <div className="left">
                  <i className='fa-solid fa-check' onClick={()=>handleUpdate(todo._id)}  ></i> 
                  <p className={todo.done ? "line-through" : ""}>{todo.todo}</p>

                </div>
                <div className="right">
                  <i className="fas fa-times" onClick={()=>handleDelete(todo._id)}></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
