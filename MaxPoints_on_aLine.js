// Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.
/**
 * Definition for a point.
 * function Point(x, y) {
 *     this.x = x;
 *     this.y = y;
 * }
 */
/**
 * @param {Point[]} points
 * @return {number}
 */
 var maxPoints = function(points) {
   if (points.length == 0) {
     return 0
   } else if (points.length == 1) {
     return 1;
   } else if (points.length == 2) {
     return 2
   }
   checkSame(points)
   var count = 0, pointLines = [];
   if (points.length == 1) {
     var line = {points: [0, ...Array.from({length: points[0].count})], rate: "o"};
     count = count > line.points.length? count : line.points.length;
     return count
   }
   for (var i = 0; i < points.length - 1; i++) {
     var line = {points: [i, ...Array.from({length: points[i].count})], rate: "o"};
     count = count > line.points.length? count : line.points.length;
     pointLines.push(line)
     for (var j = i+1; j < points.length; j++) {
       var rate = (points[i].x - points[j].x) / (points[i].y - points[j].y)
       if (points[i].y == points[j].y) {
         rate = "y"
       }
       var indexJ = points[j].rates.indexOf(rate)
       if (indexJ == -1) {
         points[j].rates.push(rate)
         var indexI = points[i].rates.indexOf(rate);
         if (indexI == -1) {
           var line = {points: [i, j, ...Array.from({length: points[i].count + points[j].count })], rate: rate};
           points[i].rates.push(rate)
           pointLines.push(line);
           count = count > line.points.length? count : line.points.length;
         } else {
           var line = getLineByPointAndRate(i, rate, pointLines);
           if (!!line) {
             line.points.push(j, ...Array.from({length: points[j].count}))
             count = count > line.points.length? count : line.points.length;
           }
         }
       } else {
         continue;
       }
     }
   }
   return count
}

var checkSame = function(points) {
  for (var i = 0; i < points.length - 1; i++) {
    if (!!points.same) {
      continue
    }
    points[i].count = 0, points[i].rates = []
    for (var j = i+1; j < points.length; j++) {
      if(points[i].x == points[j].x && points[i].y == points[j].y) {
        points[j].same = true;
        points[i].count = !!points[i].count ? ++points[i].count : 1
      }
    }
  }
  points[points.length - 1].count = 0;
  points[points.length - 1].rates = []
  for (var i = points.length-1; i >= 0; i--) {
    if(points[i].same) {
      points.splice(i, 1)
    }
  }
}

var getLineByPointAndRate = function (point, rate, lines) {
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].rate == rate && lines[i].points.indexOf(point) != -1) {
      return lines[i]
    }
  }
  return null;
}
