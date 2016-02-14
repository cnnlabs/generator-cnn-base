# <%= PROJECT_NAME %>

This is a CNN CLI based project.  Replace this README with your own.

## Useful things to know:

- CLI code goes in `lib/<%= CLI_NAME %>-cli.js`.  You get -h, --help, -v, and
  --version for free.

- Generate the `man/man1/<%= CLI_NAME %>.1` manpage with
  `npm run generate-manage`.  To edit the manpage, edit
  `src/man/man1/<%= CLI_NAME %>.1.md`.

- Generate the ESDoc documenation in `docs` with `npm run generate-docs`.

- Generate changes for `CHANGELOG.md` with `npm run generate-changelog`.

- Use `npm test` to run unit tests.

- Use `npm run update-check` to check if any dependencies need to be updated.

- Use `npm run update-apply` to apply updates to all dependencies in the
  `package.json`.

- You can test locally by running `node lib/<%= CLI_NAME %>` or running
  `npm link` once and just using `<%= CLI_NAME %>` directly on the command line.


## Example

This generates the mininum to create a CLI named `cnn-cli-test`.

```shell
$ la


$ cnn cli

... [INTERACTIVE OUTPUT OMITTED] ...

Completed generating cnn:cli


$ la
.editorconfig  .eslintrc   .npm-init.js  AUTHORS.md             CONTRIBUTING.md  lib/           package.json
.esdoc.json    .git/       .npmrc        CHANGELOG.md           GOVERNANCE.md    man/           src/
.eslintignore  .gitignore  .nvmrc        COLLABORATOR_GUIDE.md  README.md        node_modules/  test/


$ node lib/cnn-cli-test-cli.js -h
Usage: cnn-cli-test [OPTIONS]
  -h, --help       Show this information
  -v, --version    Show version information


$ node lib/cnn-cli-test-cli.js -v
cnn-cli-test v0.1.0
```