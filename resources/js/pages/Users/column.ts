import type { ColumnDef } from "@tanstack/vue-table";
// import DropdownAction from "@/components/ui/data-table/DataTableDropdown.vue";
import { h } from "vue";
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { formatReadableDateTime } from "@/lib/date";
import DataTableActions from "@/components/ui/data-table/DataTableActions.vue";

export interface User {
    id: number;
    name: string;
    email: string;
    verified_at: string | null;
    role: string;
}

export const columns = (onRowDelete: (id: number) => void) : ColumnDef<User>[] => [

    // {
    //     accessorKey: 'id',
    //     header: () => h('div', 'Id'),
    //     cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('id')),
    // },
    {
        id: 'number',
        header: () => h('div', { class: 'text-center' }, 'No.'),
        cell: ({ row }) => h('div', { class: 'text-center' }, row.index + 1),
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
        header: () => h('div', 'Actions'),
        cell: ({ row }) => {
            const user = row.original as User
            // const r = row as typeof row & { table: any };
            return h(DataTableActions, {
                // onDeleted: (id: number) => {
                //     r.table.options.meta?.onRowDelete?.(id);
                // },
                id: user.id,
                email: user.email,
                editUrl: `users/${user.id}/edit`,
                deleteUrl: `users/${user.id}`,
                onDeleted: onRowDelete,
            })
        },
    },
]
