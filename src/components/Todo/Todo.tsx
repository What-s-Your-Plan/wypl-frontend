import React, { useEffect, useState } from 'react';

import { PrevWhiteContainer } from '@/components/Common/PrevContainer';

import { checkTodo } from '@/api/todo/checkTodo.ts';
import { deleteTodo } from '@/api/todo/deleteTodo.ts';
import { getTodoList } from '@/api/todo/getTodoList.ts';
import { patchTodo } from '@/api/todo/patchTodo.ts';
import { postTodo } from '@/api/todo/postTodo.ts';
import updateButton from '@/assets/icons/edit.svg';
import plusButton from '@/assets/icons/plus.svg';
import editButton from '@/assets/icons/x.svg';
import * as S from '@/components/Todo/Todo.styled.ts';

export interface TodoProps {
  /** 초기 할일 데이터 */
  initTodos?: TodoData[];
}

function Todo({ initTodos }: TodoProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [todos, setTodos] = useState<TodoData[]>(initTodos || []);
  const [chosenTodo, setChosenTodo] = useState(-1);

  /**
   * 할일 목록 조회 API
   */
  const fetchTodoList = async () => {
    const { body } = await getTodoList();
    setTodos(body.todos);
    setChosenTodo(-1);
  };

  /**
   * 할일 생성 핸들러
   */
  const handleCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postTodo({
      content: content,
    }).then(() => {
      setContent('');
      setIsOpen(false);
      fetchTodoList();
    });
  };

  /**
   * 할일 토글 핸들러
   *
   * @param todoId 할일 ID
   */
  const handleToggleTodo = async (todoId: string) => {
    await checkTodo({ todoId }).then(() => {
      fetchTodoList();
    });
  };

  /**
   * 할일 삭제 핸들러
   *
   * @param todoId 할일 ID
   */
  const handleDeleteTodo = async (todoId: string) => {
    await deleteTodo({ todoId }).then(() => {
      fetchTodoList();
    });
  };

  const clickPlusButton = () => {
    setIsOpen(!isOpen);
  };

  /**
   * 할일 수정 핸들러
   */
  const handleUpdateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await patchTodo(
      { todoId: chosenTodo },
      {
        content:
          todos[todos.findIndex((todo) => todo.todo_id === chosenTodo)].content,
      },
    ).then(() => {
      setChosenTodo(-1);
      fetchTodoList();
    });
  };

  /**
   * 입력 값 변경 핸들러
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  /**
   * 선택된 할일 변경 핸들러
   */
  const handleTodoContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (chosenTodo !== null) {
      setTodos(
        todos.map((todo) =>
          todo.todo_id === chosenTodo
            ? { ...todo, content: e.target.value }
            : todo,
        ),
      );
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <PrevWhiteContainer $width="1300">
      <S.Header>
        <div className="font-bold">Todo</div>
        <S.IconButton onClick={clickPlusButton}>
          <img src={plusButton} alt="Add Todo" />
        </S.IconButton>
      </S.Header>
      <div className="scrollBar h-[85%]">
        {todos.length > 0 && (
          <div>
            {todos.map((todo) => (
              <S.TodoElement key={todo.todo_id}>
                <S.Form onSubmit={handleUpdateTodo}>
                  <S.CheckBox
                    type="checkbox"
                    checked={todo.is_completed}
                    onClick={() => handleToggleTodo(String(todo.todo_id))}
                  />
                  <S.StyledInputDefault
                    className="!h-6 !p-1 overflow-hidden text-ellipsis"
                    $width="100%"
                    $void={true}
                    type="text"
                    name="content"
                    value={todo.content}
                    onMouseUp={() => setChosenTodo(todo.todo_id)}
                    onChange={handleTodoContentChange}
                  />
                  {todo.todo_id === chosenTodo ? (
                    <S.IconButton type="submit">
                      <img src={updateButton} alt="Update Todo" />
                    </S.IconButton>
                  ) : (
                    <S.IconButton
                      onClick={() => handleDeleteTodo(String(todo.todo_id))}
                    >
                      <img src={editButton} alt="Delete Todo" />
                    </S.IconButton>
                  )}
                </S.Form>
              </S.TodoElement>
            ))}
          </div>
        )}
        {isOpen && (
          <S.SubmitDiv>
            <S.Form onSubmit={handleCreateTodo}>
              <S.CheckBox type="checkbox" disabled />
              <S.StyledInputDefault
                className="!h-6 !p-1"
                $width="85%"
                type="text"
                value={content}
                onChange={handleInputChange}
              />
              <S.IconButton type="submit">
                <img src={updateButton} alt="Create Todo" />
              </S.IconButton>
            </S.Form>
          </S.SubmitDiv>
        )}
      </div>
    </PrevWhiteContainer>
  );
}

export default Todo;
