import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import LaptopModel from './LaptopModel.tsx'


export const LaptopSection = ({ c }: { c: any }) => {
  const [isMaximized, setIsMaximized] = useState(false)
  return (
    <div
      className={`relative ${isMaximized ? 'h-[1000px]' : 'h-screen'} w-full flex items-center justify-center`}
      style={{
        background: c.bg,

      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          ...(isMaximized ? { fov: 90, position: [0, 100, 0] } :
            { fov: 45, near: 0.1, far: 2000, position: [0, 1.5, 6] })
        }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          shadow-mapSize={[1024, 1024]}
          castShadow
          intensity={1.2}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <LaptopModel c={c} />
        </Suspense>

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.45}
          scale={20}
          blur={2.5}
          far={4.5}
        />
      </Canvas>
    </div>
  )
}