import type { ColumnDef } from "@tanstack/vue-table";
import DropdownAction from "@/components/ui/user-data-table/DataTableDropdown.vue";
import { h } from "vue";
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { formatReadableDateTime } from "@/lib/date";

export interface User {
    id: number;
    name: string;
    email: string;
    verified_at: string | null;
    role: string;
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: () => h('div', 'Id'),
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('id')),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', row.getValue('name')),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    },
    {
        accessorKey: 'email_verified_at',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Verified At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', formatReadableDateTime(row.getValue('email_verified_at'))),
    },
    {
        accessorKey: 'role',
        header: () => h('div', 'Role'),
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('role')),
    },
    // {
    //     accessorKey: 'amount',
    //     header: () => h('div', { class: 'text-right' }, 'Amount'),
    //     cell: ({ row }) => {
    //         const amount = Number.parseFloat(row.getValue('amount'));
    //         const formatted = new Intl.NumberFormat('id-ID', {
    //             style: 'currency',
    //             currency: 'IDR',
    //         }).format(amount);
    //         return h('div', { class: 'text-right font-medium' }, formatted);
    //     },
    // },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original
            return h('div', { class: 'relative' }, h(DropdownAction, {
                user,
            }))
        },
    },
]
