"use client";

import React, { useState, useRef } from 'react'
import { Todo } from "@/libs/types"
import styles from './TodoList.module.css'


export default function TodoList({ inputTodos }: { inputTodos: Todo[] }) {
    const [todos, setTodos] = useState(inputTodos)
    const [showPopup, setShowPopup] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number>()
    const inputRef = useRef<HTMLInputElement>(null)
    const editRef = useRef<HTMLInputElement>(null)

    function handleCheckboxClick(index: number) {
        let editedTodos = [...todos]
        editedTodos[index].completed = !editedTodos[index].completed
        setTodos(editedTodos)
    }
    function handleAdd() {
        const value = inputRef.current?.value
        if (!value || value === "") {
            alert("Input task name must not be empty!")
        } else {
            let newTask: Todo = {
                userId: 1,
                id: Date.now(),
                title: value,
                completed: false
            }
            setTodos([...todos, newTask])
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }
    function handleDeleteClick(index : number) {
        let updatedTasks : Todo[] = []
        for (let i = 0; i < todos.length; i++) {
            if (i != index) {
                updatedTasks.push(todos[i])
            }
        }
        setTodos(updatedTasks)
    }
    function handleEditClick(index : number) {
        setEditingIndex(index)
        setShowPopup(true)
    }
    function handleEditCancel() {
        setShowPopup(false)
        setEditingIndex(undefined)
    }
    function handleEditSubmit() {
        const value = editRef.current?.value
        if (!value || value === "") {
            alert("Task name must not be empty!")
        } else {
            let editedTodos = [...todos]
            if (editingIndex) {
                editedTodos[editingIndex].title = value
            }
            setTodos(editedTodos)
            if (editRef.current) {
                editRef.current.value = ""
            }
            setShowPopup(false)
            setEditingIndex(undefined)
        }
    }

    return (
            <div className={styles.todoList}>
                <h1>To-do List</h1>
                <div className={styles.inputContainer}>
                    <input ref={inputRef} type="text" placeholder="Add new task"></input>
                    <button onClick={handleAdd} type="submit">Add</button>
                </div>
                {todos.map((todo, index) => (
                    <div key={index} className={styles.todoListItem}>
                        <div>
                            <img
                                onClick={() => handleCheckboxClick(index)} 
                                src={todo.completed ? "/icons/checked.jpg" : "/icons/unchecked.jpg"}
                                alt="checkbox"
                                width="30px"
                            />
                            <h3 
                                className={todo.completed ? styles.completedTitle : styles.uncompletedTitle}
                            >{todo.title}</h3>
                        </div>
                        <div>
                            <img 
                                onClick={() => handleEditClick(index)}
                                src="/icons/edit.webp"
                                alt="edit icon"
                                width="20px"
                                height="20px"
                            />
                            <img
                                onClick={() => handleDeleteClick(index)}
                                src="/icons/cross.png"
                                alt="cross"
                                width="20px"
                                height="20px"
                            />
                        </div>
                    </div>
                ))}
                {showPopup && (
                    <div className={styles.popupOverlay}>
                        <div className={styles.popup}>
                            <input ref={editRef} type="text" placeholder="Enter task name" />
                            <div className={styles.popupButtons}>
                                <button className={styles.cancelButton} onClick={handleEditCancel}>Cancel</button>
                                <button className={styles.submitButton} onClick={handleEditSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        
    )
}