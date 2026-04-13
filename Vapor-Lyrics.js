var R=`:root {
  --vapor-pink: #ff71ce;
  --vapor-blue: #01cdfe;
  --vapor-green: #05ffa1;
  --vapor-purple: #b967ff;
  --vapor-yellow: #fffb96;
}

#vapor-lyrics-app-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
}

.vapor-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #000000;
  z-index: -1;
}

.vapor-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px;
  color: white;
  font-family: "Outfit", "Inter", sans-serif;
  box-sizing: border-box;
}

.vapor-header {
  margin-bottom: 40px;
  text-align: center;
}

.vapor-title {
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 12px;
  background: linear-gradient(to bottom, var(--vapor-pink), var(--vapor-blue));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(255, 113, 206, 0.5));
  margin: 0;
}

.vapor-lyrics-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to bottom, 
    transparent 0%, 
    black 15%, 
    black 85%, 
    transparent 100%
  );
}

/* The Dreamlike Scroll */
.vapor-lyrics-scroll {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50vh 0;
  will-change: transform;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.vapor-lyric-line {
  flex-shrink: 0;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 1.5rem 0;
  text-align: center;
  max-width: 80%;
  
  /* Top-to-Bottom Wipe Effect */
  background: linear-gradient(to bottom, #ffffff 50%, rgba(255, 255, 255, 0.25) 50%);
  background-size: 100% 200%;
  background-position: bottom;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  filter: blur(1px) drop-shadow(0 0 0px transparent);
  transform: translate3d(0,0,0) scale(0.85);
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), 
              background-position 0.5s ease-out,
              filter 0.5s ease,
              opacity 0.5s ease;
  will-change: transform, background-position, filter, opacity;
}

.vapor-lyric-line.active {
  background-position: top;
  opacity: 1;
  transform: translate3d(0,0,0) scale(1.15);
  filter: blur(0) drop-shadow(0 0 10px rgba(1, 205, 254, 0.8));
  /* Dynamic Karaoke Wipe Duration */
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), 
              background-position var(--line-duration, 0.5s) linear,
              filter 0.5s ease,
              opacity 0.5s ease;
}

.vapor-lyric-line.played {
  background-position: top;
  opacity: 0.35;
  transform: translate3d(0,0,0) scale(0.85);
  filter: blur(1.5px) drop-shadow(0 0 0px transparent);
}

.vapor-lyric-line.placeholder {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.2; }
  50% { opacity: 0.5; }
  100% { opacity: 0.2; }
}

.vapor-debug-status {
  position: fixed;
  bottom: 20px;
  left: 20px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.3;
  font-family: monospace;
}
`;class u{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(k,J={}){this.canvas=k;let z=k.getContext("webgl",{preserveDrawingBuffer:!0});if(!z)throw Error("WebGL not supported");this.gl=z,this.halfFloatExt=z.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=z.getExtension("OES_texture_half_float_linear"),this._warpIntensity=J.warpIntensity??1,this._blurPasses=J.blurPasses??8,this._animationSpeed=J.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=J.transitionDuration??1000,this._saturation=J.saturation??1.5,this._tintColor=J.tintColor??[0.157,0.157,0.235],this._tintIntensity=J.tintIntensity??0.15,this._dithering=J.dithering??0.008,this._scale=J.scale??1,this.blurProgram=this.createProgram(`
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
`),this.attribs={position:z.getAttribLocation(this.blurProgram,"a_position"),texCoord:z.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:z.getUniformLocation(this.blurProgram,"u_resolution"),texture:z.getUniformLocation(this.blurProgram,"u_texture"),offset:z.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:z.getUniformLocation(this.blendProgram,"u_texture1"),texture2:z.getUniformLocation(this.blendProgram,"u_texture2"),blend:z.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:z.getUniformLocation(this.warpProgram,"u_texture"),time:z.getUniformLocation(this.warpProgram,"u_time"),intensity:z.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:z.getUniformLocation(this.tintProgram,"u_texture"),tintColor:z.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:z.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:z.getUniformLocation(this.outputProgram,"u_texture"),saturation:z.getUniformLocation(this.outputProgram,"u_saturation"),dithering:z.getUniformLocation(this.outputProgram,"u_dithering"),time:z.getUniformLocation(this.outputProgram,"u_time"),scale:z.getUniformLocation(this.outputProgram,"u_scale"),resolution:z.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(k){this._warpIntensity=Math.max(0,Math.min(1,k))}get blurPasses(){return this._blurPasses}set blurPasses(k){let J=Math.max(1,Math.min(40,Math.floor(k)));if(J!==this._blurPasses){if(this._blurPasses=J,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(k){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,k))}get transitionDuration(){return this._transitionDuration}set transitionDuration(k){this._transitionDuration=Math.max(0,Math.min(5000,k))}get saturation(){return this._saturation}set saturation(k){this._saturation=Math.max(0,Math.min(3,k))}get tintColor(){return this._tintColor}set tintColor(k){let J=k.map((N)=>Math.max(0,Math.min(1,N)));if(J.some((N,X)=>N!==this._tintColor[X])){if(this._tintColor=J,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(k){let J=Math.max(0,Math.min(1,k));if(J!==this._tintIntensity){if(this._tintIntensity=J,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(k){this._dithering=Math.max(0,Math.min(0.1,k))}get scale(){return this._scale}set scale(k){this._scale=Math.max(0.01,Math.min(4,k))}setOptions(k){if(k.warpIntensity!==void 0)this.warpIntensity=k.warpIntensity;if(k.blurPasses!==void 0)this.blurPasses=k.blurPasses;if(k.animationSpeed!==void 0)this.animationSpeed=k.animationSpeed;if(k.transitionDuration!==void 0)this.transitionDuration=k.transitionDuration;if(k.saturation!==void 0)this.saturation=k.saturation;if(k.tintColor!==void 0)this.tintColor=k.tintColor;if(k.tintIntensity!==void 0)this.tintIntensity=k.tintIntensity;if(k.dithering!==void 0)this.dithering=k.dithering;if(k.scale!==void 0)this.scale=k.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(k){return new Promise((J,z)=>{let N=new Image;N.crossOrigin="anonymous",N.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,N),this.processNewImage(),J()},N.onerror=()=>z(Error(`Failed to load image: ${k}`)),N.src=k})}loadImageElement(k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k),this.processNewImage()}loadImageData(k,J,z){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,J,z,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k instanceof Uint8ClampedArray?new Uint8Array(k.buffer):k),this.processNewImage()}loadFromImageData(k){this.loadImageData(k.data,k.width,k.height)}async loadBlob(k){let J=await createImageBitmap(k);this.loadImageElement(J),J.close()}loadBase64(k){let J=k.startsWith("data:")?k:`data:image/png;base64,${k}`;return this.loadImage(J)}async loadArrayBuffer(k,J="image/png"){let z=new Blob([k],{type:J});return this.loadBlob(z)}loadGradient(k,J=135){let N=document.createElement("canvas");N.width=512,N.height=512;let X=N.getContext("2d");if(!X)return;let Z=J*Math.PI/180,_=256-Math.cos(Z)*512,q=256-Math.sin(Z)*512,G=256+Math.cos(Z)*512,f=256+Math.sin(Z)*512,x=X.createLinearGradient(_,q,G,f);k.forEach((P,B)=>{x.addColorStop(B/(k.length-1),P)}),X.fillStyle=x,X.fillRect(0,0,512,512),this.loadImageElement(N)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(k){let J=this.gl;J.useProgram(this.tintProgram),this.setupAttributes(),J.bindFramebuffer(J.FRAMEBUFFER,this.blurFBO1.framebuffer),J.viewport(0,0,128,128),J.activeTexture(J.TEXTURE0),J.bindTexture(J.TEXTURE_2D,this.sourceTexture),J.uniform1i(this.uniforms.tint.texture,0),J.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),J.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),J.drawArrays(J.TRIANGLES,0,6),J.useProgram(this.blurProgram),this.setupAttributes(),J.uniform2f(this.uniforms.blur.resolution,128,128),J.uniform1i(this.uniforms.blur.texture,0);let z=this.blurFBO1,N=this.blurFBO2;for(let X=0;X<this._blurPasses;X++)J.bindFramebuffer(J.FRAMEBUFFER,N.framebuffer),J.viewport(0,0,128,128),J.bindTexture(J.TEXTURE_2D,z.texture),J.uniform1f(this.uniforms.blur.offset,X+0.5),J.drawArrays(J.TRIANGLES,0,6),[z,N]=[N,z];J.bindFramebuffer(J.FRAMEBUFFER,k.framebuffer),J.viewport(0,0,128,128),J.bindTexture(J.TEXTURE_2D,z.texture),J.uniform1f(this.uniforms.blur.offset,0),J.drawArrays(J.TRIANGLES,0,6)}resize(){let k=this.canvas.width,J=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(k,J,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(k){let J=performance.now();if(k!==void 0)this.render(k,J);else{let z=(J-this.lastFrameTime)/1000;this.lastFrameTime=J,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=z*this._animationSpeed,this.render(this.accumulatedTime,J)}}dispose(){this.stop();let k=this.gl;k.deleteProgram(this.blurProgram),k.deleteProgram(this.blendProgram),k.deleteProgram(this.tintProgram),k.deleteProgram(this.warpProgram),k.deleteProgram(this.outputProgram),k.deleteBuffer(this.positionBuffer),k.deleteBuffer(this.texCoordBuffer),k.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(k)=>{if(!this.isPlaying)return;let J=(k-this.lastFrameTime)/1000;this.lastFrameTime=k,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=J*this._animationSpeed,this.render(this.accumulatedTime,k),this.animationId=requestAnimationFrame(this.renderLoop)};render(k,J=performance.now()){let z=this.gl,N=this.canvas.width,X=this.canvas.height,Z=1;if(this.isTransitioning){let q=J-this.transitionStartTime;if(Z=Math.min(1,q/this._transitionDuration),Z>=1)this.isTransitioning=!1}let _;if(this.isTransitioning&&Z<1)z.useProgram(this.blendProgram),this.setupAttributes(),z.bindFramebuffer(z.FRAMEBUFFER,this.blurFBO1.framebuffer),z.viewport(0,0,128,128),z.activeTexture(z.TEXTURE0),z.bindTexture(z.TEXTURE_2D,this.currentAlbumFBO.texture),z.uniform1i(this.uniforms.blend.texture1,0),z.activeTexture(z.TEXTURE1),z.bindTexture(z.TEXTURE_2D,this.nextAlbumFBO.texture),z.uniform1i(this.uniforms.blend.texture2,1),z.uniform1f(this.uniforms.blend.blend,Z),z.drawArrays(z.TRIANGLES,0,6),_=this.blurFBO1.texture,z.useProgram(this.warpProgram),this.setupAttributes(),z.bindFramebuffer(z.FRAMEBUFFER,this.warpFBO.framebuffer),z.viewport(0,0,N,X),z.activeTexture(z.TEXTURE0),z.bindTexture(z.TEXTURE_2D,_),z.uniform1i(this.uniforms.warp.texture,0),z.uniform1f(this.uniforms.warp.time,k),z.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),z.drawArrays(z.TRIANGLES,0,6),z.useProgram(this.outputProgram),this.setupAttributes(),z.bindFramebuffer(z.FRAMEBUFFER,null),z.viewport(0,0,N,X),z.bindTexture(z.TEXTURE_2D,this.warpFBO.texture),z.uniform1i(this.uniforms.output.texture,0),z.uniform1f(this.uniforms.output.saturation,this._saturation),z.uniform1f(this.uniforms.output.dithering,this._dithering),z.uniform1f(this.uniforms.output.time,k),z.uniform1f(this.uniforms.output.scale,this._scale),z.uniform2f(this.uniforms.output.resolution,N,X),z.drawArrays(z.TRIANGLES,0,6);else z.useProgram(this.warpProgram),this.setupAttributes(),z.bindFramebuffer(z.FRAMEBUFFER,this.warpFBO.framebuffer),z.viewport(0,0,N,X),z.activeTexture(z.TEXTURE0),z.bindTexture(z.TEXTURE_2D,this.nextAlbumFBO.texture),z.uniform1i(this.uniforms.warp.texture,0),z.uniform1f(this.uniforms.warp.time,k),z.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),z.drawArrays(z.TRIANGLES,0,6),z.useProgram(this.outputProgram),this.setupAttributes(),z.bindFramebuffer(z.FRAMEBUFFER,null),z.viewport(0,0,N,X),z.bindTexture(z.TEXTURE_2D,this.warpFBO.texture),z.uniform1i(this.uniforms.output.texture,0),z.uniform1f(this.uniforms.output.saturation,this._saturation),z.uniform1f(this.uniforms.output.dithering,this._dithering),z.uniform1f(this.uniforms.output.time,k),z.uniform1f(this.uniforms.output.scale,this._scale),z.uniform2f(this.uniforms.output.resolution,N,X),z.drawArrays(z.TRIANGLES,0,6)}setupAttributes(){let k=this.gl;k.bindBuffer(k.ARRAY_BUFFER,this.positionBuffer),k.enableVertexAttribArray(this.attribs.position),k.vertexAttribPointer(this.attribs.position,2,k.FLOAT,!1,0,0),k.bindBuffer(k.ARRAY_BUFFER,this.texCoordBuffer),k.enableVertexAttribArray(this.attribs.texCoord),k.vertexAttribPointer(this.attribs.texCoord,2,k.FLOAT,!1,0,0)}createShader(k,J){let z=this.gl,N=z.createShader(k);if(!N)throw Error("Failed to create shader");if(z.shaderSource(N,J),z.compileShader(N),!z.getShaderParameter(N,z.COMPILE_STATUS)){let X=z.getShaderInfoLog(N);throw z.deleteShader(N),Error(`Shader compile error: ${X}`)}return N}createProgram(k,J){let z=this.gl,N=this.createShader(z.VERTEX_SHADER,k),X=this.createShader(z.FRAGMENT_SHADER,J),Z=z.createProgram();if(!Z)throw Error("Failed to create program");if(z.attachShader(Z,N),z.attachShader(Z,X),z.linkProgram(Z),!z.getProgramParameter(Z,z.LINK_STATUS)){let _=z.getProgramInfoLog(Z);throw z.deleteProgram(Z),Error(`Program link error: ${_}`)}return z.deleteShader(N),z.deleteShader(X),Z}createBuffer(k){let J=this.gl,z=J.createBuffer();if(!z)throw Error("Failed to create buffer");return J.bindBuffer(J.ARRAY_BUFFER,z),J.bufferData(J.ARRAY_BUFFER,k,J.STATIC_DRAW),z}createTexture(){let k=this.gl,J=k.createTexture();if(!J)throw Error("Failed to create texture");return k.bindTexture(k.TEXTURE_2D,J),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_S,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_T,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MIN_FILTER,k.LINEAR),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MAG_FILTER,k.LINEAR),J}createFramebuffer(k,J,z=!1){let N=this.gl,X=this.createTexture(),_=z&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:N.UNSIGNED_BYTE;N.texImage2D(N.TEXTURE_2D,0,N.RGBA,k,J,0,N.RGBA,_,null);let q=N.createFramebuffer();if(!q)throw Error("Failed to create framebuffer");return N.bindFramebuffer(N.FRAMEBUFFER,q),N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,X,0),{framebuffer:q,texture:X}}deleteFramebuffer(k){this.gl.deleteFramebuffer(k.framebuffer),this.gl.deleteTexture(k.texture)}}var o=(k)=>{let J=k.split(`
`),z=[],N=/\[(\d+):(\d+(?:\.\d+)?)\]/;return J.forEach((X)=>{let Z=X.match(N);if(Z){let _=(parseInt(Z[1])*60+parseFloat(Z[2]))*1000,q=X.replace(N,"").trim();if(q.includes("<")){let G=[],f=q.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((B)=>B.length>0),x=_,P="";f.forEach((B)=>{let A=B.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(A)x=(parseInt(A[1])*60+parseFloat(A[2]))*1000;else P+=B,G.push({startTime:x,word:B})}),z.push({startTime:_,words:P.trim(),syllables:G})}else if(q)z.push({startTime:_,words:q})}}),z},l=(k)=>{let J=[],z=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,N=(Z)=>{if(!Z)return 0;let _=Z.split(":");if(_.length===3)return(parseInt(_[0])*3600+parseInt(_[1])*60+parseFloat(_[2]))*1000;if(_.length===2)return(parseInt(_[0])*60+parseFloat(_[1]))*1000;if(Z.endsWith("s"))return parseFloat(Z.replace("s",""))*1000;return parseFloat(Z)*1000},X;while((X=z.exec(k))!==null){let Z=N(X[1]),_=X[2],q=[],G="";if(_.includes("<span")||_.includes("<s")){let x=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,P;while((P=x.exec(_))!==null){let B=N(P[1]),A=P[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(A.trim()||A===" ")q.push({startTime:B,word:A}),G+=A}}if(q.length===0)G=_.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let f=G.replace(/<br\s*\/?>/gi," ").trim();if(f)J.push({startTime:Z,words:f,syllables:q.length>0?q:void 0})}return J},e=()=>{let k=Spicetify.React,{useEffect:J,useState:z,useRef:N}=k,X=z,[Z,_]=X([]),[q,G]=X(-1),[f,x]=X(!1),[P,B]=X("Establishing signal..."),[A,c]=X(""),[i,h]=X(0),v=N([]),M=N(null),S=N(null),y=N(null),j=N(null),d=async()=>{let W=Spicetify.Player.data,I=W?.track||W?.item||Spicetify.Player.track||{},C=I?.metadata||{},K=C.title||C.name||I.title||I.name||"",H=C.artist_name||C.artist||I.artist||"",D=C.image_xlarge_url||C.image_large_url||C.image_url||"";if(D.startsWith("spotify:image:"))D=`https://i.scdn.co/image/${D.split(":")[2]}`;if(c(D),!K||K.length<1)K=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",H=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!K||K.trim().length===0){B("Signal Lost: Searching Metadata..."),x(!1);return}let b=K.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),O=H.split(",")[0].split("&")[0].trim();x(!0),B(`Syncing: ${O} - ${b}`);let L=async()=>{let Q=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(b+" "+O)}`,$;try{$=await fetch(Q,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}}).then((V)=>V.json())}catch(V){$=await Spicetify.CosmosAsync.get(Q,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"})}let E=$?.results||$?.data||$?.items;if(Array.isArray($)&&$.length>0)E=$;else if(!E&&typeof $==="object")Object.keys($).forEach((V)=>{if(Array.isArray($[V]))E=$[V]});if(E&&E.length>0){let Y=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${E[0].id}&ttml=true`,F="";try{let w=await fetch(Y,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}});if(!w.ok)throw Error("AM Fetch Error");F=await w.text();try{let U=JSON.parse(F);if(typeof U==="string")F=U;else if(U.ttml||U.lyrics)F=U.ttml||U.lyrics}catch(U){}}catch(w){let U=await Spicetify.CosmosAsync.get(Y,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"});F=typeof U==="string"?U:U.ttml||U.lyrics||JSON.stringify(U)}let p=l(F);if(p.length>0)return{parsed:p,source:"Apple Music TTML"}}throw Error("No Apple Music match")},r=async()=>{let Q=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(b)}&a=${encodeURIComponent(O)}&type=word`,$="";try{let V=await fetch(Q,{headers:{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"}});if(!V.ok)throw Error("MXM Fetch Error");$=await V.text();try{let Y=JSON.parse($);if(typeof Y==="string")$=Y;else if(Y.lyrics)$=Y.lyrics;else if(Y.text)$=Y.text}catch(Y){}}catch(V){let Y=await Spicetify.CosmosAsync.get(Q,null,{"User-Agent":"VaporLyrics/1.0 (github.com/VaporLyrics)"});$=typeof Y==="string"?Y:Y.lyrics||Y.text||JSON.stringify(Y)}let E=o($);if(E.length>0)return{parsed:E,source:"Musixmatch Word-Sync"};throw Error("No MXM word match")},g=async()=>{let Q=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(O)}&track_name=${encodeURIComponent(b)}`);if(Q&&Q.length>0){let $=o(Q[0].syncedLyrics||Q[0].plainLyrics||"");if($.length>0)return{parsed:$,source:"LRCLIB"}}throw Error("No LRCLIB match")},a=async()=>{let Q=I.uri?.split(":")[2];if(!Q)throw Error("No track ID");let $;try{$=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${Q}`)}catch(E){throw Error("Spotify Color-Lyrics API Error")}if($&&$.lyrics&&$.lyrics.lines){let E=$.lyrics.lines.map((V)=>{let Y=V.syllables?V.syllables.map((F)=>({startTime:parseInt(F.startTimeMs||"0"),word:F.word||F.character||F.text||""})):void 0;return{startTime:parseInt(V.startTimeMs||"0"),words:V.words||"",syllables:Y&&Y.length>0?Y:void 0}});if(E.length>0)return{parsed:E,source:$.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},m=!1,n=!1,T=(Q)=>{if(m)return;if(Q.source==="Apple Music TTML"||Q.source==="Musixmatch Word-Sync"||Q.source==="Spotify Word-Sync")m=!0;n=!0,_(Q.parsed),v.current=Q.parsed,B(`Signal Active (${Q.source})`)},s=[a().then(T),L().then(T),r().then(T),g().then(T)];Promise.allSettled(s).then(()=>{if(!n)B("Database record empty for this track."),_([]),v.current=[];x(!1)})};return J(()=>{let W,I=()=>{let C=Spicetify.Player.getProgress(),K=v.current;if(K.length>0){let H=-1;for(let D=0;D<K.length;D++)if(C>=K[D].startTime)H=D;else break;if(H!==-1&&M.current){if(H!==q){G(H);let b=M.current.children[H];if(b){let O=M.current.parentElement?.clientHeight||0,L=b.offsetTop-O/2+b.clientHeight/2;h(-L)}}let D=M.current.children[H];if(D&&D.classList.contains("word-synced"))D.querySelectorAll(".vapor-syllable").forEach((O)=>{let L=parseInt(O.getAttribute("data-time")||"0");if(C>=L)O.classList.add("synced");else O.classList.remove("synced")})}}W=requestAnimationFrame(I)};return W=requestAnimationFrame(I),()=>cancelAnimationFrame(W)},[q]),J(()=>{let W=(K,H=!1)=>{let D=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(H||K||D!==S.current)S.current=D,G(-1),h(0),d()},I="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let K=document.createElement("style");K.id="vapor-lyrics-styles",K.innerHTML=R,document.head.appendChild(K)}Spicetify.Player.addEventListener("songchange",W);let C=setInterval(()=>W(null,!1),3000);return W(null,!0),()=>{clearInterval(C),Spicetify.Player.removeEventListener("songchange",W)}},[]),J(()=>{if(y.current&&!j.current)j.current=new u(y.current),j.current.start();return()=>{if(j.current)j.current.dispose(),j.current=null}},[]),J(()=>{if(j.current&&A)j.current.loadImage(A).catch((W)=>console.log("Kawarp load error:",W))},[A]),k.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[k.createElement("div",{className:"vapor-background",key:"bg"},[k.createElement("canvas",{key:"canvas",ref:y,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),k.createElement("div",{className:"vapor-content",key:"content"},[k.createElement("header",{className:"vapor-header",key:"header"},[k.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),k.createElement("main",{className:"vapor-lyrics-container",key:"main"},[k.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:M,style:{transform:`translate3d(0, ${i}px, 0)`}},f?[k.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:Z.length>0?Z.map((W,I)=>{let C=I<Z.length-1?Z[I+1].startTime-W.startTime:3000,K="";if(I===q)K="active";else if(q!==-1&&I<q)K="played";let H=W.syllables&&W.syllables.length>0;return k.createElement("p",{className:`vapor-lyric-line ${K} ${H?"word-synced":""}`,key:I,style:{"--line-duration":`${C}ms`}},H?W.syllables.map((D,b)=>k.createElement("span",{className:"vapor-syllable",key:b,"data-time":D.startTime},D.word)):W.words)}):[k.createElement("p",{className:"vapor-lyric-line",key:"i"},P==="Establishing signal..."?"Initializing signal...":P)])]),k.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>{S.current=null,d()}},P)])])};(function k(){let{Playbar:J,Platform:z,ReactDOM:N,React:X,CosmosAsync:Z}=Spicetify;if(!J||!z||!N||!X||!Z){setTimeout(k,500);return}function _(){let q=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!q)return;let G=document.getElementById("vapor-lyrics-mount-root");if(!G)G=document.createElement("div"),G.id="vapor-lyrics-mount-root",q.innerHTML="",q.appendChild(G);N.render(X.createElement(e),G)}if(z.History.listen(({pathname:q})=>{if(q.includes("vapor-lyrics"))setTimeout(_,100);else{let G=document.getElementById("vapor-lyrics-mount-root");if(G)G.remove()}}),z.History.location.pathname.includes("vapor-lyrics"))_();new J.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(z.History.location.pathname.includes("vapor-lyrics"))z.History.goBack();else z.History.push("/vapor-lyrics")},!1,!1)})();
