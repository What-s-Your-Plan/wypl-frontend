import * as S from './TodoFooter.styled';

import updateButton from '@/assets/icons/edit.svg';

export interface TodoFooterProps {
  isCreatingTodo: boolean;
  todoContent: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TodoFooter({
  isCreatingTodo,
  todoContent,
  onInputChange,
  onSubmit,
}: TodoFooterProps) {
  return (
    <>
      {isCreatingTodo && (
        <S.SubmitDiv>
          <S.Form onSubmit={onSubmit}>
            <S.CheckBox type="checkbox" disabled />
            <S.StyledInputDefault
              className="!h-6 !p-1"
              $width="85%"
              type="text"
              value={todoContent}
              onChange={onInputChange}
            />
            <S.IconButton type="submit">
              <img src={updateButton} alt="Create Todo" />
            </S.IconButton>
          </S.Form>
        </S.SubmitDiv>
      )}
    </>
  );
}

export default TodoFooter;
