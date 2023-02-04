import React, { useEffect } from "react";
import styled from "@emotion/styled";
import TodolistInput from "./TodolistInput";
import Todolist from "./Todolist";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useTodoList from "../hooks/useTodoList";

const TodolistWrapper = styled.div`
  position: absolute;
  top: 0;
`;

const TodolistComp = () => {
  const {
    todoList,
    setTodoList,
    addTodoList,
    deleteTodoList,
    checkTodoList,
    changeTodoList,
    handleDragEnd,
  } = useTodoList();

  useEffect(() => {
    if (localStorage.getItem("todoList")) {
      const storageTodoList = JSON.parse(localStorage.getItem("todoList")!);
      setTodoList(storageTodoList);
    }
  }, [setTodoList]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <TodolistWrapper>
        <TodolistInput addTodoList={addTodoList} />
        <Droppable droppableId="todolistWrapper">
          {(provided) => (
            <div
              className="todolistWrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todoList.map((todo, index) => (
                <Draggable draggableId={todo.id} key={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <Todolist
                        id={todo.id}
                        index={index + 1}
                        todo={todo.todo}
                        isCheck={todo.isCheck}
                        deleteTodoList={deleteTodoList}
                        checkTodoList={checkTodoList}
                        changeTodoList={changeTodoList}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </TodolistWrapper>
    </DragDropContext>
  );
};

export default TodolistComp;
