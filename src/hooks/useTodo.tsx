import { useEffect, useState } from 'react';
import type { Todo } from '../types';
function useTodo(key: string, initial: Todo[]): [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>] {
    const [data, setData] = useState<Todo[]>(() => {
        const todo = window.localStorage.getItem("todo") || '[]'
        try {
            return JSON.parse(todo)
        } catch {
            return initial
        }
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(data))
    }, [data])

    return [data, setData]
}

export default useTodo