"use client";

import {
  CheckIcon,
  CornerDownRightIcon,
  PencilIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

type TodoItem = {
  id: number;
  title: string;
  children: TodoItem[];
  isFinished: boolean;
};

type Props = {
  isChildren?: boolean;
  newTodoId: number;
  todo: {
    id: number;
    title: string;
    children: TodoItem[];
    isFinished: boolean;
  };
};

export default function TodoCard({
  isChildren = false,
  newTodoId,
  todo,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditMode) {
      titleRef.current?.focus();
    }
  });
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  return (
    <Card
      className={`flex-1 gap-2 rounded-md bg-stone-50/40 shadow-none dark:bg-transparent ${isChildren ? "border-none py-0" : "py-2"}`}
    >
      <CardHeader className="gap-0 px-3">
        <CardTitle
          className={`group flex items-center justify-between ps-1 ${isChildren ? "ps-1" : ""}`}
        >
          {isChildren ? (
            <CornerDownRightIcon size={14} className="me-2 text-gray-500/30" />
          ) : (
            <></>
          )}
          <Checkbox
            defaultChecked={todo.isFinished}
            className="cursor-pointer"
          />
          <Input
            defaultValue={todo.title}
            disabled={!isEditMode}
            className={`h-8 flex-1 border-transparent font-normal text-gray-550 opacity-100! shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent ${
              todo.isFinished ? "text-gray-400 line-through" : ""
            } ${isEditMode ? "font-semibold text-red-400" : ""}`}
            ref={titleRef}
          />
          <div
            className={`${isEditMode ? "flex" : "hidden"} w-20 justify-end gap-0 group-hover:flex`}
          >
            <Button variant="rounded" size="icon-2xs" onClick={toggleEditMode}>
              {isEditMode ? <CheckIcon size={12} /> : <PencilIcon size={12} />}
            </Button>
            <Button variant="roundedDanger" size="icon-2xs">
              <XIcon
                className="text-red-800 dark:text-red-700"
                size={12}
              ></XIcon>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={`pe-0 ${isChildren ? "ps-7" : "ps-2"}`}>
        {todo.children.map((i) => (
          <TodoCard
            key={i.id}
            isChildren
            newTodoId={newTodoId}
            todo={i}
          ></TodoCard>
        ))}
      </CardContent>
      {!isChildren ? (
        <CardAction className="w-full px-3">
          <Button className="w-full" variant={"dashed"} size="sm">
            <PlusIcon className="text-gray-400" />
          </Button>
        </CardAction>
      ) : (
        <></>
      )}
    </Card>
  );
}

// "use client";

// import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import TodoDetail from "./todo-detail";

// type Detail = { id: number; text: string; done: boolean };

// type TodoItem = {
//   id: number;
//   title: string;
//   details: Detail[];
//   isFinished: boolean;
// };

// export default function TodoCard({
//   todoItem,
//   setTodos,
//   initialTodo,
// }: {
//   todoItem: TodoItem;
//   setTodos: Dispatch<SetStateAction<TodoItem[]>>;
//   initialTodo?: TodoItem;
// }) {
//   const [title, setTitle] = useState(initialTodo?.title || "");
//   const [details, setDetails] = useState<Detail[]>(initialTodo?.details || []);
//   const [isFinished, setIsFinished] = useState(
//     initialTodo?.isFinished || false
//   );

//   // 세부사항 완료 상태 감지
//   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
//   useEffect(() => {
//     const allDone = details.every((d) => d.done);
//     setIsFinished(allDone);

//     // 상위 todos에도 반영
//     setTodos((prev) =>
//       prev.map((t) =>
//         t.id === (initialTodo?.id || 0)
//           ? { ...t, title, details, isFinished: allDone }
//           : t
//       )
//     );
//   }, [details, title]);

//   const deleteCard = () => {
//     if (confirm("정말로 삭제하시겠습니까?")) {
//       setTodos(todos.filter((t) => t.id !== (initialTodo?.id || 0)));
//     }
//   };

//   const addDetail = () => {
//     if (isFinished) return; // 완료된 카드에서는 추가 불가
//     setDetails([...details, { id: Date.now(), text: "", done: false }]);
//   };

//   const deleteDetail = (id: number) => {
//     if (isFinished) return; // 완료된 카드에서는 삭제 불가
//     setDetails(details.filter((d) => d.id !== id));
//   };

//   const updateDetail = (id: number, value: string) => {
//     setDetails(details.map((d) => (d.id === id ? { ...d, text: value } : d)));
//   };

//   const toggleDetailDone = (id: number, done: boolean) => {
//     setDetails(details.map((d) => (d.id === id ? { ...d, done } : d)));
//   };

//   // Todo 데이터 반환 (등록 시 활용 가능)
//   const getTodoData = (): TodoItem => ({
//     id: initialTodo?.id || Date.now(),
//     title,
//     details,
//     isFinished,
//   });

//   return (
//     <div className="flex flex-col max-w-md gap-3 p-4 mx-auto mb-4 bg-white border rounded-md shadow-sm">
//       {/* 제목 입력 */}
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           value={title}
//           placeholder="할 일"
//           onChange={(e) => setTitle(e.target.value)}
//           className={"flex-1 rounded-md border p-2"}
//         />
//         <button
//           onClick={deleteCard}
//           className="px-3 py-1 text-white bg-red-400 rounded-md hover:bg-red-500">
//           삭제
//         </button>
//         <button
//           onClick={addDetail}
//           className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600">
//           추가
//         </button>
//         <Checkbox checked={getTodoData().isFinished} disabled />
//       </div>

//       {/* 세부 사항 리스트 */}
//       <div className="flex flex-col gap-2">
//         {details.map((d) => (
//           <TodoDetail
//             key={d.id}
//             value={d.text}
//             done={d.done}
//             placeholder="세부 사항"
//             onChangeValue={(v) => updateDetail(d.id, v)}
//             onChangeDone={(v) => toggleDetailDone(d.id, v)}
//             onDelete={() => deleteDetail(d.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
