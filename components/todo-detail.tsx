"use client";

type TodoDetailProps = {
  value: string;
  done: boolean;
  placeholder?: string;
  onChangeValue: (v: string) => void;
  onChangeDone: (v: boolean) => void;
  onDelete: () => void;
};

export default function TodoDetail({
  value,
  done,
  placeholder,
  onChangeValue,
  onChangeDone,
  onDelete,
}: TodoDetailProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => onChangeDone(e.target.checked)}
        className="h-5 w-5"
      />
      <input
        type="text"
        value={value}
        placeholder={placeholder || "세부 사항"}
        onChange={(e) => onChangeValue(e.target.value)}
        className="flex-1 rounded-md border p-2"
      />
      <button
        onClick={onDelete}
        className="rounded-md bg-red-400 px-2 py-1 text-white hover:bg-red-500">
        삭제
      </button>
    </div>
  );
}
