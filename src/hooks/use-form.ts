import React, { useState } from "react";

export function useForm (inputValues: Record<string, string>) {
  const [values, setValues] = useState(inputValues);

  function handleChange (evt: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  }

  return { values, handleChange, setValues };
}
