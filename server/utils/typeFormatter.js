export const typeFormatter = (type) => {
  let namesArr = [];
  type.split("+").forEach((n) => {
    namesArr.push(n)
  })
  namesArr[0].charAt(0).toUpperCase();
  namesArr[0] = namesArr[0].charAt(0).toUpperCase() + namesArr[0].slice(1)
  return namesArr.join(" ")
}
