import "./TodoCard.css";

function TodoCard({title, completed, username}) {
    return (
        <div clasName="todo-card">
            <h3 className="todo-title">{title}</h3>
            <div className="todo-user">
                <img className="todo-avatar-small"
                src={`https://robohash.org/${username}?set=set4&size=40x40`}
                alt={`Avatar of ${username}`} />
                <p className="todo-meta"></p>
            </div>
            <p>{username}</p>
            <p>{completed ? "✅ Completed" : "❌ Not Completed"}</p>
        </div>
    );
}

export default TodoCard;