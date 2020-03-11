var PortCollection = [];

class Port {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.PierCollection = [];
    }


    AddPort() {
        PortCollection.push(this);
    }
    static ShowAllPorts() {
        for (let i = 0; i < PortCollection.length; i++) {
            console.log(PortCollection[i]);
        }
    }
    ShowAllPiersInPort() {
        for (let i = 0; i < this.PierCollection.length; i++) {
            console.log(this.PierCollection[i]);
        }
    }
    DeletePort() {
        let index;
        for (var i = 0; i < PortCollection.length; i++) {
            if (this.name === PortCollection[i]) {
                index = i;
            }
        }
        PortCollection.splice(index, 1);
    }
    EditPort(name, capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    static SearchPort(portName) {
        for (let i = 0; i < this.Collection.length; i++) {
            if (this.Collection[i].name === portName) {
                console.log(this.Collection[i]);
            }
        }
    }

}

module.exports = { Port, PortCollection }