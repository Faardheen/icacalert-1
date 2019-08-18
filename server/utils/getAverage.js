const subtractTime = (h1, m1, h2, m2) => {
  let newHour = 0
  let newMin = 0
  let totalMinutes
  if (m1 < m2) {
    newHour = (h1 - 1) - (h2)
    newMin = (m1 + 60) - m2
    totalMinutes = (newHour * 60) + newMin
  } else {
    newHour = h1 - h2
    newMin = m1 - m2
    totalMinutes = (newHour * 60) + newMin
  }
  return totalMinutes
}

export const getAverage = arr => {
  let timeSpan = [];
  if (arr.length > 2) {
    for (var i = 0; i <= arr.length - 2; i++) {
      let h1 = parseInt(arr[i + 1].h)
      let m1 = parseInt(arr[i + 1].m)
      let h2 = parseInt(arr[i].h)
      let m2 = parseInt(arr[i].m)
      timeSpan.push(subtractTime(h1, m1, h2, m2))
    }
    const sum = timeSpan.reduce((total, currentValue) => total + currentValue);
    const mean = sum / timeSpan.length
    return mean
  }
  return null
}