import React, { useState } from 'react'
import { Todo } from "@/libs/types"
import  TodoList from "@/components/TodoList"
import styles from "./page.module.css"

function shuffleTodos(array: Todo[]): Todo[] {
    let shuffledTodos = [...array]
    for (let i = shuffledTodos.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tempTodo = shuffledTodos[j]
        shuffledTodos[j] = shuffledTodos[i]
        shuffledTodos[i] = tempTodo
    }
    return shuffledTodos;
}

export default async function Page() {
    let todos: Todo[] = [];
    let finalTodos: Todo[] = [];
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        
        if (!response.ok) {
            throw new Error("Failed to fetch todos")
        }

        todos = await response.json()
    } catch (error) {
        console.error("Error fetching todos: ", error)
        return (
            <div className={styles.appContainer}>
                <div className={styles.errorContainer}>
                    <h1>Failed to load todos</h1>
                </div>
            </div>
        )
    }
    if (todos.length > 3) {
        const shuffledTodos = shuffleTodos(todos)
        finalTodos = shuffledTodos.slice(0, 3)
    } else {
        finalTodos = todos
    }
    

    return (
        <div className={styles.appContainer}>
            <TodoList inputTodos={finalTodos} />
        </div>
    )
}