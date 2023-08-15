// NEXTJS HOOKS
import Link from "next/link";
import { redirect } from "next/navigation";
// PRISMA HOOKS
import { prisma } from "@/db";

// FUNC FOR CREATING A NEW todo
// THIS FUNC BELOW IS SERVER CODE AND IT'S NEVER
// GOING TO RUN ON THE CLIENT IT ONLY EVER RUNS ON THE SERVER
const createTodo = async (data: FormData) => {
  // USE SERVER METHOD IS EXPEREMENTAL AND I ADDED NEW FLAG IN NEXTJS CONFIG FILE
  "use server";
  // GETTING ALL OUR INPUT VALUES FROM FORM TAGS
  const title = data.get("title")?.valueOf();
  // MAKING VALIDATION FOR GETTING RIGHT VALUE FROM INPUT TAG
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }
  // CREATING A NEW todo IN PRISMA DATA BASE
  await prisma.todo.create({ data: { title, complete: false } });
  // THE NEXTJS HOOK FOR REDIRECT OR NAVIGATE US TO HOME
  redirect("/");
};

const Page = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col max-w-xs">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default Page;
