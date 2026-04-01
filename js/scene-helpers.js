/* Shared helpers: procedural tree groups, furniture primitives */
(function () {
  'use strict';

  window.VillaScene = window.VillaScene || {};

  VillaScene.createTreePine = function (scale) {
    var g = document.createElement('a-entity');
    g.setAttribute('scale', { x: scale, y: scale, z: scale });
    var trunk = document.createElement('a-cylinder');
    trunk.setAttribute('position', { x: 0, y: 0.8, z: 0 });
    trunk.setAttribute('radius', 0.12);
    trunk.setAttribute('height', 1.6);
    trunk.setAttribute('color', '#3d2914');
    trunk.setAttribute('shadow', { cast: true, receive: true });
    var l1 = document.createElement('a-cone');
    l1.setAttribute('position', { x: 0, y: 2.2, z: 0 });
    l1.setAttribute('radius-bottom', 1.1);
    l1.setAttribute('radius-top', 0.05);
    l1.setAttribute('height', 1.8);
    l1.setAttribute('color', '#1b5e20');
    l1.setAttribute('shadow', { cast: true, receive: false });
    var l2 = document.createElement('a-cone');
    l2.setAttribute('position', { x: 0, y: 3.1, z: 0 });
    l2.setAttribute('radius-bottom', 0.85);
    l2.setAttribute('radius-top', 0.03);
    l2.setAttribute('height', 1.4);
    l2.setAttribute('color', '#2e7d32');
    l2.setAttribute('shadow', { cast: true, receive: false });
    g.appendChild(trunk);
    g.appendChild(l1);
    g.appendChild(l2);
    return g;
  };

  VillaScene.createTreeRound = function (scale) {
    var g = document.createElement('a-entity');
    g.setAttribute('scale', { x: scale, y: scale, z: scale });
    var trunk = document.createElement('a-cylinder');
    trunk.setAttribute('position', { x: 0, y: 0.7, z: 0 });
    trunk.setAttribute('radius', 0.15);
    trunk.setAttribute('height', 1.4);
    trunk.setAttribute('color', '#4e342e');
    trunk.setAttribute('shadow', { cast: true, receive: true });
    var crown = document.createElement('a-sphere');
    crown.setAttribute('position', { x: 0, y: 2.4, z: 0 });
    crown.setAttribute('radius', 1.25);
    crown.setAttribute('color', '#388e3c');
    crown.setAttribute('shadow', { cast: true, receive: false });
    g.appendChild(trunk);
    g.appendChild(crown);
    return g;
  };

  VillaScene.createTreePalm = function (scale) {
    var g = document.createElement('a-entity');
    g.setAttribute('scale', { x: scale, y: scale, z: scale });
    var trunk = document.createElement('a-cylinder');
    trunk.setAttribute('position', { x: 0, y: 1.5, z: 0 });
    trunk.setAttribute('radius', 0.14);
    trunk.setAttribute('height', 3);
    trunk.setAttribute('color', '#5d4037');
    trunk.setAttribute('shadow', { cast: true, receive: true });
    g.appendChild(trunk);
    for (var i = 0; i < 6; i++) {
      var ang = (i / 6) * Math.PI * 2;
      var leaf = document.createElement('a-box');
      leaf.setAttribute('position', {
        x: Math.cos(ang) * 0.3,
        y: 3.1,
        z: Math.sin(ang) * 0.3
      });
      leaf.setAttribute('rotation', { x: -55, y: (ang * 180) / Math.PI, z: 0 });
      leaf.setAttribute('width', 0.15);
      leaf.setAttribute('height', 1.4);
      leaf.setAttribute('depth', 0.05);
      leaf.setAttribute('color', '#1b5e20');
      leaf.setAttribute('shadow', { cast: true, receive: false });
      g.appendChild(leaf);
    }
    return g;
  };
})();
