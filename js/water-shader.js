/* A-Frame custom component: animated water surface (vertex displacement + Fresnel tint) */
(function () {
  'use strict';

  AFRAME.registerComponent('luxury-water', {
    schema: {
      color: { type: 'color', default: '#0a6b8a' },
      deepColor: { type: 'color', default: '#023047' },
      speed: { type: 'number', default: 1.2 },
      waveScale: { type: 'number', default: 0.12 }
    },

    init: function () {
      const self = this;
      const trySetup = function () {
        const mesh = self.el.getObject3D('mesh');
        if (!mesh || !mesh.geometry) {
          return false;
        }
        self._setupMaterial(mesh.geometry, self.data);
        return true;
      };
      if (!trySetup()) {
        this.el.addEventListener('object3dset', function handler (e) {
          if (e.detail && e.detail.type === 'mesh' && trySetup()) {
            self.el.removeEventListener('object3dset', handler);
          }
        });
      }
    },

    _setupMaterial: function (geom, data) {
      const vs = [
        'uniform float time;',
        'uniform float waveScale;',
        'varying vec3 vPos;',
        'varying vec3 vNormal;',
        'void main() {',
        '  vPos = position;',
        '  vNormal = normal;',
        '  float w1 = sin(position.x * 3.0 + time * 1.4) * cos(position.z * 2.8 + time * 1.1);',
        '  float w2 = sin(position.x * 5.2 - time * 0.9) * sin(position.z * 4.1 + time * 1.3);',
        '  float disp = (w1 * 0.55 + w2 * 0.45) * waveScale;',
        '  vec3 newPos = position + normal * disp;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);',
        '}'
      ].join('\n');

      const fs = [
        'uniform vec3 surfaceColor;',
        'uniform vec3 deepColor;',
        'uniform float time;',
        'varying vec3 vPos;',
        'varying vec3 vNormal;',
        'void main() {',
        '  float n = sin(vPos.x * 8.0 + time) * 0.5 + 0.5;',
        '  float fres = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 1.0, 0.0))), 2.0);',
        '  vec3 col = mix(deepColor, surfaceColor, 0.35 + n * 0.35 + fres * 0.3);',
        '  gl_FragColor = vec4(col, 0.92);',
        '}'
      ].join('\n');

      this.uniforms = {
        time: { value: 0 },
        surfaceColor: { value: new THREE.Color(data.color) },
        deepColor: { value: new THREE.Color(data.deepColor) },
        waveScale: { value: data.waveScale }
      };

      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide
      });

      const mesh = this.el.getObject3D('mesh');
      mesh.material = this.material;
      mesh.castShadow = false;
      mesh.receiveShadow = true;
    },

    update: function (oldData) {
      if (!this.uniforms) return;
      if (this.data.color !== oldData.color) {
        this.uniforms.surfaceColor.value.set(this.data.color);
      }
      if (this.data.deepColor !== oldData.deepColor) {
        this.uniforms.deepColor.value.set(this.data.deepColor);
      }
      if (this.data.waveScale !== oldData.waveScale) {
        this.uniforms.waveScale.value = this.data.waveScale;
      }
    },

    tick: function (t, dt) {
      if (!this.uniforms) return;
      this.uniforms.time.value = (t / 1000) * this.data.speed;
    }
  });
})();
