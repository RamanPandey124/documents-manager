import CreateTree from "@/components/singleUse/CreateTree";
import RenderTree from "@/components/singleUse/RenderTree";

export default function MainPage({ params }: { params: { folder: string[] } }) {
    const path = params.folder?.length ? `root/${params.folder.join('/')}` : "root"

    return (
        <div className="">
            <CreateTree path={path} />
            <RenderTree path={path} />
        </div>
    )
}