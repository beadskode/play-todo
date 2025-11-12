"use client";

import { useState } from "react";
import TodoButton from "@/components/todo-button";
import TodoCard from "@/components/todo-card";
import { MemberProfile } from "./member/member-profile";

type TodoItem = {
  id: number;
  title: string;
  details: { id: number; text: string; done: boolean }[];
};

export default function Todo() {
  //const session = use(auth());
  //const didSignin = !!session?.user;
  //if (!didSignin) redirect("/");

  const [todos, setTodos] = useState<TodoItem[]>([]);

  // 새 TodoCard 추가
  const addNewTodoCard = () => {
    const newTodo: TodoItem = {
      id: Date.now(),
      title: "",
      details: [],
    };
    setTodos([newTodo, ...todos]);
  };

  return (
    <div className="flex h-full w-full gap-3 p-6">
      <MemberProfile />

      <div className="flex-1">
        <div className="mx-auto max-w-lg rounded-md border bg-white p-4 shadow-md">
          {/* 제목과 추가 버튼 */}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="flex-1 text-center font-bold text-2xl">Todo list</h1>
            <TodoButton
              todos={todos}
              setTodos={setTodos}
              onAddTodo={addNewTodoCard}
            />
          </div>

          {/* TodoCard 리스트 */}
          <div className="mb-4 flex flex-col gap-4">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                initialTodo={todo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
