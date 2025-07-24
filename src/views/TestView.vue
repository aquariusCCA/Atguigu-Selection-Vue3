<template>
    <div>

    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { getUsers } from '@/api/test';

onMounted(async () => {
    try {
        // 可能拋錯的程式
        console.log("TestView mounted");
        // You can add any additional logic here if needed
        const resp = await getUsers();
        console.log("Fetched Users:", resp);
    } catch (err) {
        // 或者顯示給使用者看
        console.error('mounted 失敗：', err);
    }
});
</script>

<style scoped lang="scss"></style>