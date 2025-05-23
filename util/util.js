// export function hslToHex(h, s, l) {
//     l /= 100;
//     const a = s * Math.min(l, 1 - l) / 100;
//     const f = n => {
//       const k = (n + h / 30) % 12;
//       const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//       return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
//     };
//     return `#${f(0)}${f(8)}${f(4)}`;
// }

export function hslToHex(hue, sat, light) {
  // Function to turn HSL values into hex, which is needed becuase the web server provides the 
  // colour for the banner of each club as a hue value. The JSX(?) here doesn't recognize HSL
  // for some reason....
  light /= 100;
  const a = sat * Math.min(light, 1 - light) / 100;
  const f = n => {
    const k = (n + hue / 30) % 12;
    const color = light - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {h:h, s:s, l:l};
}

export function hexToRgba(hex) {
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return {r:(c>>16)&255, g:(c>>8)&255, b:c&255, a:1};
  }
  throw new Error('Bad Hex');
}

export function lerp(a, b, t) {
  return a + (b-a) * t;
}

export function invLerp(a, b, t) {
  return (t - a) / (b - a) 
}

export function clamp(min, max, v) {
  if (v > max) {
    return max;
  }
  if (v < min) {
    return min;
  }

  return v;
}