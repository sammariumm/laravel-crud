import React from 'react';

const TaskForm = () => {
    return (
        <div className="flex flex-col gap-4">
            <input type="text" placeholder="Title" className="input w-full" />
            <textarea className="textarea min-h-52 w-full" placeholder="Description"></textarea>
            <button className="btn btn-soft btn-primary">Submit</button>
        </div>
    )
}

export default TaskForm;