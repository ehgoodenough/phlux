# Phlux #

[![Build](https://travis-ci.org/ehgoodenough/phlux.svg)](https://travis-ci.org/ehgoodenough/phlux)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://phlux.mit-license.org)

Build simple stores for your reactive data.

This is a minimalistic approach to [Flux](http://facebook.github.io/flux) to be used with [React](https://facebook.github.io/react).

## Installation ##

```
npm install phlux
```

## Usage ##

### `Phlux.createStore(Object protostore)` ###

Returns a PhluxStore, which includes methods for storing and retrieving reactive data.

Accepts an object as the protostore, whose properties will be copied into the store. If
the protostore includes ``data``, it will be accepted as the inital data for the store.

```javascript
var Phlux = require("phlux")

Phlux.createStore()
// {
//     data: {},
//     trigger: function() {...},
//     addListener: function() {...},
//     listeners: [...]
// }

Phlux.createStore({
    data: {
        message: "Hello World!"
    }
})
// {
//     data: {
//         message: "Hello World!"
//     },
//     trigger: function() {...},
//     addListener: function() {...},
//     listeners: [...]
// }

Phlux.createStore({
    data: {
        message: "Hello World!"
    },
    sayMessage: function() {
        console.log(this.data.message)
    }
})
// {
//     data: {
//         message: "Hello World!"
//     },
//     sayMessage: function() {
//         console.log(this.data.message)
//     },
//     trigger: function() {...},
//     addListener: function() {...},
//     listeners: [...]
// }
```

### `Phlux.connectStore(PhluxStore store, String label)` ###

Returns a mixin which will bind the state of a ReactComponent to the state of
a PhluxStore. Whenever `store.trigger()` is called, the componet will be updated
such that `component.state.label` returns `store.data`.

```javascript
var React = require("react")
var Phlux = require("phlux")

var DudeStore = Phlux.createStore({
    data: {
        name: "Andrew"
    }
})

var Dude = React.createClass({
    mixins: [
        Phlux.connectStore(DudeStore, "dude")
    ],
    render: function() {
        return (
            <div>
                My name is {this.state.dude.name}
            </div>
        )
    }
})
```

### `PhluxStore.initiateStore()` ###

Called after the store has been constructed.

```javascript
Phlux.createStore({
    data: {
        value: 2
    },
    initiateStore: function() {
        this.data.value += 2
    }
})
// {
//     data: {
//         value: **4**
//     },
//     initiateStore: function() {
//         this.data.value += 2
//     },
//     trigger: function() {...},
//     addListener: function() {...},
//     listeners: [...]
// }
```

### `PhluxStore.data` ###

Stores all the data.

### `PhluxStore.trigger()` ###

Executes all the listeners. Every listener is called with a copy of `PhluxStore.data`.

### `PhluxStore.addListener(listener)` ###

Accepts a function as a listener, which will be called when `PhluxStore.trigger()` is called.
