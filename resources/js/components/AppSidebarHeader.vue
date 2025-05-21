<script setup lang="ts">
    import Breadcrumbs from '@/components/Breadcrumbs.vue';
    import { SidebarTrigger } from '@/components/ui/sidebar';
    import type { BreadcrumbItemType } from '@/types';
    import { Icon } from '@iconify/vue'
    import { useColorMode } from '@vueuse/core'
    import { Button } from '@/components/ui/button'
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

    withDefaults(defineProps<{
        breadcrumbs?: BreadcrumbItemType[];
    }>(), {
        breadcrumbs: () => []
    });
    const mode = useColorMode();
</script>

<template>
    <header
        class="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
        <div class="flex items-center gap-2">
            <SidebarTrigger class="-ml-1" />
            <template v-if="breadcrumbs && breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </template>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline">
                    <Icon icon="radix-icons:moon"
                        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Icon icon="radix-icons:sun"
                        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem @click="mode = 'light'">
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem @click="mode = 'dark'">
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem @click="mode = 'auto'">
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
</template>
