// macbookScene.js — the three.js MacBook that floats in, rotates, and opens as
// you scroll. Ported from the original rhythmOS design; uses the repo's installed
// three@0.178 (static imports) instead of the export's unpkg importmap.
//
// Usage:
//   const scene = await createMacbookScene(wrapEl, { laptopColor });
//   // each animation frame, with p = smoothed scrollY / innerHeight and t = time:
//   const os = scene.update(p, t);   // -> { hideOs } | { quad, osIn, osInteractive }
//   scene.applyBodyColor('space black');
//   scene.dispose();
//
// Returns null if WebGL init fails (caller falls back to a flat full-screen OS).

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const SILVER = 0xa9afb6;
const BLACK = 0x2b2b2e;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (x) => x * x * (3 - 2 * x);

export async function createMacbookScene(wrap, { laptopColor } = {}) {
  try {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Clear any prior canvas (e.g. React StrictMode's dev double-mount reuses this
    // wrap and would otherwise stack an empty canvas over the rendered one).
    while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 400);
    camera.position.set(20, 16, 62);

    // ---- laptop ----
    const laptop = new THREE.Group();
    scene.add(laptop);
    const W = 30, D = 20.8, BH = 1.05, LT = 0.55, R = 1.4;

    const roundedPlate = (w, d, h, r) => {
      const s = new THREE.Shape();
      const x = -w / 2, y = -d / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + d - r); s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
      s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
      const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: true, bevelThickness: 0.09, bevelSize: 0.09, bevelSegments: 3, curveSegments: 10 });
      g.center();
      return g;
    };

    const bodyColor = (laptopColor === 'space black') ? BLACK : SILVER;
    const alu = new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.85, roughness: 0.38 });
    const aluLid = alu.clone();
    const mats = { alu, aluLid };

    // base
    const base = new THREE.Mesh(roundedPlate(W, D, BH, R), alu);
    base.rotation.x = -Math.PI / 2;
    base.position.y = BH / 2 + 0.12;
    laptop.add(base);

    // keyboard deck texture
    const deckCanvas = document.createElement('canvas');
    deckCanvas.width = 1024; deckCanvas.height = 710;
    const dc = deckCanvas.getContext('2d');
    let curBlack = bodyColor === BLACK;
    const drawDeck = (dark) => {
      dc.fillStyle = dark ? '#2b2b2e' : '#a9afb6';
      dc.fillRect(0, 0, 1024, 710);
      dc.fillStyle = dark ? '#232326' : '#949aa1';
      dc.beginPath(); dc.roundRect(188, 48, 652, 290, 10); dc.fill();
      dc.fillStyle = dark ? 'rgba(0,0,0,.4)' : 'rgba(0,0,0,.22)';
      for (let r = 0; r < 34; r++) for (let c = 0; c < 8; c++) {
        dc.beginPath(); dc.arc(96 + c * 11, 74 + r * 7.2, 1.6, 0, 7); dc.fill();
        dc.beginPath(); dc.arc(846 + c * 11, 74 + r * 7.2, 1.6, 0, 7); dc.fill();
      }
    };
    drawDeck(curBlack);
    const deckTex = new THREE.CanvasTexture(deckCanvas);
    deckTex.anisotropy = 8;
    const deck = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.7, D - 0.7), new THREE.MeshStandardMaterial({ map: deckTex, metalness: 0.6, roughness: 0.5 }));
    deck.rotation.x = -Math.PI / 2;
    deck.position.y = BH + 0.13 + 0.011;
    laptop.add(deck);

    // ---- real 3D keys ----
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x1b1b1d, metalness: 0.25, roughness: 0.62 });
    const keyGeo = new THREE.BoxGeometry(1.06, 0.15, 0.96);
    const keyY = BH + 0.13 + 0.09;
    const nKeys = 14 * 5 + 9;
    const keysMesh = new THREE.InstancedMesh(keyGeo, keyMat, nKeys);
    const m4 = new THREE.Matrix4(), q0 = new THREE.Quaternion();
    let ki = 0;
    const dx = 1.3, dz = 1.22, startX = -8.45, startZ = -7.35;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        const sZ = r === 0 ? 0.55 : 1;
        m4.compose(new THREE.Vector3(startX + c * dx, keyY, startZ + r * dz + (r === 0 ? -0.2 : 0)), q0, new THREE.Vector3(1, 1, sZ));
        keysMesh.setMatrixAt(ki++, m4);
      }
    }
    const bz = startZ + 5 * dz;
    for (let c = 0; c < 4; c++) { m4.compose(new THREE.Vector3(startX + c * dx, keyY, bz), q0, new THREE.Vector3(1, 1, 1)); keysMesh.setMatrixAt(ki++, m4); }
    m4.compose(new THREE.Vector3(startX + 6.5 * dx, keyY, bz), q0, new THREE.Vector3(5.6, 1, 1)); keysMesh.setMatrixAt(ki++, m4);
    for (let c = 10; c < 14; c++) { m4.compose(new THREE.Vector3(startX + c * dx, keyY, bz), q0, new THREE.Vector3(1, 1, 1)); keysMesh.setMatrixAt(ki++, m4); }
    keysMesh.instanceMatrix.needsUpdate = true;
    laptop.add(keysMesh);

    // ---- trackpad ----
    const trackpad = new THREE.Mesh(new THREE.BoxGeometry(10.4, 0.07, 6.6), new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.7, roughness: 0.22 }));
    trackpad.position.set(0, BH + 0.13 + 0.045, 4.6);
    laptop.add(trackpad);
    const trackpadMat = trackpad.material;

    // ---- coffee ----
    const cupGrp = new THREE.Group();
    const ceramic = new THREE.MeshStandardMaterial({ color: 0xf7f7f4, metalness: 0.02, roughness: 0.28 });
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 2.7, 7.6, 40), ceramic);
    cup.position.y = 3.8;
    cupGrp.add(cup);
    const latteCanvas = document.createElement('canvas');
    latteCanvas.width = 128; latteCanvas.height = 128;
    const lc = latteCanvas.getContext('2d');
    const lg = lc.createRadialGradient(64, 64, 6, 64, 64, 64);
    lg.addColorStop(0, '#e8cfa8'); lg.addColorStop(0.45, '#c89a64'); lg.addColorStop(1, '#8a5a33');
    lc.fillStyle = lg; lc.fillRect(0, 0, 128, 128);
    lc.strokeStyle = 'rgba(255,244,220,.65)'; lc.lineWidth = 5; lc.lineCap = 'round';
    lc.beginPath();
    for (let a = 0; a < Math.PI * 5; a += 0.12) { const r = 4 + a * 3.4; lc.lineTo(64 + Math.cos(a) * r, 64 + Math.sin(a) * r * 0.9); }
    lc.stroke();
    const coffee = new THREE.Mesh(new THREE.CircleGeometry(3.15, 40), new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(latteCanvas), roughness: 0.35 }));
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 7.35;
    cupGrp.add(coffee);

    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64; steamCanvas.height = 64;
    const stc = steamCanvas.getContext('2d');
    const stg = stc.createRadialGradient(32, 32, 2, 32, 32, 30);
    stg.addColorStop(0, 'rgba(200,200,200,.55)'); stg.addColorStop(1, 'rgba(200,200,200,0)');
    stc.fillStyle = stg; stc.fillRect(0, 0, 64, 64);
    const steamTex = new THREE.CanvasTexture(steamCanvas);
    const steam = [];
    for (let i = 0; i < 4; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: steamTex, transparent: true, opacity: 0, depthWrite: false }));
      sp.position.set(0, 8, 0);
      cupGrp.add(sp);
      steam.push({ sp, phase: i / 4 });
    }
    const handle = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.55, 18, 36), ceramic);
    handle.position.set(3.6, 4.1, 0);
    cupGrp.add(handle);
    const saucer = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 4.4, 0.5, 44), ceramic);
    saucer.position.y = 0.25;
    cupGrp.add(saucer);
    cupGrp.position.set(-23, 0, -2.5);
    cupGrp.rotation.y = 0.5;
    laptop.add(cupGrp);

    // ---- lid group (hinge at back) ----
    const hinge = new THREE.Group();
    hinge.position.set(0, BH + 0.12, -D / 2 + 0.55);
    laptop.add(hinge);
    const lidPlate = new THREE.Mesh(roundedPlate(W, D - 0.6, LT, R), aluLid);
    lidPlate.rotation.x = -Math.PI / 2;
    lidPlate.position.set(0, LT / 2 + 0.02, (D - 0.6) / 2 - 0.28);
    hinge.add(lidPlate);
    const bezel = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.65, D - 1.25), new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.4, roughness: 0.5 }));
    bezel.rotation.x = Math.PI / 2;
    bezel.position.set(0, -0.28 + LT / 2 + 0.02, (D - 0.6) / 2 - 0.28);
    hinge.add(bezel);

    // ---- screen (mini rhythmOS desktop drawn to canvas; real OS is projected on top) ----
    const scrCanvas = document.createElement('canvas');
    scrCanvas.width = 1024; scrCanvas.height = 664;
    const sc = scrCanvas.getContext('2d');
    sc.fillStyle = '#f7f7f5'; sc.fillRect(0, 0, 1024, 664);
    sc.strokeStyle = '#0a0a0a'; sc.lineWidth = 2;
    sc.beginPath(); sc.moveTo(0, 46); sc.lineTo(1024, 46); sc.stroke();
    sc.fillStyle = '#0a0a0a';
    sc.beginPath(); sc.arc(26, 23, 6, 0, 7); sc.fill();
    sc.font = '700 19px ui-monospace, Menlo, monospace'; sc.textAlign = 'left';
    sc.fillText('rhythmOS', 44, 30);
    sc.font = '17px ui-monospace, Menlo, monospace'; sc.fillStyle = '#999';
    sc.fillText('— Rhythm Chawla', 158, 30);
    sc.textAlign = 'right'; sc.fillText('keep scrolling ▾', 998, 30);
    const tiles = [
      ['▦', 'PROJECTS'], ['◐', 'ABOUT'], ['§', 'RESEARCH'],
      ['☰', 'RESUME'], ['▧', 'PHOTOGRAPHY'], ['✎', 'BLOG'],
      ['♟', 'HOBBIES'], ['✆', 'CONTACT'], ['❯_', 'TERMINAL'],
    ];
    const gy0 = 46, tw = 1024 / 3, th = (664 - gy0) / 3;
    sc.strokeStyle = '#0a0a0a'; sc.lineWidth = 2;
    for (let i = 1; i < 3; i++) {
      sc.beginPath(); sc.moveTo(i * tw, gy0); sc.lineTo(i * tw, 664); sc.stroke();
      sc.beginPath(); sc.moveTo(0, gy0 + i * th); sc.lineTo(1024, gy0 + i * th); sc.stroke();
    }
    sc.textAlign = 'left';
    tiles.forEach((tl, i) => {
      const cx = (i % 3) * tw + 30, cy = gy0 + Math.floor(i / 3) * th;
      sc.fillStyle = '#0a0a0a';
      sc.font = '42px -apple-system, Helvetica, sans-serif';
      sc.fillText(tl[0], cx, cy + 66);
      sc.font = '700 20px ui-monospace, Menlo, monospace';
      sc.fillText(tl[1], cx, cy + th - 28);
    });
    const scrTex = new THREE.CanvasTexture(scrCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: scrTex, transparent: true, opacity: 0 });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(W - 1.7, D - 2.6), screenMat);
    screen.rotation.x = Math.PI / 2;
    screen.position.set(0, -0.28 + LT / 2 + 0.015, (D - 0.6) / 2 - 0.28);
    hinge.add(screen);

    // ---- contact shadow ----
    const shCanvas = document.createElement('canvas');
    shCanvas.width = 256; shCanvas.height = 256;
    const shc = shCanvas.getContext('2d');
    const sg = shc.createRadialGradient(128, 128, 10, 128, 128, 126);
    sg.addColorStop(0, 'rgba(0,0,0,.42)'); sg.addColorStop(0.6, 'rgba(0,0,0,.14)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    shc.fillStyle = sg; shc.fillRect(0, 0, 256, 256);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(66, 44), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shCanvas), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    laptop.add(shadow);
    const shadowMat = shadow.material;

    // ---- dramatic lighting + real soft shadows ----
    const key = new THREE.DirectionalLight(0xffffff, 2.3);
    key.position.set(-26, 22, 12);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 150;
    key.shadow.camera.left = -50; key.shadow.camera.right = 50;
    key.shadow.camera.top = 50; key.shadow.camera.bottom = -50;
    key.shadow.radius = 8;
    key.shadow.bias = -0.0004;
    scene.add(key);
    // rim / back light — carves the aluminium edges out of the pale background
    const rim = new THREE.DirectionalLight(0xffffff, 1.8);
    rim.position.set(28, 16, -30);
    scene.add(rim);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xdedede, 0.32));

    // ground plane that shows ONLY the cast shadow (transparent everywhere else)
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.ShadowMaterial({ opacity: 0.62 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // let the laptop meshes cast & receive; exclude the fake blob / screen / latte
    laptop.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    shadow.castShadow = false; shadow.receiveShadow = false;
    screen.castShadow = false; screen.receiveShadow = false;
    coffee.receiveShadow = false;

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener('resize', onResize);
    wrap.style.opacity = '0';

    // ---- per-frame update ----
    const _v = new THREE.Vector3();
    const camA = new THREE.Vector3(20, 16, 62), lookA = new THREE.Vector3(0, 3, 0);
    const camB = new THREE.Vector3(0, 12, 56), lookB = new THREE.Vector3(0, 3, 0);
    const camC = new THREE.Vector3(0, 10, 44), lookC = new THREE.Vector3(0, 7, -4);

    function update(p, t) {
      const range = (a, b) => clamp((p - a) / (b - a), 0, 1);
      const vis = ease(range(0.55, 1.1));
      wrap.style.opacity = String(vis);

      // steam always rises
      for (const s of steam) {
        const k = ((t * 0.00016) + s.phase) % 1;
        s.sp.position.set(Math.sin((k + s.phase) * 9) * 0.9, 8.6 + k * 9.5, Math.cos((k + s.phase) * 7) * 0.6);
        const scv = 1.6 + k * 3.2;
        s.sp.scale.set(scv, scv, 1);
        s.sp.material.opacity = Math.sin(k * Math.PI) * 0.5 * vis;
      }
      if (vis <= 0) return { hideOs: true };

      // laptop float + rotate
      const rotP = ease(range(1.0, 3.1));
      laptop.rotation.y = (1 - rotP) * 0.85;
      laptop.position.y = Math.sin(t * 0.0011) * 0.35 * (1 - ease(range(3.0, 3.6)));

      // lid open
      const open = ease(range(3.25, 4.5));
      hinge.rotation.x = -open * (Math.PI * 110 / 180);
      screenMat.opacity = ease(range(3.6, 4.4));
      shadowMat.opacity = 1 - ease(range(4.6, 5.2)) * 0.7;

      // screen centre in world (for dolly)
      const ang = open * Math.PI * 110 / 180;
      const dd = (20.8 - 0.6) / 2;
      const hy = 1.05 + 0.12, hz = -20.8 / 2 + 0.55;
      const cy = hy + dd * Math.sin(ang);
      const cz = hz + dd * Math.cos(ang);

      // camera keyframes
      const pos = _v.clone(), look = new THREE.Vector3();
      if (p < 3.1) {
        const k = ease(range(1.0, 3.1));
        pos.lerpVectors(camA, camB, k); look.lerpVectors(lookA, lookB, k);
      } else if (p < 4.5) {
        const k = ease(range(3.1, 4.5));
        pos.lerpVectors(camB, camC, k); look.lerpVectors(lookB, lookC, k);
      } else {
        const k = ease(range(4.5, 5.35));
        // Aim down the screen's TRUE normal so it's framed nearly head-on (less
        // perspective slant), pulled back far enough to see the whole screen.
        const nrm = new THREE.Vector3(0, -Math.cos(ang), Math.sin(ang)).normalize();
        const center = new THREE.Vector3(0, cy, cz);
        const near = center.clone().add(nrm.multiplyScalar(38));
        pos.lerpVectors(camC, near, k);
        look.lerpVectors(lookC, center, k);
      }
      camera.position.copy(pos);
      camera.lookAt(look);
      camera.updateMatrixWorld();
      renderer.render(scene, camera);

      // project OS onto the screen plane
      const osIn = ease(range(4.3, 4.9));
      if (osIn <= 0 || open < 0.35) return { hideOs: true };
      screen.updateWorldMatrix(true, false);
      const hw = (30 - 1.7) / 2, hh = (20.8 - 2.6) / 2;
      const proj = (lx, ly) => {
        const v = new THREE.Vector3(lx, ly, 0);
        screen.localToWorld(v);
        v.project(camera);
        return { x: (v.x + 1) / 2 * innerWidth, y: (1 - v.y) / 2 * innerHeight };
      };
      // element order is [TL, TR, BL, BR]; +hh is the screen's top edge once the
      // lid is open, so map element-top to +hh (else the OS renders upside-down).
      const quad = [proj(-hw, hh), proj(hw, hh), proj(-hw, -hh), proj(hw, -hh)];
      return { quad, osIn, osInteractive: p > 5.25 && osIn >= 1 };
    }

    function applyBodyColor(color) {
      const black = color === 'space black';
      const c = black ? BLACK : SILVER;
      mats.alu.color.setHex(c);
      mats.aluLid.color.setHex(c);
      trackpadMat.color.setHex(c);
      drawDeck(black); deckTex.needsUpdate = true;
      curBlack = black;
    }

    function dispose() {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    }

    return { update, applyBodyColor, dispose };
  } catch (err) {
    console.warn('MacBook 3D init failed', err);
    return null;
  }
}
