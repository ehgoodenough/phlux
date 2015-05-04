var Phlux = {
    createStore: function(protostore) {
        //Initiate the store
        //with some attributes
        //for handling the data.
        var store = {
            data: new Object(),
            getData: function() {
                return this.data
            },
            trigger: function() {
                for(var index in this.listeners) {
                    this.listeners[index](this.data)
                }
                return this
            },
            addListener: function(listener) {
                this.listeners.push(listener)
                return this
            },
            listeners: []
        }
        for(var key in protostore) {
            //Filter any values of
            //the protostore that
            //attempts to overwrite
            //the getter function.
            if(key === "getData") {
                continue
            }
            //Copy over all values from
            //the protostore to the store.
            store[key] = protostore[key]
            //Grab any functions from the
            //store to add as listeners.
            if(typeof protostore[key] === "function") {
                //If you wanted to add an additional
                //trigger at the end of each and every
                //method, here is where you do it.
            }
        }
        //Initiate the store.
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
                    var state = new Object()
                    state[label] = data
                    this.setState(state)
                }.bind(this))
            },
            getInitialState: function() {
                var state = new Object()
                state[label] = Store.getData()
                return state
            }
        }
    }
}

module.exports = Phlux
