/* Smooth orbital motion for figures near the pool (performance-friendly, no physics) */
(function () {
  'use strict';

  AFRAME.registerComponent('pool-orbit', {
    schema: {
      center: { type: 'vec3', default: { x: 0, y: 0, z: 12 } },
      radius: { type: 'number', default: 3.2 },
      speed: { type: 'number', default: 0.35 },
      phase: { type: 'number', default: 0 },
      height: { type: 'number', default: 0 }
    },

    tick: function (t) {
      var d = this.data;
      var a = t * 0.001 * d.speed + d.phase;
      var cx = d.center.x;
      var cz = d.center.z;
      this.el.setAttribute('position', {
        x: cx + Math.cos(a) * d.radius,
        y: d.height,
        z: cz + Math.sin(a) * d.radius
      });
    }
  });

  AFRAME.registerComponent('pool-zigzag', {
    schema: {
      center: { type: 'vec3', default: { x: 1.5, y: 0, z: 11.5 } },
      width: { type: 'number', default: 2.5 },
      depth: { type: 'number', default: 1.8 },
      speed: { type: 'number', default: 0.45 },
      height: { type: 'number', default: 0 }
    },

    tick: function (t) {
      var d = this.data;
      var s = Math.sin(t * 0.001 * d.speed);
      var c = Math.cos(t * 0.001 * d.speed * 0.7);
      this.el.setAttribute('position', {
        x: d.center.x + s * d.width,
        y: d.height,
        z: d.center.z + c * d.depth
      });
    }
  });
})();
