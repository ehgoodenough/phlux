var Phlux = require("./phlux.js")

describe("phlux", function() {
    
    it("will instantiate an object for the data in the store", function() {
        var store = Phlux.createStore()
        expect(store.data).not.toBeUndefined()
    })
    
    it("will populate the data in the store from the protostore", function() {
        var protostore = {
            data: {
                message: "Hello World!"
            }
        }
        var store = Phlux.createStore(protostore)
        expect(store.data).toBe(protostore.data)
    })
    
    it("will expose a function to retrieve the data from the store", function() {
        var protostore = {
            data: {
                message: "Hello World!"
            }
        }
        var store = Phlux.createStore(protostore)
        expect(store.getData()).toBe(protostore.data)
    })
    
    it("will not override the function to retrieve the data from the store", function() {
        var protostore = {
            data: {
                message: "Hello World!"
            },
            getData: function() {
                return undefined
            }
        }
        var store = Phlux.createStore(protostore)
        expect(store.getData()).toBe(protostore.data)
    })
    
    it("will execute a function to initiate the store", function() {
        var protostore = {
            initiateStore: createSpy()
        }
        var store = Phlux.createStore(protostore)
        expect(protostore.initiateStore).toHaveBeenCalled()
    })
    
    it("will not attempt to execute a nonfunction to initiate the store", function() {
        var protostore = {
            initiateStore: "not a function"
        }
        expect(function() {
            var store = Phlux.createStore(protostore)
        }).not.toThrow()
    })
    
    it("will copy any attributes from the protostore into store", function() {
        var protostore = {
            something: "is something",
            getSomething: function() {
                return this.something
            }
        }
        var store = Phlux.createStore(protostore)
        expect(store.something).toBe(protostore.something)
        expect(store.getSomething).toBe(protostore.getSomething)
    })
    
    it("will execute functions that are listening to the store", function() {
        var store = Phlux.createStore()
        var listener = store.addListener(jasmine.createSpy())
        store.trigger()
        expect(listener).toHaveBeenCalled()
    })
    
    it("will pass data to functions that are listening to the store", function() {
        var protostore = {
            data: {
                message: "Hello World!"
            }
        }
        var store = Phlux.createStore(protostore)
        var listener = store.addListener(jasmine.createSpy())
        store.trigger()
        expect(listener).toHaveBeenCalledWith(protostore.data)
    })
})
