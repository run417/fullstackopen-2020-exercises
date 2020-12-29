import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event = null) => {
    if (event !== null) {
      setValue(event.target.value);
    } else {
      setValue("");
    }
  };

  return {
    type,
    value,
    onChange,
  };
};
