"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ROAD_HALF = 3.4;
const Z_NEAR = 24;
const Z_FAR = -150;
const LENGTH = Z_NEAR - Z_FAR;

const curveX = (z: number) => Math.sin(z * 0.025) * 7 + Math.sin(z * 0.011) * 4;
const curveSlope = (z: number) => 7 * 0.025 * Math.cos(z * 0.025) + 4 * 0.011 * Math.cos(z * 0.011);

const heightNoise = (x: number, z: number) =>
  Math.sin(x * 0.12) * Math.cos(z * 0.09) * 1.8 +
  Math.sin(x * 0.31 + z * 0.17) * 0.6 +
  Math.cos(z * 0.045 + x * 0.05) * 1.4;

/** Ribbon geometry that follows the road curve. */
function ribbon(width: number, offset: number, y: number, segments = 220) {
  const g = new THREE.PlaneGeometry(width, LENGTH, 1, segments);
  g.rotateX(-Math.PI / 2);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const z = pos.getZ(i) + (Z_NEAR + Z_FAR) / 2;
    pos.setXYZ(i, pos.getX(i) + offset + curveX(z), y, z);
  }
  g.computeVertexNormals();
  return g;
}

function Terrain() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(160, LENGTH, 150, 170);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i) + (Z_NEAR + Z_FAR) / 2;
      const d = Math.max(0, Math.abs(x - curveX(z)) - ROAD_HALF - 0.8);
      const falloff = Math.min(1, d / 9);
      const h = (heightNoise(x, z) + 2) * falloff * (1 + d * 0.07);
      pos.setXYZ(i, x, h - 0.06, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#0b1d3a" flatShading roughness={0.95} metalness={0.05} />
      </mesh>
      <mesh geometry={geometry} position={[0, 0.03, 0]}>
        <meshBasicMaterial color="#3a6fc2" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function Road() {
  const { asphalt, edgeL, edgeR, shoulderL, shoulderR } = useMemo(
    () => ({
      asphalt: ribbon(ROAD_HALF * 2, 0, 0.01),
      edgeL: ribbon(0.12, -ROAD_HALF + 0.35, 0.03),
      edgeR: ribbon(0.12, ROAD_HALF - 0.35, 0.03),
      shoulderL: ribbon(0.7, -ROAD_HALF - 0.35, 0.0),
      shoulderR: ribbon(0.7, ROAD_HALF + 0.35, 0.0),
    }),
    [],
  );
  return (
    <group>
      <mesh geometry={asphalt}>
        <meshStandardMaterial color="#15181d" roughness={0.9} />
      </mesh>
      <mesh geometry={shoulderL}>
        <meshStandardMaterial color="#3a3f47" roughness={1} />
      </mesh>
      <mesh geometry={shoulderR}>
        <meshStandardMaterial color="#3a3f47" roughness={1} />
      </mesh>
      <mesh geometry={edgeL}>
        <meshBasicMaterial color="#d7dbe0" />
      </mesh>
      <mesh geometry={edgeR}>
        <meshBasicMaterial color="#d7dbe0" />
      </mesh>
    </group>
  );
}

const DASH_COUNT = 48;
const DASH_GAP = LENGTH / DASH_COUNT;

function LaneDashes() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offset = useRef(0);

  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    offset.current = (offset.current + Math.min(delta, 0.05) * 9) % DASH_GAP;
    for (let i = 0; i < DASH_COUNT; i++) {
      const z = Z_FAR + i * DASH_GAP + offset.current;
      dummy.position.set(curveX(z), 0.035, z);
      dummy.rotation.set(0, Math.atan(curveSlope(z)), 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, DASH_COUNT]} frustumCulled={false}>
      <boxGeometry args={[0.16, 0.02, 1.8]} />
      <meshBasicMaterial color="#f26b1d" toneMapped={false} />
    </instancedMesh>
  );
}

const VEHICLES = 10;

function Traffic() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lanes = useMemo(
    () =>
      Array.from({ length: VEHICLES }, (_, i) => ({
        lane: i % 2 === 0 ? -1.7 : 1.7,
        dir: i % 2 === 0 ? 1 : -1,
        z: Z_FAR + (i / VEHICLES) * LENGTH,
        speed: 10 + (i % 3) * 4,
      })),
    [],
  );
  const colors = useMemo(() => {
    const white = new THREE.Color("#fff4e0");
    const red = new THREE.Color("#ff4d2e");
    return lanes.flatMap((l) => (l.dir === 1 ? [white, white] : [red, red]));
  }, [lanes]);

  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const dt = Math.min(delta, 0.05);
    lanes.forEach((v, i) => {
      v.z += v.speed * v.dir * dt;
      if (v.z > Z_NEAR) v.z = Z_FAR;
      if (v.z < Z_FAR) v.z = Z_NEAR;
      const cx = curveX(v.z);
      for (let k = 0; k < 2; k++) {
        dummy.position.set(cx + v.lane + (k === 0 ? -0.35 : 0.35), 0.35, v.z);
        dummy.updateMatrix();
        mesh.setMatrixAt(i * 2 + k, dummy.matrix);
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={(m) => {
        ref.current = m;
        if (m && !m.instanceColor) colors.forEach((c, i) => m.setColorAt(i, c));
      }}
      args={[undefined, undefined, VEHICLES * 2]}
      frustumCulled={false}
    >
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function SurveyBeacons() {
  const beacons = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const z = 10 - i * 11;
        const side = i % 2 === 0 ? -1 : 1;
        return { x: curveX(z) + side * (ROAD_HALF + 1.6), z };
      }),
    [],
  );
  const light = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#ff8a3d", transparent: true, toneMapped: false }),
    [],
  );
  useFrame(({ clock }) => {
    light.opacity = 0.55 + Math.sin(clock.elapsedTime * 2.4) * 0.45;
  });
  return (
    <group>
      {beacons.map((b, i) => (
        <group key={i} position={[b.x, 0, b.z]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
            <meshStandardMaterial color="#c3c9d1" />
          </mesh>
          <mesh position={[0, 1.25, 0]} material={light}>
            <sphereGeometry args={[0.08, 10, 10]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const progress = Math.min(1, window.scrollY / window.innerHeight);
    const t = 1 - Math.pow(0.001, Math.min(delta, 0.05));
    target.set(pointer.x * 1.4, 2.6 + pointer.y * 0.5 + progress * 2.5, 11 - progress * 7);
    camera.position.lerp(target, t);
    look.set(curveX(-35) * 0.6 + pointer.x * 0.8, 0.6, -35);
    camera.lookAt(look);
  });
  return null;
}

export default function HeroScene({ active, onReady }: { active: boolean; onReady?: () => void }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.6, 11], fov: 50, near: 0.1, far: 220 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <color attach="background" args={["#050b1a"]} />
      <fog attach="fog" args={["#050b1a", 18, 110]} />
      <hemisphereLight args={["#1f4682", "#050b1a", 0.9]} />
      <directionalLight position={[-30, 18, -80]} intensity={2.2} color="#ff8a3d" />
      <directionalLight position={[20, 30, 20]} intensity={0.5} color="#9ab8ff" />
      <Terrain />
      <Road />
      <LaneDashes />
      <Traffic />
      <SurveyBeacons />
      <CameraRig />
    </Canvas>
  );
}
