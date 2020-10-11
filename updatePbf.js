const child_process = require('child_process');
var fs = require('fs');
var cls = require('./createList.js');
 
// 引数
var num = process.argv[2];

//テスト用
var list = cls.createList(num);

var option = [
  '--force', 
  '--no-tile-size-limit', 
  '--no-tile-compression',
  '-e', 'pbf/' + num
];

list.forEach( n => {
  var f = "mb/" + n + ".mbtiles";
  //ファイルが存在するか確認
  if (fs.existsSync(f)){
    //サイズが0でないか確認
    var stat =  fs.statSync(f, {});
    if(stat.size > 0){
      option.push(f);
    }else{
      console.log("Warning: \"" + f + "\"のmbtilesは存在しますが、サイズが0なので利用しません。");
    }
  }else{
    console.log("Warning: \"" + f + "\"が存在しません。");
  }
});

var command = "tile-join";
option.forEach( op => {
  command = command + " " + op;
});

console.log(command);

child_process.execSync(`${command}`);

