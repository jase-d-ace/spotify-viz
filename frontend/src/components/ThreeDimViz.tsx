import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import vertShader from "../shaders/blob.vert.glsl";
import fragShader from "../shaders/blob.frag.glsl";

const BlobMaterial = shaderMaterial(
  {
    u_time: 0,
    u_colorCount: 12,
    u_colors: [
        new THREE.Color('#FFFFFF'),
        new THREE.Color('#111111'),
        new THREE.Color('#222222'),
        new THREE.Color('#333333'),
        new THREE.Color('#444444'),
        new THREE.Color('#555555'),
        new THREE.Color('#666666'),
        new THREE.Color('#777777'),
        new THREE.Color('#888888'),
        new THREE.Color('#999999'),
        new THREE.Color('#101010'),
        new THREE.Color('#BBBBBB'),
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
            matRef.current.u_time = clock.getElapsedTime();
            matRef.current.u_colorCount = colorVecs.length;
            matRef.current.u_colors = colorVecs;
        };
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            {/* @ts-ignore */}
            <blobMaterial ref={matRef} u_colorCount={colorVecs.length} u_colors={colorVecs} side={THREE.DoubleSide} />
        </mesh>
    )
}

export default function ThreeDimViz( { colors }: { colors: string[] } ) {

    return (
        <Canvas
            className="three-d-viz-canvas"
            gl={{ antialias: true }}
            camera={{ position: [0, 0, 1] }}
        >
            <BlobPlane colors={colors} />
        </Canvas>
    )
}
