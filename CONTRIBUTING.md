# Google Apps Script に Push するときの注意点

.env ファイルは Push できないので、オブジェクトに変換する。

`export` が使えないので index.ts で `export` できない。その状態で普通にビルドすると Tree Shaking でコードが全て除去される。よって、Tree Shaking が働かないようにする。

※ clasp のビルドで node_modules を展開してくれるかは未確認。
