<script setup>
const router = useRouter()
const title = ref()
watchEffect(() => {
    title.value = router.currentRoute.value.meta.title || '默认标题'
})

</script>
<template>
    <main class=" text-center text-gray-700 dark:text-gray-200 h-100%">
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="router.back()"
        />
        <router-view />
    </main>
</template>
