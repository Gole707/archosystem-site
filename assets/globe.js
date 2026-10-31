/* Archo Earth hero. Native WebGL / sharp cinematic camera-motion fallback, local historical textures. */
(function () {
  'use strict';
  const script = document.currentScript;
  const source = script && script.src;
  const assetBase = source && !source.startsWith('data:') ? new URL('.', source) : new URL('assets/', document.baseURI);
  const states = new Set();
  const mounted = new WeakMap();
  const vertexSource = 'attribute vec2 a_position; varying mediump vec2 v_uv; void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}';
  const fragmentSource = `
    precision highp float;
    varying mediump vec2 v_uv;
    uniform sampler2D u_day;
    uniform sampler2D u_clouds;
    uniform float u_rotation;
    uniform vec2 u_resolution;
    const float PI=3.14159265359;
    void main(){
      vec2 p=(v_uv-.5)*2.;
      p.x*=u_resolution.x/u_resolution.y;
      p/=.915;
      float r2=dot(p,p);
      if(r2>1.){
        float edge=sqrt(r2)-1.;
        float halo=exp(-edge*62.)*.30;
        if(halo<.001) discard;
        gl_FragColor=vec4(vec3(.12,.40,.82),halo);
        return;
      }
      vec3 n=vec3(p,sqrt(max(0.,1.-r2)));
      vec3 g=n;
      float ct=cos(.12),st=sin(.12);
      g.xy=mat2(ct,-st,st,ct)*g.xy;
      float c=cos(u_rotation),s=sin(u_rotation);
      g=vec3(c*g.x+s*g.z,g.y,-s*g.x+c*g.z);
      vec2 uv=vec2(fract(atan(g.x,g.z)/(2.*PI)+.5),asin(clamp(g.y,-1.,1.))/PI+.5);
      vec3 surface=texture2D(u_day,uv).rgb;
      float clouds=texture2D(u_clouds,uv).a*.64;
      surface=mix(surface,vec3(.96,.98,1.),clouds);
      vec3 light=normalize(vec3(-.66,.32,.72));
      float diffuse=max(0.,dot(n,light));
      vec3 linear=pow(surface,vec3(2.2));
      vec3 color=pow(linear*(.045+diffuse*1.08),vec3(1./2.2));
      float rim=pow(1.-n.z,3.8);
      color+=vec3(.035,.18,.37)*rim*(.30+diffuse*.70);
      float alpha=1.-smoothstep(.994,1.,r2);
      gl_FragColor=vec4(color,alpha);
    }
  `;

  function image(url) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      let timer;
      const finish = function (error) { clearTimeout(timer); img.onload = img.onerror = null; error ? reject(error) : resolve(img); };
      img.decoding = 'async';
      img.onload = function () { finish(); };
      img.onerror = function () { finish(new Error('Earth texture unavailable')); };
      timer = setTimeout(function () { finish(new Error('Earth texture timed out')); }, 10000);
      img.src = url;
    });
  }

  function mount(canvas) {
    const horizon = canvas.matches('[data-earth-horizon]');
    const parent = canvas.closest('.earth-visual') || canvas.parentElement;
    const scope = canvas.closest('section') || parent;
    const button = scope && scope.querySelector('[data-earth-motion]');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const urls = {
      day: canvas.dataset.texture || new URL('earth-day.jpg', assetBase).href,
      clouds: canvas.dataset.clouds || new URL('earth-clouds.png', assetBase).href,
      poster: canvas.dataset.poster || new URL('earth-poster.webp', assetBase).href
    };
    const poster = parent && parent.querySelector('.earth-poster');
    function showRendered(active) {
      if(scope)scope.dataset.earthPresentation=active?'globe':'cinematic';
      if (horizon) return;
      if (!horizon) canvas.style.opacity = active ? '1' : '0';
      if (poster) poster.style.opacity = active ? '0' : '1';
      else if (parent) parent.style.backgroundImage = active ? 'none' : 'url("' + urls.poster.replace(/"/g, '%22') + '")';
    }
    showRendered(false);
    canvas.dataset.earthState = 'loading';
    canvas.dataset.earthFallbackReason = '';
    canvas.setAttribute('aria-hidden', 'true');
    const state = {canvas: canvas, dead: false, ready: false, lost: false, visible: true, paused: media.matches, frame: 0, last: 0, painted: 0, rotation: -1.38, gl: null, resources: null, renderer: '', software: null, draws: 0};
    states.add(state); mounted.set(canvas, state);

    function setupCinematic(reason) {
      state.renderer='cinematic';canvas.dataset.earthRenderer='cinematic';
      canvas.dataset.earthFallbackReason=reason||'WebGL unavailable; sharp illustrative camera-motion fallback';
      state.ready=true;showRendered(false);updateButton();sync();
    }

    function updateButton() {
      if (!button) return;
      button.removeAttribute('aria-pressed');
      button.disabled = !state.ready || state.lost;
      button.textContent = !state.ready || state.lost ? 'Static Earth' : state.paused ? 'Play Earth motion' : 'Pause Earth motion';
      button.setAttribute('aria-label', button.textContent);
      button.dataset.motionState = !state.ready || state.lost ? 'static' : state.paused ? 'paused' : 'playing';
    }
    function stop() { if (state.frame) cancelAnimationFrame(state.frame); state.frame = 0; state.last = 0; }
    function allowed() { return state.ready && !state.dead && !state.lost && !state.paused && state.visible && !document.hidden && canvas.isConnected; }
    function draw() {
      if (!state.ready || state.dead || state.lost) return;
      if (state.renderer==='cinematic') {
        canvas.dataset.earthState=state.paused?'paused':'running';return;
      }
      const gl = state.gl, r = state.resources;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(r.program);
      gl.uniform1f(r.rotation, state.rotation);
      gl.uniform2f(r.resolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.dataset.earthState = state.paused ? 'paused' : 'running';
      canvas.dataset.earthFrame=String(++state.draws);
      canvas.dataset.earthAngle=state.rotation.toFixed(5);
    }
    function frame(now) {
      state.frame = 0;
      if (!canvas.isConnected) { cleanup(); return; }
      if (!allowed()) return;
      const delta = state.last ? Math.min((now - state.last) / 1000, .1) : 0;
      state.last = now;
      state.rotation += delta * .023;
      if (now - state.painted >= 1000 / 30) { draw(); state.painted = now; }
      state.frame = requestAnimationFrame(frame);
    }
    function sync() {
      stop();
      if(scope)scope.dataset.earthMotionState=allowed()?'running':'paused';
      if(state.renderer==='cinematic'){
        canvas.dataset.earthState=state.paused?'paused':allowed()?'running':'suspended';
        return;
      }
      if(allowed())state.frame=requestAnimationFrame(frame);
    }
    function resize() {
      if (state.dead || state.renderer==='cinematic') return;
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const limit=2304;
      const dpr = Math.min(window.devicePixelRatio || 1, 2, limit / Math.max(box.width, box.height));
      const width = Math.max(1, Math.round(box.width * dpr));
      const height = Math.max(1, Math.round(box.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {canvas.width=width;canvas.height=height;}
      draw();
    }
    function toggle() { if (!state.ready || state.lost) return; state.paused = !state.paused; updateButton(); draw(); sync(); }
    function reduced(event) { state.paused = event.matches; updateButton(); draw(); sync(); }
    function lost(event) {
      event.preventDefault(); state.lost = true; stop();
      canvas.dataset.earthFallbackReason = 'webgl-context-lost';
      showRendered(false);if(scope)scope.dataset.earthMotionState='paused';canvas.dataset.earthState='fallback';updateButton();
    }
    function visibility() { sync(); }
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(function (entries) {
      state.visible = entries.some(function (entry) { return entry.isIntersecting; }); sync();
    }, {threshold: .01}) : null;
    const resizer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;

    function cleanup() {
      if (state.dead) return;
      state.dead = true; stop();
      if (observer) observer.disconnect(); if (resizer) resizer.disconnect();
      if (button) button.removeEventListener('click', toggle);
      canvas.removeEventListener('webglcontextlost', lost);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('resize', resize);
      if (media.removeEventListener) media.removeEventListener('change', reduced); else if (media.removeListener) media.removeListener(reduced);
      if (state.gl && state.resources && !state.lost) {
        const gl = state.gl, r = state.resources;
        r.textures.forEach(function (texture) { gl.deleteTexture(texture); });
        gl.deleteBuffer(r.buffer); gl.deleteProgram(r.program);
      }
      states.delete(state); mounted.delete(canvas);
    }
    state.cleanup = cleanup;
    if (button) button.addEventListener('click', toggle);
    canvas.addEventListener('webglcontextlost', lost, false);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('resize', resize, {passive: true});
    if (media.addEventListener) media.addEventListener('change', reduced); else if (media.addListener) media.addListener(reduced);
    if (observer) observer.observe(canvas); if (resizer) resizer.observe(canvas);
    updateButton();

    // The selected entrance is an orbital illustration. Keep the globe available
    // for other views without loading its textures or allocating a WebGL context.
    if (horizon) { setupCinematic('Selected orbital-horizon illustration; subtle camera motion.'); return state; }

    Promise.all([image(urls.day), image(urls.clouds).catch(function () { return null; })]).then(function (images) {
      if (state.dead) return;
      const gl = canvas.getContext('webgl', {alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, powerPreference: 'low-power'});
      if (!gl) {setupCinematic();return;}
      state.gl = gl;
      state.renderer='webgl'; canvas.dataset.earthRenderer='webgl';
      function shader(type, sourceText) {
        const item = gl.createShader(type); gl.shaderSource(item, sourceText); gl.compileShader(item);
        if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) { const detail = gl.getShaderInfoLog(item); gl.deleteShader(item); throw new Error('Earth shader compile: ' + (detail || 'no driver detail').slice(0,200)); }
        return item;
      }
      const vs = shader(gl.VERTEX_SHADER, vertexSource), fs = shader(gl.FRAGMENT_SHADER, fragmentSource);
      const program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Earth program link: ' + (gl.getProgramInfoLog(program) || 'no driver detail').slice(0,200));
      gl.useProgram(program);
      const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      const textures = images.map(function (img, index) {
        const texture = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + index); gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        if (img) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,0]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return texture;
      });
      gl.uniform1i(gl.getUniformLocation(program, 'u_day'), 0); gl.uniform1i(gl.getUniformLocation(program, 'u_clouds'), 1);
      state.resources = {program: program, buffer: buffer, textures: textures, rotation: gl.getUniformLocation(program, 'u_rotation'), resolution: gl.getUniformLocation(program, 'u_resolution')};
      state.ready = true; showRendered(true); updateButton(); resize(); sync();
    }).catch(function (error) {
      if (state.dead) return;
      canvas.dataset.earthFallbackReason = error && error.message ? error.message.slice(0,240) : 'earth-renderer-unavailable';
      stop();setupCinematic(canvas.dataset.earthFallbackReason);
    });
    return state;
  }

  function init(root) {
    states.forEach(function (state) { if (!state.canvas.isConnected) state.cleanup(); });
    const scope = root || document;
    const canvases = Array.from(scope.querySelectorAll('canvas[data-earth-globe],[data-earth-horizon]'));
    if (scope.matches && scope.matches('canvas[data-earth-globe],[data-earth-horizon]')) canvases.unshift(scope);
    canvases.forEach(function (canvas) { if (!mounted.has(canvas)) mount(canvas); });
  }
  function destroy(root) {
    Array.from(states).forEach(function (state) { if (!root || root === state.canvas || root.contains(state.canvas)) state.cleanup(); });
  }
  window.ArchoGlobe = Object.freeze({init: init, destroy: destroy});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(document); }, {once: true}); else init(document);
}());
