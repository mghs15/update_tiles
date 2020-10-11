var child_process = require('child_process');
var fs = require('fs');

//Reference: Slippy map tilenames
//https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
tile2long = (x,z) => {
  return (x/Math.pow(2,z)*360-180);
}
tile2lat = (y,z) => {
  var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}
//until here

xyz2lonlat = (x, y, z) => {
  var lon = tile2long(x, z);
  var lat = tile2lat(y, z);
  return [lon, lat];
}


//タイル削除用
var checkTiles = (dir) => {
  var files = fs.readdirSync(dir, {});
  for(i in files){
    var f = files[i];
    if( f.match(/\.pbf$/) ){
      var fullf = dir + f;
      var m = fullf.match(/.*\/(\d+)\/(\d+)\/(\d+)\.pbf/);
      var nw = xyz2lonlat(+m[2], + m[3], +m[1]);
      var se = xyz2lonlat(+m[2]+1, + m[3]+1, +m[1]);

      if( nw[0] > maxlng || se[0] < minlng || nw[1] < minlat || se[1] > maxlat){
      
        
        fs.unlinkSync(fullf);
        
        /*
        fs.unlink(fullf, (err) => {
          if (err) throw err;
          //console.log(fullf + " was removed.");
        });
        */
      }
      
    }else{
      var nextdir = dir + f + "/";
      try {
        checkTiles(nextdir);
      }catch(err){
        //console.log(err);
        console.log("Error: ディレクトリ\"" + nextdir + "\"を開けませんでした。")
      }
    }
  }
}


// 引数

var num = process.argv[2];

target = "pbf/" + num + "/";

//テスト用範囲
//リストから範囲を取り出す場合
//var rangecontent = fs.readFileSync("./list/range.json").toString();
//var rangelist = JSON.parse(rangecontent);
//var range = cls.rangelist[name];

//もし、規則的に範囲を計算できる場合
var cls = require('./createList.js');
var name = num + "";
var range = cls.bboxRange(name);


if(range){
   var maxlng = Math.max(range[0], range[2]) - 0.00001;
   var minlng = Math.min(range[0], range[2]) + 0.00001;
   var maxlat = Math.max(range[1], range[3]) - 0.00001;
   var minlat = Math.min(range[1], range[3]) + 0.00001;
   
   checkTiles(target); 
   
   //個別に作成したpbfをxyzフォルダに集約するため、コピー。
   var command =  "cp -r " + target + "* xyz/"; //cp -r pbf/${num}/* xyz/
   child_process.execSync(`${command}`);
   
}else{
   console.log("Error: \"" + name + "\"は範囲情報がリストに存在しないため、切り出しとコピーをスキップします。");
   return;
}





