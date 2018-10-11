const X0 = 155000;
const Y0 = 463000;
const PHI0 = 52.15517440;
const LAM0 = 5.38720621;

const wgstord = (phi, lam) => {
  const pqr = [[0, 1, 190094.945],
    [1, 1, -11832.228],
    [2, 1, -114.221],
    [0, 3, -32.391],
    [1, 0, -0.705],
    [3, 1, -2.34],
    [1, 3, -0.608],
    [0, 2, -0.008],
    [2, 3, 0.148]];

  const pqs = [[1, 0, 309056.544],
    [0, 2, 3638.893],
    [2, 0, 73.077],
    [1, 2, -157.984],
    [3, 0, 59.788],
    [0, 1, 0.433],
    [2, 2, -6.439],
    [1, 1, -0.032],
    [0, 4, 0.092],
    [1, 4, -0.054]];

  const dphi = 0.36 * (phi - PHI0);
  const dlam = 0.36 * (lam - LAM0);

  let X = X0;
  let Y = Y0;

  pqr.map((x) => {
    X += x[2] * Math.pow(dphi, x[0]) * Math.pow(dlam, x[1]);
  });

  pqs.map((y) => {
    Y += y[2] * Math.pow(dphi, y[0]) * Math.pow(dlam, y[1]);
  });

  const eX = X.toString().split('.')[0].substring(0, 5);
  const eY = Y.toString().split('.')[0].substring(0, 5);
  return [eX, eY];
};

module.exports = wgstord;
