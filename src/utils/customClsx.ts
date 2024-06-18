export function customClsx<T>(...args: T[]) {
  let temp;
  let x;
  let str = "";

  for (let i = 0; i < args.length; i++) {
    temp = args[i];
    if (!temp) continue;

    x = toVal<typeof temp>(temp);
    if (!x) continue;
    str && (str += " ");
    str += x;
  }

  return str;
}

function toVal<T>(mix: T) {
  let k;
  let y;
  let str = "";

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
    return str;
  }

  if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      const len = mix.length;
      for (k = 0; k < len; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (const y in mix) {
        if (mix[y]) {
          str && (str += " ");
          str += y;
        }
      }
    }
  }

  return str;
}

export default customClsx;
