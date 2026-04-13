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
/* VHS Overlay */\r
.vhs-overlay {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), \r
              linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));\r
  background-size: 100% 3px, 3px 100%;\r
  pointer-events: none;\r
  z-index: 1000;\r
  opacity: 0.4;\r
}\r
\r
/* Global Fix to prevent Spicetify scrollbars when active */\r
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node,\r
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node-child {\r
  overflow: hidden !important;\r
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
`),this.attribs={position:k.getAttribLocation(this.blurProgram,"a_position"),texCoord:k.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:k.getUniformLocation(this.blurProgram,"u_resolution"),texture:k.getUniformLocation(this.blurProgram,"u_texture"),offset:k.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:k.getUniformLocation(this.blendProgram,"u_texture1"),texture2:k.getUniformLocation(this.blendProgram,"u_texture2"),blend:k.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:k.getUniformLocation(this.warpProgram,"u_texture"),time:k.getUniformLocation(this.warpProgram,"u_time"),intensity:k.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:k.getUniformLocation(this.tintProgram,"u_texture"),tintColor:k.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:k.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:k.getUniformLocation(this.outputProgram,"u_texture"),saturation:k.getUniformLocation(this.outputProgram,"u_saturation"),dithering:k.getUniformLocation(this.outputProgram,"u_dithering"),time:k.getUniformLocation(this.outputProgram,"u_time"),scale:k.getUniformLocation(this.outputProgram,"u_scale"),resolution:k.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(z){this._warpIntensity=Math.max(0,Math.min(1,z))}get blurPasses(){return this._blurPasses}set blurPasses(z){let _=Math.max(1,Math.min(40,Math.floor(z)));if(_!==this._blurPasses){if(this._blurPasses=_,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(z){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,z))}get transitionDuration(){return this._transitionDuration}set transitionDuration(z){this._transitionDuration=Math.max(0,Math.min(5000,z))}get saturation(){return this._saturation}set saturation(z){this._saturation=Math.max(0,Math.min(3,z))}get tintColor(){return this._tintColor}set tintColor(z){let _=z.map((b)=>Math.max(0,Math.min(1,b)));if(_.some((b,f)=>b!==this._tintColor[f])){if(this._tintColor=_,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(z){let _=Math.max(0,Math.min(1,z));if(_!==this._tintIntensity){if(this._tintIntensity=_,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(z){this._dithering=Math.max(0,Math.min(0.1,z))}get scale(){return this._scale}set scale(z){this._scale=Math.max(0.01,Math.min(4,z))}setOptions(z){if(z.warpIntensity!==void 0)this.warpIntensity=z.warpIntensity;if(z.blurPasses!==void 0)this.blurPasses=z.blurPasses;if(z.animationSpeed!==void 0)this.animationSpeed=z.animationSpeed;if(z.transitionDuration!==void 0)this.transitionDuration=z.transitionDuration;if(z.saturation!==void 0)this.saturation=z.saturation;if(z.tintColor!==void 0)this.tintColor=z.tintColor;if(z.tintIntensity!==void 0)this.tintIntensity=z.tintIntensity;if(z.dithering!==void 0)this.dithering=z.dithering;if(z.scale!==void 0)this.scale=z.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(z){return new Promise((_,k)=>{let b=new Image;b.crossOrigin="anonymous",b.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,b),this.processNewImage(),_()},b.onerror=()=>k(Error(`Failed to load image: ${z}`)),b.src=z})}loadImageElement(z){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z),this.processNewImage()}loadImageData(z,_,k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,_,k,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z instanceof Uint8ClampedArray?new Uint8Array(z.buffer):z),this.processNewImage()}loadFromImageData(z){this.loadImageData(z.data,z.width,z.height)}async loadBlob(z){let _=await createImageBitmap(z);this.loadImageElement(_),_.close()}loadBase64(z){let _=z.startsWith("data:")?z:`data:image/png;base64,${z}`;return this.loadImage(_)}async loadArrayBuffer(z,_="image/png"){let k=new Blob([z],{type:_});return this.loadBlob(k)}loadGradient(z,_=135){let b=document.createElement("canvas");b.width=512,b.height=512;let f=b.getContext("2d");if(!f)return;let G=_*Math.PI/180,J=256-Math.cos(G)*512,X=256-Math.sin(G)*512,N=256+Math.cos(G)*512,H=256+Math.sin(G)*512,F=f.createLinearGradient(J,X,N,H);z.forEach((P,I)=>{F.addColorStop(I/(z.length-1),P)}),f.fillStyle=F,f.fillRect(0,0,512,512),this.loadImageElement(b)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(z){let _=this.gl;_.useProgram(this.tintProgram),this.setupAttributes(),_.bindFramebuffer(_.FRAMEBUFFER,this.blurFBO1.framebuffer),_.viewport(0,0,128,128),_.activeTexture(_.TEXTURE0),_.bindTexture(_.TEXTURE_2D,this.sourceTexture),_.uniform1i(this.uniforms.tint.texture,0),_.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),_.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),_.drawArrays(_.TRIANGLES,0,6),_.useProgram(this.blurProgram),this.setupAttributes(),_.uniform2f(this.uniforms.blur.resolution,128,128),_.uniform1i(this.uniforms.blur.texture,0);let k=this.blurFBO1,b=this.blurFBO2;for(let f=0;f<this._blurPasses;f++)_.bindFramebuffer(_.FRAMEBUFFER,b.framebuffer),_.viewport(0,0,128,128),_.bindTexture(_.TEXTURE_2D,k.texture),_.uniform1f(this.uniforms.blur.offset,f+0.5),_.drawArrays(_.TRIANGLES,0,6),[k,b]=[b,k];_.bindFramebuffer(_.FRAMEBUFFER,z.framebuffer),_.viewport(0,0,128,128),_.bindTexture(_.TEXTURE_2D,k.texture),_.uniform1f(this.uniforms.blur.offset,0),_.drawArrays(_.TRIANGLES,0,6)}resize(){let z=this.canvas.width,_=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(z,_,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(z){let _=performance.now();if(z!==void 0)this.render(z,_);else{let k=(_-this.lastFrameTime)/1000;this.lastFrameTime=_,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=k*this._animationSpeed,this.render(this.accumulatedTime,_)}}dispose(){this.stop();let z=this.gl;z.deleteProgram(this.blurProgram),z.deleteProgram(this.blendProgram),z.deleteProgram(this.tintProgram),z.deleteProgram(this.warpProgram),z.deleteProgram(this.outputProgram),z.deleteBuffer(this.positionBuffer),z.deleteBuffer(this.texCoordBuffer),z.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(z)=>{if(!this.isPlaying)return;let _=(z-this.lastFrameTime)/1000;this.lastFrameTime=z,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=_*this._animationSpeed,this.render(this.accumulatedTime,z),this.animationId=requestAnimationFrame(this.renderLoop)};render(z,_=performance.now()){let k=this.gl,b=this.canvas.width,f=this.canvas.height,G=1;if(this.isTransitioning){let X=_-this.transitionStartTime;if(G=Math.min(1,X/this._transitionDuration),G>=1)this.isTransitioning=!1}let J;if(this.isTransitioning&&G<1)k.useProgram(this.blendProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.blurFBO1.framebuffer),k.viewport(0,0,128,128),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,this.currentAlbumFBO.texture),k.uniform1i(this.uniforms.blend.texture1,0),k.activeTexture(k.TEXTURE1),k.bindTexture(k.TEXTURE_2D,this.nextAlbumFBO.texture),k.uniform1i(this.uniforms.blend.texture2,1),k.uniform1f(this.uniforms.blend.blend,G),k.drawArrays(k.TRIANGLES,0,6),J=this.blurFBO1.texture,k.useProgram(this.warpProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.warpFBO.framebuffer),k.viewport(0,0,b,f),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,J),k.uniform1i(this.uniforms.warp.texture,0),k.uniform1f(this.uniforms.warp.time,z),k.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),k.drawArrays(k.TRIANGLES,0,6),k.useProgram(this.outputProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,null),k.viewport(0,0,b,f),k.bindTexture(k.TEXTURE_2D,this.warpFBO.texture),k.uniform1i(this.uniforms.output.texture,0),k.uniform1f(this.uniforms.output.saturation,this._saturation),k.uniform1f(this.uniforms.output.dithering,this._dithering),k.uniform1f(this.uniforms.output.time,z),k.uniform1f(this.uniforms.output.scale,this._scale),k.uniform2f(this.uniforms.output.resolution,b,f),k.drawArrays(k.TRIANGLES,0,6);else k.useProgram(this.warpProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,this.warpFBO.framebuffer),k.viewport(0,0,b,f),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,this.nextAlbumFBO.texture),k.uniform1i(this.uniforms.warp.texture,0),k.uniform1f(this.uniforms.warp.time,z),k.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),k.drawArrays(k.TRIANGLES,0,6),k.useProgram(this.outputProgram),this.setupAttributes(),k.bindFramebuffer(k.FRAMEBUFFER,null),k.viewport(0,0,b,f),k.bindTexture(k.TEXTURE_2D,this.warpFBO.texture),k.uniform1i(this.uniforms.output.texture,0),k.uniform1f(this.uniforms.output.saturation,this._saturation),k.uniform1f(this.uniforms.output.dithering,this._dithering),k.uniform1f(this.uniforms.output.time,z),k.uniform1f(this.uniforms.output.scale,this._scale),k.uniform2f(this.uniforms.output.resolution,b,f),k.drawArrays(k.TRIANGLES,0,6)}setupAttributes(){let z=this.gl;z.bindBuffer(z.ARRAY_BUFFER,this.positionBuffer),z.enableVertexAttribArray(this.attribs.position),z.vertexAttribPointer(this.attribs.position,2,z.FLOAT,!1,0,0),z.bindBuffer(z.ARRAY_BUFFER,this.texCoordBuffer),z.enableVertexAttribArray(this.attribs.texCoord),z.vertexAttribPointer(this.attribs.texCoord,2,z.FLOAT,!1,0,0)}createShader(z,_){let k=this.gl,b=k.createShader(z);if(!b)throw Error("Failed to create shader");if(k.shaderSource(b,_),k.compileShader(b),!k.getShaderParameter(b,k.COMPILE_STATUS)){let f=k.getShaderInfoLog(b);throw k.deleteShader(b),Error(`Shader compile error: ${f}`)}return b}createProgram(z,_){let k=this.gl,b=this.createShader(k.VERTEX_SHADER,z),f=this.createShader(k.FRAGMENT_SHADER,_),G=k.createProgram();if(!G)throw Error("Failed to create program");if(k.attachShader(G,b),k.attachShader(G,f),k.linkProgram(G),!k.getProgramParameter(G,k.LINK_STATUS)){let J=k.getProgramInfoLog(G);throw k.deleteProgram(G),Error(`Program link error: ${J}`)}return k.deleteShader(b),k.deleteShader(f),G}createBuffer(z){let _=this.gl,k=_.createBuffer();if(!k)throw Error("Failed to create buffer");return _.bindBuffer(_.ARRAY_BUFFER,k),_.bufferData(_.ARRAY_BUFFER,z,_.STATIC_DRAW),k}createTexture(){let z=this.gl,_=z.createTexture();if(!_)throw Error("Failed to create texture");return z.bindTexture(z.TEXTURE_2D,_),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_S,z.CLAMP_TO_EDGE),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_T,z.CLAMP_TO_EDGE),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MIN_FILTER,z.LINEAR),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MAG_FILTER,z.LINEAR),_}createFramebuffer(z,_,k=!1){let b=this.gl,f=this.createTexture(),J=k&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:b.UNSIGNED_BYTE;b.texImage2D(b.TEXTURE_2D,0,b.RGBA,z,_,0,b.RGBA,J,null);let X=b.createFramebuffer();if(!X)throw Error("Failed to create framebuffer");return b.bindFramebuffer(b.FRAMEBUFFER,X),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,f,0),{framebuffer:X,texture:f}}deleteFramebuffer(z){this.gl.deleteFramebuffer(z.framebuffer),this.gl.deleteTexture(z.texture)}}var p=(z)=>{let _=z.split(`
`),k=[],b=/\[(\d+):(\d+(?:\.\d+)?)\]/;return _.forEach((f)=>{let G=f.match(b);if(G){let J=(parseInt(G[1])*60+parseFloat(G[2]))*1000,X=f.replace(b,"").trim();if(X.includes("<")){let N=[],H=X.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((I)=>I.length>0),F=J,P="";H.forEach((I)=>{let x=I.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(x)F=(parseInt(x[1])*60+parseFloat(x[2]))*1000;else P+=I,N.push({startTime:F,word:I})}),k.push({startTime:J,words:P.trim(),syllables:N})}else if(X)k.push({startTime:J,words:X})}}),k},K0=(z)=>{let _=[],k=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,b=(G)=>{if(!G)return 0;let J=G.split(":");if(J.length===3)return(parseInt(J[0])*3600+parseInt(J[1])*60+parseFloat(J[2]))*1000;if(J.length===2)return(parseInt(J[0])*60+parseFloat(J[1]))*1000;if(G.endsWith("s"))return parseFloat(G.replace("s",""))*1000;return parseFloat(G)*1000},f;while((f=k.exec(z))!==null){let G=b(f[1]),J=f[2],X=[],N="";if(J.includes("<span")||J.includes("<s")){let F=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,P;while((P=F.exec(J))!==null){let I=b(P[1]),x=P[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(x.trim()||x===" ")X.push({startTime:I,word:x}),N+=x}}if(X.length===0)N=J.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let H=N.replace(/<br\s*\/?>/gi," ").trim();if(H)_.push({startTime:G,words:H,syllables:X.length>0?X:void 0})}return _},Q0=()=>{let z=Spicetify.React,{useEffect:_,useState:k,useRef:b}=z,f=k,[G,J]=f([]),[X,N]=f(-1),[H,F]=f(!1),[P,I]=f("Establishing signal..."),[x,k0]=f(""),[z0,m]=f(0),T=b([]),y=b(null),w=b(null),u=b(null),O=b(null),R=async()=>{let Y=Spicetify.Player.data,B=Y?.track||Y?.item||Spicetify.Player.track||{},C=B?.metadata||{},K=C.title||C.name||B.title||B.name||"",E=C.artist_name||C.artist||B.artist||"",D=C.image_xlarge_url||C.image_large_url||C.image_url||"";if(D.startsWith("spotify:image:"))D=`https://i.scdn.co/image/${D.split(":")[2]}`;if(k0(D),!K||K.length<1)K=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",E=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!K||K.trim().length===0){I("Signal Lost: Searching Metadata..."),F(!1);return}let A=K.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),v=E.split(",")[0].split("&")[0].trim();F(!0),I(`Syncing: ${v} - ${A}`);let L=async()=>{let $=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(A+" "+v)}`,q;try{q=await fetch($,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}}).then((Q)=>Q.json())}catch(Q){q=await Spicetify.CosmosAsync.get($,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"})}let W=q?.results||q?.data||q?.items;if(Array.isArray(q)&&q.length>0)W=q;else if(!W&&typeof q==="object")Object.keys(q).forEach((Q)=>{if(Array.isArray(q[Q]))W=q[Q]});if(W&&W.length>0){let Z=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${W[0].id}&ttml=true`,U="";try{let o=await fetch(Z,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}});if(!o.ok)throw Error("AM Fetch Error");U=await o.text();try{let V=JSON.parse(U);if(typeof V==="string")U=V;else if(V.ttml||V.lyrics)U=V.ttml||V.lyrics}catch(V){}}catch(o){let V=await Spicetify.CosmosAsync.get(Z,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"});U=typeof V==="string"?V:V.ttml||V.lyrics||JSON.stringify(V)}let j=K0(U);if(j.length>0)return{parsed:j,source:"Apple Music TTML"}}throw Error("No Apple Music match")},_0=async()=>{let $=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(A)}&a=${encodeURIComponent(v)}&type=word`,q="";try{let Q=await fetch($,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}});if(!Q.ok)throw Error("MXM Fetch Error");q=await Q.text();try{let Z=JSON.parse(q);if(typeof Z==="string")q=Z;else if(Z.lyrics)q=Z.lyrics;else if(Z.text)q=Z.text}catch(Z){}}catch(Q){let Z=await Spicetify.CosmosAsync.get($,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"});q=typeof Z==="string"?Z:Z.lyrics||Z.text||JSON.stringify(Z)}let W=p(q);if(W.length>0)return{parsed:W,source:"Musixmatch Word-Sync"};throw Error("No MXM word match")},b0=async()=>{let $=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(v)}&track_name=${encodeURIComponent(A)}`);if($&&$.length>0){let q=$[0],W=q.syncedLyrics||q.plainLyrics||"",Q=p(W);if(Q.length>0)return{parsed:Q,source:"LRCLIB"}}throw Error("No LRCLIB match")},f0=async()=>{let $=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(v+" "+A)}`,W=(await fetch($,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}}).then((n)=>n.json()))?.result?.songs?.[0]?.id;if(!W)throw Error("No NetEase match");let Q=`https://music.cyrvoid.com/lyric?id=${W}`,Z=await fetch(Q).then((n)=>n.json()),U=Z?.lrc?.lyric||"",j=Z?.yrc?.lyric||"",V=j?((n)=>{let g=[];return n.split(`
`).forEach((J0)=>{let h=J0.match(/\[(\d+),(\d+)\](.*)/);if(h){let a=parseInt(h[1]),t=h[3],S=[],s="",X0=/\((\d+),(\d+),\d+\)([^\(]*)/g,i;while((i=X0.exec(t))!==null){let Z0=parseInt(i[1]),l=i[3];S.push({startTime:a+Z0,word:l}),s+=l}g.push({startTime:a,words:S.length>0?s:t,syllables:S.length>0?S:void 0})}}),g})(j):p(U);if(V.length>0)return{parsed:V,source:j?"NetEase Word-Sync":"NetEase"};throw Error("NetEase parse failed")},G0=async()=>{let $=B.uri?.split(":")[2];if(!$)throw Error("No track ID");let q;try{q=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${$}`)}catch(W){throw Error("Spotify Color-Lyrics API Error")}if(q&&q.lyrics&&q.lyrics.lines){let W=q.lyrics.lines.map((Q)=>{let Z=Q.syllables?Q.syllables.map((U)=>({startTime:parseInt(U.startTimeMs||"0"),word:U.word||U.character||U.text||""})):void 0;return{startTime:parseInt(Q.startTimeMs||"0"),words:Q.words||"",syllables:Z&&Z.length>0?Z:void 0}});if(W.length>0)return{parsed:W,source:q.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},c=!1,r=!1,M=($)=>{if(c)return;if($.source==="Apple Music TTML"||$.source==="Musixmatch Word-Sync"||$.source==="Spotify Word-Sync")c=!0;r=!0,J($.parsed),T.current=$.parsed,I(`Signal Active (${$.source})`)},q0=[G0().then(M),L().then(M),_0().then(M),f0().then(M),b0().then(M)];Promise.allSettled(q0).then(()=>{if(!r)I("Database record empty for this track."),J([]),T.current=[];F(!1)})};return _(()=>{let Y,B=()=>{let C=Spicetify.Player.getProgress(),K=T.current;if(K.length>0){let E=-1;for(let D=0;D<K.length;D++)if(C>=K[D].startTime)E=D;else break;if(E!==-1&&y.current){if(E!==X){N(E);let A=y.current.children[E];if(A){let v=y.current.parentElement?.clientHeight||0,L=A.offsetTop-v/2+A.clientHeight/2;m(-L)}}let D=y.current.children[E];if(D&&D.classList.contains("word-synced"))D.querySelectorAll(".vapor-syllable").forEach((v)=>{let L=parseInt(v.getAttribute("data-time")||"0");if(C>=L)v.classList.add("synced");else v.classList.remove("synced")})}}Y=requestAnimationFrame(B)};return Y=requestAnimationFrame(B),()=>cancelAnimationFrame(Y)},[X]),_(()=>{let Y=(K,E=!1)=>{let D=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(E||K||D!==w.current)w.current=D,N(-1),m(0),R()},B="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let K=document.createElement("style");K.id="vapor-lyrics-styles",K.innerHTML=e,document.head.appendChild(K)}Spicetify.Player.addEventListener("songchange",Y);let C=setInterval(()=>Y(null,!1),3000);return Y(null,!0),()=>{clearInterval(C),Spicetify.Player.removeEventListener("songchange",Y)}},[]),_(()=>{if(u.current&&!O.current)O.current=new d(u.current),O.current.start();return()=>{if(O.current)O.current.dispose(),O.current=null}},[]),_(()=>{if(O.current&&x)O.current.loadImage(x).catch((Y)=>console.log("Kawarp load error:",Y))},[x]),z.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[z.createElement("div",{className:"vapor-background",key:"bg"},[z.createElement("canvas",{key:"canvas",ref:u,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),z.createElement("div",{className:"vapor-content",key:"content"},[z.createElement("header",{className:"vapor-header",key:"header"},[z.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),z.createElement("main",{className:"vapor-lyrics-container",key:"main"},[z.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:y,style:{transform:`translate3d(0, ${z0}px, 0)`}},H?[z.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:G.length>0?G.map((Y,B)=>{let C=B<G.length-1?G[B+1].startTime-Y.startTime:3000,K="";if(B===X)K="active";else if(X!==-1&&B<X)K="played";let E=Y.syllables&&Y.syllables.length>0;return z.createElement("p",{className:`vapor-lyric-line ${K} ${E?"word-synced":""}`,key:B,style:{"--line-duration":`${C}ms`}},E?Y.syllables.map((D,A)=>z.createElement("span",{className:"vapor-syllable",key:A,"data-time":D.startTime},D.word)):Y.words)}):[z.createElement("p",{className:"vapor-lyric-line",key:"i"},P==="Establishing signal..."?"Initializing signal...":P)])]),z.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>{w.current=null,R()}},P),z.createElement("div",{className:"vhs-overlay",key:"vhs"})])])};(function z(){let{Playbar:_,Platform:k,ReactDOM:b,React:f,CosmosAsync:G}=Spicetify;if(!_||!k||!b||!f||!G){setTimeout(z,500);return}function J(){let X=document.querySelector(".main-view-container__scroll-node"),N=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!N)return;if(X)X.style.overflow="hidden";let H=document.getElementById("vapor-lyrics-mount-root");if(!H)H=document.createElement("div"),H.id="vapor-lyrics-mount-root",N.innerHTML="",N.appendChild(H);b.render(f.createElement(Q0),H)}if(k.History.listen(({pathname:X})=>{if(X.includes("vapor-lyrics"))setTimeout(J,100);else{let N=document.getElementById("vapor-lyrics-mount-root");if(N)N.remove();let H=document.querySelector(".main-view-container__scroll-node");if(H)H.style.overflow=""}}),k.History.location.pathname.includes("vapor-lyrics"))J();new _.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(k.History.location.pathname.includes("vapor-lyrics"))k.History.goBack();else k.History.push("/vapor-lyrics")},!1,!1)})();
