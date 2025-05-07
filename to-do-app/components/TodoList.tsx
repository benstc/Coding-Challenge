"use client";

import React, { useState } from 'react'
import { Todo } from "@/libs/types"
import styles from './TodoList.module.css'

export default function TodoList({ inputTodos }: { inputTodos: Todo[] }) {
    const [todos, setTodos] = useState(inputTodos)

    function handleCheckboxClick(index: number) {
        let editedTodos = [...todos]
        editedTodos[index].completed = !editedTodos[index].completed
        setTodos(editedTodos)
    }

    return (
        <div className={styles.todoListContainer}>
            <h1>To-do List</h1>
            <div className={styles.inputContainer}>
                <input type="text" placeholder="add new task here"></input>
                <button type="submit">Submit</button>
            </div>
            {todos.map((todo, index) => (
                <div key={index} className={styles.todoListItem}>
                    <img
                        onClick={() => handleCheckboxClick(index)} 
                        src={todo.completed ? "/icons/checked.jpg" : "/icons/unchecked.jpg"}
                        alt="checkbox"
                        width="30px"
                    />
                    <h3 
                        className={todo.completed ? styles.completedTitle : styles.uncompletedTitle}
                    >{todo.title}</h3>
                    <img
                        src="/icons/cross.png"
                        alt="cross"
                        width="20px"
                        height="20px"
                    />
                </div>
            ))}
        </div>
    )
}