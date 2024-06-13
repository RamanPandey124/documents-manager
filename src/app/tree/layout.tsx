import ResourceFormSelector from "@/components/newResources/ResourceFormSelector";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <ResourceFormSelector />
            <div className=" min-h-24 bg-zinc-800 pt-4 space-y-4">
                <h1 className="px-4 text-3xl">My Files</h1>
                {children}
            </div>
        </div>
    );
}
