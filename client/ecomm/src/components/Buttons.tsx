import React from "react";

type Props = {
  text: string;
  bg: string;
  action: Function;
};

function Buttons({ text, bg, action }: Props) {
  return (
    <button
      style={{ backgroundColor: bg }}
      className="w-full rounded-lg flex items-center justify-center h-[40px] text-[black]"
      onClick={(e) => {
        action(e);
      }}
    >
      {text}{" "}
    </button>
  );
}

export default Buttons;
