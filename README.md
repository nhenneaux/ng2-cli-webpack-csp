# [Make Angular2 works with restrictive Content Security Policy (CSP)](http://stackoverflow.com/questions/38734708/make-angular2-works-with-restrictive-content-security-policy-csp)
I cannot make base Angular2 (final) application works with a restrictive CSP. There are one *unsafe-eval* error in [lang.js][1] and two in [zone.js][2]. Could you provide a solution ?

Step to reproduce with Angular CLI
===
I have created a [GitHub repository][3]. You can also follow the instructions below.

Use the last Angular CLI with webpack 1.0.0-beta.15 and the new application created with the instructions below.

    ng new csp-test

Insert in the index.html the meta tag defining the following restrictive content security policy.

    default-src 'none';script-src 'self';style-src 'self';font-src 'self';img-src 'self' data:;connect-src 'self'

The following commands can be used.

    cd csp-test/src
    sed -i $'s/<base href="\/">/<base href="\/"><meta http-equiv="Content-Security-Policy" content="default-src \'none\';script-src \'self\';style-src \'self\';font-src \'self\';img-src \'self\' data:;connect-src \'self\'">/' index.html

Then serve the application.

    cd ..
    ng serve

Access http://localhost:4200/, the page does not load since scripts are blocked by CSP.

Errors
======
[![Error in Chrome][4]][4]

lang.js
-------

    lang.js:335 Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".
with the source code.

    335: return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);

zone.js
-------

    zone.js:344 Unhandled Promise rejection: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".
     ; Zone: <root> ; Task: Promise.then ; Value: EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".

    zone.js:346 Error: Uncaught (in promise): EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".(…)

with the source code.

    343: if (rejection) {
    344:     console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
    345: }
    346: console.error(e);


  [1]: https://www.npmjs.com/package/lang-js
  [2]: https://github.com/angular/zone.js/
  [3]: https://github.com/nhenneaux/ng2-cli-webpack-csp
  [4]: http://i.stack.imgur.com/eyTzo.png

# Ng2CliWebpackCsp

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
