var e=`:root {\r
  --vapor-pink: #ff71ce;\r
  --vapor-blue: #01cdfe;\r
  --vapor-green: #05ffa1;\r
  --vapor-purple: #b967ff;\r
  --vapor-yellow: #fffb96;\r
}\r
\r
/* Global Fix to prevent Spicetify scrollbars when active */\r
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node,\r
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node-child {\r
  overflow: hidden !important;\r
}\r
\r
#vapor-lyrics-app-container {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  z-index: 100;\r
}\r
\r
.vapor-background {\r
  position: absolute;\r
  inset: 0;\r
  overflow: hidden;\r
  background: #000000;\r
  z-index: -1;\r
}\r
\r
.vapor-content {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
  padding: 40px;\r
  color: white;\r
  font-family: "Outfit", "Inter", sans-serif;\r
  box-sizing: border-box;\r
}\r
\r
.vapor-header {\r
  margin-bottom: 40px;\r
  text-align: center;\r
}\r
\r
.vapor-title {\r
  font-size: 3rem;\r
  font-weight: 800;\r
  text-transform: uppercase;\r
  letter-spacing: 12px;\r
  background: linear-gradient(to bottom, var(--vapor-pink), var(--vapor-blue));\r
  background-clip: text;\r
  -webkit-background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
  filter: drop-shadow(0 0 10px rgba(255, 113, 206, 0.5));\r
  margin: 0;\r
}\r
\r
.vapor-lyrics-container {\r
  flex: 1;\r
  overflow: hidden;\r
  position: relative;\r
  mask-image: linear-gradient(to bottom, \r
    transparent 0%, \r
    black 15%, \r
    black 85%, \r
    transparent 100%\r
  );\r
}\r
\r
/* The Dreamlike Scroll */\r
.vapor-lyrics-scroll {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  padding: 50vh 0;\r
  will-change: transform;\r
  transform-style: preserve-3d;\r
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);\r
}\r
\r
.vapor-lyric-line {\r
  flex-shrink: 0;\r
  font-size: 2.2rem;\r
  font-weight: 700;\r
  line-height: 1.5;\r
  margin: 1.5rem 0;\r
  text-align: center;\r
  max-width: 80%;\r
  \r
  /* Top-to-Bottom Wipe Effect */\r
  background: linear-gradient(to bottom, #ffffff 50%, rgba(255, 255, 255, 0.25) 50%);\r
  background-size: 100% 200%;\r
  background-position: bottom;\r
  background-clip: text;\r
  -webkit-background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
  \r
  filter: none;\r
  transform: translate3d(0,0,0) scale(0.85);\r
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), \r
              background-position 0.5s ease-out,\r
              opacity 0.5s ease;\r
  will-change: transform, background-position, opacity;\r
}\r
\r
.vapor-lyric-line.active {\r
  background-position: top;\r
  opacity: 1;\r
  transform: translate3d(0,0,0) scale(1.15);\r
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));\r
  /* Dynamic Karaoke Wipe Duration */\r
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), \r
              background-position var(--line-duration, 0.5s) linear,\r
              opacity 0.5s ease;\r
}\r
\r
.vapor-lyric-line.played {\r
  background-position: top;\r
  opacity: 0.35;\r
  transform: translate3d(0,0,0) scale(0.85);\r
  filter: none;\r
}\r
\r
.vapor-lyric-line.placeholder {\r
  animation: pulse 2s infinite;\r
}\r
\r
@keyframes pulse {\r
  0% { opacity: 0.2; }\r
  50% { opacity: 0.5; }\r
  100% { opacity: 0.2; }\r
}\r
\r
.vapor-debug-status {\r
  position: fixed;\r
  bottom: 20px;\r
  left: 20px;\r
  font-size: 10px;\r
  text-transform: uppercase;\r
  letter-spacing: 2px;\r
  opacity: 0.3;\r
  font-family: monospace;\r
}\r
\r
/* Word Sync / Karaoke Aesthetics */\r
.vapor-syllable {\r
  display: inline-block;\r
  opacity: 0.25;\r
  transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);\r
  filter: none;\r
  transform: scale(0.95);\r
  margin-right: 4px;\r
}\r
\r
.vapor-syllable.synced {\r
  opacity: 1;\r
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));\r
  transform: scale(1.1);\r
  color: #ffffff;\r
  -webkit-text-fill-color: initial;\r
}\r
\r
.vapor-lyric-line.active.word-synced {\r
  background: none;\r
  -webkit-text-fill-color: initial;\r
}\r
\r
\r
`;class d{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(z,_={}){this.canvas=z;let k=z.getContext("webgl",{preserveDrawingBuffer:!0});if(!k)throw Error("WebGL not supported");this.gl=k,this.halfFloatExt=k.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=k.getExtension("OES_texture_half_float_linear"),this._warpIntensity=_.warpIntensity??1,this._blurPasses=_.blurPasses??8,this._animationSpeed=_.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=_.transitionDuration??1000,this._saturation=_.saturation??1.5,this._tintColor=_.tintColor??[0.157,0.157,0.235],this._tintIntensity=_.tintIntensity??0.15,this._dithering=_.dithering??0.008,this._scale=_.scale??1,this.blurProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_offset;
  varying vec2 v_texCoord;

  void main() {
    highp vec2 texelSize = 1.0 / u_resolution;
    highp vec4 color = vec4(0.0);

    color += texture2D(u_texture, v_texCoord + vec2(-u_offset, -u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(u_offset, -u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(-u_offset, u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(u_offset, u_offset) * texelSize);

    gl_FragColor = color * 0.25;
  }
`),this.blendProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture1;
  uniform sampler2D u_texture2;
  uniform float u_blend;
  varying vec2 v_texCoord;

  void main() {
    vec4 color1 = texture2D(u_texture1, v_texCoord);
    vec4 color2 = texture2D(u_texture2, v_texCoord);
    gl_FragColor = mix(color1, color2, u_blend);
  }
`),this.tintProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec3 u_tintColor;
  uniform float u_tintIntensity;
  varying vec2 v_texCoord;

  void main() {
    vec4 color = texture2D(u_texture, v_texCoord);
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // darkMask: 1.0 for black, 0.0 for luma >= 0.5
    float darkMask = 1.0 - smoothstep(0.0, 0.5, luma);

    // Blend dark areas toward tint color
    color.rgb = mix(color.rgb, u_tintColor, darkMask * u_tintIntensity);

    gl_FragColor = color;
  }
`),this.warpProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform float u_intensity;
  varying vec2 v_texCoord;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = v_texCoord;
    float t = u_time * 0.05;

    vec2 center = uv - 0.5;
    float centerWeight = 1.0 - smoothstep(0.0, 0.7, length(center));

    // Large-scale movement (slow, big blobs)
    float n1 = snoise(uv * 0.35 + vec2(t, t * 0.7));
    float n2 = snoise(uv * 0.35 + vec2(-t * 0.8, t * 0.5) + vec2(50.0, 50.0));

    // Medium-scale detail (adds organic movement)
    float n3 = snoise(uv * 0.9 + vec2(t * 1.2, -t) + vec2(100.0, 0.0));
    float n4 = snoise(uv * 0.9 + vec2(-t, t * 1.1) + vec2(0.0, 100.0));

    // Combine two octaves
    vec2 warp = vec2(
      n1 * 0.65 + n3 * 0.35,
      n2 * 0.65 + n4 * 0.35
    ) * centerWeight;

    vec2 warpedUV = uv + warp * u_intensity;
    warpedUV = clamp(warpedUV, 0.0, 1.0);

    gl_FragColor = texture2D(u_texture, warpedUV);
  }
`),this.outputProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_saturation;
  uniform float u_dithering;
  uniform float u_time;
  uniform float u_scale;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;

  highp float hash(highp vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }

  void main() {
    vec2 uv = (v_texCoord - 0.5) / u_scale + 0.5;
    uv = clamp(uv, 0.0, 1.0);

    vec4 color = texture2D(u_texture, uv);

    vec2 center = v_texCoord - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.3;
    color.rgb *= vignette;

    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(gray), color.rgb, u_saturation);

    highp vec2 pixelPos = floor(v_texCoord * u_resolution);
    highp float noise = hash(vec3(pixelPos, floor(u_time * 60.0)));
    color.rgb += (noise - 0.5) * u_dithering;

    gl_FragColor = color;
  }
`),this.attribs={position:k.getAttribLocation(this.blurProgram,"a_position"),texCoord:k.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:k.getUniformLocation(this.blurProgram,"u_resolution"),texture:k.getUniformLocation(this.blurProgram,"u_texture"),offset:k.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:k.getUniformLocation(this.blendProgram,"u_texture1"),texture2:k.getUniformLocation(this.blendProgram,"u_texture2"),blend:k.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:k.getUniformLocation(this.warpProgram,"u_texture"),time:k.getUniformLocation(this.warpProgram,"u_time"),intensity:k.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:k.getUniformLocation(this.tintProgram,"u_texture"),tintColor:k.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:k.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:k.getUniformLocation(this.outputProgram,"u_texture"),saturation:k.getUniformLocation(this.outputProgram,"u_saturation"),dithering:k.getUniformLocation(this.outputProgram,"u_dithering"),time:k.getUniformLocation(this.outputProgram,"u_time"),scale:k.getUniformLocation(this.outputProgram,"u_scale"),resolution:k.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(z){this._warpIntensity=Math.max(0,Math.min(1,z))}get blurPasses(){return this._blurPasses}set blurPasses(z){let _=Math.max(1,Math.min(40,Math.floor(z)));if(_!==this._blurPasses){if(this._blurPasses=_,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(z){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,z))}get transitionDuration(){return this._transitionDuration}set transitionDuration(z){this._transitionDuration=Math.max(0,Math.min(5000,z))}get saturation(){return this._saturation}set saturation(z){this._saturation=Math.max(0,Math.min(3,z))}get tintColor(){return this._tintColor}set tintColor(z){let _=z.map((G)=>Math.max(0,Math.min(1,G)));if(_.some((G,q)=>G!==this._tintColor[q])){if(this._tintColor=_,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(z){let _=Math.max(0,Math.min(1,z));if(_!==this._tintIntensity){if(this._tintIntensity=_,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(z){this._dithering=Math.max(0,Math.min(0.1,z))}get scale(){return this._scale}set scale(z){this._scale=Math.max(0.01,Math.min(4,z))}setOptions(z){if(z.warpIntensity!==void 0)this.warpIntensity=z.warpIntensity;if(z.blurPasses!==void 0)this.blurPasses=z.blurPasses;if(z.animationSpeed!==void 0)this.animationSpeed=z.animationSpeed;if(z.transitionDuration!==void 0)this.transitionDuration=z.transitionDuration;if(z.saturation!==void 0)this.saturation=z.saturation;if(z.tintColor!==void 0)this.tintColor=z.tintColor;if(z.tintIntensity!==void 0)this.tintIntensity=z.tintIntensity;if(z.dithering!==void 0)this.dithering=z.dithering;if(z.scale!==void 0)this.scale=z.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(z){return new Promise((_,k)=>{let G=new Image;G.crossOrigin="anonymous",G.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,G),this.processNewImage(),_()},G.onerror=()=>k(Error(`Failed to load image: ${z}`)),G.src=z})}loadImageElement(z){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z),this.processNewImage()}loadImageData(z,_,k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,_,k,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z instanceof Uint8ClampedArray?new Uint8Array(z.buffer):z),this.processNewImage()}loadFromImageData(z){this.loadImageData(z.data,z.width,z.height)}async loadBlob(z){let _=await createImageBitmap(z);this.loadImageElement(_),_.close()}loadBase64(z){let _=z.startsWith("data:")?z:`data:image/png;base64,${z}`;return this.loadImage(_)}async loadArrayBuffer(z,_="image/png"){let k=new Blob([z],{type:_});return this.loadBlob(k)}loadGradient(z,_=135){let G=document.createElement("canvas");G.width=512,G.height=512;let q=G.getContext("2d");if(!q)return;let J=_*Math.PI/180,Z=256-Math.cos(J)*512,$=256-Math.sin(J)*512,f=256+Math.cos(J)*512,V=256+Math.sin(J)*512,O=q.createLinearGradient(Z,$,f,V);z.forEach((P,C)=>{O.addColorStop(C/(z.length-1),P)}),q.fillStyle=O,q.fillRect(0,0,512,512),this.loadImageElement(G)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(z){let _=this.gl;_.useProgram(this.tintProgram),this.setupAttributes(),_.bindFramebuffer(_.FRAMEBUFFER,this.blurFBO1.framebuffer),_.viewport(0,0,128,128),_.activeTexture(_.TEXTURE0),_.bindTexture(_.TEXTURE_2D,this.sourceTexture),_.uniform1i(this.uniforms.tint.texture,0),_.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),_.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),_.drawArrays(_.TRIANGLES,0,6),_.useProgram(this.blurProgram),this.setupAttributes(),_.uniform2f(this.uniforms.blur.resolution,128,128),_.uniform1i(this.uniforms.blur.texture,0);let k=this.blurFBO1,G=this.blurFBO2;for(let q=0;q<this._blurPasses;q++)_.bindFramebuffer(_.FRAMEBUFFER,G.framebuffer),_.viewport(0,0,128,128),_.bindTexture(_.TEXTURE_2D,k.texture),_.uniform1f(this.uniforms.blur.offset,q+0.5),_.drawArrays(_.TRIANGLES,0,6),[k,G]=[G,k];_.bindFramebuffer(_.FRAMEBUFFER,z.framebuffer),_.viewport(0,0,128,128),_.bindTexture(_.TEXTURE_2D,k.texture),_.uniform1f(this.uniforms.blur.offset,0),_.drawArrays(_.TRIANGLES,0,6)}resize(){let z=this.canvas.width,_=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(z,_,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(z){let _=performance.now();if(z!==void 0)this.render(z,_);else{let k=(_-this.lastFrameTime)/1000;this.lastFrameTime=_,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=k*this._animationSpeed,this.render(this.accumulatedTime,_)}}dispose(){this.stop();let z=this.gl;z.deleteProgram(this.blurProgram),z.deleteProgram(this.blendProgram),z.deleteProgram(this.tintProgram),z.deleteProgram(this.warpProgram),z.deleteProgram(this.outputProgram),z.deleteBuffer(this.positionBuffer),z.deleteBuffer(this.texCoordBuffer),z.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(z)=>{if(!this.isPlaying)return;let _=(z-this.lastFrameTime)/1000;this.lastFrameTime=z,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=_*this._animationSpeed,this.render(this.accumulatedTime,z),this.animationId=requestAnimationFrame(this.renderLoop)};render(z,_=performance.now()){let k=this.gl,G=this.canvas.width,q=this.canvas.height,J=1;if(this.isTransitioning){let $=_-this.transitionStartTime;if(J=Math.min(1,$/this._transitionDuration),J>=1)this.isTransitioning=!1}let Z;if(this.isTransitioning&&J<1)k.useProgram(this.blendProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.blurFBO1.framebuffer),k.viewport(0,0,128,128),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,this.currentAlbumFBO.texture),k.uniform1i(this.uniforms.blend.texture1,0),k.activeTexture(k.TEXTURE1),k.bindTexture(k.TEXTURE_2D,this.nextAlbumFBO.texture),k.uniform1i(this.uniforms.blend.texture2,1),k.uniform1f(this.uniforms.blend.blend,J),k.drawArrays(k.TRIANGLES,0,6),Z=this.blurFBO1.texture,k.useProgram(this.warpProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.warpFBO.framebuffer),k.viewport(0,0,G,q),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,Z),k.uniform1i(this.uniforms.warp.texture,0),k.uniform1f(this.uniforms.warp.time,z),k.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),k.drawArrays(k.TRIANGLES,0,6),k.useProgram(this.outputProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,null),k.viewport(0,0,G,q),k.bindTexture(k.TEXTURE_2D,this.warpFBO.texture),k.uniform1i(this.uniforms.output.texture,0),k.uniform1f(this.uniforms.output.saturation,this._saturation),k.uniform1f(this.uniforms.output.dithering,this._dithering),k.uniform1f(this.uniforms.output.time,z),k.uniform1f(this.uniforms.output.scale,this._scale),k.uniform2f(this.uniforms.output.resolution,G,q),k.drawArrays(k.TRIANGLES,0,6);else k.useProgram(this.warpProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.warpFBO.framebuffer),k.viewport(0,0,G,q),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,this.nextAlbumFBO.texture),k.uniform1i(this.uniforms.warp.texture,0),k.uniform1f(this.uniforms.warp.time,z),k.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),k.drawArrays(k.TRIANGLES,0,6),k.useProgram(this.outputProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,null),k.viewport(0,0,G,q),k.bindTexture(k.TEXTURE_2D,this.warpFBO.texture),k.uniform1i(this.uniforms.output.texture,0),k.uniform1f(this.uniforms.output.saturation,this._saturation),k.uniform1f(this.uniforms.output.dithering,this._dithering),k.uniform1f(this.uniforms.output.time,z),k.uniform1f(this.uniforms.output.scale,this._scale),k.uniform2f(this.uniforms.output.resolution,G,q),k.drawArrays(k.TRIANGLES,0,6)}setupAttributes(){let z=this.gl;z.bindBuffer(z.ARRAY_BUFFER,this.positionBuffer),z.enableVertexAttribArray(this.attribs.position),z.vertexAttribPointer(this.attribs.position,2,z.FLOAT,!1,0,0),z.bindBuffer(z.ARRAY_BUFFER,this.texCoordBuffer),z.enableVertexAttribArray(this.attribs.texCoord),z.vertexAttribPointer(this.attribs.texCoord,2,z.FLOAT,!1,0,0)}createShader(z,_){let k=this.gl,G=k.createShader(z);if(!G)throw Error("Failed to create shader");if(k.shaderSource(G,_),k.compileShader(G),!k.getShaderParameter(G,k.COMPILE_STATUS)){let q=k.getShaderInfoLog(G);throw k.deleteShader(G),Error(`Shader compile error: ${q}`)}return G}createProgram(z,_){let k=this.gl,G=this.createShader(k.VERTEX_SHADER,z),q=this.createShader(k.FRAGMENT_SHADER,_),J=k.createProgram();if(!J)throw Error("Failed to create program");if(k.attachShader(J,G),k.attachShader(J,q),k.linkProgram(J),!k.getProgramParameter(J,k.LINK_STATUS)){let Z=k.getProgramInfoLog(J);throw k.deleteProgram(J),Error(`Program link error: ${Z}`)}return k.deleteShader(G),k.deleteShader(q),J}createBuffer(z){let _=this.gl,k=_.createBuffer();if(!k)throw Error("Failed to create buffer");return _.bindBuffer(_.ARRAY_BUFFER,k),_.bufferData(_.ARRAY_BUFFER,z,_.STATIC_DRAW),k}createTexture(){let z=this.gl,_=z.createTexture();if(!_)throw Error("Failed to create texture");return z.bindTexture(z.TEXTURE_2D,_),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_S,z.CLAMP_TO_EDGE),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_T,z.CLAMP_TO_EDGE),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MIN_FILTER,z.LINEAR),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MAG_FILTER,z.LINEAR),_}createFramebuffer(z,_,k=!1){let G=this.gl,q=this.createTexture(),Z=k&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:G.UNSIGNED_BYTE;G.texImage2D(G.TEXTURE_2D,0,G.RGBA,z,_,0,G.RGBA,Z,null);let $=G.createFramebuffer();if(!$)throw Error("Failed to create framebuffer");return G.bindFramebuffer(G.FRAMEBUFFER,$),G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,q,0),{framebuffer:$,texture:q}}deleteFramebuffer(z){this.gl.deleteFramebuffer(z.framebuffer),this.gl.deleteTexture(z.texture)}}var p=(z)=>{let _=z.split(`
`),k=[],G=/\[(\d+):(\d+(?:\.\d+)?)\]/;return _.forEach((q)=>{let J=q.match(G);if(J){let Z=(parseInt(J[1])*60+parseFloat(J[2]))*1000,$=q.replace(G,"").trim();if($.includes("<")){let f=[],V=$.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((C)=>C.length>0),O=Z,P="";V.forEach((C)=>{let A=C.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(A)O=(parseInt(A[1])*60+parseFloat(A[2]))*1000;else P+=C,f.push({startTime:O,word:C})}),k.push({startTime:Z,words:P.trim(),syllables:f})}else if($)k.push({startTime:Z,words:$})}}),k},Y0=(z)=>{let _=[],k=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,G=(J)=>{if(!J)return 0;let Z=J.split(":");if(Z.length===3)return(parseInt(Z[0])*3600+parseInt(Z[1])*60+parseFloat(Z[2]))*1000;if(Z.length===2)return(parseInt(Z[0])*60+parseFloat(Z[1]))*1000;if(J.endsWith("s"))return parseFloat(J.replace("s",""))*1000;return parseFloat(J)*1000},q;while((q=k.exec(z))!==null){let J=G(q[1]),Z=q[2],$=[],f="";if(Z.includes("<span")||Z.includes("<s")){let O=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,P;while((P=O.exec(Z))!==null){let C=G(P[1]),A=P[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(A.trim()||A===" ")$.push({startTime:C,word:A}),f+=A}}if($.length===0)f=Z.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let V=f.replace(/<br\s*\/?>/gi," ").trim();if(V)_.push({startTime:J,words:V,syllables:$.length>0?$:void 0})}return _},D0=()=>{let z=Spicetify.React,{useEffect:_,useState:k,useRef:G}=z,q=k,[J,Z]=q([]),[$,f]=q(-1),[V,O]=q(!1),[P,C]=q("Establishing signal..."),[A,k0]=q(""),[z0,R]=q(0),n=G([]),L=G(null),u=G(null),o=G(null),j=G(null),i=async()=>{let N=Spicetify.Player.data,I=N?.track||N?.item||Spicetify.Player.track||{},E=I?.metadata||{},Y=E.title||E.name||I.title||I.name||"",U=E.artist_name||E.artist||I.artist||"",W=E.image_xlarge_url||E.image_large_url||E.image_url||"";if(W.startsWith("spotify:image:"))W=`https://i.scdn.co/image/${W.split(":")[2]}`;if(k0(W),!Y||Y.length<1)Y=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",U=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!Y||Y.trim().length===0){C("Signal Lost: Searching Metadata..."),O(!1);return}let F=Y.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),x=U.split(",")[0].split("&")[0].trim();O(!0),C(`Syncing: ${x} - ${F}`);let M=async()=>{let Q=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(x+" "+F)}`,X;try{X=await fetch(Q,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}}).then((D)=>D.json())}catch(D){X=await Spicetify.CosmosAsync.get(Q,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"})}let H=X?.results||X?.data||X?.items;if(Array.isArray(X)&&X.length>0)H=X;else if(!H&&typeof X==="object")Object.keys(X).forEach((D)=>{if(Array.isArray(X[D]))H=X[D]});if(H&&H.length>0){let K=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${H[0].id}&ttml=true`,b="";try{let T=await fetch(K,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!T.ok)throw Error("AM Fetch Error");b=await T.text();try{let B=JSON.parse(b);if(typeof B==="string")b=B;else if(B.ttml||B.lyrics)b=B.ttml||B.lyrics}catch(B){}}catch(T){let B=await Spicetify.CosmosAsync.get(K,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});b=typeof B==="string"?B:B.ttml||B.lyrics||JSON.stringify(B)}let v=Y0(b);if(v.length>0)return{parsed:v,source:"Apple Music TTML"}}throw Error("No Apple Music match")},_0=async()=>{let Q=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(F)}&a=${encodeURIComponent(x)}&type=word`,X="";try{let D=await fetch(Q,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!D.ok)throw Error("MXM Fetch Error");X=await D.text();try{let K=JSON.parse(X);if(typeof K==="string")X=K;else if(K.lyrics)X=K.lyrics;else if(K.text)X=K.text}catch(K){}}catch(D){let K=await Spicetify.CosmosAsync.get(Q,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});X=typeof K==="string"?K:K.lyrics||K.text||JSON.stringify(K)}let H=p(X);if(H.length>0)return{parsed:H,source:"Musixmatch Word-Sync"};throw Error("No MXM word match")},G0=async()=>{let Q=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(x)}&track_name=${encodeURIComponent(F)}`);if(Q&&Q.length>0){let X=Q[0],H=X.syncedLyrics||X.plainLyrics||"",D=p(H);if(D.length>0)return{parsed:D,source:"LRCLIB"}}throw Error("No LRCLIB match")},q0=async()=>{let Q=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(x+" "+F)}`,H=(await fetch(Q,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}}).then((S)=>S.json()))?.result?.songs?.[0]?.id;if(!H)throw Error("No NetEase match");let D=`https://music.cyrvoid.com/lyric?id=${H}`,K=await fetch(D).then((S)=>S.json()),b=K?.lrc?.lyric||"",v=K?.yrc?.lyric||"",B=v?((S)=>{let g=[];return S.split(`
`).forEach((Z0)=>{let h=Z0.match(/\[(\d+),(\d+)\](.*)/);if(h){let a=parseInt(h[1]),t=h[3],w=[],s="",$0=/\((\d+),(\d+),\d+\)([^\(]*)/g,m;while((m=$0.exec(t))!==null){let K0=parseInt(m[1]),l=m[3];w.push({startTime:a+K0,word:l}),s+=l}g.push({startTime:a,words:w.length>0?s:t,syllables:w.length>0?w:void 0})}}),g})(v):p(b);if(B.length>0)return{parsed:B,source:v?"NetEase Word-Sync":"NetEase"};throw Error("NetEase parse failed")},J0=async()=>{let Q=I.uri?.split(":")[2];if(!Q)throw Error("No track ID");let X;try{X=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${Q}`)}catch(H){throw Error("Spotify Color-Lyrics API Error")}if(X&&X.lyrics&&X.lyrics.lines){let H=X.lyrics.lines.map((D)=>{let K=D.syllables?D.syllables.map((b)=>({startTime:parseInt(b.startTimeMs||"0"),word:b.word||b.character||b.text||""})):void 0;return{startTime:parseInt(D.startTimeMs||"0"),words:D.words||"",syllables:K&&K.length>0?K:void 0}});if(H.length>0)return{parsed:H,source:X.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},c=!1,r=!1,y=(Q)=>{if(c)return;if(Q.source==="Apple Music TTML"||Q.source==="Musixmatch Word-Sync"||Q.source==="Spotify Word-Sync")c=!0;r=!0,Z(Q.parsed),n.current=Q.parsed,C(`Signal Active (${Q.source})`)},X0=[J0().then(y),M().then(y),_0().then(y),q0().then(y),G0().then(y)];Promise.allSettled(X0).then(()=>{if(!r)C("Database record empty for this track."),Z([]),n.current=[];O(!1)})};return _(()=>{let N,I=()=>{let E=Spicetify.Player.getProgress(),Y=n.current;if(Y.length>0){let U=-1;for(let W=0;W<Y.length;W++)if(E>=Y[W].startTime)U=W;else break;if(U!==-1&&L.current){if(U!==$){f(U);let F=L.current.children[U];if(F){let x=L.current.parentElement?.clientHeight||0,M=F.offsetTop-x/2+F.clientHeight/2;R(-M)}}let W=L.current.children[U];if(W&&W.classList.contains("word-synced"))W.querySelectorAll(".vapor-syllable").forEach((x)=>{let M=parseInt(x.getAttribute("data-time")||"0");if(E>=M)x.classList.add("synced");else x.classList.remove("synced")})}}N=requestAnimationFrame(I)};return N=requestAnimationFrame(I),()=>cancelAnimationFrame(N)},[$]),_(()=>{let N=(Y,U=!1)=>{let W=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(U||Y||W!==u.current)u.current=W,f(-1),R(0),i()},I="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let Y=document.createElement("style");Y.id="vapor-lyrics-styles",Y.innerHTML=e,document.head.appendChild(Y)}Spicetify.Player.addEventListener("songchange",N);let E=setInterval(()=>N(null,!1),3000);return N(null,!0),()=>{clearInterval(E),Spicetify.Player.removeEventListener("songchange",N)}},[]),_(()=>{if(o.current&&!j.current)j.current=new d(o.current),j.current.start();return()=>{if(j.current)j.current.dispose(),j.current=null}},[]),_(()=>{if(j.current&&A)j.current.loadImage(A).catch((N)=>console.log("Kawarp load error:",N))},[A]),z.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[z.createElement("div",{className:"vapor-background",key:"bg"},[z.createElement("canvas",{key:"canvas",ref:o,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),z.createElement("div",{className:"vapor-content",key:"content"},[z.createElement("header",{className:"vapor-header",key:"header"},[z.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),z.createElement("main",{className:"vapor-lyrics-container",key:"main"},[z.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:L,style:{transform:`translate3d(0, ${z0}px, 0)`}},V?[z.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:J.length>0?J.map((N,I)=>{let E=I<J.length-1?J[I+1].startTime-N.startTime:3000,Y="";if(I===$)Y="active";else if($!==-1&&I<$)Y="played";let U=N.syllables&&N.syllables.length>0;return z.createElement("p",{className:`vapor-lyric-line ${Y} ${U?"word-synced":""}`,key:I,style:{"--line-duration":`${E}ms`}},U?N.syllables.map((W,F)=>z.createElement("span",{className:"vapor-syllable",key:F,"data-time":W.startTime},W.word)):N.words)}):[z.createElement("p",{className:"vapor-lyric-line",key:"i"},P==="Establishing signal..."?"Initializing signal...":P)])]),z.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>{u.current=null,i()}},P)])])};(function z(){let{Playbar:_,Platform:k,ReactDOM:G,React:q,CosmosAsync:J}=Spicetify;if(!_||!k||!G||!q||!J){setTimeout(z,500);return}function Z(){let $=document.querySelector(".main-view-container__scroll-node"),f=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!f)return;if($)$.style.overflow="hidden";let V=document.getElementById("vapor-lyrics-mount-root");if(!V)V=document.createElement("div"),V.id="vapor-lyrics-mount-root",f.innerHTML="",f.appendChild(V);G.render(q.createElement(D0),V)}if(k.History.listen(({pathname:$})=>{if($.includes("vapor-lyrics"))setTimeout(Z,100);else{let f=document.getElementById("vapor-lyrics-mount-root");if(f)f.remove();let V=document.querySelector(".main-view-container__scroll-node");if(V)V.style.overflow=""}}),k.History.location.pathname.includes("vapor-lyrics"))Z();new _.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(k.History.location.pathname.includes("vapor-lyrics"))k.History.goBack();else k.History.push("/vapor-lyrics")},!1,!1)})();
