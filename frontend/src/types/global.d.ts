import { ReactNode } from "react"
export { };

declare global {
    type Nullable<T> = T | null;

    export type ContainerComponentProps = {
        children: ReactNode;
    };
}