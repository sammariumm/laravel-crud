import * as React from 'react';
import apiService from '../../services/apiService';
import { useTaskContext } from '../../context/TaskContext';

const TaskForm = () => {
    const { 
        taskList, 
        updateContext,
        title, 
        setTitle,
        subjectId,
        setSubjectId,
        subjectList,
        fetchSubjects, 
        subject, 
        setSubject, 
        description, 
        setDescription, 
        editingId, 
        startEdit, 
        resetForm
    } = useTaskContext();

    const handleSubmit = () => {
        if (editingId) {
            apiService.put('edit/' + editingId, {
                title,
                subject_id: subjectId || null,
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
            subject_id: subjectId || null,
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

    const [showSubjectInput, setShowSubjectInput] = React.useState(false);
    const [newSubject, setNewSubject] = React.useState('');

    const handleAddSubject = () => {
        if (!newSubject.trim()) return;

        apiService.post('save-subject', {
            name: newSubject,
        })
        .then(() => {
            fetchSubjects();
            setNewSubject('');
            setShowSubjectInput(false);
        })
        .catch((error) => {
            console.error('Error adding subject:', error);
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <input
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
                type="text"
                placeholder="Title"
                className="input w-full"
            />

            <div className="flex gap-2">
                <select
                    className="select bg-base-100 w-52"
                    value={subjectId}
                    onChange={(event) => {
                        const value = event.target.value;
                        setSubjectId(value === '' ? '' : Number(value));
                    }}
                >
                    <option value="">Choose Subject</option>

                    {subjectList.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                            {subject.name}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    className="btn btn-outline btn-info"
                    onClick={() => setShowSubjectInput(true)}
                >
                    Add new subject
                </button>
            </div>

            {showSubjectInput && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="Subject name"
                        value={newSubject}
                        onChange={(event) => setNewSubject(event.target.value)}
                    />

                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={handleAddSubject}
                    >
                        Add
                    </button>

                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => {
                            setShowSubjectInput(false);
                            setNewSubject('');
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}

            <textarea
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
                className="textarea min-h-52 w-full"
                placeholder="Description"
            ></textarea>

            <div className="flex gap-2">
                <button
                    type="button"
                    className="btn btn-soft btn-info"
                    onClick={handleSubmit}
                >
                    {editingId ? 'Save Changes' : 'Save Task'}
                </button>

                {editingId && (
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}

export default TaskForm;