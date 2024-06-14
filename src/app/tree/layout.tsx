import PathNavigator from "@/components/fileContent/PathNavigator";
import ResourceFormSelector from "@/components/newResources/ResourceFormSelector";
import CounterProvider from "@/context/CounterContext";
import Link from "next/link";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <CounterProvider>
                <ResourceFormSelector />
                <div className=" min-h-24 bg-zinc-800 pt-4 space-y-4">
                    <PathNavigator />
                    {children}
                </div>
            </CounterProvider>
        </div>
    );
}
