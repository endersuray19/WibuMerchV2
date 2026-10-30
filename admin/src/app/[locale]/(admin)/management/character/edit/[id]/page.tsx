import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { api } from "@/lib/axios";
import FormCharacter from "../../form/form";

interface pageProps {
    params: Promise<{ id: string }>
}
export default async function EditCharacter({ params }: pageProps) {
    const resolveParam = await params;
    const characterId = resolveParam.id;
    let characterData = null

    try {
        const character = await api.get("/character/detail-character", { data: { id: characterId } })
        characterData = character.data.character

    } catch (error: any) {
        console.log(error)
    }
    const series = await api.get("/series/index")
    const seriesData = series.data.series
    return (
        <div>
            <Breadcrumb pageName="Edit Character" />
            <FormCharacter character={characterData} seriesTabel={seriesData} />
        </div>
    )
}