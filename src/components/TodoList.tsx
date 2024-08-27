import type { Todo } from '../types';

interface TodoListProps {
    todo: Todo[];
    handleComplete: (id: string, complete: boolean) => void;
    handleDelete: (id: string) => void;
}

function TodoList({ todo, handleComplete, handleDelete }: TodoListProps) {
    return todo.map((d: Todo) => {
        return <li key={d.id}>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <input onChange={() => {
                        handleComplete(d.id, !d.complete)
                    }} checked={d.complete} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <div className=' leading-4'>
                        <div className='text-xs text-green-500'>{d.date}</div>
                        <span className='font-medium text-gray-500'>
                            {d.name}
                        </span>
                    </div>
                </div>
                <div className='flex items-center'>
                    {d.complete ?
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">完了</span> : <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">未完成</span>}
                    <button className={`bg-gray-100 p-2 rounded-xl ${!d.complete ? 'opacity-50 pointer-events-none' : null}`} onClick={() => {
                        handleDelete(d.id)
                    }} type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    })
}

export default TodoList