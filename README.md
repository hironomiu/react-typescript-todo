# react-typescript-todo

[![action](https://github.com/hironomiu/react-typescript-todo/actions/workflows/action.yml/badge.svg?branch=main)](https://github.com/hironomiu/react-typescript-todo/actions?query=workflow%3Aaction)

## 動作環境

```
$ node -v
v16.2.0
$ npm -v
7.13.0
$ npx -v
7.13.0
$ yarn -v
1.22.10
```

## setup

`yarn`をインストールしていない場合は全て`npm`で代用すること

```
$ yarn install
```

## run

```
$ yarn start
```

## build

```
$ yarn build
```

## test

```
$ yarn test
```

## Firebase deploy

deploy hosting build file

```
$ npx firebase deploy --only hosting
```

deploy firestore .rules file

```
$ npx firebase deploy --only firestore:rules
```
