Number.prototype.clamp=function(o,e){return Math.min(Math.max(this,o),e)};function m(){return typeof navigator<"u"?/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<600:null}const p=o=>document.querySelector(o),v=o=>typeof o=="number"?"#"+("00000"+o.toString(16)).slice(-6):o;function f(o){for(;o.children&&o.children.length>0;)f(o.children[0]),o.remove(o.children[0]);o.geometry&&o.geometry.dispose(),o.material&&(Object.keys(o.material).forEach(e=>{o.material[e]&&o.material[e]!==null&&typeof o.material[e].dispose=="function"&&o.material[e].dispose()}),o.material.dispose())}const h=typeof window=="object";let a=h&&window.THREE||{};h&&!window.VANTA&&(window.VANTA={});const r=h&&window.VANTA||{};r.register=(o,e)=>r[o]=t=>new e(t);r.version="0.5.24";const l=function(){return Array.prototype.unshift.call(arguments,"[VANTA]"),console.error.apply(this,arguments)};r.VantaBase=class{constructor(e={}){if(!h)return!1;r.current=this,this.windowMouseMoveWrapper=this.windowMouseMoveWrapper.bind(this),this.windowTouchWrapper=this.windowTouchWrapper.bind(this),this.windowGyroWrapper=this.windowGyroWrapper.bind(this),this.resize=this.resize.bind(this),this.animationLoop=this.animationLoop.bind(this),this.restart=this.restart.bind(this);const t=typeof this.getDefaultOptions=="function"?this.getDefaultOptions():this.defaultOptions;if(this.options=Object.assign({mouseControls:!0,touchControls:!0,gyroControls:!1,minHeight:200,minWidth:200,scale:1,scaleMobile:1},t),(e instanceof HTMLElement||typeof e=="string")&&(e={el:e}),Object.assign(this.options,e),this.options.THREE&&(a=this.options.THREE),this.el=this.options.el,this.el==null)l('Instance needs "el" param!');else if(!(this.options.el instanceof HTMLElement)){const s=this.el;if(this.el=p(s),!this.el){l("Cannot find element",s);return}}this.prepareEl(),this.initThree(),this.setSize();try{this.init()}catch(s){l("Init error",s),this.renderer&&this.renderer.domElement&&this.el.removeChild(this.renderer.domElement),this.options.backgroundColor&&(console.log("[VANTA] Falling back to backgroundColor"),this.el.style.background=v(this.options.backgroundColor));return}this.initMouse(),this.resize(),this.animationLoop();const i=window.addEventListener;i("resize",this.resize),window.requestAnimationFrame(this.resize),this.options.mouseControls&&(i("scroll",this.windowMouseMoveWrapper),i("mousemove",this.windowMouseMoveWrapper)),this.options.touchControls&&(i("touchstart",this.windowTouchWrapper),i("touchmove",this.windowTouchWrapper)),this.options.gyroControls&&i("deviceorientation",this.windowGyroWrapper)}setOptions(e={}){Object.assign(this.options,e),this.triggerMouseMove()}prepareEl(){let e,t;if(typeof Node<"u"&&Node.TEXT_NODE)for(e=0;e<this.el.childNodes.length;e++){const i=this.el.childNodes[e];if(i.nodeType===Node.TEXT_NODE){const s=document.createElement("span");s.textContent=i.textContent,i.parentElement.insertBefore(s,i),i.remove()}}for(e=0;e<this.el.children.length;e++)t=this.el.children[e],getComputedStyle(t).position==="static"&&(t.style.position="relative"),getComputedStyle(t).zIndex==="auto"&&(t.style.zIndex=1);getComputedStyle(this.el).position==="static"&&(this.el.style.position="relative")}applyCanvasStyles(e,t={}){Object.assign(e.style,{position:"absolute",zIndex:0,top:0,left:0,background:""}),Object.assign(e.style,t),e.classList.add("vanta-canvas")}initThree(){if(!a.WebGLRenderer){console.warn("[VANTA] No THREE defined on window");return}this.renderer=new a.WebGLRenderer({alpha:!0,antialias:!0}),this.el.appendChild(this.renderer.domElement),this.applyCanvasStyles(this.renderer.domElement),isNaN(this.options.backgroundAlpha)&&(this.options.backgroundAlpha=1),this.scene=new a.Scene}getCanvasElement(){if(this.renderer)return this.renderer.domElement;if(this.p5renderer)return this.p5renderer.canvas}getCanvasRect(){const e=this.getCanvasElement();return e?e.getBoundingClientRect():!1}windowMouseMoveWrapper(e){const t=this.getCanvasRect();if(!t)return!1;const i=e.clientX-t.left,s=e.clientY-t.top;i>=0&&s>=0&&i<=t.width&&s<=t.height&&(this.mouseX=i,this.mouseY=s,this.options.mouseEase||this.triggerMouseMove(i,s))}windowTouchWrapper(e){const t=this.getCanvasRect();if(!t)return!1;if(e.touches.length===1){const i=e.touches[0].clientX-t.left,s=e.touches[0].clientY-t.top;i>=0&&s>=0&&i<=t.width&&s<=t.height&&(this.mouseX=i,this.mouseY=s,this.options.mouseEase||this.triggerMouseMove(i,s))}}windowGyroWrapper(e){const t=this.getCanvasRect();if(!t)return!1;const i=Math.round(e.alpha*2)-t.left,s=Math.round(e.beta*2)-t.top;i>=0&&s>=0&&i<=t.width&&s<=t.height&&(this.mouseX=i,this.mouseY=s,this.options.mouseEase||this.triggerMouseMove(i,s))}triggerMouseMove(e,t){e===void 0&&t===void 0&&(this.options.mouseEase?(e=this.mouseEaseX,t=this.mouseEaseY):(e=this.mouseX,t=this.mouseY)),this.uniforms&&(this.uniforms.iMouse.value.x=e/this.scale,this.uniforms.iMouse.value.y=t/this.scale);const i=e/this.width,s=t/this.height;typeof this.onMouseMove=="function"&&this.onMouseMove(i,s)}setSize(){this.scale||(this.scale=1),m()&&this.options.scaleMobile?this.scale=this.options.scaleMobile:this.options.scale&&(this.scale=this.options.scale),this.width=Math.max(this.el.offsetWidth,this.options.minWidth),this.height=Math.max(this.el.offsetHeight,this.options.minHeight)}initMouse(){(!this.mouseX&&!this.mouseY||this.mouseX===this.options.minWidth/2&&this.mouseY===this.options.minHeight/2)&&(this.mouseX=this.width/2,this.mouseY=this.height/2,this.triggerMouseMove(this.mouseX,this.mouseY))}resize(){this.setSize(),this.camera&&(this.camera.aspect=this.width/this.height,typeof this.camera.updateProjectionMatrix=="function"&&this.camera.updateProjectionMatrix()),this.renderer&&(this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(window.devicePixelRatio/this.scale)),typeof this.onResize=="function"&&this.onResize()}isOnScreen(){const e=this.el.offsetHeight,t=this.el.getBoundingClientRect(),i=window.pageYOffset||(document.documentElement||document.body.parentNode||document.body).scrollTop,s=t.top+i,c=s-window.innerHeight,d=s+e;return c<=i&&i<=d}animationLoop(){this.t||(this.t=0),this.t2||(this.t2=0);const e=performance.now();if(this.prevNow){let t=(e-this.prevNow)/16.666666666666668;t=Math.max(.2,Math.min(t,5)),this.t+=t,this.t2+=(this.options.speed||1)*t,this.uniforms&&(this.uniforms.iTime.value=this.t2*.016667)}return this.prevNow=e,this.options.mouseEase&&(this.mouseEaseX=this.mouseEaseX||this.mouseX||0,this.mouseEaseY=this.mouseEaseY||this.mouseY||0,Math.abs(this.mouseEaseX-this.mouseX)+Math.abs(this.mouseEaseY-this.mouseY)>.1&&(this.mouseEaseX+=(this.mouseX-this.mouseEaseX)*.05,this.mouseEaseY+=(this.mouseY-this.mouseEaseY)*.05,this.triggerMouseMove(this.mouseEaseX,this.mouseEaseY))),(this.isOnScreen()||this.options.forceAnimate)&&(typeof this.onUpdate=="function"&&this.onUpdate(),this.scene&&this.camera&&(this.renderer.render(this.scene,this.camera),this.renderer.setClearColor(this.options.backgroundColor,this.options.backgroundAlpha)),this.fps&&this.fps.update&&this.fps.update(),typeof this.afterRender=="function"&&this.afterRender()),this.req=window.requestAnimationFrame(this.animationLoop)}restart(){if(this.scene)for(;this.scene.children.length;)this.scene.remove(this.scene.children[0]);typeof this.onRestart=="function"&&this.onRestart(),this.init()}init(){typeof this.onInit=="function"&&this.onInit()}destroy(){typeof this.onDestroy=="function"&&this.onDestroy();const e=window.removeEventListener;e("touchstart",this.windowTouchWrapper),e("touchmove",this.windowTouchWrapper),e("scroll",this.windowMouseMoveWrapper),e("mousemove",this.windowMouseMoveWrapper),e("deviceorientation",this.windowGyroWrapper),e("resize",this.resize),window.cancelAnimationFrame(this.req);const t=this.scene;t&&t.children&&f(t),this.renderer&&(this.renderer.domElement&&this.el.removeChild(this.renderer.domElement),this.renderer=null,this.scene=null),r.current===this&&(r.current=null)}};const w=r.VantaBase,g=typeof window=="object";let n=g&&window.THREE;class y extends w{constructor(e){n=e.THREE||n,n.Color.prototype.toVector=function(){return new n.Vector3(this.r,this.g,this.b)},super(e),this.updateUniforms=this.updateUniforms.bind(this)}init(){this.mode="shader",this.uniforms={iTime:{type:"f",value:1},iResolution:{type:"v2",value:new n.Vector2(1,1)},iDpr:{type:"f",value:window.devicePixelRatio||1},iMouse:{type:"v2",value:new n.Vector2(this.mouseX||0,this.mouseY||0)}},super.init(),this.fragmentShader&&this.initBasicShader()}setOptions(e){super.setOptions(e),this.updateUniforms()}initBasicShader(e=this.fragmentShader,t=this.vertexShader){t||(t=`uniform float uTime;
uniform vec2 uResolution;
void main() {
  gl_Position = vec4( position, 1.0 );
}`),this.updateUniforms(),typeof this.valuesChanger=="function"&&this.valuesChanger();const i=new n.ShaderMaterial({uniforms:this.uniforms,vertexShader:t,fragmentShader:e}),s=this.options.texturePath;s&&(this.uniforms.iTex={type:"t",value:new n.TextureLoader().load(s)});const c=new n.Mesh(new n.PlaneGeometry(2,2),i);this.scene.add(c),this.camera=new n.Camera,this.camera.position.z=1}updateUniforms(){const e={};let t,i;for(t in this.options)i=this.options[t],t.toLowerCase().indexOf("color")!==-1?e[t]={type:"v3",value:new n.Color(i).toVector()}:typeof i=="number"&&(e[t]={type:"f",value:i});return Object.assign(this.uniforms,e)}resize(){super.resize(),this.uniforms.iResolution.value.x=this.width/this.scale,this.uniforms.iResolution.value.y=this.height/this.scale}}class u extends y{}const C=r.register("CLOUDS",u);u.prototype.defaultOptions={backgroundColor:16777215,skyColor:6863063,cloudColor:11387358,cloudShadowColor:1586512,sunColor:16750873,sunGlareColor:16737843,sunlightColor:16750899,scale:3,scaleMobile:12,speed:1,mouseEase:!0};u.prototype.fragmentShader=`uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iTex;

uniform float speed;
uniform vec3 skyColor;
uniform vec3 cloudColor;
uniform vec3 cloudShadowColor;
uniform vec3 sunColor;
uniform vec3 sunlightColor;
uniform vec3 sunGlareColor;
uniform vec3 backgroundColor;

// uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
// uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube


// Volumetric clouds. It performs level of detail (LOD) for faster rendering
float hash(float p) {
  p = fract(p * 0.011);
  p *= (p + 7.5);
  p *= (p + p);
  return fract(p);
}

float noise( vec3 x ){
    // The noise function returns a value in the range -1.0f -> 1.0f
    vec3 p = floor(x);
    vec3 f = fract(x);
    f       = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    return mix(mix(mix( hash(n+0.0  ), hash(n+1.0  ),f.x),
                   mix( hash(n+57.0 ), hash(n+58.0 ),f.x),f.y),
               mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                   mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
}

const float constantTime = 1000.;
float map5( in vec3 p ){
    vec3 speed1 = vec3(0.5,0.01,1.0) * 0.5 * speed;
    vec3 q = p - speed1*(iTime + constantTime);
    float f;
    f  = 0.50000*noise( q ); q = q*2.02;
    f += 0.25000*noise( q ); q = q*2.03;
    f += 0.12500*noise( q ); q = q*2.01;
    f += 0.06250*noise( q ); q = q*2.02;
    f += 0.03125*noise( q );
    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );
}
float map4( in vec3 p ){
    vec3 speed1 = vec3(0.5,0.01,1.0) * 0.5 * speed;
    vec3 q = p - speed1*(iTime + constantTime);
    float f;
    f  = 0.50000*noise( q ); q = q*2.02;
    f += 0.25000*noise( q ); q = q*2.03;
    f += 0.12500*noise( q ); q = q*2.01;
    f += 0.06250*noise( q );
    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );
}
float map3( in vec3 p ){
    vec3 speed1 = vec3(0.5,0.01,1.0) * 0.5 * speed;
    vec3 q = p - speed1*(iTime + constantTime);
    float f;
    f  = 0.50000*noise( q ); q = q*2.02;
    f += 0.25000*noise( q ); q = q*2.03;
    f += 0.12500*noise( q );
    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );
}
float map2( in vec3 p ){
    vec3 speed1 = vec3(0.5,0.01,1.0) * 0.5 * speed;
    vec3 q = p - speed1*(iTime + constantTime);
    float f;
    f  = 0.50000*noise( q ); q = q*2.02;
    f += 0.25000*noise( q );
    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );
}

vec3 sundir = normalize( vec3(-1.0,0.0,-1.0) );

vec4 integrate( in vec4 sum, in float dif, in float den, in vec3 bgcol, in float t ){
    // lighting
    vec3 lin = cloudColor*1.4 + sunlightColor*dif;
    vec4 col = vec4( mix( vec3(1.0,0.95,0.8), cloudShadowColor, den ), den );
    col.xyz *= lin;
    col.xyz = mix( col.xyz, bgcol, 1.0-exp(-0.003*t*t) );
    // front to back blending
    col.a *= 0.4;
    col.rgb *= col.a;
    return sum + col*(1.0-sum.a);
}

#define MARCH(STEPS,MAPLOD) for(int i=0; i<STEPS; i++) { vec3  pos = ro + t*rd; if( pos.y<-3.0 || pos.y>2.0 || sum.a > 0.99 ) break; float den = MAPLOD( pos ); if( den>0.01 ) { float dif = clamp((den - MAPLOD(pos+0.3*sundir))/0.6, 0.0, 1.0 ); sum = integrate( sum, dif, den, bgcol, t ); } t += max(0.075,0.02*t); }

vec4 raymarch( in vec3 ro, in vec3 rd, in vec3 bgcol, in ivec2 px ){
    vec4 sum = vec4(0.0);

    float t = 0.0;

    MARCH(20,map5);
    MARCH(25,map4);
    MARCH(30,map3);
    MARCH(40,map2);

    return clamp( sum, 0.0, 1.0 );
}

mat3 setCamera( in vec3 ro, in vec3 ta, float cr ){
    vec3 cw = normalize(ta-ro);
    vec3 cp = vec3(sin(cr), cos(cr),0.0);
    vec3 cu = normalize( cross(cw,cp) );
    vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

vec4 render( in vec3 ro, in vec3 rd, in ivec2 px ){
    // background sky
    float sun = clamp( dot(sundir,rd), 0.0, 1.0 );
    vec3 col = skyColor - rd.y*0.2*vec3(1.0,0.5,1.0) + 0.15*0.5;
    col += 0.2*sunColor*pow( sun, 8.0 );

    // clouds
    vec4 res = raymarch( ro, rd, col, px );
    col = col*(1.0-res.w) + res.xyz;

    // sun glare
    col += 0.2*sunGlareColor*pow( sun, 3.0 );

    return vec4( col, 1.0 );
}

void main(){
    vec2 p = (-iResolution.xy + 2.0*gl_FragCoord.xy)/ iResolution.y;

    vec2 m = iMouse.xy/iResolution.xy;
    m.y = (1.0 - m.y) * 0.33 + 0.28; // camera height

    m.x *= 0.25;
    m.x += sin(iTime * 0.1 + 3.1415) * 0.25 + 0.25;

    // camera
    vec3 ro = 4.0*normalize(vec3(sin(3.0*m.x), 0.4*m.y, cos(3.0*m.x))); // origin
    vec3 ta = vec3(0.0, -1.0, 0.0);
    mat3 ca = setCamera( ro, ta, 0.0 );
    // ray
    vec3 rd = ca * normalize( vec3(p.xy,1.5));

    gl_FragColor = render( ro, rd, ivec2(gl_FragCoord-0.5) );
}
`;export{C as default};
