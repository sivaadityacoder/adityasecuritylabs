(function () {
  'use strict';

  // ═══ VELARIS WebGL ═══
  var VS = 'attribute vec2 position;varying vec2 vUv;void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}';
  var FS = [
    'precision highp float;varying vec2 vUv;',
    'uniform vec2 u_res;uniform float u_t;uniform float u_g;uniform vec3 u_c[4];uniform vec3 u_bg;',
    'vec3 pm(vec3 x){return mod(((x*34.)+1.)*x,289.);}',
    'float sn(vec2 v){const vec4 C=vec4(.211324865,.366025404,-.577350269,.024390244);',
    'vec2 i=floor(v+dot(v,C.yy)),x0=v-i+dot(i,C.xx);',
    'vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);',
    'vec3 p=pm(pm(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));',
    'vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;',
    'vec3 x=2.*fract(p*C.www)-1.,h=abs(x)-.5,ox=floor(x+.5),a0=x-ox;',
    'm*=1.79284291400159-.85373472095314*(a0*a0+h*h);vec3 g;',
    'g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}',
    'void main(){vec2 uv=vUv;float r=u_res.x/u_res.y;vec2 p=uv-.5;p.x*=r;float t=u_t*.1;',
    'float n1=sn(p*.4+vec2(t*.2,-t*.3));float n2=sn(p*.55+vec2(-t*.15,t*.25)+n1*.25);',
    'float n3=sn(p*.75+vec2(t*.1,-t*.2)+n2*.2);vec3 c=u_bg;float d=length(p)*1.5;',
    'float vig=1.-smoothstep(.3,1.2,d);',
    'c=mix(c,u_c[0],smoothstep(-.2,.5,n1)*.85);c=mix(c,u_c[1],smoothstep(-.1,.6,n2)*.7);',
    'c=mix(c,u_c[2],smoothstep(-.3,.4,n3)*.6);c=mix(c,u_c[3],smoothstep(0.,.7,n1*n2)*.5);',
    'c+=u_c[1]*smoothstep(.8,0.,d)*.3;c=mix(c*.2,c,vig);',
    'c+=(fract(sin(dot(uv,vec2(12.9898,78.233)))*43758.5453+u_t)-.5)*u_g*.1;',
    'gl_FragColor=vec4(c,1.);}'
  ].join('');

  function hex(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255];}

  function initGL(){
    var c=document.getElementById('hero-canvas'),h=document.getElementById('hero');
    if(!c||!h)return;
    var gl=c.getContext('webgl',{alpha:false,antialias:false});
    if(!gl)return;

    function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o;}
    var pg=gl.createProgram();
    gl.attachShader(pg,sh(gl.VERTEX_SHADER,VS));
    gl.attachShader(pg,sh(gl.FRAGMENT_SHADER,FS));
    gl.linkProgram(pg);gl.useProgram(pg);

    var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    var pos=gl.getAttribLocation(pg,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);

    var uR=gl.getUniformLocation(pg,'u_res'),uT=gl.getUniformLocation(pg,'u_t'),
        uG=gl.getUniformLocation(pg,'u_g'),uB=gl.getUniformLocation(pg,'u_bg'),uC=gl.getUniformLocation(pg,'u_c');

    var bg=hex('#0a0a0b'),cols=new Float32Array([].concat(hex('#1a150e'),hex('#2a1f12'),hex('#8a7340'),hex('#0a0908')));

    function resize(){var d=Math.min(devicePixelRatio||1,2);c.width=h.clientWidth*d;c.height=h.clientHeight*d;gl.viewport(0,0,c.width,c.height);}
    new ResizeObserver(resize).observe(h);

    var vis=true;
    new IntersectionObserver(function(e){vis=e[0].isIntersecting;},{threshold:0}).observe(h);

    (function loop(t){
      if(vis){gl.uniform2f(uR,c.width,c.height);gl.uniform1f(uT,t*.0012);gl.uniform1f(uG,.18);
      gl.uniform3f(uB,bg[0],bg[1],bg[2]);gl.uniform3fv(uC,cols);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);}
      requestAnimationFrame(loop);
    })(0);
  }

  // ═══ NAV ═══
  var nav=document.getElementById('navbar'),sc=false;
  window.addEventListener('scroll',function(){var s=scrollY>40;if(s!==sc){sc=s;nav.classList.toggle('scrolled',sc);}},{passive:true});

  // ═══ REVEALS ═══
  var rvs=document.querySelectorAll('.rv');
  if(rvs.length){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target);}});},{threshold:.06,rootMargin:'0px 0px -30px 0px'});
    rvs.forEach(function(el){io.observe(el);});
  }

  // ═══ FORM ═══
  var form=document.getElementById('contact-form');
  if(form) form.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=document.getElementById('submitBtn');
    var n=document.getElementById('name').value.trim(),em=document.getElementById('email').value.trim(),
        co=document.getElementById('company').value.trim(),det=document.getElementById('details').value.trim();
    if(!n||!em||!co||!det){btn.textContent='Required fields missing.';setTimeout(function(){btn.innerHTML='Submit request <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';},2500);return;}
    btn.textContent='Preparing…';
    var ro=(document.getElementById('role')||{}).value||'',st=(document.getElementById('tech-stack')||{}).value||'',sz=(document.getElementById('codebase-size')||{}).value||'';
    window.location.href='mailto:adityasecuritylabs@gmail.com?subject='+encodeURIComponent('Audit Request: '+co)+'&body='+encodeURIComponent('Name: '+n+'\nCompany: '+co+'\nRole: '+ro+'\nEmail: '+em+'\n\nTech Stack: '+st+'\nCodebase: '+sz+'\n\nDetails:\n'+det);
    setTimeout(function(){btn.innerHTML='Submit request <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';form.reset();},3000);
  });

  initGL();
})();
