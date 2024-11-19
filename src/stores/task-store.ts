import { defineStore } from 'pinia'
import type { Task, TaskRequest } from '../models/task.model'
import { useApi } from '../composables/CrudHandling'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    async fetchTasks() {
      const { get } = useApi('http://localhost:5000/tasks')
      const data: Task[] = await get()
      this.tasks = data
      console.log('test')
    },

    async fetchTask(taskId: number) {
      const { get } = useApi(`http://localhost:5000/tasks/${taskId}`)
      const data: Task = await get()
      return data
    },

    async addTask(task: TaskRequest) {
      const { post } = useApi('http://localhost:5000/tasks')
      try {
        const newTask: Task = await post(task)
        this.tasks.push(newTask)
      } catch (err) {
        console.error('Failed to add task:', err)
      }
    },

    async updateTask(updatedTask: TaskRequest, taskId: number) {
      const { patch } = useApi(`http://localhost:5000/tasks/${taskId}`)
      try {
        const taskResponse = await patch<Task, TaskRequest>(updatedTask)
        this.tasks = this.tasks.map((task) => (task.id === taskId ? taskResponse : task))
      } catch (err) {
        console.error('Failed to update task:', err)
      }
    },
  },
})
