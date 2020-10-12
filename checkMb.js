const child_process = require('child_process');
var fs = require('fs');

var num = process.argv[2];
var time = process.argv[3]; //日本時間を想定

var yr = "20" + time.substr(0,2);
var mt = time.substr(2,2);
var dy = time.substr(4,2);

var h = time.substr(7,2);
var m = time.substr(9,2);
var s = time.substr(11,2);

var threshold_time_raw = new Date(yr, mt, dy, h, m, s)
//以下は、システムに応じて調整
threshold_time = threshold_time_raw.getTime() - (60 * 60 * 9 * 1000); 

file = "./mb/" + num + ".mbtiles";

var stat =  fs.statSync(file, {});

var target_time = stat.birthtimeMs

if(target_time > threshold_time){
  console.log("Error: " + num + ".mbtilesの更新を確認できなかったため、STEP2の処理を中止しました。");
  console.log("基準時間:" + threshold_time_raw);
  console.log("ファイル生成時間:" + stat.birthtime);
//  console.log(yr, mt, dy, h, m, s, threshold_time_raw);
//  console.log(stat);
  child_process.execSync(`continue`);
}else{
  console.log("" + num + ".mbtilesの更新を確認。");
  console.log("基準時間:" + threshold_time_raw);
  console.log("ファイル生成時間:" + stat.birthtime);
}
