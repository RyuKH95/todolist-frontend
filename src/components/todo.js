function Todo(props) {
  return (
    <div className="todo" key={props.todo.id}>
      <h3>
        <label
          onClick={props.handleClick}
          className={props.todo.completed ? "completed" : null}
        >
          {props.todo.todoName}
        </label>
        <label onClick={props.handleDelete}>&nbsp;&nbsp;❌</label>
      </h3>
    </div>
  );
}

export default Todo;