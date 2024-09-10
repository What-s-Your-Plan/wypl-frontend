import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';

function useForm<S, R>(
  initialState: S | (() => S), // Object
  onSubmit: (state: S) => Promise<BaseResponse<R> | R>,
  validate?: (values: S) => Array<boolean>,
): {
  form: S;
  errors: boolean[];
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSubmit: () => Promise<R | null>;
  setForm: Dispatch<SetStateAction<S>>;
} {
  const [form, setForm] = useState({ ...initialState } as S);
  const [errors, setErrors] = useState<Array<boolean>>(
    Object.keys(initialState as object).map(() => {
      return true;
    }),
  );

  useEffect(() => {
    setForm({ ...initialState } as S);
  }, [initialState]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (): Promise<R | null> => {
    if (validate) {
      const result = validate(form);
      setErrors(result);
      if (result.includes(false)) {
        return null;
      }
    }
    const response = await onSubmit(form);

    if (response && typeof response === 'object' && 'body' in response) {
      return (response as BaseResponse<R>).body as R;
    }

    return response as R;
  };

  return { form, errors, handleChange, handleSubmit, setForm };
}

export default useForm;
