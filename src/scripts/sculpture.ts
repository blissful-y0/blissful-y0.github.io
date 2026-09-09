import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function initSculpture() {
  const host = document.querySelector<HTMLElement>('#sculpture');
  const scrollSection = document.querySelector<HTMLElement>('.sculpture-scroll');
  if (!host || !scrollSection) return;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
  catch { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x08090d, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.appendChild(renderer.domElement);
  host.classList.add('webgl-ready');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  camera.position.set(0, 0, 12);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentScene = new RoomEnvironment();
  const environment = pmrem.fromScene(environmentScene, .04);
  scene.environment = environment.texture;
  environmentScene.dispose();
  pmrem.dispose();
  const group = new THREE.Group();
  scene.add(group);
  const rings: THREE.Mesh<THREE.TorusGeometry, THREE.MeshPhysicalMaterial>[] = [];
  const colors = [new THREE.Color('#FFC8E0'), new THREE.Color('#678EC9'), new THREE.Color('#262277')];
  const count = 36;
  const geometry = new THREE.TorusGeometry(1.65, .032, 10, 144);
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const color = t < .5 ? colors[0].clone().lerp(colors[1], t * 2) : colors[1].clone().lerp(colors[2], (t - .5) * 2);
    const material = new THREE.MeshPhysicalMaterial({color, metalness: .72, roughness: .18, clearcoat: 1, clearcoatRoughness: .12, iridescence: .65, iridescenceIOR: 1.35, envMapIntensity: 1.5});
    const ring = new THREE.Mesh(geometry, material);
    group.add(ring); rings.push(ring);
  }
  const key = new THREE.DirectionalLight('#ffc8e0', 5);
  key.position.set(-3, 5, 4); scene.add(key);
  const fill = new THREE.DirectionalLight('#678ec9', 4);
  fill.position.set(4, -1, 2); scene.add(fill);
  scene.add(new THREE.AmbientLight('#ffffff', .4));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = new THREE.Vector2();
  let progress = 0, targetProgress = 0, frame = 0, visible = true;
  let lastTime = 0;
  const label = document.querySelector('#scene-state');
  const counter = document.querySelector('#scene-progress');
  const title = document.querySelector<HTMLElement>('.title-lockup');
  const meter = document.querySelector<HTMLElement>('.scroll-meter i');
  const resize = () => {
    const {width, height} = host.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = width < 721 ? 16 : 12;
    camera.updateProjectionMatrix();
    updateScroll();
  };
  const updateScroll = () => {
    const rect = scrollSection.getBoundingClientRect();
    targetProgress = reduced.matches ? 0 : THREE.MathUtils.clamp(-rect.top / Math.max(1, rect.height - window.innerHeight), 0, 1);
  };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || reduced.matches) return;
    pointer.set((event.clientX / window.innerWidth - .5) * .22, (event.clientY / window.innerHeight - .5) * .14);
  };
  const render = (time: number) => {
    frame = requestAnimationFrame(render);
    if (!visible || document.hidden) return;
    if (time - lastTime < 1000 / 45 && !reduced.matches) return;
    lastTime = time;
    progress = reduced.matches ? 0 : THREE.MathUtils.lerp(progress, targetProgress, .075);
    const spread = Math.sin(progress * Math.PI);
    rings.forEach((ring, i) => {
      const t = i / (count - 1);
      const centered = t - .5;
      ring.position.z = centered * (.95 + spread * 4.1);
      ring.rotation.x = spread * centered * 1.1;
      ring.rotation.y = spread * centered * .7;
      const scale = 1 - Math.pow(Math.abs(centered) * 2, 2) * .12;
      ring.scale.setScalar(scale);
    });
    const drift = reduced.matches ? 0 : Math.sin(time * .00022) * .035;
    group.rotation.set(.3 + progress * 1.15 + pointer.y, -.48 + progress * Math.PI * 1.25 + pointer.x + drift, -.4 + progress * .8);
    group.position.y = -.8 + progress * .45;
    group.scale.setScalar((1 + progress * .12) * (window.innerWidth < 721 ? 1 - spread * .55 : 1));
    if (title) { title.style.opacity = String(1 - Math.min(progress * 2.8, 1)); title.style.transform = `translateY(${-progress * 60}px)`; }
    if (meter) meter.style.transform = `scaleY(${progress})`;
    if (counter) counter.textContent = String(Math.round(progress * 100)).padStart(3, '0');
    if (label) label.textContent = progress < .3 ? 'PERSPECTIVE' : progress < .7 ? 'EXPLORATION' : 'ANOTHER ANGLE';
    renderer.render(scene, camera);
    if (reduced.matches) { cancelAnimationFrame(frame); frame = 0; }
  };
  const restart = () => { if (!frame) frame = requestAnimationFrame(render); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
  observer.observe(host);
  window.addEventListener('scroll', updateScroll, {passive:true});
  window.addEventListener('pointermove', onPointer, {passive:true});
  const resizeObserver = new ResizeObserver(() => { resize(); restart(); });
  resizeObserver.observe(host);
  reduced.addEventListener('change', () => { updateScroll(); restart(); });
  resize(); restart();
  window.addEventListener('pageshow', (event) => { if (event.persisted) { resize(); restart(); } });
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) { cancelAnimationFrame(frame); frame = 0; return; }
    cancelAnimationFrame(frame); frame = 0;
    observer.disconnect(); resizeObserver.disconnect();
    window.removeEventListener('scroll', updateScroll);
    window.removeEventListener('pointermove', onPointer);
    geometry.dispose(); rings.forEach(ring => ring.material.dispose());
    environment.dispose(); renderer.dispose();
  }, {once:true});
}
