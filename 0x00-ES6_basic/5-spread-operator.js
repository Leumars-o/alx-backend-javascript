export default function concatArrays(array1, array2, string) {
  const combinedArrays = [...array1, ...array2, ...string];
  return combinedArrays;
}
