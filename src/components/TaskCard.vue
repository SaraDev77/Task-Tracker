<script lang="ts" setup>
import { computed } from 'vue'
import { Status } from '../models/status.enum'

const props = defineProps({
  title: String,
  date: String,
  status: String,
  id: Number,
})
const bgColorClass = computed(() => {
  switch (props.status) {
    case Status.ToDo:
      return 'bg-green-300'
    case Status.InProgress:
      return 'bg-yellow-300'
    case Status.Completed:
      return 'bg-gray-200'
    default:
      return 'bg-gray-100'
  }
})
</script>

<template>
  <RouterLink :to="'/details/' + id">
    <div
      class="w-64 h-36 p-5 m-2 rounded-md flex flex-col justify-between flex-wrap gap-6 shadow-md bg-slate-100 hover:bg-cyan-50"
    >
      <h1 class="text-lg text-slate-950 font-bold">{{ title }}</h1>
      <div class="flex justify-between">
        <p class="text-gray-400 text-left text-sm">Due: {{ date }}</p>
        <button
          :class="[bgColorClass, 'rounded-xl', 'text-sm', 'px-2', 'text-gray-800', 'font-semibold']"
        >
          {{ status }}
        </button>
      </div>
    </div></RouterLink
  >
</template>
