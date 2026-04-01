(function () {
  'use strict';

  function makeCanvasTexture (drawFn, size) {
    size = size || 256;
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    var ctx = canvas.getContext('2d');
    drawFn(ctx, size);
    var tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }

  function woodGrain (ctx, s) {
    var g = ctx.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, '#5d4037');
    g.addColorStop(0.3, '#6d4c41');
    g.addColorStop(0.6, '#4e342e');
    g.addColorStop(1, '#5d4037');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    for (var i = 0; i < 40; i++) {
      ctx.strokeStyle = 'rgba(0,0,0,' + (0.03 + Math.random() * 0.08) + ')';
      ctx.beginPath();
      ctx.moveTo(Math.random() * s, 0);
      ctx.bezierCurveTo(
        Math.random() * s, s * 0.4,
        Math.random() * s, s * 0.6,
        Math.random() * s, s
      );
      ctx.stroke();
    }
  }

  function marbleSoft (ctx, s) {
    ctx.fillStyle = '#eceff1';
    ctx.fillRect(0, 0, s, s);
    for (var i = 0; i < 60; i++) {
      ctx.fillStyle = 'rgba(120,144,156,' + (0.04 + Math.random() * 0.12) + ')';
      ctx.beginPath();
      ctx.moveTo(Math.random() * s, Math.random() * s);
      for (var j = 0; j < 4; j++) {
        ctx.lineTo(Math.random() * s, Math.random() * s);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  function grassNoise (ctx, s) {
    var g = ctx.createLinearGradient(0, 0, 0, s);
    g.addColorStop(0, '#4a7c59');
    g.addColorStop(1, '#2e5c3a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    for (var i = 0; i < 800; i++) {
      ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.08) + ')';
      ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2);
    }
  }

  AFRAME.registerComponent('apply-procedural-textures', {
    init: function () {
      var self = this;
      var scene = this.el.sceneEl;
      var run = function () {
        if (!window.THREE) return;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            self._applyMaps();
          });
        });
      };
      if (scene.hasLoaded) run();
      else scene.addEventListener('loaded', run);
    },

    _applyMaps: function () {
      var wood = makeCanvasTexture(woodGrain, 256);
      wood.repeat.set(3, 3);
      var marble = makeCanvasTexture(marbleSoft, 256);
      marble.repeat.set(2, 2);
      var grass = makeCanvasTexture(grassNoise, 256);
      grass.repeat.set(24, 24);

      var ground = document.querySelector('#ground');
      if (ground && ground.getObject3D('mesh')) {
        var gm = ground.getObject3D('mesh').material;
        gm.map = grass;
        gm.roughness = 0.92;
        gm.metalness = 0.02;
        gm.needsUpdate = true;
      }

      document.querySelectorAll('#floors a-box').forEach(function (el) {
        var mesh = el.getObject3D('mesh');
        if (!mesh || !mesh.material) return;
        mesh.material = mesh.material.clone();
        mesh.material.map = wood;
        mesh.material.roughness = 0.88;
        mesh.material.metalness = 0.05;
        mesh.material.needsUpdate = true;
      });

      var kitchenIsland = document.querySelector('#kitchen-island');
      if (kitchenIsland && kitchenIsland.getObject3D('mesh')) {
        var mesh = kitchenIsland.getObject3D('mesh');
        var km = mesh.material.clone ? mesh.material.clone() : mesh.material;
        mesh.material = km;
        km.map = marble;
        km.roughness = 0.35;
        km.metalness = 0.1;
        km.needsUpdate = true;
      }
    }
  });
})();
