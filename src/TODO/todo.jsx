import React, { useEffect, useState } from 'react';

const Todo = () => {
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);

    // Load saved todos from localStorage when the component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodoList(savedTodos);
        }
    }, []);

    // Add a new todo to the list
    const addTodo = () => {
        if (inputValue.trim() === '') {
            alert('Please type something');
            return;
        }
        const updatedTodoList = [...todoList, inputValue];
        setTodoList(updatedTodoList);
        setInputValue('');
    };

    // Remove a todo from the list
    const removeTodo = (index) => {
        const updatedTodoList = todoList.filter((_, i) => i !== index); // Remove the clicked item
        setTodoList(updatedTodoList);
    };

    // Save the todo list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoList));
    }, [todoList]);

    return (
        <>
            <div style={{ height: '20vh' }} className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1>TODO App</h1>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        placeholder="Enter a task"
                    />
                    <button onClick={addTodo}>Add task</button>
                </div>
            </div>
            <div>
                <ul className="text-center">
                    {todoList?.map((item, index) => (
                        <div key={index} className='d-flex justify-content-center align-items-center my-3'>
                            <li className="list-unstyled  me-5 ">{item}</li>
                            <button className="btn btn-danger ms-5" onClick={() => removeTodo(index)}>Remove</button>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Todo;
