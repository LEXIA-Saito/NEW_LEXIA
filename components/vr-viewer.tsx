"use client"

import { useEffect, useRef, useState } from "react"
import { X, MousePointer, RotateCcw } from "lucide-react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { motion } from "framer-motion"

interface VRViewerProps {
  imageUrl: string
  onClose: () => void
}

export function VRViewer({ imageUrl, onClose }: VRViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showInstructions, setShowInstructions] = useState(true)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 0.1)

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(5, 60, 40)
    geometry.scale(-1, 1, 1) // Invert the sphere

    // Load texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = "anonymous"

    const texture = textureLoader.load(
      imageUrl,
      () => {
        setIsLoading(false)
        setTimeout(() => setShowInstructions(false), 3000)
      },
      undefined,
      (err) => console.error("Error loading texture:", err),
    )
    texture.colorSpace = THREE.SRGBColorSpace

    // Create material
    const material = new THREE.MeshBasicMaterial({ map: texture })

    // Create mesh
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.5
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [imageUrl])

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-neutral-900/80 rounded-full p-2 backdrop-blur-sm"
        aria-label="Close VR viewer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
      </motion.button>

      <motion.button
        onClick={resetView}
        className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-neutral-900/80 rounded-full p-2 backdrop-blur-sm"
        aria-label="Reset view"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <RotateCcw className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
      </motion.button>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm">
          <div className="text-white text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4">Loading VR experience...</p>
          </div>
        </div>
      )}

      {showInstructions && !isLoading && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-black/70 text-white px-6 py-4 rounded-lg backdrop-blur-sm flex items-center">
            <MousePointer className="h-5 w-5 mr-2" />
            <span>Click and drag to look around</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
