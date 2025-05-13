import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import vertShader from "../shaders/blob.vert.glsl";
import fragShader from "../shaders/blob.frag.glsl";

const BlobMaterial = shaderMaterial(
  {
    u_time: 0,
    u_colors: [
        new THREE.Color('#000000'),
        new THREE.Color('#000000'),
        new THREE.Color('#000000'),
        new THREE.Color('#000000'),
      ] 
  },
  vertShader,
  fragShader
);

extend({ BlobMaterial });

function BlobPlane( { colors }: { colors: string[] } ) {
    const colorVecs = useMemo(() => colors.map((color: string) => new THREE.Color(color)), [colors]);
    const matRef = useRef<any>(null); 
    useFrame(({ clock }) => {
        if (matRef.current) {
            matRef.current.u_time = clock.getElapsedTime()
            matRef.current.u_colors = colorVecs;
        };
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            {/* @ts-ignore */}
            <blobMaterial ref={matRef} u_colors={colorVecs} side={THREE.DoubleSide} />
        </mesh>
    )
}

export default function ThreeDimViz( { colors }: { colors: string[] } ) {

    return (
        <Canvas
            gl={{ antialias: true }}
            style={{
                position: "relative",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw"
            }}
            camera={{ position: [0, 0, 1] }}
        >
            <BlobPlane colors={colors} />
        </Canvas>
    )
}
