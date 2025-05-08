"use client";

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { Todo } from "@/libs/types"
import styles from './TodoList.module.css'
import { todo } from 'node:test';


export default function TodoList({ inputTodos }: { inputTodos: Todo[] }) {
    const [todos, setTodos] = useState(inputTodos)
    const [showPopup, setShowPopup] = useState(false)
    const [showCompleted, setShowCompleted] = useState(true)
    const [showUncompleted, setShowUncompleted] = useState(true)
    const [editingId, setEditingId] = useState<number>()
    const inputRef = useRef<HTMLInputElement>(null)
    const editRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    function handleFilter(value: string) {
        if (value === "Show all") {
            setShowCompleted(true)
            setShowUncompleted(true)
        } else if (value === "Show completed") {
            setShowCompleted(true)
            setShowUncompleted(false)
        } else if (value === "Show active") {
            setShowCompleted(false)
            setShowUncompleted(true)
        }
    }
    function handleCheckboxClick(id: number) {
        let editedTodos = todos.map((todo) => {
            if (todo.id == id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })
        setTodos(editedTodos)
    }
    async function handleAdd() {
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
    function handleDeleteClick(id : number) {
        let updatedTasks = todos.filter((todo) => todo.id != id)
        setTodos(updatedTasks)
    }
    function handleEditClick(id : number) {
        setEditingId(id)
        setShowPopup(true)
    }
    function handleEditCancel() {
        setShowPopup(false)
        setEditingId(undefined)
    }
    function handleEditSubmit() {
        const value = editRef.current?.value
        if (!value || value === "") {
            alert("Task name must not be empty!")
        } else {
            let editedTodos = todos.map((todo) => {
                if (todo.id == editingId) {
                    return { ...todo, title: value }
                }
                return todo
            })
            setTodos(editedTodos)
            if (editRef.current) {
                editRef.current.value = ""
            }
            setShowPopup(false)
            setEditingId(undefined)
        }
    }

    return (
            <div className={styles.todoList}>
                <h1>To-do List</h1>
                <select onChange={(e) => handleFilter(e.target.value)}name="filter" id="filter">
                    <option value="Show all">Show all</option>
                    <option value="Show active">Show active</option>
                    <option value="Show completed">Show completed</option>
                </select>
                <div className={styles.inputContainer}>
                    <input ref={inputRef} type="text" placeholder="Add new task"></input>
                    <button onClick={handleAdd} type="submit">Add</button>
                </div>
                {todos.map((todo, index) => (
                    (todo.completed && showCompleted || !todo.completed && showUncompleted) ? 
                    <div key={todo.id} className={styles.todoListItem}>
                        <div>
                            <img
                                onClick={() => handleCheckboxClick(todo.id)} 
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
                                onClick={() => handleEditClick(todo.id)}
                                src="/icons/edit.webp"
                                alt="edit icon"
                                width="20px"
                                height="20px"
                            />
                            <img
                                onClick={() => handleDeleteClick(todo.id)}
                                src="/icons/cross.png"
                                alt="cross"
                                width="20px"
                                height="20px"
                            />
                        </div>
                    </div> : null
                ))}
                {showPopup && (
                    <div className={styles.popupOverlay}>
                        <div className={styles.popup}>
                            <input ref={editRef} type="text" placeholder="Edit task name" />
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