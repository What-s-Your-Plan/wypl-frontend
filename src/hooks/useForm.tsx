import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';

/**
 * 폼을 사용하여 관리합니다.
 *
 * T: Form Type
 * R: onSubmit Return Type
 *
 * @param initialState 초기 설정 값
 * @param onSubmit  이벤트를 동작시킬 함수
 * @param validate  검증이 필요한 경우
 */
function useForm<T, R>(
  initialState: T | (() => T),
  onSubmit: (state: T) => Promise<BaseResponse<R> | R>,
  validate?: (values: T) => Array<boolean>,
): {
  form: T;
  errors: boolean[];
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSubmit: () => Promise<R | null>;
  setForm: Dispatch<SetStateAction<T>>;
} {
  const [form, setForm] = useState({ ...initialState } as T);
  const [errors, setErrors] = useState<Array<boolean>>(
    Object.keys(initialState as object).map(() => {
      return true;
    }),
  );

  useEffect(() => {
    setForm({ ...initialState } as T);
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
