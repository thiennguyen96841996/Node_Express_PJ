# Node.jsコンテナを起動
```shell
docker-compose up -d
```

# 依存パッケージをインストール
```shell
root@2e490c20618c:/app# npm install
```

# nodemonをインストール
```shell
root@2e490c20618c:/app# npm install -D nodemon
```

# TypeScriptと型定義をインストール
```shell
root@2e490c20618c:/app# npm install -D typescript @types/express @types/cookie-parser @types/morgan @types/http-errors
```

# tsconfig作成
```shell
root@2e490c20618c:/app# npx tsc --init
```