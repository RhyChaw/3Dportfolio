// homography.js — map a flat (w×h) element onto an arbitrary quad via CSS matrix3d.
// Ported verbatim from the original rhythmOS design so the rhythmOS <div> can be
// projected onto the open MacBook screen in 3D space.

function adj3(m) {
  return [
    m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
  ];
}

function mul3(a, b) {
  const r = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
    r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
  return r;
}

function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const a = adj3(m);
  const v = [a[0] * x4 + a[1] * y4 + a[2], a[3] * x4 + a[4] * y4 + a[5], a[6] * x4 + a[7] * y4 + a[8]];
  return mul3(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

// q: [TL, TR, BL, BR] destination corners in px. Returns a CSS matrix3d(...) string.
export function quadTransform(w, h, q) {
  const s = basisToPoints(0, 0, w, 0, 0, h, w, h);
  const d = basisToPoints(q[0].x, q[0].y, q[1].x, q[1].y, q[2].x, q[2].y, q[3].x, q[3].y);
  const m = mul3(d, adj3(s));
  for (let i = 0; i < 9; i++) m[i] /= m[8];
  return `matrix3d(${m[0]},${m[3]},0,${m[6]},${m[1]},${m[4]},0,${m[7]},0,0,1,0,${m[2]},${m[5]},0,${m[8]})`;
}
