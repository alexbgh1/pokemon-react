export default function createArray(num) {
  // Creamos un array con el número de páginas
  const array = [];
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  return array;
}
