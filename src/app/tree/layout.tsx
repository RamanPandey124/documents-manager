import PathNavigator from "@/components/fileContent/PathNavigator";
import Global from "@/components/global/Global";
import ResourceFormSelector from "@/components/newResources/ResourceFormSelector";
import CounterProvider from "@/context/CounterContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <CounterProvider>
                <Global />
                <ResourceFormSelector />
                <div className=" min-h-24 bg-zinc-800 pt-4 space-y-4">
                    <PathNavigator />
                    {children}
                </div>
            </CounterProvider>
        </div>
    );
}
