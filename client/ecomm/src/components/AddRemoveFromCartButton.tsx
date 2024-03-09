import React from "react";

type Props = {
  value: number;
  addFunction: Function;
  removeFunction: Function;
};

const AddRemoveFromCartButton = ({
  value,
  addFunction,
  removeFunction,
}: Props) => {
  return (
    <div className="w-full rounded-lg border-2 border-[#15F5B] flex items-center justify-between h-[40px] text-secondary">
      <button
        className="w-[100%] border-r border-r-[#15F5B] h-full"
        onClick={() => removeFunction()}
      >
        -
      </button>
      <span className="w-[100%] text-secondary text-center">{value}</span>
      <button
        className="w-[100%] border-l border-l-[#15F5B] h-full"
        onClick={() => addFunction()}
      >
        +
      </button>
    </div>
  );
};

export default AddRemoveFromCartButton;
