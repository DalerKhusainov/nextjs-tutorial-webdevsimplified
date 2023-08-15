// MEXTJS HOOKS
import Link from "next/link";
// PRISMA HOOKS
import { prisma } from "@/db";
// COMPONENTS
import TodoItem from "./components/TodoItem";

// CREATING todo MANUALLY
// await prisma.todo.create({ data: { title: "test", complete: false } });

// FUNC TO GET OUR todo FROM PRISMA
const getTodos = () => {
  return prisma.todo.findMany();
};

const Home = async () => {
  // GETTING todos FROM PRISMA
  const todos = await getTodos();

  //
  const toggleTodo = async (id: string, complete: boolean) => {
    //
    "use server";
    // UPDATING A CURRENT todo ITEM IN PRISMA DATA BASE
    await prisma.todo.update({ where: { id }, data: { complete } });
  };

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href={"/new"}
        >
          New
        </Link>
      </header>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
};

export default Home;
