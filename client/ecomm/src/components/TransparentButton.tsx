import React from "react";

type Props = {
  text: string;
  borderColor: string;
  action: Function;
};

function TransparentButton({ text, borderColor, action }: Props) {
  return (
    <button
      style={{ borderColor: borderColor, borderWidth: 2, color: borderColor }}
      className="w-full rounded-lg flex items-center justify-center h-[40px]"
      onClick={() => {
        action();
      }}
    >
      {text}{" "}
    </button>
  );
}

export default TransparentButton;
