<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <section
    class="bg-center bg-no-repeat bg-[url('@/assets/img.jpg')] bg-gray-700 bg-blend-multiply flex flex-col justify-center items-center h-screen"
  >
    <div
      class="bg-slate-100 bg-opacity-85 flex flex-col justify-center items-center gap-5 p-28 rounded-md"
    >
      <h1 class="text-6xl text-center text-gray-800 font-bold">Task Tracker</h1>
      <h3 class="text-lg text-center text-gray-800 font-semibold">lets score some goals!</h3>
      <RouterLink to="/details"
        ><button
          class="bg-sky-600 text-gray-50 text-lg text-center w-52 rounded-lg p-2 hover:bg-sky-400"
        >
          Start A New Task
        </button></RouterLink
      >
    </div>
  </section>
</template>
