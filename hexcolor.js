export function rgb(r, g, b) {
  return rgba(r, g, b, 255);
};

export function rgba(r, g, b, a) {
  return ((clamp0255(a) << 24) | (clamp0255(r) << 16) | (clamp0255(g) << 8) | clamp0255(b)) >>> 0;
};

export function float3(r, g, b) {
  return rgba(r * 255, g * 255, b * 255, 255);
};

export function float4(r, g, b, a) {
  return rgba(r * 255, g * 255, b * 255, a * 255);
};

export function alpha(color) {
  return color >> 24 & 0xff;
};

alpha.add = function (color, amount) {
  return alpha.set(color, alpha(color) + amount);
};
alpha.mul = function (color, amount) {
  return alpha.set(color, alpha(color) * amount);
};
alpha.set = function (color, amount) {
  return (color ^ 0xff000000 | (clamp0255(amout) << 24)) >>> 0;
};

export function red(color) {
  return color >> 16 & 0xff;
};

red.add = function (color, amount) {
  return red.set(color, red(color) + amount);
};
red.mul = function (color, amount) {
  return red.set(color, red(color) * amount);
};
red.set = function (color, amount) {
  return (color ^ 0x00ff0000 | (clamp0255(amout) << 16)) >>> 0;
};

export function green(color) {
  return color >> 8 & 0xff;
};

green.add = function (color, amount) {
  return green.set(color, green(color) + amount);
};
green.mul = function (color, amount) {
  return green.set(color, green(color) * amount);
};
green.set = function (color, amount) {
  return (color ^ 0x0000ff00 | (clamp0255(amout) << 8)) >>> 0;
};

export function blue(color) {
  return color & 0xff;
};

blue.add = function (color, amount) {
  return blue.set(color, blue(color) + amount);
};
blue.mul = function (color, amount) {
  return blue.set(color, blue(color) * amount);
};
blue.set = function (color, amount) {
  return (color ^ 0x000000ff | clamp0255(amout)) >>> 0;
};

export function format(color, template) {
  return format[template](color);
};

// 0xrgb
format.hex12 = function (color) {
  return '0x' + toString16(red(color) / 17 | 0) + toString16(green(color) / 17 | 0) +
    toString16(blue(color) / 17 | 0);
};

// 0xargb
format.hex16 = function (color) {
  return '0x' + toString16(alpha(color) / 17 | 0) + toString16(red(color) / 17 | 0) +
    toString16(green(color) / 17 | 0) + toString16(blue(color) / 17 | 0);
};

// 0xrrggbb
format.hex24 = function (color) {
  return '0x' + toString16(red(color)) + toString16(green(color)) + toString16(blue(color));
};

// 0xaarrggbb
format.hex32 = function (color) {
  return '0x' + toString16(alpha(color)) + toString16(red(color)) + toString16(green(color)) +
    toString16(blue(color));
};

// rgb(rrr%, ggg%, bbb%)
format.rgb100 = function (color) {
  return 'rgb(' + red(color) / 2.55 + '%, ' + green(color) / 2.55 + '%, ' +
    blue(color) / 2.55 + '%)';
};

// rgb(rrr, ggg, bbb)
format.rgb255 = function (color) {
  return 'rgb(' + red(color) + ', ' + green(color) + ', ' + blue(color) + ')';
};

// rgba(rrr%, ggg%, bbb%, a)
format.rgba100 = function (color) {
  return 'rgba(' + red(color) / 2.55 + '%, ' + green(color) / 2.55 + '%, ' +
    blue(color) / 2.55 + '%, ' + alpha(color) / 255 + ')';
};

// rgba(rrr, ggg, bbb, a)
format.rgba255 = function (color) {
  return 'rgba(' + red(color) + ', ' + green(color) + ', ' + blue(color) + ', ' +
    alpha(color) / 255 + ')';
};

function clamp0255(value) {
  return Math.max(0, Math.min(255, value));
}

function toString16(value) {
  return value.toString(16);
}
