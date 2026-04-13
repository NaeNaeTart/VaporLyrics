var e=`:root {\r
  --vapor-pink: #ff71ce;\r
  --vapor-blue: #01cdfe;\r
  --vapor-green: #05ffa1;\r
  --vapor-purple: #b967ff;\r
  --vapor-yellow: #fffb96;\r
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
  filter: blur(1px) drop-shadow(0 0 0px transparent);\r
  transform: translate3d(0,0,0) scale(0.85);\r
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), \r
              background-position 0.5s ease-out,\r
              filter 0.5s ease,\r
              opacity 0.5s ease;\r
  will-change: transform, background-position, filter, opacity;\r
}\r
\r
.vapor-lyric-line.active {\r
  background-position: top;\r
  opacity: 1;\r
  transform: translate3d(0,0,0) scale(1.15);\r
  filter: blur(0) drop-shadow(0 0 10px rgba(1, 205, 254, 0.8));\r
  /* Dynamic Karaoke Wipe Duration */\r
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), \r
              background-position var(--line-duration, 0.5s) linear,\r
              filter 0.5s ease,\r
              opacity 0.5s ease;\r
}\r
\r
.vapor-lyric-line.played {\r
  background-position: top;\r
  opacity: 0.35;\r
  transform: translate3d(0,0,0) scale(0.85);\r
  filter: blur(1.5px) drop-shadow(0 0 0px transparent);\r
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
  filter: blur(1.5px);\r
  transform: scale(0.95);\r
  margin-right: 4px;\r
}\r
\r
.vapor-syllable.synced {\r
  opacity: 1;\r
  filter: blur(0) drop-shadow(0 0 12px var(--vapor-blue));\r
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
/* VHS Overlay */\r
.vhs-overlay {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  width: 100vw;\r
  height: 100vh;\r
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), \r
              linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));\r
  background-size: 100% 3px, 3px 100%;\r
  pointer-events: none;\r
  z-index: 1000;\r
  opacity: 0.4;\r
}\r
\r
.vhs-overlay::after {\r
  content: " ";\r
  display: block;\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  bottom: 0;\r
  right: 0;\r
  background: rgba(18, 16, 16, 0.03);\r
  opacity: 0;\r
  z-index: 1000;\r
  pointer-events: none;\r
  animation: vhs-flicker 0.1s infinite;\r
}\r
\r
@keyframes vhs-flicker {\r
  0% { opacity: 0.1; }\r
  50% { opacity: 0.05; }\r
  100% { opacity: 0.15; }\r
}\r
`;class d{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(z,b={}){this.canvas=z;let k=z.getContext("webgl",{preserveDrawingBuffer:!0});if(!k)throw Error("WebGL not supported");this.gl=k,this.halfFloatExt=k.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=k.getExtension("OES_texture_half_float_linear"),this._warpIntensity=b.warpIntensity??1,this._blurPasses=b.blurPasses??8,this._animationSpeed=b.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=b.transitionDuration??1000,this._saturation=b.saturation??1.5,this._tintColor=b.tintColor??[0.157,0.157,0.235],this._tintIntensity=b.tintIntensity??0.15,this._dithering=b.dithering??0.008,this._scale=b.scale??1,this.blurProgram=this.createProgram(`
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
`),this.attribs={position:k.getAttribLocation(this.blurProgram,"a_position"),texCoord:k.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:k.getUniformLocation(this.blurProgram,"u_resolution"),texture:k.getUniformLocation(this.blurProgram,"u_texture"),offset:k.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:k.getUniformLocation(this.blendProgram,"u_texture1"),texture2:k.getUniformLocation(this.blendProgram,"u_texture2"),blend:k.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:k.getUniformLocation(this.warpProgram,"u_texture"),time:k.getUniformLocation(this.warpProgram,"u_time"),intensity:k.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:k.getUniformLocation(this.tintProgram,"u_texture"),tintColor:k.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:k.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:k.getUniformLocation(this.outputProgram,"u_texture"),saturation:k.getUniformLocation(this.outputProgram,"u_saturation"),dithering:k.getUniformLocation(this.outputProgram,"u_dithering"),time:k.getUniformLocation(this.outputProgram,"u_time"),scale:k.getUniformLocation(this.outputProgram,"u_scale"),resolution:k.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(z){this._warpIntensity=Math.max(0,Math.min(1,z))}get blurPasses(){return this._blurPasses}set blurPasses(z){let b=Math.max(1,Math.min(40,Math.floor(z)));if(b!==this._blurPasses){if(this._blurPasses=b,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(z){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,z))}get transitionDuration(){return this._transitionDuration}set transitionDuration(z){this._transitionDuration=Math.max(0,Math.min(5000,z))}get saturation(){return this._saturation}set saturation(z){this._saturation=Math.max(0,Math.min(3,z))}get tintColor(){return this._tintColor}set tintColor(z){let b=z.map((f)=>Math.max(0,Math.min(1,f)));if(b.some((f,J)=>f!==this._tintColor[J])){if(this._tintColor=b,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(z){let b=Math.max(0,Math.min(1,z));if(b!==this._tintIntensity){if(this._tintIntensity=b,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(z){this._dithering=Math.max(0,Math.min(0.1,z))}get scale(){return this._scale}set scale(z){this._scale=Math.max(0.01,Math.min(4,z))}setOptions(z){if(z.warpIntensity!==void 0)this.warpIntensity=z.warpIntensity;if(z.blurPasses!==void 0)this.blurPasses=z.blurPasses;if(z.animationSpeed!==void 0)this.animationSpeed=z.animationSpeed;if(z.transitionDuration!==void 0)this.transitionDuration=z.transitionDuration;if(z.saturation!==void 0)this.saturation=z.saturation;if(z.tintColor!==void 0)this.tintColor=z.tintColor;if(z.tintIntensity!==void 0)this.tintIntensity=z.tintIntensity;if(z.dithering!==void 0)this.dithering=z.dithering;if(z.scale!==void 0)this.scale=z.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(z){return new Promise((b,k)=>{let f=new Image;f.crossOrigin="anonymous",f.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,f),this.processNewImage(),b()},f.onerror=()=>k(Error(`Failed to load image: ${z}`)),f.src=z})}loadImageElement(z){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z),this.processNewImage()}loadImageData(z,b,k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,b,k,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z instanceof Uint8ClampedArray?new Uint8Array(z.buffer):z),this.processNewImage()}loadFromImageData(z){this.loadImageData(z.data,z.width,z.height)}async loadBlob(z){let b=await createImageBitmap(z);this.loadImageElement(b),b.close()}loadBase64(z){let b=z.startsWith("data:")?z:`data:image/png;base64,${z}`;return this.loadImage(b)}async loadArrayBuffer(z,b="image/png"){let k=new Blob([z],{type:b});return this.loadBlob(k)}loadGradient(z,b=135){let f=document.createElement("canvas");f.width=512,f.height=512;let J=f.getContext("2d");if(!J)return;let X=b*Math.PI/180,_=256-Math.cos(X)*512,$=256-Math.sin(X)*512,K=256+Math.cos(X)*512,F=256+Math.sin(X)*512,A=J.createLinearGradient(_,$,K,F);z.forEach((E,B)=>{A.addColorStop(B/(z.length-1),E)}),J.fillStyle=A,J.fillRect(0,0,512,512),this.loadImageElement(f)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(z){let b=this.gl;b.useProgram(this.tintProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,this.blurFBO1.framebuffer),b.viewport(0,0,128,128),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this.sourceTexture),b.uniform1i(this.uniforms.tint.texture,0),b.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),b.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),b.drawArrays(b.TRIANGLES,0,6),b.useProgram(this.blurProgram),this.setupAttributes(),b.uniform2f(this.uniforms.blur.resolution,128,128),b.uniform1i(this.uniforms.blur.texture,0);let k=this.blurFBO1,f=this.blurFBO2;for(let J=0;J<this._blurPasses;J++)b.bindFramebuffer(b.FRAMEBUFFER,f.framebuffer),b.viewport(0,0,128,128),b.bindTexture(b.TEXTURE_2D,k.texture),b.uniform1f(this.uniforms.blur.offset,J+0.5),b.drawArrays(b.TRIANGLES,0,6),[k,f]=[f,k];b.bindFramebuffer(b.FRAMEBUFFER,z.framebuffer),b.viewport(0,0,128,128),b.bindTexture(b.TEXTURE_2D,k.texture),b.uniform1f(this.uniforms.blur.offset,0),b.drawArrays(b.TRIANGLES,0,6)}resize(){let z=this.canvas.width,b=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(z,b,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(z){let b=performance.now();if(z!==void 0)this.render(z,b);else{let k=(b-this.lastFrameTime)/1000;this.lastFrameTime=b,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=k*this._animationSpeed,this.render(this.accumulatedTime,b)}}dispose(){this.stop();let z=this.gl;z.deleteProgram(this.blurProgram),z.deleteProgram(this.blendProgram),z.deleteProgram(this.tintProgram),z.deleteProgram(this.warpProgram),z.deleteProgram(this.outputProgram),z.deleteBuffer(this.positionBuffer),z.deleteBuffer(this.texCoordBuffer),z.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(z)=>{if(!this.isPlaying)return;let b=(z-this.lastFrameTime)/1000;this.lastFrameTime=z,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=b*this._animationSpeed,this.render(this.accumulatedTime,z),this.animationId=requestAnimationFrame(this.renderLoop)};render(z,b=performance.now()){let k=this.gl,f=this.canvas.width,J=this.canvas.height,X=1;if(this.isTransitioning){let $=b-this.transitionStartTime;if(X=Math.min(1,$/this._transitionDuration),X>=1)this.isTransitioning=!1}let _;if(this.isTransitioning&&X<1)k.useProgram(this.blendProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.blurFBO1.framebuffer),k.viewport(0,0,128,128),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,this.currentAlbumFBO.texture),k.uniform1i(this.uniforms.blend.texture1,0),k.activeTexture(k.TEXTURE1),k.bindTexture(k.TEXTURE_2D,this.nextAlbumFBO.texture),k.uniform1i(this.uniforms.blend.texture2,1),k.uniform1f(this.uniforms.blend.blend,X),k.drawArrays(k.TRIANGLES,0,6),_=this.blurFBO1.texture,k.useProgram(this.warpProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.warpFBO.framebuffer),k.viewport(0,0,f,J),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,_),k.uniform1i(this.uniforms.warp.texture,0),k.uniform1f(this.uniforms.warp.time,z),k.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),k.drawArrays(k.TRIANGLES,0,6),k.useProgram(this.outputProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,null),k.viewport(0,0,f,J),k.bindTexture(k.TEXTURE_2D,this.warpFBO.texture),k.uniform1i(this.uniforms.output.texture,0),k.uniform1f(this.uniforms.output.saturation,this._saturation),k.uniform1f(this.uniforms.output.dithering,this._dithering),k.uniform1f(this.uniforms.output.time,z),k.uniform1f(this.uniforms.output.scale,this._scale),k.uniform2f(this.uniforms.output.resolution,f,J),k.drawArrays(k.TRIANGLES,0,6);else k.useProgram(this.warpProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.warpFBO.framebuffer),k.viewport(0,0,f,J),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,this.nextAlbumFBO.texture),k.uniform1i(this.uniforms.warp.texture,0),k.uniform1f(this.uniforms.warp.time,z),k.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),k.drawArrays(k.TRIANGLES,0,6),k.useProgram(this.outputProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,null),k.viewport(0,0,f,J),k.bindTexture(k.TEXTURE_2D,this.warpFBO.texture),k.uniform1i(this.uniforms.output.texture,0),k.uniform1f(this.uniforms.output.saturation,this._saturation),k.uniform1f(this.uniforms.output.dithering,this._dithering),k.uniform1f(this.uniforms.output.time,z),k.uniform1f(this.uniforms.output.scale,this._scale),k.uniform2f(this.uniforms.output.resolution,f,J),k.drawArrays(k.TRIANGLES,0,6)}setupAttributes(){let z=this.gl;z.bindBuffer(z.ARRAY_BUFFER,this.positionBuffer),z.enableVertexAttribArray(this.attribs.position),z.vertexAttribPointer(this.attribs.position,2,z.FLOAT,!1,0,0),z.bindBuffer(z.ARRAY_BUFFER,this.texCoordBuffer),z.enableVertexAttribArray(this.attribs.texCoord),z.vertexAttribPointer(this.attribs.texCoord,2,z.FLOAT,!1,0,0)}createShader(z,b){let k=this.gl,f=k.createShader(z);if(!f)throw Error("Failed to create shader");if(k.shaderSource(f,b),k.compileShader(f),!k.getShaderParameter(f,k.COMPILE_STATUS)){let J=k.getShaderInfoLog(f);throw k.deleteShader(f),Error(`Shader compile error: ${J}`)}return f}createProgram(z,b){let k=this.gl,f=this.createShader(k.VERTEX_SHADER,z),J=this.createShader(k.FRAGMENT_SHADER,b),X=k.createProgram();if(!X)throw Error("Failed to create program");if(k.attachShader(X,f),k.attachShader(X,J),k.linkProgram(X),!k.getProgramParameter(X,k.LINK_STATUS)){let _=k.getProgramInfoLog(X);throw k.deleteProgram(X),Error(`Program link error: ${_}`)}return k.deleteShader(f),k.deleteShader(J),X}createBuffer(z){let b=this.gl,k=b.createBuffer();if(!k)throw Error("Failed to create buffer");return b.bindBuffer(b.ARRAY_BUFFER,k),b.bufferData(b.ARRAY_BUFFER,z,b.STATIC_DRAW),k}createTexture(){let z=this.gl,b=z.createTexture();if(!b)throw Error("Failed to create texture");return z.bindTexture(z.TEXTURE_2D,b),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_S,z.CLAMP_TO_EDGE),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_T,z.CLAMP_TO_EDGE),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MIN_FILTER,z.LINEAR),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MAG_FILTER,z.LINEAR),b}createFramebuffer(z,b,k=!1){let f=this.gl,J=this.createTexture(),_=k&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:f.UNSIGNED_BYTE;f.texImage2D(f.TEXTURE_2D,0,f.RGBA,z,b,0,f.RGBA,_,null);let $=f.createFramebuffer();if(!$)throw Error("Failed to create framebuffer");return f.bindFramebuffer(f.FRAMEBUFFER,$),f.framebufferTexture2D(f.FRAMEBUFFER,f.COLOR_ATTACHMENT0,f.TEXTURE_2D,J,0),{framebuffer:$,texture:J}}deleteFramebuffer(z){this.gl.deleteFramebuffer(z.framebuffer),this.gl.deleteTexture(z.texture)}}var m=(z)=>{let b=z.split(`
`),k=[],f=/\[(\d+):(\d+(?:\.\d+)?)\]/;return b.forEach((J)=>{let X=J.match(f);if(X){let _=(parseInt(X[1])*60+parseFloat(X[2]))*1000,$=J.replace(f,"").trim();if($.includes("<")){let K=[],F=$.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((B)=>B.length>0),A=_,E="";F.forEach((B)=>{let U=B.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(U)A=(parseInt(U[1])*60+parseFloat(U[2]))*1000;else E+=B,K.push({startTime:A,word:B})}),k.push({startTime:_,words:E.trim(),syllables:K})}else if($)k.push({startTime:_,words:$})}}),k},K0=(z)=>{let b=[],k=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,f=(X)=>{if(!X)return 0;let _=X.split(":");if(_.length===3)return(parseInt(_[0])*3600+parseInt(_[1])*60+parseFloat(_[2]))*1000;if(_.length===2)return(parseInt(_[0])*60+parseFloat(_[1]))*1000;if(X.endsWith("s"))return parseFloat(X.replace("s",""))*1000;return parseFloat(X)*1000},J;while((J=k.exec(z))!==null){let X=f(J[1]),_=J[2],$=[],K="";if(_.includes("<span")||_.includes("<s")){let A=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,E;while((E=A.exec(_))!==null){let B=f(E[1]),U=E[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(U.trim()||U===" ")$.push({startTime:B,word:U}),K+=U}}if($.length===0)K=_.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let F=K.replace(/<br\s*\/?>/gi," ").trim();if(F)b.push({startTime:X,words:F,syllables:$.length>0?$:void 0})}return b},N0=()=>{let z=Spicetify.React,{useEffect:b,useState:k,useRef:f}=z,J=k,[X,_]=J([]),[$,K]=J(-1),[F,A]=J(!1),[E,B]=J("Establishing signal..."),[U,k0]=J(""),[z0,i]=J(0),n=f([]),L=f(null),o=f(null),u=f(null),v=f(null),R=async()=>{let Y=Spicetify.Player.data,H=Y?.track||Y?.item||Spicetify.Player.track||{},I=H?.metadata||{},N=I.title||I.name||H.title||H.name||"",x=I.artist_name||I.artist||H.artist||"",D=I.image_xlarge_url||I.image_large_url||I.image_url||"";if(D.startsWith("spotify:image:"))D=`https://i.scdn.co/image/${D.split(":")[2]}`;if(k0(D),!N||N.length<1)N=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",x=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!N||N.trim().length===0){B("Signal Lost: Searching Metadata..."),A(!1);return}let P=N.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),O=x.split(",")[0].split("&")[0].trim();A(!0),B(`Syncing: ${O} - ${P}`);let M=async()=>{let G=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(P+" "+O)}`,Z;try{Z=await fetch(G,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}}).then((Q)=>Q.json())}catch(Q){Z=await Spicetify.CosmosAsync.get(G,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"})}let W=Z?.results||Z?.data||Z?.items;if(Array.isArray(Z)&&Z.length>0)W=Z;else if(!W&&typeof Z==="object")Object.keys(Z).forEach((Q)=>{if(Array.isArray(Z[Q]))W=Z[Q]});if(W&&W.length>0){let q=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${W[0].id}&ttml=true`,C="";try{let T=await fetch(q,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}});if(!T.ok)throw Error("AM Fetch Error");C=await T.text();try{let V=JSON.parse(C);if(typeof V==="string")C=V;else if(V.ttml||V.lyrics)C=V.ttml||V.lyrics}catch(V){}}catch(T){let V=await Spicetify.CosmosAsync.get(q,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"});C=typeof V==="string"?V:V.ttml||V.lyrics||JSON.stringify(V)}let j=K0(C);if(j.length>0)return{parsed:j,source:"Apple Music TTML"}}throw Error("No Apple Music match")},b0=async()=>{let G=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(P)}&a=${encodeURIComponent(O)}&type=word`,Z="";try{let Q=await fetch(G,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}});if(!Q.ok)throw Error("MXM Fetch Error");Z=await Q.text();try{let q=JSON.parse(Z);if(typeof q==="string")Z=q;else if(q.lyrics)Z=q.lyrics;else if(q.text)Z=q.text}catch(q){}}catch(Q){let q=await Spicetify.CosmosAsync.get(G,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"});Z=typeof q==="string"?q:q.lyrics||q.text||JSON.stringify(q)}let W=m(Z);if(W.length>0)return{parsed:W,source:"Musixmatch Word-Sync"};throw Error("No MXM word match")},f0=async()=>{let G=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(O)}&track_name=${encodeURIComponent(P)}`);if(G&&G.length>0){let Z=G[0],W=Z.syncedLyrics||Z.plainLyrics||"",Q=m(W);if(Q.length>0)return{parsed:Q,source:"LRCLIB"}}throw Error("No LRCLIB match")},J0=async()=>{let G=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(O+" "+P)}`,W=(await fetch(G,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}}).then((S)=>S.json()))?.result?.songs?.[0]?.id;if(!W)throw Error("No NetEase match");let Q=`https://music.cyrvoid.com/lyric?id=${W}`,q=await fetch(Q).then((S)=>S.json()),C=q?.lrc?.lyric||"",j=q?.yrc?.lyric||"",V=j?((S)=>{let g=[];return S.split(`
`).forEach((_0)=>{let h=_0.match(/\[(\d+),(\d+)\](.*)/);if(h){let a=parseInt(h[1]),t=h[3],w=[],s="",$0=/\((\d+),(\d+),\d+\)([^\(]*)/g,p;while((p=$0.exec(t))!==null){let q0=parseInt(p[1]),l=p[3];w.push({startTime:a+q0,word:l}),s+=l}g.push({startTime:a,words:w.length>0?s:t,syllables:w.length>0?w:void 0})}}),g})(j):m(C);if(V.length>0)return{parsed:V,source:j?"NetEase Word-Sync":"NetEase"};throw Error("NetEase parse failed")},X0=async()=>{let G=H.uri?.split(":")[2];if(!G)throw Error("No track ID");let Z;try{Z=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${G}`)}catch(W){throw Error("Spotify Color-Lyrics API Error")}if(Z&&Z.lyrics&&Z.lyrics.lines){let W=Z.lyrics.lines.map((Q)=>{let q=Q.syllables?Q.syllables.map((C)=>({startTime:parseInt(C.startTimeMs||"0"),word:C.word||C.character||C.text||""})):void 0;return{startTime:parseInt(Q.startTimeMs||"0"),words:Q.words||"",syllables:q&&q.length>0?q:void 0}});if(W.length>0)return{parsed:W,source:Z.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},c=!1,r=!1,y=(G)=>{if(c)return;if(G.source==="Apple Music TTML"||G.source==="Musixmatch Word-Sync"||G.source==="Spotify Word-Sync")c=!0;r=!0,_(G.parsed),n.current=G.parsed,B(`Signal Active (${G.source})`)},Z0=[X0().then(y),M().then(y),b0().then(y),J0().then(y),f0().then(y)];Promise.allSettled(Z0).then(()=>{if(!r)B("Database record empty for this track."),_([]),n.current=[];A(!1)})};return b(()=>{let Y,H=()=>{let I=Spicetify.Player.getProgress(),N=n.current;if(N.length>0){let x=-1;for(let D=0;D<N.length;D++)if(I>=N[D].startTime)x=D;else break;if(x!==-1&&L.current){if(x!==$){K(x);let P=L.current.children[x];if(P){let O=L.current.parentElement?.clientHeight||0,M=P.offsetTop-O/2+P.clientHeight/2;i(-M)}}let D=L.current.children[x];if(D&&D.classList.contains("word-synced"))D.querySelectorAll(".vapor-syllable").forEach((O)=>{let M=parseInt(O.getAttribute("data-time")||"0");if(I>=M)O.classList.add("synced");else O.classList.remove("synced")})}}Y=requestAnimationFrame(H)};return Y=requestAnimationFrame(H),()=>cancelAnimationFrame(Y)},[$]),b(()=>{let Y=(N,x=!1)=>{let D=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(x||N||D!==o.current)o.current=D,K(-1),i(0),R()},H="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let N=document.createElement("style");N.id="vapor-lyrics-styles",N.innerHTML=e,document.head.appendChild(N)}Spicetify.Player.addEventListener("songchange",Y);let I=setInterval(()=>Y(null,!1),3000);return Y(null,!0),()=>{clearInterval(I),Spicetify.Player.removeEventListener("songchange",Y)}},[]),b(()=>{if(u.current&&!v.current)v.current=new d(u.current),v.current.start();return()=>{if(v.current)v.current.dispose(),v.current=null}},[]),b(()=>{if(v.current&&U)v.current.loadImage(U).catch((Y)=>console.log("Kawarp load error:",Y))},[U]),z.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[z.createElement("div",{className:"vapor-background",key:"bg"},[z.createElement("canvas",{key:"canvas",ref:u,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),z.createElement("div",{className:"vapor-content",key:"content"},[z.createElement("header",{className:"vapor-header",key:"header"},[z.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),z.createElement("main",{className:"vapor-lyrics-container",key:"main"},[z.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:L,style:{transform:`translate3d(0, ${z0}px, 0)`}},F?[z.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:X.length>0?X.map((Y,H)=>{let I=H<X.length-1?X[H+1].startTime-Y.startTime:3000,N="";if(H===$)N="active";else if($!==-1&&H<$)N="played";let x=Y.syllables&&Y.syllables.length>0;return z.createElement("p",{className:`vapor-lyric-line ${N} ${x?"word-synced":""}`,key:H,style:{"--line-duration":`${I}ms`}},x?Y.syllables.map((D,P)=>z.createElement("span",{className:"vapor-syllable",key:P,"data-time":D.startTime},D.word)):Y.words)}):[z.createElement("p",{className:"vapor-lyric-line",key:"i"},E==="Establishing signal..."?"Initializing signal...":E)])]),z.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>{o.current=null,R()}},E),z.createElement("div",{className:"vhs-overlay",key:"vhs"})])])};(function z(){let{Playbar:b,Platform:k,ReactDOM:f,React:J,CosmosAsync:X}=Spicetify;if(!b||!k||!f||!J||!X){setTimeout(z,500);return}function _(){let $=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!$)return;let K=document.getElementById("vapor-lyrics-mount-root");if(!K)K=document.createElement("div"),K.id="vapor-lyrics-mount-root",$.innerHTML="",$.appendChild(K);f.render(J.createElement(N0),K)}if(k.History.listen(({pathname:$})=>{if($.includes("vapor-lyrics"))setTimeout(_,100);else{let K=document.getElementById("vapor-lyrics-mount-root");if(K)K.remove()}}),k.History.location.pathname.includes("vapor-lyrics"))_();new b.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(k.History.location.pathname.includes("vapor-lyrics"))k.History.goBack();else k.History.push("/vapor-lyrics")},!1,!1)})();
