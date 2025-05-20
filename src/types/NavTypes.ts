export type NavType = {
    label: string;
    route: string;
}


export const NAV_MENU_ITEMS: NavType[] = [
    { label: "Dashboard", route: "/dashboard" },
    { label: "Vital Tasks", route: "/tasks/vital-tasks" },
    { label: "My Tasks", route: "/tasks" }
]
