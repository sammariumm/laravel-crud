import * as React from 'react';
import apiService from '../services/apiService';

interface TaskData {
    title: string;
    subject_id: number | null;
    subject?: SubjectData | null;
    description: string;
    id: number;
    is_completed: 0 | 1;
    created_at: string;
    updated_at: string;
}

interface SubjectData {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface TaskContextType {
    taskList: TaskData[];
    updateContext: () => void;

    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;

    subjectId: number | '';
    setSubjectId: React.Dispatch<React.SetStateAction<number | ''>>;
    subjectList: SubjectData[];
    fetchSubjects: () => void;

    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;

    editingId: number | null;

    startEdit: (task: TaskData) => void;

    resetForm: () => void;
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [taskList, setTaskList] = React.useState<TaskData[]>([]);

    const [ editingId, setEditingId ] = React.useState<number | null>(null);
    const [ title, setTitle ] = React.useState('');
    const [ subjectId, setSubjectId ] = React.useState<number | ''>('');
    const [ subjectList, setSubjectList ] = React.useState<SubjectData[]>([]);
    const [ description, setDescription ] = React.useState(''); 

    const fetchTaskList = () => {
        apiService
            .get<{ data: TaskData[] }>('get-tasks')
            .then((response) => {
                console.log(response);
                setTaskList(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching task list:', error);
            });
    };

    // FETCH SUBJECTS
    const fetchSubjects = () => {
        apiService.get<{ data: SubjectData[] }>('subjects').then((response) => {
            const subjects = response.data.data;

            setSubjectList(Array.isArray(subjects) ? subjects : []);
        }).catch((error) => {
            console.log("Error fetching subjects: ", error);
        })
    }

    // FETCH TASKS
    React.useEffect(() => {
        fetchTaskList();
        fetchSubjects();
    }, []);

    const updateContext = () => {
        fetchTaskList();
    };

    // EDIT
    const startEdit = (task) => {
        console.log("edit");

        setEditingId(task.id);
        setTitle(task.title);
        setSubjectId(task.subject_id ?? '');
        setDescription(task.description);
    }

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setSubjectId('');
        setDescription('');
    };

    return (
        <TaskContext.Provider value={{ 
            taskList, 
            updateContext,
            title, 
            setTitle,
            subjectId,
            setSubjectId,
            subjectList,
            fetchSubjects, 
            description, 
            setDescription, 
            editingId, 
            startEdit, 
            resetForm
         }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = React.useContext(TaskContext);

    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }

    return context;
};