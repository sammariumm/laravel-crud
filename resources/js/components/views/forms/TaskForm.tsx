import * as React from 'react';
import apiService from '../../services/apiService';

const TaskForm = () => {
    const [ title, setTitle ] = React.useState('');
    const [ description, setDescription ] = React.useState('');

    const handleSubmit = () => {
        apiService.post('/save-task', {
            title,
            description
        }).then((res) => {
            console.log(res);
            setTitle('');
            setDescription('');
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <input value={title} onChange={(event) => {
                setTitle(event.target.value);
            }} type="text" placeholder="Title" className="input w-full" />
            <textarea value={description} onChange={(event) => {
                setDescription(event.target.value);
            }} className="textarea min-h-52 w-full" placeholder="Description"></textarea>
            <button className="btn btn-soft btn-primary" onClick={handleSubmit}>
                Save task
            </button>
        </div>
    )
}

export default TaskForm;