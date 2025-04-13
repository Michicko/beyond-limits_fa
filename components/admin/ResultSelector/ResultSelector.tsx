import React from "react";
import CustomSelect from "../CustomSelect";

function ResultSelector({
  id,
  value,
  setValue,
  disabled,
}: {
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
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
    />
  );
}

export default ResultSelector;
