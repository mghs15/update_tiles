# update_tiles
細切れデータから地図タイルセットを更新する方法

```
mkdir list
touch ./list/new.txt
# and write names/ids/numbers lists of your data
# in the new.txt (line break delimiter).
touch ./list/range.json
# also, put range lists (JSON) of your data. 

mkdir data
# and put your data on "./data/" directory.
# The data listed in "./list/new.txt" are used. 

bash FLOW.sh
```

