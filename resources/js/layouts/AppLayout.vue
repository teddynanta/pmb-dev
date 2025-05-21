<script setup lang="ts">
    import Loading from '@/components/Loading.vue';
    import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
    import type { BreadcrumbItemType } from '@/types';
    import { onMounted, ref } from 'vue';
    import { router } from "@inertiajs/vue3";

    interface Props {
        breadcrumbs?: BreadcrumbItemType[];
    }

    withDefaults(defineProps<Props>(), {
        breadcrumbs: () => [],
    });

    const loading = ref(false);
    const start = () => loading.value = true;
    const finish = () => loading.value = false;

    onMounted(() => {
        router.on('start', start);
        router.on('finish', finish);
        router.on('error', finish);
    });
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Loading v-if="loading" />
        <slot />
    </AppLayout>
</template>
