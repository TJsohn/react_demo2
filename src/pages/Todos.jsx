import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard/TodoCard";
import axios from "axios";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState("all");
    const [userFilter, setUserFilter] = useState("all");

    const simulateLoading = (callback) => { // this is not needed but to see!
        setTimeout(callback, 1500);
    }

    useEffect(() => { // for multiple fetching- promise. all
        axios.get("https://jsonplaceholder.typicode.com/todos").then(res=> setTodos(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then(setUsers)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (todos.length && users.length) {
            simulateLoading(() => setLoading(false));
        }
    }, [todos, users]);

    const filteredData = todos.filter((todo) => {
        const matchStatus = statusFilter === 'all' 
        ? true 
        : statusFilter === 'completed' 
        ? todo.completed 
        : !todo.completed;

        const matchUser = userFilter === 'all'
        ? true
        : todo.userId === Number(userFilter);

        return matchStatus && matchUser;
    });

    return loading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <div>
            <label>Filter by status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="not-completed">Not completed</option>
            </select>
            <label>Filter by user:</label>
            <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
                <option value="all">All users</option>
                {users.map((user) => (<option key={user.id} value={user.id}>{user.name}</option>))}           
            </select>
            <div className="todo-grid">
            {filteredData.map((todo) => {
                const user = users.find((user) => user.id === todo.userId);

                return <TodoCard key={todo.id} username={user?.name || "Unknown"} title={todo.title} completed={todo.completed} />;
            })}
            </div>
            </div>
        </div>
      
    );
};

export default Todos;