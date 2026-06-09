import React from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { truncateString } from '../../utils/string';
import apiService from '../../services/apiService';

const TaskList = () => {
    const { taskList, updateContext } = useTaskContext();
    const activeTasks = taskList.filter((task) => task.is_completed === 0);

    const handleMarkAsDone = (id: number) => {
        apiService.put('done/' + id).then(() => {
            updateContext()
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (id: number) => {
        apiService.delete('delete/' + id).then(() => {
            updateContext()
        }).catch((error) => {
            console.log(error);
        })
    }

    const renderList = (task) => {
        const {title, id, description} = task
        return (
            <div className="rounded-xl bg-base-100/60 p-6" key={id}>
                <div className="flex justify-between">
                    <div>
                        <div className="text-xl">{title}</div>
                        <div className="text-sm">{truncateString(description, 20)}</div>
                    </div>

                    <div>
                        <ul className="menu menu-horizontal bg-base-200 rounded-box">
                            <li>
                                <div className="tooltip" data-tip="Mark as done">
                                    <svg width={15} height={15}
                                    onClick={() => handleMarkAsDone(id)} fill="none" className="stroke-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m9 11 3 3L22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="tooltip" data-tip="Edit">
                                    <svg width={15} height={15} fill="none" className="stroke-current" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="tooltip" data-tip="Delete">
                                    <svg width={15} height={15} fill="none" onClick={() => handleDelete(id)} 
                                    className="stroke-current" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>  
        )
    }

    return (
        <div>
            <div className="card bg-slate-600/50 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">To Do List</h2>
                <p className="text-gray-300/60 text-sm">Pending tasks</p>

                <div className="flex flex-col gap-3 mt-5 max-h-[25rem] overflow-y-auto">
                    {activeTasks.length === 0 ? (
                        <p className="text-sm text-gray-300/60">No active tasks.</p>
                    ) : (
                        activeTasks.map(renderList)
                    )}
                </div>
            </div>
            </div>
        </div>
    )
}

export default TaskList;