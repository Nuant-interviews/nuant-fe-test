import { ReactNode } from "react";

export function Button({
  content,
  onClick,
  active,
  disabled,
}: {
  content: ReactNode;
  onClick: any;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg h-full
        ${
          !disabled
            ? "hover:bg-red-800 hover:text-white"
            : "bg-gray-100 bg-white cursor-not-allowed"
        }
        ${active ? "bg-red-500 text-white" : "text-red-500"}
        `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
