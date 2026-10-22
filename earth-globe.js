/**
 * Aditya Security Labs — Real Earth 3D ThreatMap & Live Attack Proof Simulator
 * Inspired by Check Point Live ThreatMap (https://threatmap.checkpoint.com/)
 * 
 * Authentic NASA Blue Marble satellite Earth picture, 3D ballistic attack missiles,
 * dynamic trajectory arcs arcing into orbital space, expanding surface shockwave ripples,
 * real audited CVE research targets, and real-time defense telemetry HUD.
 */

(function () {
  'use strict';

  // Real Audited CVE Nodes (Official Verification Targets)
  const PROOF_TARGETS = [
    { name: 'Flowise Node', cve: 'CVE-2026-73484', cvss: 'CVSS 8.6', vuln: 'Python Sandbox Escape', lat: 37.77, lon: -122.41, color: '#0284c7' },
    { name: 'AutoGPT Cluster', cve: 'CVE-2026-22038', cvss: 'CVSS 8.1', vuln: 'API Secret Logging', lat: 40.71, lon: -74.00, color: '#2563eb' },
    { name: 'Qdrant DB Core', cve: 'CVSS 9.1', cvss: 'CVSS 9.1', vuln: 'Vector DB Vulnerability', lat: 52.52, lon: 13.40, color: '#059669' },
    { name: 'DigiDoc4 Client', cve: 'CVE-2026-70383', cvss: 'CWE-22', vuln: 'Arbitrary File Overwrite', lat: 59.43, lon: 24.75, color: '#0284c7' },
    { name: 'Trilium Notes', cve: 'CVE-2025-68621', cvss: 'CWE-208', vuln: 'Timing Attack HMAC Recovery', lat: 50.07, lon: 14.43, color: '#059669' },
    { name: 'ASL Operations', cve: 'SEC COMMAND', cvss: 'ZERO-DAY', vuln: 'Source Code Auditing Lab', lat: 17.38, lon: 78.48, color: '#2563eb' },
    { name: 'GovTech Vault', cve: 'EU AI ACT ART 15', cvss: 'HIGH-ASSURANCE', vuln: 'Sovereign AI Enclave', lat: 48.85, lon: 2.35, color: '#059669' }
  ];

  // Threat Origin Clusters (Global Cyber Hotspots)
  const THREAT_ORIGINS = [
    { name: 'Moscow, RU', lat: 55.75, lon: 37.61 },
    { name: 'Beijing, CN', lat: 39.90, lon: 116.40 },
    { name: 'Shenzhen, CN', lat: 22.54, lon: 114.05 },
    { name: 'São Paulo, BR', lat: -23.55, lon: -46.63 },
    { name: 'Frankfurt, DE', lat: 50.11, lon: 8.68 },
    { name: 'Singapore, SG', lat: 1.35, lon: 103.82 },
    { name: 'Tokyo, JP', lat: 35.68, lon: 139.76 },
    { name: 'London, UK', lat: 51.50, lon: -0.12 },
    { name: 'Sydney, AU', lat: -33.86, lon: 151.20 },
    { name: 'Bucharest, RO', lat: 44.43, lon: 26.10 },
    { name: 'Seoul, KR', lat: 37.56, lon: 126.97 },
    { name: 'Dubai, AE', lat: 25.20, lon: 55.27 }
  ];

  const ATTACK_VECTORS = [
    'Python Sandbox Escape Exploit',
    'Plaintext API Secret Exfiltration',
    'Vector Database Memory Overflow',
    'Path Traversal / File Overwrite',
    'HMAC Timing Attack Recovery',
    'Adversarial RAG Jailbreak Probe',
    'Automated Zero-Day Vulnerability Scan',
    'Supply Chain Dependency Poisoning'
  ];

  let scene, camera, renderer, globeMesh, atmosphereMesh, glassRingMesh, glassRingMesh2;
  let animId = null;
  let isVisible = true;
  let canvas;
  let width = 0, height = 0;
  const GLOBE_RADIUS = 2.45;

  // Interactive mouse tilt & 3D rotation
  let targetRotationY = 0;
  let targetRotationX = 0;
  let mouseX = 0, mouseY = 0;
  let isDragging = false, lastDragX = 0, lastDragY = 0;

  // Live attack arcs, surface shockwave ripples, and markers
  const liveArcs = [];
  const impactRings = [];
  const targetMarkers = [];
  let attackTimer = 0;
  let attackCounter = 148342;

  function init() {
    canvas = document.getElementById('earthCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const parent = canvas.parentElement;
    width = parent ? parent.clientWidth : 820;
    height = parent ? parent.clientHeight : 820;

    // 1. Three.js Scene & Perspective Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 6.6;

    // 2. High-Performance WebGL Renderer with Alpha Transparency ("Transplate")
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent backdrop

    // 3. Cinematic Sunlight & Space Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.55);
    sunLight.position.set(5.5, 3.2, 4.5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.7);
    rimLight.position.set(-5.5, -2.5, -3.5);
    scene.add(rimLight);

    // 4. REAL NASA EARTH SATELLITE PICTURE TEXTURE (Check Point Style)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('earth_real.jpg', function (earthTexture) {
      earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const earthGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
      const earthMat = new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.62,
        metalness: 0.08,
        emissive: 0x07152b,
        emissiveIntensity: 0.18
      });
      globeMesh = new THREE.Mesh(earthGeo, earthMat);
      
      // Realistic Earth axial tilt (23.4 degrees)
      globeMesh.rotation.z = -0.408;
      globeMesh.rotation.y = 1.8;
      scene.add(globeMesh);

      // 5. Atmospheric Soft Blue Outer Rim Halo
      const atmoGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.018, 48, 48);
      const atmoMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
      scene.add(atmosphereMesh);

      // 6. Dual Floating Glass Orbit Rings ("add glass and transplate")
      const ringGeo1 = new THREE.RingGeometry(GLOBE_RADIUS * 1.26, GLOBE_RADIUS * 1.33, 64);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.24,
        side: THREE.DoubleSide
      });
      glassRingMesh = new THREE.Mesh(ringGeo1, ringMat1);
      glassRingMesh.rotation.x = Math.PI / 2.3;
      glassRingMesh.rotation.y = 0.2;
      scene.add(glassRingMesh);

      const ringGeo2 = new THREE.RingGeometry(GLOBE_RADIUS * 1.45, GLOBE_RADIUS * 1.47, 64);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide
      });
      glassRingMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
      glassRingMesh2.rotation.x = Math.PI / 2.15;
      glassRingMesh2.rotation.y = -0.15;
      scene.add(glassRingMesh2);

      // 7. Initialize Audited Research Nodes on World
      initTargetMarkers();

      // Launch initial volley of ballistic attacks across world
      spawnAttackArc();
      spawnAttackArc();
      spawnAttackArc();

      animId = requestAnimationFrame(animate);
    });

    // Event Listeners for Resizing & 3D Interaction
    window.addEventListener('resize', onWindowResize, { passive: true });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        if (isDragging) return;
        const rect = heroSection.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetRotationY = mouseX * 0.35;
        targetRotationX = mouseY * 0.22;
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        targetRotationX = 0;
        targetRotationY = 0;
      }, { passive: true });

      // Interactive 3D Drag Rotation (Check Point ThreatMap Style)
      canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastDragX = e.clientX;
        lastDragY = e.clientY;
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDragging || !globeMesh) return;
        const dx = e.clientX - lastDragX;
        const dy = e.clientY - lastDragY;
        globeMesh.rotation.y += dx * 0.005;
        globeMesh.rotation.x += dy * 0.0035;
        lastDragX = e.clientX;
        lastDragY = e.clientY;
      });
      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }

    // Performance Intersection Observer
    if ('IntersectionObserver' in window && heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animId = requestAnimationFrame(animate);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }
  }

  function onWindowResize() {
    if (!canvas || !renderer || !camera) return;
    const parent = canvas.parentElement;
    width = parent ? parent.clientWidth : 820;
    height = parent ? parent.clientHeight : 820;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Convert Latitude/Longitude to 3D Cartesian coordinates on sphere
  function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  function initTargetMarkers() {
    PROOF_TARGETS.forEach(target => {
      const pos = latLonToVector3(target.lat, target.lon, GLOBE_RADIUS);

      // High-precision target node marker
      const markerGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: target.color });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      globeMesh.add(marker);

      // Defense radar pulse ring
      const ringGeo = new THREE.RingGeometry(0.055, 0.08, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: target.color,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeMesh.add(ring);

      targetMarkers.push({ marker, ring, target, scale: 1.0 });
    });
  }

  // Spawn dynamic ballistic attack arc across the globe
  function spawnAttackArc() {
    if (!globeMesh) return;
    const originIdx = Math.floor(Math.random() * THREAT_ORIGINS.length);
    const targetIdx = Math.floor(Math.random() * PROOF_TARGETS.length);
    const vectorIdx = Math.floor(Math.random() * ATTACK_VECTORS.length);

    const origin = THREAT_ORIGINS[originIdx];
    const target = PROOF_TARGETS[targetIdx];
    const vector = ATTACK_VECTORS[vectorIdx];

    const vStart = latLonToVector3(origin.lat, origin.lon, GLOBE_RADIUS);
    const vEnd = latLonToVector3(target.lat, target.lon, GLOBE_RADIUS);

    // Compute elevated mid point in space for Check Point ballistic arc
    const vMid = vStart.clone().add(vEnd).multiplyScalar(0.5);
    const distance = vStart.distanceTo(vEnd);
    vMid.normalize().multiplyScalar(GLOBE_RADIUS + Math.min(1.4, distance * 0.42));

    const curve = new THREE.QuadraticBezierCurve3(vStart, vMid, vEnd);
    const points = curve.getPoints(45);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

    // Color code attack by criticality: Red (Critical RCE/Sandbox) or Azure/Cyan (High)
    const isCritical = Math.random() > 0.4;
    const arcColor = isCritical ? 0xef4444 : 0x0284c7;

    const lineMat = new THREE.LineBasicMaterial({
      color: arcColor,
      transparent: true,
      opacity: 0.45,
      linewidth: 1.5
    });
    const arcLine = new THREE.Line(lineGeo, lineMat);
    globeMesh.add(arcLine);

    // Ballistic missile projectile head (glowing white/color)
    const missileGeo = new THREE.SphereGeometry(0.062, 12, 12);
    const missileMat = new THREE.MeshBasicMaterial({ color: isCritical ? 0xffffff : 0x93c5fd });
    const missile = new THREE.Mesh(missileGeo, missileMat);
    globeMesh.add(missile);

    liveArcs.push({
      curve: curve,
      arcLine: arcLine,
      missile: missile,
      progress: 0,
      speed: 0.008 + Math.random() * 0.006,
      origin: origin,
      target: target,
      vector: vector,
      vEnd: vEnd,
      isCritical: isCritical,
      color: isCritical ? '#ef4444' : '#0284c7'
    });
  }

  function animate() {
    if (!isVisible) {
      animId = null;
      return;
    }

    // Smooth continuous planetary rotation
    if (globeMesh && !isDragging) {
      globeMesh.rotation.y += 0.0016;
      globeMesh.rotation.x += (targetRotationX - globeMesh.rotation.x) * 0.04;
    }

    if (glassRingMesh) {
      glassRingMesh.rotation.z += 0.0012;
    }
    if (glassRingMesh2) {
      glassRingMesh2.rotation.z -= 0.0008;
    }

    // Pulse target markers
    targetMarkers.forEach(item => {
      item.scale += 0.016;
      if (item.scale > 2.2) item.scale = 1.0;
      item.ring.scale.set(item.scale, item.scale, 1);
      item.ring.material.opacity = Math.max(0, 1 - (item.scale - 1) / 1.2) * 0.75;
    });

    // Update surface shockwave impact rings (expanding ripples on globe)
    for (let i = impactRings.length - 1; i >= 0; i--) {
      const ring = impactRings[i];
      ring.scale += 0.075;
      ring.opacity -= 0.024;
      ring.mesh.scale.set(ring.scale, ring.scale, 1);
      ring.mesh.material.opacity = Math.max(0, ring.opacity);

      if (ring.opacity <= 0 || ring.scale > ring.maxScale) {
        globeMesh.remove(ring.mesh);
        ring.mesh.geometry.dispose();
        ring.mesh.material.dispose();
        impactRings.splice(i, 1);
      }
    }

    // Update moving ballistic attack missiles
    for (let i = liveArcs.length - 1; i >= 0; i--) {
      const arc = liveArcs[i];
      arc.progress += arc.speed;

      if (arc.progress >= 1.0) {
        // Attack hit world destination — trigger Check Point style shockwave ripple
        triggerImpactShockwave(arc.vEnd, arc.isCritical);
        onAttackProofIntercepted(arc.origin, arc.target, arc.vector);

        // Remove missile & arc from scene
        globeMesh.remove(arc.arcLine);
        globeMesh.remove(arc.missile);
        arc.arcLine.geometry.dispose();
        arc.arcLine.material.dispose();
        arc.missile.geometry.dispose();
        arc.missile.material.dispose();
        liveArcs.splice(i, 1);
      } else {
        const pt = arc.curve.getPoint(arc.progress);
        arc.missile.position.copy(pt);
      }
    }

    // Spawn new attack periodically (maintains 4 to 6 simultaneous attacks)
    attackTimer++;
    if (attackTimer > 55) {
      attackTimer = 0;
      if (liveArcs.length < 6) {
        spawnAttackArc();
      }
    }

    renderer.render(scene, camera);
    animId = requestAnimationFrame(animate);
  }

  // Trigger surface shockwave ripple on target impact
  function triggerImpactShockwave(pos, isCritical) {
    if (!globeMesh) return;
    const shockGeo = new THREE.RingGeometry(0.045, 0.075, 32);
    const shockMat = new THREE.MeshBasicMaterial({
      color: isCritical ? 0xef4444 : 0x059669,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide
    });
    const shockMesh = new THREE.Mesh(shockGeo, shockMat);
    shockMesh.position.copy(pos);
    shockMesh.lookAt(new THREE.Vector3(0, 0, 0));
    globeMesh.add(shockMesh);

    impactRings.push({
      mesh: shockMesh,
      scale: 1.0,
      maxScale: 3.6,
      opacity: 0.95
    });
  }

  // Update Check Point style live attack proof telemetry HUD
  function onAttackProofIntercepted(origin, target, vector) {
    attackCounter++;
    const countEl = document.getElementById('hudAttackCount');
    if (countEl) {
      countEl.textContent = attackCounter.toLocaleString();
    }

    const feedEl = document.getElementById('hudAttackFeed');
    if (feedEl) {
      const now = new Date();
      const timeStr = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map(v => String(v).padStart(2, '0'))
        .join(':');

      const line = document.createElement('div');
      line.className = 'hud-feed-line';
      line.innerHTML = `
        <span style="color: #64748b; font-size: 0.65rem;">[${timeStr}]</span>
        <span style="color: #ef4444; font-weight: 500;">${origin.name}</span>
        <span style="color: #94a3b8;">➔</span>
        <strong style="color: #0f172a;">${target.name}</strong>
        <span style="color: #059669; font-weight: 600;">[DEFENDED]</span>
        <span class="badge-pill badge-verified" style="font-size: 0.58rem; padding: 0.1rem 0.35rem;">${target.cve}</span>
      `;
      feedEl.prepend(line);
      while (feedEl.children.length > 3) {
        feedEl.removeChild(feedEl.lastChild);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
