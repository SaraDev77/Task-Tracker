<template>
  <div class="flex h-full">
    <aside
      id="default-sidebar"
      class="w-1/4 sm:w-1/6 bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li >
            <RouterLink
              active-class="bg-sky-600 text-white "
              to="/"
              class="flex items-center  p-2 text-gray-900 rounded-lg gap-1 group"
            >
            <RiHomeHeartFill class="h-4"/> Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/details"
              class="flex items-center  p-2 text-gray-900 rounded-lg gap-1 group"
              active-class="bg-sky-600 text-white "
            >
            <SlMagicWand class="h-4"/> Explore
            </RouterLink>
          </li>
          <li><TreeComponent /></li>
        </ul>
      </div>
    </aside>

    <main class="flex-1 bg-zinc-100 h-screen">
      <RouterView />
    </main>
  </div>
</template>
<script lang="ts" setup>
import { RiHomeHeartFill } from 'vue-icons-plus/ri';
import { SlMagicWand } from 'vue-icons-plus/sl';
</script>
