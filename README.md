# CNN Base Package Generator

## Requirements

A current LTS or Stable version of [Node.js](https://nodejs.org).  We recommend
using [nvm](https://github.com/creationix/nvm#readme) to manage node versions.

A utility for installing [Yeoman](http://yeoman.io/) packages.  `yo` should work
but it is recommended you use the `cnn` CLI available from
[CNN Package Generator](https://github.com/cnnlabs/cnn-package-generator#readme).


## Install

`cnn-package-generator` installs the `cnn` cli tool used to run the Yeoman
generator.

```shell
$ npm install --global cnn-package-generator
$ npm install --global generator-cnn-base
```


## Usage

With `cnn` (**recommended**):
- `$ cnn cnn-base`

- See the [README](https://github.com/cnnlabs/cnn-package-generator#readme) in
  the CNN Package Generator repo for more details.

With `yo` (** NOT** recommended):
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


## What does this do?

- Generates a default file structure for the chosen generator.

- Generates configuration files with predefined settings based on our
  current standards.  This includes settings for the following packages.

  - [Editorconfig](http://editorconfig.org/)
  - [ESDoc](https://esdoc.org/)
  - [ESLint](http://eslint.org/)
  - [npm](https://www.npmjs.com/)
  - [nvm](https://github.com/creationix/nvm)

- Generates our standardized process documents.

  - AUTHORS.md
  - CHANGELOG.md

- Creates a local GIT repository for the project.  Currently the remote
  repository on GitHub will need to be manually created.

- Generates a default package.json with all of the required properties and
  dependencies needed for the chosen generator.  Includes the following default
  scripts.

  - `generate-authors` - Uses a bash script to generate the AUTHORS.md file,
    which is used by npmjs.org when your package is published.

  - `generate-changelog` - Uses [changelog-maker](https://github.com/rvagg/changelog-maker)
    to generate the CHANGELOG.md.

  - `generate-coverage` - Uses [Istanbul](https://github.com/gotwarlost/istanbul)
    along with [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to
    create a code coverage report.  Also opens it up on OS X in a browser.

  - `generate-docs` - Uses [ESDoc](https://esdoc.org/) to generate documentation
    in `/docs`.

  - `test` - Uses [ESLint](http://eslint.org/) to validate all .js files and
    uses [jsonlint](https://github.com/zaach/jsonlint) to validates all .json
    files.

  - `update-apply` - Uses [ncu](https://github.com/tjunnone/npm-check-updates)
    and updates all dependencies.

  - `update-check` - Uses [ncu](https://github.com/tjunnone/npm-check-updates)
    and lists all updates, but does not apply them.

- Calls `npm-init` to further customize the package.json file.




![node](https://img.shields.io/node/v/generator-cnn-base.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/generator-cnn-base.svg?style=flat-square)](https://www.npmjs.com/package/generator-cnn-base)
[![npm-downloads](https://img.shields.io/npm/dm/generator-cnn-base.svg?style=flat-square)](https://www.npmjs.com/package/generator-cnn-base)
[![dependency-status](https://gemnasium.com/cnnlabs/generator-cnn-base.svg)](https://gemnasium.com/cnnlabs/generator-cnn-base)
