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
        <div className="flex flex-col h-screen">
            <CounterProvider>
                <Global />
                <ResourceFormSelector />
                <div className=" min-h-24 bg-zinc-800 pt-4 space-y-4 flex-1">
                    <PathNavigator />
                    {children}
                </div>
            </CounterProvider>
        </div>
    );
}
