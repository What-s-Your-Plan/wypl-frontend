import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { WhiteContainer } from '../common/Container';
import { InputDefault } from '../common/InputText';

import { checkTodo } from '@/api/todo/checkTodo.ts';
import { deleteTodo } from '@/api/todo/deleteTodo.ts';
import { getTodoList } from '@/api/todo/getTodoList.ts';
import { patchTodo } from '@/api/todo/patchTodo.ts';
import { postTodo } from '@/api/todo/postTodo.ts';
import updateButton from '@/assets/icons/edit.svg';
import plusButton from '@/assets/icons/plus.svg';
import editButton from '@/assets/icons/x.svg';

function Todo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [chosenTodo, setChosenTodo] = useState(-1);

  async function fetchTodoList() {
    const { body } = await getTodoList();
    setTodos(body.todos);
    setChosenTodo(-1);
  }

  useEffect(() => {
    fetchTodoList();
  }, []);

  const clickTodo = async (todoId: string) => {
    await checkTodo({ todoId }).then(() => {
      fetchTodoList();
    });
  };

  const deleteTodoElement = async (todoId: string) => {
    await deleteTodo({ todoId }).then(() => {
      fetchTodoList();
    });
  };

  const clickPlusButton = () => {
    setIsOpen(!isOpen);
  };

  const createTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await postTodo({
      content: content,
    }).then(() => {
      setContent('');
      setIsOpen(false);
      fetchTodoList();
    });
  };

  const updateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const changeOriginContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodoIndex = todos.findIndex(
      (todo) => todo.todo_id === chosenTodo,
    );

    const copiedTodos = [...todos];
    copiedTodos[updatedTodoIndex].content = e.target.value;

    setTodos(copiedTodos);
  };

  return (
    <WhiteContainer $width="1300" className="h-[30vh]">
      <Header>
        <div className="font-bold">Todo</div>
        <IconButton style={{ marginTop: 0 }} onClick={clickPlusButton}>
          <img src={plusButton} alt=""></img>
        </IconButton>
      </Header>
      <div className="scrollBar h-[85%]">
        {todos.length > 0 && (
          <div>
            {todos.map((todo) => (
              <TodoElement key={todo.todo_id}>
                <Form onSubmit={updateTodo}>
                  <CheckBox
                    type="checkbox"
                    id={String(todo.todo_id)}
                    name="todo"
                    checked={todo.is_completed}
                    onClick={() => clickTodo(`${todo.todo_id}`)}
                  ></CheckBox>
                  <StyledInputDefault
                    className="!h-6 !p-1 overflow-hidden text-ellipsis"
                    $width="100%"
                    $void={true}
                    type="text"
                    name="content"
                    value={todo.content}
                    onMouseUp={() => setChosenTodo(todo.todo_id)}
                    onChange={changeOriginContent}
                  ></StyledInputDefault>

                  {todo.todo_id == chosenTodo ? (
                    <IconButton type="submit">
                      <img src={updateButton}></img>
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => deleteTodoElement(`${todo.todo_id}`)}
                    >
                      <img src={editButton}></img>
                    </IconButton>
                  )}
                </Form>
              </TodoElement>
            ))}
          </div>
        )}
        {isOpen && (
          <SubmitDiv>
            <Form onSubmit={createTodo}>
              <CheckBox type="checkbox" name="todo" disabled></CheckBox>
              <StyledInputDefault
                className="!h-6 !p-1"
                $width="85%"
                type="text"
                name="content"
                value={content}
                onChange={changeContent}
              ></StyledInputDefault>
              <IconButton type="submit">
                <img src={updateButton}></img>
              </IconButton>
            </Form>
          </SubmitDiv>
        )}
      </div>
    </WhiteContainer>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: start;

  & > span {
    width: 100%;
    font-size: 13px;
    cursor: pointer;
  }
`;
const CheckBox = styled.input`
  margin-top: 6px;
  margin-right: 4px;
`;

const IconButton = styled.button`
  margin-top: 4px;
  cursor: pointer;
  margin-left: 5px;
`;
const TodoElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > {
    width: 12px;
  }
`;

const SubmitDiv = styled.div`
  margin-top: 6px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledInputDefault = styled(InputDefault)`
  font-size: 0.85rem;
  cursor: pointer;
  background-color: transparent;
  margin-left: 3px;
`;

export default Todo;
