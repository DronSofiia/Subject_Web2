var PierCollection = [];

class Pier {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;

    }


    AddPier() {
        PierCollection.push(this);
    }
    DeletePier() {
        let index;
        for (var i = 0; i < PierCollection.length; i++) {
            if (this.name === PierCollection[i]) {
                index = i;
            }
        }
        PierCollection.splice(index, 1);
    }
    static SearchShip(shipName) {
        for (let i = 0; i < ShipCollection.length; i++) {
            if (ShipCollection[i].name === shipName) {
                console.log(ShipCollection[i]);
            }
        }
    }
    AddShipToPier(ship) {
        ShipCollection.push(ship);
    }
    EditPier(name, capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    AddPierToPort(port) {
        port.PierCollection.push(this);
    }
}

module.exports = { Pier, PierCollection }