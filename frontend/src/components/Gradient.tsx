export default function Gradient({ colors, description }: { colors: string[], description: string}) {
    return (
        <div className="gradient">
            {colors.map(color => <span>{color}</span>)}
            <p>{description}</p>
        </div>
    )
}