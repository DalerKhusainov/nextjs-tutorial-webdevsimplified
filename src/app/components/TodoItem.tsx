// BY DOING THIS WE SAY HEY THIS IS A CLIENT SIDE RENDERED COMPONENT
// SO DON'T RENDER ANY OF THIS ON THE SERVER ALL THIS INTERACTION
// STUFF IS GOING TO HAPPEN ON THE CLIENT
"use client";

// DEFINING TYPES OF RECEIVING PROPS
type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
};

const TodoItem = ({ id, title, complete, toggleTodo }: TodoItemProps) => {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="peer-checked:line-through cursor-pointer peer-checked:text-slate-500"
      >
        {title}
      </label>
    </li>
  );
};

export default TodoItem;
