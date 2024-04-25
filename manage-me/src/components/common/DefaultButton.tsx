import { cn } from "../../utils/cn";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function DefaultInput({ content, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        className
      )}
    >
      {content}
    </button>
  );
}
