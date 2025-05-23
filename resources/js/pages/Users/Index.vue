<script setup lang="ts">
    import AppLayout from '@/layouts/AppLayout.vue';
    import { type BreadcrumbItem } from '@/types';
    import { Head, usePage } from '@inertiajs/vue3';
    import { Button } from '@/components/ui/button'
    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from '@/components/ui/table'
    import { formatReadableDateTime } from '@/lib/date';
    import { Trash2, SquarePen } from "lucide-vue-next";

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
    ];
    const page = usePage();
    const users = page.props.users as Array<{
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        role: string;
    }>;
</script>

<template>

    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="mx-10 py-4">
            <Table>
                <TableCaption>List of Users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Verified At</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead class="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="user in users" :key="user.id">
                        <TableCell class="font-medium">{{ user.name }}</TableCell>
                        <TableCell>{{ user.email }}</TableCell>
                        <TableCell v-if="user.email_verified_at">{{ formatReadableDateTime(user.email_verified_at) }}
                        </TableCell>
                        <TableCell v-else>Not Verified Yet</TableCell>
                        <TableCell>{{ user.role }}</TableCell>
                        <TableCell class="text-right">
                            <Button as-child variant="outline"
                                class="ms-2 bg-yellow-500 hover:border-yellow-500 text-white">
                                <a href="#">
                                    <SquarePen class="h-4 w-4" />
                                </a>
                            </Button>
                            <Button as-child variant="outline" class="ms-2 bg-red-500 hover:border-red-500 text-white">
                                <a href="#">
                                    <Trash2 class="h-4 w-4" />
                                </a>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </AppLayout>
</template>
