import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit, FaTrash } from 'react-icons/fa'
// import TaskCard from './components/TaskCard/TaskCard'

const App = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [showFinished, setShowFinished] = useState([]);

    useEffect(() => {
        let json = JSON.parse(localStorage.getItem("todos"));
        setTodos(json)
    }, []);

    // const getFromLocal = () => {

    // }

    const handleEdit = () => { }

    const handleDelete = (id) => {
        if (confirm("Are you sure u want to delete this todo?")) {
            let newTodos = todos.filter(todo => todo.id !== id);
            setTodos(newTodos);
            saveToLocal();
        }
    }

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), title: todo, isCompleted: false }])
        setTodo("");
        saveToLocal();
    }

    const handleCheckboxChange = (e) => {
        let id = e.target.name;
        let index = todos.findIndex((todo) => todo.id === id);
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
        saveToLocal();
    }

    const saveToLocal = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const handleShowFinished = () => {
        setShowFinished(!showFinished);
    }


    return (
        <>
            <Navbar />
            <div className="bg-violet-100 mx-auto my-5 p-5 rounded-xl container">
                <h1 className='mb-5 font-bold text-xl text-center'>TaskMan - Manage all your Todos in one place</h1>
                <div className="flex flex-col mb-5 addTodo">
                    <h1 className='font-bold text-lg'>Add a Todo</h1>
                    <input type="text" placeholder='Enter todo value' value={todo} onChange={(e) => setTodo(e.target.value)} className='bg-white my-3 mr-2 p-2 rounded-lg w-full' />
                    <button className='bg-red-400 hover:bg-red-600 disabled:bg-red-300 p-2 rounded-md text-white' disabled={todo.length < 3} onClick={handleAdd}>Submit</button>
                </div>
                <h1 className='font-bold text-lg'>Your Todos</h1>
                <p>
                    <input type="checkbox" value={showFinished} onChange={handleShowFinished} /> Show Finished
                </p>
                {todos.length == 0 && <div className='m-5'>No Todos to display</div>}
                <div className="todos">
                    {todos.map((todo) => {
                        return (!showFinished || !todo.isCompleted) && 
                        <div key={todo.id} className="flex justify-between items-center bg-blue-200 my-2 p-3 rounded-lg todo">
                            <div className='flex flex-row gap-4'>
                                <input name={todo.id} type="checkbox" defaultChecked={todo.isCompleted ? "checked" : ""} onChange={handleCheckboxChange} />
                                <p className={`${todo.isCompleted ? "line-through" : ""}`}>{todo.title}</p>
                            </div>
                            <div className="flex gap-2 buttons">
                                <button name={todo.id} className='bg-blue-700 p-2 rounded text-white' onClick={handleEdit}><FaEdit /></button>
                                <button className='bg-red-700 p-2 rounded text-white' onClick={() => handleDelete(todo.id)}><FaTrash /></button>
                            </div>
                        </div>
})}

                </div>
            </div>
        </>
    )
}

export default App