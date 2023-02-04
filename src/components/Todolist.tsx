import React, { useState, useCallback } from "react";
import { TodolistType } from "../types/todoList";

interface TodolistProps extends TodolistType {
  deleteTodoList: (todoListId: string) => void;
  checkTodoList: (todoListId: string) => void;
  changeTodoList: (todoListId: string, todo: string) => void;
}

const Todolist = ({
  id,
  index,
  todo,
  isCheck,
  deleteTodoList,
  checkTodoList,
  changeTodoList,
}: TodolistProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(todo);

  const handleEditTodoList = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleChangeTodo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTodo(event.target.value);
    },
    []
  );

  return (
    <div>
      <h1>{index}</h1>
      {isEdit ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            changeTodoList(id, currentTodo);
            setIsEdit(false);
          }}
        >
          <input type="text" onChange={handleChangeTodo} value={currentTodo} />
        </form>
      ) : (
        <h2>{currentTodo}</h2>
      )}
      <p
        onClick={() => {
          checkTodoList(id);
        }}
      >
        {`${isCheck}`}
      </p>
      <button onClick={handleEditTodoList}>수정</button>
      <button
        onClick={() => {
          deleteTodoList(id);
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Todolist;
