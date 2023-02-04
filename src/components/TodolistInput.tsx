import React, { useCallback, useState } from "react";
import uuid from "react-uuid";
import { TodolistType } from "../types/todoList";

interface TodolistInputProps {
  addTodoList: (todo: TodolistType) => void;
}

const TodolistInput = ({ addTodoList }: TodolistInputProps) => {
  const [text, setText] = useState("");

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const todo = {
        id: uuid(),
        todo: text,
        isCheck: false,
      };
      addTodoList(todo);
      setText("");
    },
    [addTodoList, text]
  );

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input value={text} onChange={onChangeInput}></input>
        <button></button>
      </form>
    </div>
  );
};

export default TodolistInput;
