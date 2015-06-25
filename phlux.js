var Phlux = {
    createStore: function(protostore) {
        // Initiate the store
        // with functionality.
        var store = {
            data: {},
            listeners: [],
            getData: function() {
                return this.data
            },
            addListener: function(listener) {
                this.listeners.push(listener)
                return listener
            },
            trigger: function() {
                for(var index in this.listeners) {
                    this.listeners[index](this.data)
                }
            },
        }
        for(var key in protostore) {
            // Filter any values of the
            // protostore that attempts
            // to overwrite functionality.
            if(store[key] != undefined) {
                if(key != "data") {
                    continue
                }
            }
            // Copy over all values from
            // the protostore to the store.
            store[key] = protostore[key]
        }
        // Initiate the store.
        if(store.initiateStore !== undefined
        && typeof store.initiateStore === "function") {
            store.initiateStore()
        }
        return store
    },
    connectStore: function(Store, label) {
        return {
            componentWillMount: function() {
                Store.addListener(function(data) {
                    var state = {}
                    if(label !== null) {
                        state[label] = data
                    } else {
                        state = data
                    }
                    this.setState(state)
                }.bind(this))
            },
            getInitialState: function() {
                var state = {}
                if(label !== null) {
                    state[label] = Store.data
                } else {
                    state = Store.data
                }
                return state
            }
        }
    }
}

module.exports = Phlux
