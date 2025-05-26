<script setup lang="ts" generic="TData, TValue">
    import { Button } from '@/components/ui/button'
    import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/vue-table";
    import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { ref } from 'vue';
    import { valueUpdater } from '@/lib/utils';
    import { Input } from '@/components/ui/input'
    import TablePagination from '@/components/ui/TablePagination.vue';
    import { Plus } from "lucide-vue-next";

    const props = defineProps<{
        columns: ColumnDef<TData, TValue>[]
        data: TData[]
    }>()

    const table = useVueTable({
        get data() { return props.data },
        get columns() { return props.columns },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
        onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            get sorting() { return sorting.value },
            get columnFilters() { return columnFilters.value },
        }
    })

    const sorting = ref<SortingState>([])
    const columnFilters = ref<ColumnFiltersState>([])
</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Button as-child>
                <a href="users/create">
                    <Plus class="w-4 h-4 mr-2" /> Add User
                </a>
            </Button>
        </div>
        <div class="flex items-center justify-between py-4">
            <Input class="max-w-sm" placeholder="Filter names..."
                :model-value="table.getColumn('name')?.getFilterValue() as string"
                @update:model-value=" table.getColumn('name')?.setFilterValue($event)" />
            <TablePagination :table="table" />
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colspan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>

            </Table>
            <div class="flex items-center justify-end py-4 px-2 space-x-2">
                <!-- <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                    Previous
                </Button>
                <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                    Next
                </Button> -->
                <TablePagination :table="table" />
            </div>
        </div>
    </div>

</template>
