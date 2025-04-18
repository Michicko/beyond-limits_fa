import React from "react";
import CustomSelect from "../CustomSelect";

function ResultSelector({
  id,
  value,
  setValue,
  disabled,
  fixedWidth,
}: {
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  fixedWidth?: boolean;
}) {
  return (
    <CustomSelect
      id={id}
      defaultValue={value}
      options={["WIN", "LOSE", "DRAW"].map((el) => {
        return {
          label: el,
          value: el,
        };
      })}
      disabled={disabled}
      handleOnChange={(value: string, id: string) => setValue(value)}
      fixedWidth={fixedWidth}
    />
  );
}

export default ResultSelector;
