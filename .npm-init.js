/* global basename, config, dirname, package, prompt, yes */

var pack = package; // eslint-disable-line

/*
 * This was taken directly from the link below and modified to fit our needs.
 *
 *     https://raw.githubusercontent.com/npm/init-package-json/master/default-input.js
 *
 * This is meant to work with `npm init`, not replace it, which is why
 * init-package-json was not forked for these changes.  See the README in
 * https://github.com/npm/init-package-json for more details.  For clarity, this
 * file is the `initFile` that gets passed in to init-package-json when
 * `npm init` is called.  This will override the default `.npm-init` that is
 * typically used.
 *
 * The globals above, including `package` are available from init-package-json
 * which pulls in this file as part of `npm init`.  `package` is a future
 * reserved word in es6 and can't be used when 'use strict' is applied.  We want
 * this to be as es6 as possible, so the IIFE below is required and the
 * `var pack` above is required to be outside of it.  ESLint on the
 * command line will still blow up with an error, even with eslint-disable-line
 * applied.  ESLint in my IDE seems to not care though. WTF. Anyway, it works.
 *
 * Without the IIFE, you will get this error:
 *
 *     SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
 *
 * With `var pack = package;` inside the IIFE, you will get this error:
 *
 *     SyntaxError: Unexpected strict mode reserved word
 *
 * With the file as it is, also explained above, you will get this error on the
 * command line when running ESLint, and you may or may not get this error in an
 * IDE.
 *
 *     3:20  error  Parsing error: Use of future reserved word in strict mode
 *
 * Also, trying to reference package as global.package results in undefined.
 */
(function () {
    'use strict';

    const fs = require('fs'),
        // npa = require('npm-package-arg'),
        // validateName = require('validate-npm-package-name'),
        description = pack.description || '',
        keywords = pack.keywords.join(' ') || 'cnn cnnlabs',
        scope = config.get('scope');

    let name = pack.name || basename;
        // spec = npa(name);

    // if (scope) {
    //     if (scope.charAt(0) !== '@') {
    //         scope = `@${scope}`;
    //     }
    //
    //     if (spec.scope) {
    //         name = `${scope}/${spec.name.split('/')[1]}`;
    //     } else {
    //         name = `${scope}/${name}`;
    //     }
    // }

    // exports.name = yes ? name : prompt('Package name (should match the repository name)', name, function (data) {
    //     const its = validateName(data),
    //         errors = (its.errors || []).concat(its.warnings || []),
    //         er = new Error(`Sorry, ${errors.join(' and ')}.`);
    //
    //     if (its.validForNewPackages) {
    //         return data;
    //     }
    //
    //     er.notValid = true;
    //
    //     return er;
    // });

    exports.name = yes ? name : prompt('Package name (should match repository name)', name);

    exports.description = yes ? description : prompt('Package description', description);

    exports.directories = function (cb) {
        fs.readdir(dirname, function (er, dirs) {
            if (er) {
                return cb(er);
            }

            let res = {};

            dirs.forEach(function (d) {
                switch (d) {
                    case 'doc':
                    case 'docs':
                        return res.doc = `./${d}`;

                    case 'example':
                    case 'examples':
                        return res.example = `./${d}`;

                    case 'lib':
                        return res.lib = `./${d}`;

                    case 'man':
                        return res.man = `./${d}`;

                    case 'test':
                    case 'tests':
                        return res.test = `./${d}`;
                }
            });

            if (Object.keys(res).length === 0) {
                res = undefined;
            }

            return cb(null, res);
        });
    };

    exports.repository = function (cb) {
        fs.readFile('.git/config', 'utf8', function (er, gconf) {
            if (er || !gconf) {
                return cb(null, yes ? '' : prompt('Git repository url'));
            }

            gconf = gconf.split(/\r?\n/);

            const i = gconf.indexOf('[remote "origin"]');

            let u;

            if (i !== -1) {
                u = gconf[i + 1];
                if (!u.match(/^\s*url =/)) {
                    u = gconf[i + 2];
                }

                if (!u.match(/^\s*url =/)) {
                    u = null;
                } else {
                    u = u.replace(/^\s*url = /, '');
                }
            }

            if (u && u.match(/^git@github.com:/)) {
                u = u.replace(/^git@github.com:/, 'https://github.com/');
            }

            return cb(null, yes ? u : prompt('Git repository url', u));
        });
    };

    exports.keywords = yes ? keywords : prompt('Keywords', keywords, function (s) {
        if (!s) {
            return undefined;
        }

        if (Array.isArray(s)) {
            s = s.join(' ');
        }

        if (typeof s !== 'string') {
            return s;
        }

        return s.split(/[\s,]+/);
    });
}());
