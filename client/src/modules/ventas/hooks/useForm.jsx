import { useState } from "react";

export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (callback) => {
    callback();
  };

  return {
    form,
    handleChangeForm,
    handleSubmit,
  };
};
