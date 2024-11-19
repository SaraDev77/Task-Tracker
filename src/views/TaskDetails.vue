<script lang="ts" setup>
import HeroComponent from '@/components/HeroComponent.vue'
import { onMounted, ref } from 'vue'
import { useApi } from '../composables/CrudHandling'
import type { Task } from '../models/task.model'
import { useRoute } from 'vue-router'
import { GoTasklist } from 'vue-icons-plus/go'
import { useOverlayStore } from '../stores/overlay-visibility'
import FormComponent from '../components/FormComponent.vue'
import { FcEditImage } from 'vue-icons-plus/fc'

const route = useRoute()
const taskId = route.params.id
const overlayStore = useOverlayStore()
const { get } = useApi(`http://localhost:5000/tasks/${taskId}`)
const task = ref<Task>()
const fetchData = async () => {
  try {
    task.value = await get<Task>()
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}
onMounted(() => fetchData())
</script>

<template>
  <HeroComponent
    ><h1
      class="text-gray-700 xl:text-2xl lg:text-lg text-md font-bold flex justify-center align-middle place-items-center gap-2"
    >
      <GoTasklist class="h-12" />{{ task?.title }}
    </h1>
    <button
      @click="overlayStore.openOverlay"
      class="w-36 bg-blue-600 text-gray-50 rounded-3xl hover:bg-blue-500 flex gap-2 justify-center align-middle place-items-center"
    >
      <FcEditImage />Edit
    </button></HeroComponent
  >
  <div
    v-if="overlayStore.visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="overlayStore.closeOverlay"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" @click.stop>
      <FormComponent @close="overlayStore.closeOverlay" mode="edit" :initialData="task" />
    </div>
  </div>
  <div class="flex justify-center">
    <div
      class="m-10 flex flex-col h-4/6 rounded-3xl p-10 border-2 border-sky-800 border-opacity-25 w-2/5 gap-8 bg-slate-200"
    >
      <div class="flex flex-wrap justify-center align-middle place-items-center xl:gap-4 gap-2">
        <h1 class="xl:text-2xl lg:text-lg text-md text-gray-900 font-bold">Task Name :</h1>
        <h1 class="xl:text-2xl lg:text-lg text-md text-gray-900 font-bold">{{ task?.title }}</h1>
      </div>
      <div class="flex justify-center align-middle place-items-center xl:gap-4 gap-2">
        <h1 class="xl:text-2xl lg:text-lg text-md text-gray-900 font-bold">Task Deadline :</h1>
        <h1 class="xl:text-2xl lg:text-lg text-md text-gray-900 font-bold">{{ task?.deadline }}</h1>
      </div>
      <div class="flex justify-center align-middle place-items-center xl:gap-4 gap-2">
        <h1 class="xl:text-2xl lg:text-lg text-md text-gray-900 font-bold">Task Status :</h1>
        <h1 class="xl:text-2xl lg:text-lg text-md text-gray-900 font-bold">{{ task?.status }}</h1>
      </div>
    </div>
  </div>
</template>
