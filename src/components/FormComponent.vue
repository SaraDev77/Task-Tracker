<template>
  <Form @submit="submitData">
    <h1 v-if="mode === 'add'" class="font-bold text-xl text-slate-950 mb-4">Add New Task</h1>
    <h1 v-else class="font-bold text-xl text-slate-950 mb-4">Edit Task</h1>
    <label for="title">Title</label>
    <Field
      v-model="data.title"
      name="title"
      id="title"
      :rules="isRequired"
      class="my-2 block w-full border-2 border-gray-300 rounded-md p-4 focus:shadow-none focus:border-none sm:text-sm"
    />
    <ErrorMessage name="deadline" class="text-md text-red-400 my-2" />
    <hr class="bg-slate-800 font-bold w-full my-4" />
    <label for="deadline">Deadline</label>
    <Field
      v-model="data.deadline"
      name="deadline"
      id="deadline"
      :rules="isRequired"
      class="my-2 block w-full border-2 border-gray-300 rounded-md p-4 focus:shadow-none focus:border-none sm:text-sm"
    />
    <ErrorMessage name="status" class="text-md text-red-400 mt-2" />
    <hr class="bg-slate-800 font-bold w-full my-4" />
    <label for="status">Status</label>
    <Field
      v-model="data.status"
      name="status"
      :rules="selectEnumValidation"
      as="select"
      class="my-2 block w-full border-2 border-gray-300 rounded-md p-4 focus:shadow-none focus:border-2 sm:text-sm"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </Field>

    <ErrorMessage name="status" class="text-md text-red-400 mt-2" />
    <hr class="bg-slate-800 font-bold w-full my-4" />

    <div class="flex justify-end mt-4">
      <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded">Submit</button>
      <button
        type="button"
        @click="$emit('close')"
        class="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
import { Status } from '@/models/status.enum'
import { reactive } from 'vue'
import type { TaskRequest } from '../models/task.model'
import { formatDate } from '../utils/date.util'
import { useOverlayStore } from '../stores/overlay-visibility'
import { useTaskStore } from '../stores/task-store'
import { useRoute } from 'vue-router'

const route = useRoute()
const taskId = route.params.id
const overlayStore = useOverlayStore()
const date = Date.now()
const options = Object.values(Status)
const taskStore = useTaskStore()
const props = defineProps<{
  initialData?: Partial<TaskRequest>
  mode: 'add' | 'edit'
}>()

const data = reactive({
  title: props.initialData?.title || '',
  deadline: props.initialData?.deadline || formatDate(new Date(date)),
  status: props.initialData?.status || Status.ToDo,
})

function isRequired(value: unknown) {
  if (value && value.toString().trim()) {
    return true
  }
  return 'This is required'
}

function selectEnumValidation(value: unknown): boolean | string {
  if (options.includes(value as Status)) {
    return true
  }
  return 'Invalid selection.'
}

const submitData = async () => {
  try {
    if (props.mode === 'add') {
      taskStore.addTask(data)
    } else {
      taskStore.updateTask(data, Number(taskId))
    }
    overlayStore.closeOverlay()
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}
</script>
