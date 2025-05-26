<script setup lang="ts">
    // import { Toaster } from '@/components/ui/sonner'
    import { toast } from "vue-sonner";
    // import { useDialog } from '@/components/ui/dialog'
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
    import { MoreVertical, Pencil, Trash2, Copy } from 'lucide-vue-next'
    import { router } from '@inertiajs/vue3'

    const props = defineProps<{
        id: number | string
        email?: string
        editUrl: string
        deleteUrl: string
    }>()

    function handleCopy() {
        if (!props.email) return
        navigator.clipboard.writeText(props.email).then(() => {
            toast({
                title: 'Copied!',
                description: `Email ${props.email} copied to clipboard.`,
            })
        }).catch(() => {
            toast({
                title: 'Copy failed',
                description: 'Could not copy the email.',
                variant: 'destructive',
            })
        })
    }

    function handleEdit() {
        router.visit(props.editUrl)
    }

    function handleDelete() {
        if (!confirm("Are you sure you want to delete this record?")) return

        router.delete(props.deleteUrl, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
                toast({
                    title: 'Deleted!',
                    description: 'The record was deleted successfully.',
                });
            },
            onError: () => {
                toast({
                    title: 'Failed!',
                    description: 'Something went wrong.',
                    variant: 'destructive',
                });
            }
        });
    }
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <button class="p-2 rounded-md hover:bg-muted">
                <MoreVertical class="w-4 h-4" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="handleEdit">
                <Pencil class="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleCopy" :disabled="!email">
                <Copy class="w-4 h-4 mr-2" /> Copy Email
            </DropdownMenuItem>
            <DropdownMenuItem @click="handleDelete" class="text-red-600 focus:bg-red-100">
                <Trash2 class="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
