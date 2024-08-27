import { nanoid } from 'nanoid';
import { FormEvent, useMemo } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import type { Todo } from './types';
import TodoList from './components/TodoList';
import useTodo from './hooks/useTodo';

function App() {

    const [data, setData] = useTodo("todo", [])

    const uncompleteTodo = useMemo(() => {
        return data.filter((d: Todo) => !d.complete).sort((a: Todo, b: Todo) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
    }, [data])


    const completeTodo = useMemo(() => {
        return data.filter((d: Todo) => d.complete).sort((a: Todo, b: Todo) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
    }, [data])


    const handdleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString()
        const date = formData.get("date")?.toString()
        const id = nanoid()

        if (!name) {
            toast.error("タスク名が必要です.", { duration: 2000 })
            return
        }

        if (!date) {
            toast.error("日付が必要です.", { duration: 2000 })
            return
        }

        setData((prev: Todo[]) => [...prev, { name, date, complete: false, id }])

        e.currentTarget.reset()

    }

    const handleComplete = (id: string, complete: boolean) => {
        const todo = data.map((d: Todo) => {
            if (d.id === id) {
                return { ...d, complete }
            }
            return d
        })

        setData(todo)
    }

    const handleDelete = (id: string) => {
        const todo = data.filter((d: Todo) => d.id !== id)
        setData(todo)
    }

    return (
        <>
            <Toaster />
            <div className='flex justify-center mt-20'>
                <div className='max-w-2xl w-full'>
                    <h1 className='text-3xl text-center'>React Todo</h1>
                    <div className='border p-5 shadow-sm rounded-md mt-5'>
                        <form className="flex  gap-2 items-end" onSubmit={handdleSubmit}>
                            <div className="flex-1">
                                <label htmlFor="name" className="block mb-2 text-sm  text-gray-600 font-semibold dark:text-white">タスク名</label>
                                <input placeholder='タスクを入力してください' type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="date" className="block mb-2 text-sm font-semibold text-gray-600 dark:text-white">日付</label>
                                <input type="date" id="date" name='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                        <ul className='mt-5 space-y-5'>
                            <TodoList todo={uncompleteTodo} handleDelete={handleDelete} handleComplete={handleComplete} />
                            <TodoList todo={completeTodo} handleDelete={handleDelete} handleComplete={handleComplete} />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
