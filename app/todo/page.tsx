import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import MemberProfile from "./member-profile";
import Ranking from "./ranking";
import TodoList from "./todo-list";

export interface TodoListInterface {
  id: number;
  todo: string | null;
  parentId: number;
  isFinished: boolean;
  children?: [];
}

export type TodoListArr = TodoListInterface[];

export default async function Todo() {
  const session = await auth();
  const didSignin = !!session?.user;
  if (!didSignin) redirect("/sign");

  const allTodos: TodoListArr = await prisma.todos.findMany({
    where: {
      Member: {
        email: session?.user.email as string,
      },
    },
    select: {
      id: true,
      todo: true,
      isFinished: true,
      parentId: true,
    },
  });

  if (!allTodos.length) return <></>;

  return (
    // <div className="@container flex h-full flex-col gap-5 md:flex-row">
    <div className="@container grid h-full grid-flow-col grid-rows-2 gap-5 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-3">
      <MemberProfile className="hidden sm:w-60 md:col-span-1 md:block md:w-full" />
      <Ranking
        className="order-2 flex-1 md:order-0 md:col-span-1 md:row-span-1"
        userEmail={session.user.email ?? ""}
      />
      <TodoList className="md:col-span-2 md:row-span-3" todoList={allTodos} />
    </div>
  );
}
