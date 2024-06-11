import RenderResource from "@/components/tuesday/RenderResource";


export default async function MainPage({ params }: { params: { id: string } }) {

    return <RenderResource parentId={params.id} />
}




