#!/bin/bash 


#【引数として入力】
#list=$@

#【ディレクトリ内のファイル一式を取得】
#list=`ls data | sed -e "s/\.geojson//g"`

#【リストの記載したファイルを読み込む】
list=`cat ./list/new.txt`

echo ${list}

#ループ前にフォルダをきれいにする
rm -r pbf/*
rm -r xyz/*

mkdir pbf
mkdir xyz

mkdir mb_back
today=`date +"%y%m%d-%H%M%S"`
mkdir mb_back/${today}

echo "--------------------------------------------------------------------"
echo "start process "${today}
echo "--------------------------------------------------------------------"

#【STEP 1】データに対応するmbtilesをアップデートしていく。
for num in ${list}
do
  echo "----------------------------------------------"
  echo "STEP 1 - "${num}" start  [" `date +"%y-%m-%d %H:%M:%S"` "]"
  
  #バックアップ作成
  cp mb/${num}.mbtiles mb_back/${today}/
  
  #mbtiles作成
  bash updateMbtiles.sh ${num}
  
  echo "STEP 1 - "${num}" finish [" `date +"%y-%m-%d %H:%M:%S"` "]"
done

#【STEP 2】mbtiles全体が最新となったところで、タイルとして切り出す。
for num in ${list}
do
  echo "----------------------------------------------"
  echo "STEP 2 - "${num}" start  [" `date +"%y-%m-%d %H:%M:%S"` "]"
  
  #mbtilesが更新されたか確認する。更新されていなければ、continueが実行される。
  node checkMb.js ${num} ${today}
  
  #pbfタイルの生成
  node updatePbf.js ${num}
  node pickupPbf.js ${num}
  
  echo "STEP 2 - "${num}" finish [" `date +"%y-%m-%d %H:%M:%S"` "]"
done

echo "--------------------------------------------------------------------"
echo "finish process "${today}
echo "--------------------------------------------------------------------"

