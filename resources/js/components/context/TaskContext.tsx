import * as React from 'react';
import apiService from '../services/apiService';

interface TaskData {
    title: string;
    description: string;
    id: number;
    is_completed: 0 | 1;
    created_at: string;
    updated_at: string;
}

interface TaskContextType {
    taskList: TaskData[];
    updateContext: () => void;
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [taskList, setTaskList] = React.useState<TaskData[]>([]);

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

    React.useEffect(() => {
        fetchTaskList();
    }, []);

    const updateContext = () => {
        fetchTaskList();
    };

    return (
        <TaskContext.Provider value={{ taskList, updateContext }}>
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