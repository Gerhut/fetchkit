export function base64(data: string) {
  if (typeof btoa === "function") {
    return btoa(data);
  } else if (typeof Buffer === "function") {
    return Buffer.from(data).toString("base64");
  } else {
    throw new Error("Unable to base64 data");
  }
}
