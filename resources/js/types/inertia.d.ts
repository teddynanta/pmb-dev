import { User } from "./user";

declare module '@inertiajs/vue3' {
    interface pageProps {
        auth: {
            user: User | null;
        };
    }
}
