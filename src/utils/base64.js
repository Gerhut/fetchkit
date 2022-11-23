/** @type {?} */ var btoa;
/** @type {?} */ var Buffer;

/**
 * @param {string} data
 * @return {string}
 */
let _base64 = (data) => {
  if (typeof btoa === "function") {
    _base64 = btoa;
  } else if (typeof Buffer === "function") {
    _base64 = (data) => Buffer.from(data).toString("base64");
  } else {
    throw new Error("Unable to base64");
  }
  return _base64(data);
};

/**
 * @param {string} data
 * @return {string}
 */
export const base64 = (data) => _base64(data);
