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
                <p className="text-gray-300/60 text-sm">Anong gagawin ng bading?</p>

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