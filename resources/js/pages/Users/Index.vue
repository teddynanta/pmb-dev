<script setup lang="ts">
    import AppLayout from '@/layouts/AppLayout.vue';
    import { type BreadcrumbItem } from '@/types';
    import { Head } from '@inertiajs/vue3';
    import type { Payment } from '@/components/payments/column'
    import { onMounted, ref } from 'vue'
    import { columns } from '@/components/payments/column'
    import DataTable from '@/components/payments/DataTable.vue'

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
    ];
    const data = ref<Payment[]>([])

    async function getData(): Promise<Payment[]> {
        // Fetch data from your API here.
        return [
            {
                id: '728ed52f',
                amount: 10000,
                status: 'pending',
                email: 'm@example.com',
            },
            {
                id: '2934hd82',
                amount: 350000,
                status: 'success',
                email: 'a@example.com',
            },
            {
                id: '1023984jj',
                amount: 90000,
                status: 'pending',
                email: 'b@example.com',
            },
            // ...
        ]
    }

    onMounted(async () => {
        data.value = await getData()
    })
</script>

<template>

    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="container py-10 mx-auto">
            <DataTable :columns="columns" :data="data" />
        </div>
    </AppLayout>
</template>
