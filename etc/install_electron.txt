## 初めての Electron

# Node.js(npm) Install

始めに, Node.js(npm) のインストールを行う.
apt-get update が必要らしく, 404 error が発生した.

```
% apt-get update
% apt upgrade
% sudo apt-get install nodejs npm
```

インストールがきちんとできたかを確認する.

```
% npm -v     => 3.5.2
% node -v    => v8.10.0
```

# Electron Install

-g オプションをつけるとグローバルインストールになるらしい.
node_modules という名前のフォルダが生成される.
scripts のテスト もしくは main.js の不在により,
WARN が出る場合もある. と思われる.

```
% npm install --save-dev electron
```

# Run Electron

以下で Electron のウィンドウが開く.

```
% npm electron .
```