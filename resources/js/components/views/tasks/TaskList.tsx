import React from 'react';
import { useTaskContext } from '../../context/TaskContext';

const TaskList = () => {
    const {taskList} = useTaskContext();

    const renderList = (task) => {
        const {title, id, description} = task
        return (
            <div className="rounded-xl bg-base-100/60 p-6" key={id}>
                <div className="text-xl">{title}</div>
                <div className="text-sm">{description}</div>
            </div>
        )
    }

    return (
        <div>
            <div className="card bg-slate-600/50 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p className="text-gray-300/60 text-sm">A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div>
                    <div className="rounded-xl bg-base-100/60 p-6 flex flex-col gap-3 mt-5 max-h-[25rem]">
                        {taskList.map(renderList)}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default TaskList;