<script setup lang="ts">
    import NavFooter from '@/components/NavFooter.vue';
    import NavMain from '@/components/NavMain.vue';
    import NavUser from '@/components/NavUser.vue';
    import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
    import { type NavItem } from '@/types';
    import { Link, usePage } from '@inertiajs/vue3';
    import { BookOpen, Folder, LayoutGrid, Users } from 'lucide-vue-next';
    import AppLogo from './AppLogo.vue';
    import { computed } from 'vue';

    const page = usePage();
    const user = computed(() => page.props.auth.user);

    const isAdmin = computed(() => user.value?.role === 'superadmin' || user.value?.role === 'admin');

    const adminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'User',
            href: '/users',
            icon: Users,
        },
        {
            title: 'admin banget',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];
    const userNavItems: NavItem[] = [
        {
            title: user.value?.role + ' Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Github Repo',
            href: 'https://github.com/laravel/vue-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#vue',
            icon: BookOpen,
        },
    ];

    const mainNavItems = computed(() => {
        return isAdmin.value ? adminNavItems : userNavItems;
    })
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('dashboard')">
                        <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
