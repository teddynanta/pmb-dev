<script setup lang="ts">
    import AppLayout from '@/layouts/AppLayout.vue';
    import { type BreadcrumbItem } from '@/types';
    import { Head } from '@inertiajs/vue3';
    import type { User } from '@/pages/Users/column';
    import { ref } from 'vue';
    import { columns } from '@/pages/Users/column';
    import DataTable from '@/components/ui/data-table/DataTable.vue';
    // import { Button } from "@/components/ui/button";
    // import { Plus } from "lucide-vue-next";
    import ModalAdd from '@/components/ModalAdd.vue';
    import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { toTypedSchema } from '@vee-validate/zod';
    import * as z from 'zod';
    import { toast } from 'vue-sonner';
    import { Toaster } from '@/components/ui/sonner'
    import 'vue-sonner/style.css'


    const formSchema = toTypedSchema(z.object({
        username: z.string().min(5).max(10),
        name: z.string().min(5).max(10),
        email: z.string().email(),
    }))

    function onSubmit() {
        toast('You submitted the following values:', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
            },
        })
    }
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
    ];

    const props = defineProps<{ users: User[] }>();
    const tableData = ref([...props.users]);
    function handleRowDelete(id: number) {
        tableData.value = tableData.value.filter(user => user.id !== id);
    }

    const columnsData = columns(handleRowDelete);
    // const data = ref<User[]>(props.users);


</script>

<template>

    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <Toaster class="pointer-events-auto" />
        <div class="container py-4 px-5 mx-auto">
            <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
                <ModalAdd>
                    <template #button-slot>
                        Add User
                    </template>
                    <template #title-slot>Add User</template>
                    <template #desc-slot>Fill in the details to add a new user.</template>
                    <template #form-slot>
                        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
                            <FormField v-slot="{ componentField }" name="username">
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="shadcn" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage class="text-red-500" />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="name">
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="shadcn" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage class="text-red-500" />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="email">
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="shadcn" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage class="text-red-500" />
                                </FormItem>
                            </FormField>
                        </form>
                    </template>
                </ModalAdd>
            </Form>
            <DataTable :columns="columnsData" :data="tableData" :on-row-delete="handleRowDelete" />
        </div>
    </AppLayout>
</template>
