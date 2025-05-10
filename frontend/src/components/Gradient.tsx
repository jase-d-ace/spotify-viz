import { useRef, useEffect } from "react";

export default function Gradient({ colors, description }: { colors: string[], description: string}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    let frame = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const cy = canvas.width / 2;
            const cx = canvas.height / 2;
            const radius = Math.hypot(cx, cy) * (1 + 0.05 * Math.sin(frame * 0.02))
            if (ctx) {
                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
                colors.forEach((color, index) => {
                    gradient.addColorStop(index / (colors.length - 1), color);
                });
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, [colors]);
    return (
        <div className="gradient">
            <canvas 
                ref={canvasRef} 
                style={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />

            {colors.map(color => <span>{color}</span>)}
            <p>{description}</p>
        </div>
    )
}