export const districtNameFormatter = (districtName) => {
  let namesArr = [];
  districtName.split("+").forEach(function (n) {
    let name = n.substring(0, 1).toUpperCase() + n.substring(1, n.length)
    namesArr.push(name)
  })
  return namesArr.join(" ")
}