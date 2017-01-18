# generator-react-modules [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Yeoman generator for react modules architecture

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-modules using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)). This generator augments an existing project and should be installed as a dev dependency.

```bash
npm install -g yo
cd ~/your/react/project
npm install --save-dev generator-react-modules
```

## Usage

##### Module Generation

```bash
yo react-modules
yo react-modules:module
```

- Your selections will be stored. This is useful if you are creating components right after creating the module. You can simply override it when moving on to the next module.

##### Component Generation

```bash
yo react-modules:component
```

- Generates both a presentation and container component.
- It is not required that you first create a module to create a component. The necessary folders will be created.
- It is idiomatic to capitalize the first letter of your component. Thus, the generator takes care of that for you. If you don't want that, you'll have to rename the file yourself.
- When creating a component, you'll be prompted about a conflict. This is simply the generator trying to append your new component to the `index.js` export list. `Y` should be the default and the option you want to have the append take place. There's no way to suppress this as far as I have found.

##### Presentation Component Generation

```bash
yo react-modules:presentation-component
```

- Generates just a presentation component and appends to the `index.js` list of components.


##### Container Component Generation

```bash
yo react-modules:container-component
```

- Generates just a container component and appends to the `index.js` list of components.
- Don't include the `Container` suffix- this will be taken care of for you.
- A container component assumes a presentation component, but that presentation component doesn't have to exist already (and should be created seperately if desired).


## TODO

- Fix tests- breaking on parse errors.
- Add CI.
- Add architecture references and reading to readme.
- Add sample structure diagram to readme.


## License

MIT © [Rob Hilgefort](rob.hilgefort.me)


[npm-image]: https://badge.fury.io/js/generator-react-modules.svg
[npm-url]: https://npmjs.org/package/generator-reactmodules-
[travis-image]: https://travis-ci.org/rjhilgefort/generator-react-modules.svg?branch=master
[travis-url]: https://travis-ci.org/rjhilgefort/generator-reactmodules-
[daviddm-image]: https://david-dm.org/rjhilgefort/generator-react-modules.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rjhilgefort/generator-reactmodules-
[coveralls-image]: https://coveralls.io/repos/rjhilgefort/generator-react-modules/badge.svg
[coveralls-url]: https://coveralls.io/r/rjhilgefort/generator-reactmodules-
