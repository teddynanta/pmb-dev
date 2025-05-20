<script setup lang="ts">
    import { Head, Link, usePage } from '@inertiajs/vue3';
    import { Icon } from '@iconify/vue'
    import { useColorMode } from '@vueuse/core'
    import { Button } from '@/components/ui/button'
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
    import { BookOpenIcon } from 'lucide-vue-next';

    // Pass { disableTransition: false } to enable transitions
    const mode = useColorMode();
    const page = usePage();
    const name = page.props.name;
</script>

<template>

    <Head title="Welcome">
        <!-- <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> -->
    </Head>
    <div
        class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8">
        <header
            class="not-has-[nav]:hidden mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl flex items-center justify-between gap-10">
            <div class="flex flex-row items-center gap-2">
                <img src="../../images/logo.png" alt="logo" class="h-10">
                <span class="font-bold dark:text-white">{{ name }}</span>
            </div>
            <nav class="flex items-center justify-end gap-4">
                <Link v-if="$page.props.auth.user" :href="route('dashboard')"
                    class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                Dashboard
                </Link>
                <template v-else>
                    <Link :href="route('dashboard')"
                        class="inline-block leading-normal hover:text-primary dark:text-white">
                    Kontak
                    </Link>
                    <Link :href="route('dashboard')"
                        class="inline-block leading-normal hover:text-primary dark:text-white">
                    Persyaratan
                    </Link>
                    <Button as-child class="bg-primary">
                        <a href="/register">
                            Daftar Sekarang!
                        </a>
                    </Button>
                </template>
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
            </nav>
        </header>
        <div
            class="duration-750 starting:opacity-0 flex w-full items-center justify-center opacity-100 transition-opacity lg:grow">
            <main
                class="flex w-full max-w-[335px] flex-col-reverse overflow-hidden rounded-lg lg:max-w-6xl lg:flex-row">
                <div class="w-1/2 flex items-center">
                    <p class="font-black text-6xl dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing
                        elit.
                        Quibusdam,
                        unde.
                    </p>
                </div>
                <div class="w-1/2 relative inline-block">
                    <div class="absolute inset-0 bg-primary z-2 h-3/4 w-1/2 mx-auto mt-auto rounded-2xl"></div>
                    <div
                        class="absolute inset-5 outline-1 outline-primary z-1 h-3/4 w-1/2 ms-auto me-14 mt-2 rounded-2xl">
                    </div>
                    <div
                        class="flex items-center border-1 border-green-200 absolute bg-white dark:bg-black p-2 text-sm font-black rounded-xl ms-12 mt-32 w-auto z-5">
                        <BookOpenIcon class="h-4 inline" />
                        <p>Kelas Karyawan</p>
                    </div>
                    <img src="../../images/mhs.png" alt="mahasiswa" class="relative max-w-3/4 mx-auto -mt-14 z-10">
                </div>
            </main>
        </div>
        <div class="h-14.5 hidden lg:block"></div>
    </div>
</template>
