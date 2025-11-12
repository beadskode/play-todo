"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import TodoDetail from "./todo-detail";

type Detail = { id: number; text: string; done: boolean };

type TodoItem = {
  id: number;
  title: string;
  details: Detail[];
  isFinished: boolean;
};

export default function TodoCard({
  todos,
  setTodos,
  initialTodo,
}: {
  todos: TodoItem[];
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  initialTodo?: TodoItem;
}) {
  const [title, setTitle] = useState(initialTodo?.title || "");
  const [details, setDetails] = useState<Detail[]>(initialTodo?.details || []);
  const [isFinished, setIsFinished] = useState(
    initialTodo?.isFinished || false
  );

  // 세부사항 완료 상태 감지
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const allDone = details.every((d) => d.done);
    setIsFinished(allDone);

    // 상위 todos에도 반영
    setTodos((prev) =>
      prev.map((t) =>
        t.id === (initialTodo?.id || 0)
          ? { ...t, title, details, isFinished: allDone }
          : t
      )
    );
  }, [details, title]);

  const deleteCard = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      setTodos(todos.filter((t) => t.id !== (initialTodo?.id || 0)));
    }
  };

  const addDetail = () => {
    if (isFinished) return; // 완료된 카드에서는 추가 불가
    setDetails([...details, { id: Date.now(), text: "", done: false }]);
  };

  const deleteDetail = (id: number) => {
    if (isFinished) return; // 완료된 카드에서는 삭제 불가
    setDetails(details.filter((d) => d.id !== id));
  };

  const updateDetail = (id: number, value: string) => {
    setDetails(details.map((d) => (d.id === id ? { ...d, text: value } : d)));
  };

  const toggleDetailDone = (id: number, done: boolean) => {
    setDetails(details.map((d) => (d.id === id ? { ...d, done } : d)));
  };

  // Todo 데이터 반환 (등록 시 활용 가능)
  const getTodoData = (): TodoItem => ({
    id: initialTodo?.id || Date.now(),
    title,
    details,
    isFinished,
  });

  return (
    <div className="mx-auto mb-4 flex max-w-md flex-col gap-3 rounded-md border bg-white p-4 shadow-sm">
      {/* 제목 입력 */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={title}
          placeholder="할 일"
          onChange={(e) => setTitle(e.target.value)}
          className={"flex-1 rounded-md border p-2"}
        />
        <button
          onClick={deleteCard}
          className="rounded-md bg-red-400 px-3 py-1 text-white hover:bg-red-500">
          삭제
        </button>
        <button
          onClick={addDetail}
          className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
          추가
        </button>
        <Checkbox checked={getTodoData().isFinished} disabled />
      </div>

      {/* 세부 사항 리스트 */}
      <div className="flex flex-col gap-2">
        {details.map((d) => (
          <TodoDetail
            key={d.id}
            value={d.text}
            done={d.done}
            placeholder="세부 사항"
            onChangeValue={(v) => updateDetail(d.id, v)}
            onChangeDone={(v) => toggleDetailDone(d.id, v)}
            onDelete={() => deleteDetail(d.id)}
          />
        ))}
      </div>
    </div>
  );
}
