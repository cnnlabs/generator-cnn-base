# CNN Base Package Generator

## Requirements

A current LTS or Stable version of [Node.js](https://nodejs.org).  We recommend
using [nvm](https://github.com/creationix/nvm#readme) to manage node versions.

A utility for installing [Yeoman](http://yeoman.io/) packages.  `yo` should work
but it is recommended you use the `cnn` CLI available from
[CNN Package Generator](https://github.com/cnnlabs/cnn-package-generator#readme).


## Install

No install is necessary if you are using this generator with the `cnn` cli.

`yo` can be used to install.  Refer to the `yo`
[documentation](https://github.com/yeoman/yo#readme) for details.

Can be installed manually.

```shell
$ npm install --global generator-cnn-base
```


## Usage

With `cnn` (**recommended**):
- See the [README](https://github.com/cnnlabs/cnn-package-generator#readme) in
  the CNN Package Generator repo for usage details on the `cnn` CLI.

With `yo`:
- `$ yo cnn-base`


## Options

- `--extend`:
Extend cnn-base by another generator.  This option is used internally by
`cnn` and can be passed in as an argument to `yo`.

Example:
```shell
$ yo cnn-base --extend cnn-generator
Extending cnn-base with cnn-generator
```


![node](https://img.shields.io/node/v/generator-cnn-base.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/generator-cnn-base.svg?style=flat-square)](https://www.npmjs.com/package/generator-cnn-base)
[![npm-downloads](https://img.shields.io/npm/dm/generator-cnn-base.svg?style=flat-square)](https://www.npmjs.com/package/generator-cnn-base)
[![dependency-status](https://gemnasium.com/cnnlabs/generator-cnn-base.svg)](https://gemnasium.com/cnnlabs/generator-cnn-base)
