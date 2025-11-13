"use client";

import { useState } from "react";
import TodoCard from "@/components/todo-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TodoListArr } from "./page";

// import { TodoContext } from "./todo-context.ts";

type TodoItem = {
  id: number;
  title: string;
  children: TodoItem[];
  isFinished: boolean;
};

// const setTodoList = (groups) => {

//   return groups;
// };

export default function TodoList({
  className,
  todoList,
}: {
  className?: string;
  todoList: TodoListArr;
}) {
  // 컴포넌트의 props는 객체로 들어오므로 타이핑 시 유의.
  const groups = Object.groupBy(todoList, (i) => i.parentId);

  // setTodoList(groups);

  // const todoList = useContext(TodoContext);
  const initialTodos: TodoItem[] = [
    {
      id: 1,
      title: "할일1",
      children: [
        {
          id: 2,
          title: "세부 할일 1",
          children: [
            {
              id: 3,
              title: "세부 할일 2",
              children: [
                {
                  id: 4,
                  title: "세부 할 일 3",
                  children: [],
                  isFinished: false,
                },
              ],
              isFinished: false,
            },
          ],
          isFinished: false,
        },
        {
          id: 5,
          title: "세부 할일 4",
          children: [
            {
              id: 6,
              title: "세부 할일 5",
              children: [],
              isFinished: true,
            },
            {
              id: 7,
              title: "세부 할일 6",
              children: [],
              isFinished: false,
            },
          ],
          isFinished: false,
        },
      ],
      isFinished: false,
    },
    {
      id: 8,
      title: "할일2",
      children: [
        {
          id: 9,
          title: "세부 할일 7",
          children: [
            {
              id: 10,
              title: "세부 할일 8",
              children: [
                {
                  id: 11,
                  title: "세부 할일 9",
                  children: [],
                  isFinished: false,
                },
              ],
              isFinished: false,
            },
            {
              id: 15,
              title: "세부 할일 10",
              children: [
                {
                  id: 11,
                  title: "세부 할일 11",
                  children: [],
                  isFinished: false,
                },
                {
                  id: 16,
                  title: "세부 할일 12",
                  children: [],
                  isFinished: false,
                },
              ],
              isFinished: false,
            },
          ],
          isFinished: false,
        },
        {
          id: 12,
          title: "세부 할일 13",
          children: [
            {
              id: 13,
              title: "세부 할일 14",
              children: [
                {
                  id: 14,
                  title: "세부 할일 15",
                  children: [],
                  isFinished: false,
                },
              ],
              isFinished: false,
            },
          ],
          isFinished: false,
        },
      ],
      isFinished: false,
    },
  ];
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoId, setNewTodoId] = useState(
    Math.max(...todos.map((i) => i.id ?? 0)) + 1,
  );

  const addNewTodo = () => {
    const newTodo: TodoItem = {
      id: newTodoId,
      title: "할 일",
      children: [],
      isFinished: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setNewTodoId((prev) => prev + 1);
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex h-full flex-1 flex-col gap-2 overflow-scroll">
        {/* <TodoContext value={todoList}> */}
        {todos.map((todo) => (
          // <div key={todo.id}>{JSON.stringify(todo)}</div>
          <TodoCard key={todo.id} newTodoId={newTodoId} todo={todo}></TodoCard>
          // />
        ))}
        {/* </TodoContext> */}
      </div>
      <div className="mt-3 flex items-center justify-end">
        <Button variant={"success"}>Save</Button>
      </div>
    </div>
  );
}
