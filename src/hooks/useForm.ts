import { useState } from "react";

type FormDataValue = string | number | boolean;
type UseFormProps = string[];
type FormStateProps = {
  [key: string]: {
    value: FormDataValue;
    error: boolean;
  };
};

const createFormData = (keys: UseFormProps) => {
  return keys.reduce<FormStateProps>((state, key) => {
    state[key] = { value: "", error: false };
    return state;
  }, {});
};

export default function useForm(keys: UseFormProps) {
  const [formData, setFormData] = useState(createFormData(keys));

  const updateFormData = (key: string, value: FormDataValue, error: boolean = false) => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData[key as keyof FormStateProps] = { value, error };
      return newData;
    });
  };

  return { formData, updateFormData };
}
