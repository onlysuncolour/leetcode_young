// Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.
//
// For example,
// Given heights = [2,1,5,6,2,3],
// return 10.

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  var largest = 0;
  for (var i = 0; i < heights.length; i++) {
    if (i != 0 && heights[i] == heights[i-1]) {
      continue
    }
    var count = 1;
    for (var j = i - 1; j >= 0; j--) {
      if (heights[i] <= heights[j]) {
        count ++
      } else {
        break
      }
    }
    for (var k = i + 1; k < heights.length; k++) {
      if (heights[i] <= heights[k]) {
        count ++
      } else {
        break;
      }
    }
    var area = count * heights[i];
    largest = largest > area ? largest : area;
  }
  return largest
};


/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea2 = function(heights) {
  var largest = 0;
  var counts = makeCounts(heights);
  for (var i = 0; i < heights.length; i++) {
    var count = counts[i];
    for (var j = i - 1; j >= 0; j--) {
      if (heights[i] <= heights[j]) {
        count += counts[j]
      } else {
        break
      }
    }
    for (var k = i + 1; k < heights.length; k++) {
      if (heights[i] <= heights[k]) {
        count += counts[k]
      } else {
        break;
      }
    }
    var area = count * heights[i];
    largest = largest > area ? largest : area;
  }
  return largest
};

var makeCounts = function(heights) {
  var counts = Array.from({length: heights.length}).fill(1);
  for (var i = heights.length - 1; i >= 1; i--) {
    if (heights[i] == heights[i-1]) {
      heights.splice(i, 1);
      counts[i-1] += counts[i]
      counts.splice(i, 1);
    }
  }
  return counts
}
