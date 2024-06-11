import CreateNewResource from "@/components/singleUse/CreateNewResource";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <CreateNewResource />
            {children}
        </div>
    );
}
