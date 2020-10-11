
exports.createList = (num) => {

  var list = [
    +num-1,
    +num-2,
    +num-3,
    +num-4,
    num,
    +num+1,
    +num+2,
    +num+3,
    +num+4,
  ];

  return list;

}


exports.bboxRange = (name) => {
  
  var rangelist = {
    "5": [ 
       140.987548828125,
       42.35042512243458,
       141.009521484375,
       42.334184385939395 
    ],
    "8": [
       140.987548828125,
       42.334184385939395,
       141.009521484375,
       42.317939454468494
    ],
    "12": [
       140.965705,
       42.317828,
       140.987377,
       42.301801
    ]
  };
  
  var range = rangelist[name];

  return range;

}

