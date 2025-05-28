<script setup lang="ts">
    import { Button } from '@/components/ui/button'
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog'
    import { Plus } from "lucide-vue-next";
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button class="cursor-pointer">
                <Plus class="w-4 h-4 mr-2" />
                <slot name="button-slot"></slot>
            </Button>

        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    <slot name="title-slot"></slot>
                </DialogTitle>
                <DialogDescription>
                    <slot name="desc-slot"></slot>
                </DialogDescription>
            </DialogHeader>

            <slot name="form-slot"></slot>

            <DialogFooter>
                <Button class="cursor-pointer" type="submit" form="dialogForm">
                    <slot name="button-slot"></slot>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
