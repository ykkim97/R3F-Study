import { Box, OrbitControls, useFaceControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useControls } from "leva"

function MyBox(props) {
    const geom = new THREE.BoxGeometry()
    return <mesh {...props} geometry={geom}></mesh>
}

function MyElement3D() {
    const refMesh = useRef()
    const refWireMesh = useRef()

    const { xSize,ySize, zSize,xSegments,ySegments,zSegments } = useControls({
        xSize : { value : 1, min : 0.1, max : 5, step : 0.01 },
        ySize : { value : 1, min : 0.1, max : 5, step : 0.01 },
        zSize : { value : 1, min : 0.1, max : 5, step : 0.01 },
        xSegments : { value : 1, min : 0.1, max : 10, step : 0.01 },
        ySegments : { value : 1, min : 0.1, max : 5, step : 0.01 },
        zSegments : { value : 1, min : 0.1, max : 5, step : 0.01 }
    });

    useEffect(() => {
        refWireMesh.current.geometry = refMesh.current.geometry
    }, [xSize,ySize, zSize,xSegments,ySegments,zSegments])

    return (
        <>
            {/* 조명, [x,y,z축] */}
            <directionalLight position={[1,1,1]}/>
            
            {/* 축 추가 */}
            <axesHelper scale={20}/>
            {/* OrbitControls 추가 */}
            <OrbitControls />

            {/* 모델 */}
            <mesh ref={refMesh}>
                <boxGeometry args={[xSize,ySize,zSize,xSegments,ySegments,zSegments]}/>
                <meshStandardMaterial 
                    color="#1abc9c"
                />
                {/* <axesHelper /> */}
            </mesh>

            <mesh ref={refWireMesh}>
                <meshStandardMaterial 
                    emissive="#1abc9c"
                    wireframe={true}
                />
            </mesh>
        </>
    )
}

export default MyElement3D