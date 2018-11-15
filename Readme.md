# @bsaqqa/requestsgenerator

[![GitHub license](https://img.shields.io/github/license/Baraa-AlSaqqa/requestsgenerator.svg?style=flat-square)](https://github.com/Baraa-AlSaqqa/requestsgenerator/blob/master/LICENSE)
[![npm (scoped)](https://img.shields.io/badge/npm-6.4.1-green.svg?style=flat-square)](https://www.npmjs.com/package/@bsaqqa/requestsgenerator)

Generate requests without need writing full request every time 

## Install

```
npm i @bsaqqa/requestsgenerator
```
or 

```
yarn add @bsaqqa/requestsgenerator
```

## Usage

```js
    import API  from '@bsaqqa/requestsgenerator';
    
    API.setUrl('http://example.com/api/');
    API.http.getProjects({page:1})
    .then(response=>response.json())
    .then(resp=>{
        console.log(resp);
    }).catch(err=>{
        throw new Error('Response is inncorrect.');
    });
```

more options 
```js
    // GET /
    API.http.get()
    // GET /users
    API.http.getUsers()
    // GET /users/1234/likes
    API.http.getUsers$Likes('1234')
    // GET /users/1234/likes?page=2
    API.http.getUsers$Likes('1234', {  page: 2  })
    // POST /items with body
    API.http.postItems({ name: 'Item name' })
    
    // other usage
    API.setUrl('http://example.com/api/', '?attr=abc' )
    // GET http://example.com/api/posts/123?attr=abc
    API.http.getPosts$('1234')
    // POST http://example.com/api/posts/123?attr=abc
    API.http.postPosts$('1234', {name: 'user name'})
```