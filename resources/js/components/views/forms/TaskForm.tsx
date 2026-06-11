import * as React from 'react';
import apiService from '../../services/apiService';
import { useTaskContext } from '../../context/TaskContext';

const TaskForm = () => {
    const { 
        title, 
        setTitle, 
        description, 
        setDescription,
        editingId,
        resetForm,
        updateContext 
    } = useTaskContext();

    const handleSubmit = () => {
        if (editingId) {
            apiService.put('edit/' + editingId, {
                title,
                description
            }).then((res) => {
                updateContext();
                resetForm();
            }).catch((error) => {
                console.log("Error editing task: ", error);
            })

            return;
        }

        apiService.post('/save-task', {
            title,
            description
        }).then((res) => {
            console.log(res);
            setTitle('');
            setDescription('');
            updateContext();
        }).catch((error) => {
            console.error('Error saving task:', error);
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <input value={title} onChange={(event) => {
                setTitle(event.target.value);
            }} type="text" placeholder="Title" className="input w-full" />
            <textarea value={description} onChange={(event) => {
                setDescription(event.target.value);
            }} className="textarea min-h-52 w-full" placeholder="Description"></textarea>
            <div className="flex gap-2">
                <button className="btn btn-soft btn-primary" onClick={handleSubmit}>
                    {editingId ? 'Save Changes' : 'Save Task'}
                </button>
                {editingId && (
                    <button type="button" className="btn btn-ghost" onClick={resetForm}>
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}

export default TaskForm;