// Given an array of words and a length L, format the text such that each line has exactly L characters and is fully (left and right) justified.
//
// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly L characters.
//
// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.
//
// For the last line of text, it should be left justified and no extra space is inserted between words.
//
// For example,
// words: ["This", "is", "an", "example", "of", "text", "justification."]
// L: 16.
//
// Return the formatted lines as:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    var lines = [];
    while (words.length > 0) {
        lines.push(getLines(words, maxWidth));
    }
    return lines
};

var getLines = function(words, maxWidth) {
  var i = 0, j = 0, line = "", lineWords = [];
  while (line.length < maxWidth && i < words.length) {
    i++;
    line = words.slice(0, i).join(" ")
  }
  if (maxWidth == 0) {
    return line = words.splice(0, 1).join(" ");
  }
  i = line.length > maxWidth ? i - 1: i;
  lineWords = words.splice(0, i)
  line = lineWords.join(" ");
  var space = maxWidth - line.length;
  if (words.length == 0) {
    for (var j = 0; j < space; j++) {
      lineWords[i-1] = lineWords[i-1].concat(" ")
    }
  } else {
    while (space > 0) {
      if (j == i || (i != 1 && j == i-1)) {
        j = 0
      }
      lineWords[j] = lineWords[j].concat(" ")
      j++, space--;
    }
  }
  line = lineWords.join(" ");
  return line
}
