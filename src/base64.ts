export const base64 =
  typeof btoa === "function"
    ? (data: string) => btoa(data)
    : typeof Buffer === "function"
    ? (data: string) => Buffer.from(data).toString("base64")
    : (() => {
        throw new Error("Unable to base64 data");
      })();
