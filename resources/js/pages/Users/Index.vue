<script setup lang="ts">
    import AppLayout from '@/layouts/AppLayout.vue';
    import { type BreadcrumbItem } from '@/types';
    import { Head } from '@inertiajs/vue3';
    import type { User } from '@/components/ui/user-data-table/column'
    import { ref } from 'vue'
    import { columns } from '@/components/ui/user-data-table/column'
    import DataTable from '@/components/ui/user-data-table/DataTable.vue'

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
    ];

    const props = defineProps<{ users: User[] }>();
    const data = ref<User[]>(props.users);

</script>

<template>

    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container py-4 px-5 mx-auto">
            <DataTable :columns="columns" :data="data" />
        </div>
    </AppLayout>
</template>
