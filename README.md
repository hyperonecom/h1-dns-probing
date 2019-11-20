# h1-dns-probing

A library that allows you to guess popular DNS records without using e.g. zone transfer, access to DNS server configuration.

[![Build Status](https://travis-ci.com/hyperonecom/h1-dns-probing.svg?branch=master)](https://travis-ci.com/hyperonecom/h1-dns-probing)

## Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Examples](#examples)
* [Reporting problems and comments](#reporting-problems-and-comments)

## Requirements

* [node.js](http://nodejs.org/) - v10 or newer

## Installation

    npm install @hyperone/dns-probing

## Examples

```js
var {dnsProbing} = require('@hyperone/dns-probing');

const main = async () => {
  console.log(await dnsProbing('example.com'));
}
```

## Reporting problems and comments

If you encounter any errors with the tool, please report the ```Issues```tab in the [repository](https://github.com/hyperonecom/h1-dns-probing).
