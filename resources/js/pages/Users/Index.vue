<script setup lang="ts">
    import AppLayout from '@/layouts/AppLayout.vue';
    import { type BreadcrumbItem } from '@/types';
    import { Head } from '@inertiajs/vue3';
    import type { User } from '@/pages/Users/column'
    import { ref } from 'vue'
    import { columns } from '@/pages/Users/column'
    import DataTable from '@/components/ui/data-table/DataTable.vue'
    import { Button } from "@/components/ui/button";
    import { Plus } from "lucide-vue-next";

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
    ];

    const props = defineProps<{ users: User[] }>();
    const tableData = ref([...props.users]);
    function handleRowDelete(id: number) {
        console.log('Deleting user with ID:', id);

        tableData.value = tableData.value.filter(user => user.id !== id);
    }

    const columnsData = columns(handleRowDelete);
    // const data = ref<User[]>(props.users);


</script>

<template>

    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container py-4 px-5 mx-auto">
            <div class="flex items-center py-4">
                <Button as-child>
                    <a href="users/create">
                        <Plus class="w-4 h-4 mr-2" /> Add User
                    </a>
                </Button>
            </div>
            <DataTable :columns="columnsData" :data="tableData" :on-row-delete="handleRowDelete" />
        </div>
    </AppLayout>
</template>
