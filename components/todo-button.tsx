"use client";

import type { Dispatch, SetStateAction } from "react";

type Detail = { id: number; text: string; done: boolean };

type TodoItem = {
  id: number;
  title: string;
  details: Detail[];
  isFinished: boolean;
};

export default function TodoButton({
  todos,
  setTodos,
  onAddTodo,
}: {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  onAddTodo?: () => void;
}) {
  const handleAdd = () => {
    if (onAddTodo) onAddTodo();
  };

  const handleRegister = async () => {
    const dataToSave = todos.map((t) => ({
      ...t,
      score: t.isFinished ? t.details.length * 10 : 0,
    }));

    await fetch("/api/save-todos", {
      method: "POST",
      body: JSON.stringify(dataToSave),
      headers: { "Content-Type": "application/json" },
    });

    alert("등록되었습니다!");
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleAdd}
        className="w-20 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-300">
        추가
      </button>
      <button
        onClick={handleRegister}
        className="w-24 rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-600">
        등록
      </button>
    </div>
  );
}
