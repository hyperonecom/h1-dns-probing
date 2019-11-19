# h1-dns-probing

A library that allows you to guess popular DNS records without using e.g. zone transfer.

[![Build Status](https://travis-ci.org/hyperonecom/h1-dns-probing.svg?branch=master)](https://travis-ci.org/hyperonecom/h1-dns-probing)

# Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Client Examples](#client-examples)
  * [Execute `uptime` on a server](#execute-uptime-on-a-server)
  * [Start an interactive shell session](#start-an-interactive-shell-session)
  * [Send a raw HTTP request to port 80 on the server](#send-a-raw-http-request-to-port-80-on-the-server)
  * [Forward local connections to port 8000 on the server to us](#forward-local-connections-to-port-8000-on-the-server-to-us)
  * [Get a directory listing via SFTP](#get-a-directory-listing-via-sftp)
  * [Connection hopping](#connection-hopping)
  * [Forward remote X11 connections](#forward-remote-x11-connections)
  * [Dynamic (1:1) port forwarding using a SOCKSv5 proxy (using `socksv5`)](#dynamic-11-port-forwarding-using-a-socksv5-proxy-using-socksv5)
  * [Make HTTP(S) connections easily using a custom http(s).Agent](#make-https-connections-easily-using-a-custom-httpsagent)
  * [Invoke an arbitrary subsystem (e.g. netconf)](#invoke-an-arbitrary-subsystem)

## Requirements

* [node.js](http://nodejs.org/) -- v12.0.0 or newer
  * node v12.0.0 or newer for Ed25519 key support

## Installation

    npm install @hyperone/dns-probing

## Examples Examples

```js
var {dnsProbing} = require('@hyperone/dns-probing');

const main = async () => {
  console.log(await dnsProbing('example.com'));
}
```

## Reporting problems and comments

If you encounter any errors with the tool, please report the problem through the notification system in the administration panel or the [Issues] tab in the [repository].
