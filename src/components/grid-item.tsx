export default function GridItem({
    title,
    description,
    id,
    onclick,
    preview,
    date
}: {
    title: string;
    description: string;
    id: string;
    onclick: (id: string) => void;
    preview: React.ReactElement;
    date: number;
}){
    return (
        <div className="w-[22vw] h-[32vh] bg-white">
            grid item
        </div>
    )
}