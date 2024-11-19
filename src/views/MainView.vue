<template>
  <HeroComponent
    ><input id="search" class="rounded-lg p-5" placeholder="Search Tasks.." v-model="search" />
    <button
      @click="overlayStore.openOverlay"
      class="w-36 bg-blue-600 text-gray-50 rounded-3xl hover:bg-blue-500 flex justify-center place-items-center gap-2"
    >
    <MdOutlineAddCircleOutline  /> New Task
    </button></HeroComponent
  >
  <div
    v-if="overlayStore.visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="overlayStore.closeOverlay"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" @click.stop>
      <FormComponent @close="overlayStore.closeOverlay" mode="add" />
    </div>
  </div>
  <div class="flex my-5 justify-center">
    <div class="grid xl:grid-cols-4 xl:gap-5 lg:grid-cols-3 lg:gap-2 md:grid-cols-2 sm:grig-col-1 gap-2  ">
      <CardComponent
        v-for="task in displayedTasks"
        :key="task.id"
        :id="task.id"
        :date="task.deadline"
        :title="task.title"
        :status="task.status"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/TaskCard.vue'
import HeroComponent from '@/components/HeroComponent.vue'
import { computed, onMounted, ref, watch } from 'vue'
// import { useApi } from '../composables/CrudHandling'
import type { Task } from '../models/task.model'
import { useOverlayStore } from '../stores/overlay-visibility'
import FormComponent from '../components/FormComponent.vue'
import { MdOutlineAddCircleOutline } from 'vue-icons-plus/md'
import { useTaskStore } from '../stores/task-store'

const overlayStore = useOverlayStore()
// const { get } = useApi('http://localhost:5000/tasks')
// const tasks = ref<Task[] | null>(null)
const search = ref<string>('')
const filtered = ref<Task[]>([])
const taskStore=useTaskStore();
const tasks = computed(() => taskStore.tasks)
watch(
  search,
  (newSearchTerm) => {
    const term = newSearchTerm?.toLowerCase() || ''
    filtered.value = tasks.value
      ? tasks.value.filter((item) => item.title.toLowerCase().includes(term))
      : []
  },
  { immediate: true },
)
const displayedTasks = computed(() => {
  return filtered.value.length > 0 ? filtered.value : tasks.value || []
})
// const fetchData = async () => {
//   try {
//     tasks.value = await get<Task[]>('http://localhost:5000/tasks')
//   } catch (err) {
//     console.error('Error fetching data:', err)
//   }
// }
onMounted(() => taskStore.fetchTasks())

</script>
