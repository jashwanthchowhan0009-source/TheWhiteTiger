import { Environment, Lightformer, Backdrop } from '@react-three/drei';

// A real photographic studio: a seamless cyclorama (floor curves up into the
// back wall) lit by soft-box area lights baked into an image-based environment.
// This replaces the flat "model floating on black" look with a professional
// product-shot stage — consistent, natural studio lighting the tiger travels
// through, plus a matching graded backdrop that catches its shadow.
export function Studio() {
  return (
    <>
      {/* ── seamless studio cyclorama: floor sweeps up into the back wall ── */}
      <Backdrop
        floor={0.75}
        segments={48}
        scale={[42, 18, 10]}
        position={[0, -1.55, -5]}
        receiveShadow
      >
        <meshStandardMaterial color="#24252a" roughness={0.94} metalness={0} envMapIntensity={0.45} />
      </Backdrop>

      {/* ── studio IBL: three soft-boxes on a dark base → smooth wrap light ── */}
      <Environment resolution={256}>
        {/* dark stage base so the softboxes read as studio panels, not a bright dome */}
        <Lightformer form="rect" intensity={0.35} color="#3a3d45" position={[0, 0, -9]} scale={[30, 20, 1]} />
        {/* KEY — big warm soft-box, upper right & slightly front (the main modelling light) */}
        <Lightformer form="rect" intensity={5.5} color="#fff2e2" position={[7, 6, 4]} rotation={[0, -Math.PI / 3.2, 0]} scale={[10, 12, 1]} />
        {/* FILL — cool, wide, from the left to open the shadow side without killing it */}
        <Lightformer form="rect" intensity={1.4} color="#cfe0ff" position={[-8, 2.5, 3]} rotation={[0, Math.PI / 2.6, 0]} scale={[9, 12, 1]} />
        {/* RIM / KICKER — bright strip from high behind to carve the top edge */}
        <Lightformer form="rect" intensity={3.2} color="#ffffff" position={[-1, 8, -6]} rotation={[Math.PI / 2.4, 0, 0]} scale={[12, 8, 1]} />
      </Environment>
    </>
  );
}
