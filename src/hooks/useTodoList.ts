import { useState, useCallback } from "react";
import { TodolistType } from "../types/todoList";

const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodolistType[]>([]);

  const addTodoList = useCallback((todo: TodolistType) => {
    setTodoList((prev) => [...prev, todo]);
  }, []);

  const deleteTodoList = useCallback(
    (todoListId: string) => {
      const copyTodoList = [...todoList];
      const deleteIndex = copyTodoList.findIndex((todo) => {
        return todo.id === todoListId;
      });
      if (deleteIndex === -1) {
        return;
      }
      copyTodoList.splice(deleteIndex, 1);
      setTodoList(copyTodoList);
    },
    [todoList]
  );

  const checkTodoList = useCallback(
    (todoListId: string) => {
      const copyTodoList = [...todoList];
      const todoListIndex = copyTodoList.findIndex((todo) => {
        return todo.id === todoListId;
      });
      if (todoListIndex === -1) {
        return;
      }
      copyTodoList[todoListIndex].isCheck =
        !copyTodoList[todoListIndex].isCheck;
      setTodoList(copyTodoList);
    },
    [todoList]
  );

  const changeTodoList = useCallback(
    (todoListId: string, todo: string) => {
      const copyTodoList = [...todoList];
      const todoListIndex = copyTodoList.findIndex((todo) => {
        return todo.id === todoListId;
      });
      if (todoListIndex === -1) {
        return;
      }
      copyTodoList[todoListIndex].todo = todo;
      setTodoList(copyTodoList);
    },
    [todoList]
  );

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = [...todoList];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setTodoList(items);
    },
    [todoList]
  );

  return {
    todoList,
    setTodoList,
    addTodoList,
    deleteTodoList,
    checkTodoList,
    changeTodoList,
    handleDragEnd,
  };
};

export default useTodoList;
