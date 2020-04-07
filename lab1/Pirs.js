var PirsCollection = [];

class Pirs {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;

    }


    AddPirs() {
        PirsCollection.push(this);
    }
    
    
    DeletePirs() {
        let index;
        for (var i = 0; i < PirsCollection.length; i++) {
            if (this.name === PirsCollection[i]) {
                index = i;
            }
        }
        PirsCollection.splice(index, 1);
    }
    static SearchShip(shipName) {
        for (let i = 0; i < ShipCollection.length; i++) {
            if (ShipCollection[i].name === shipName) {
                console.log(ShipCollection[i]);
            }
        }
    }
   
   
    AddShipToPirs(ship) {
        ShipCollection.push(ship);
    }
   
   
    EditPirs(name, capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    
    AddPirsToPort(port) {
        port.PirsCollection.push(this);
    }
}

module.exports = { Pirs, PirsCollection }
// Hello
