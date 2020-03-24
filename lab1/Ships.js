  
var ShipCollection = [];

class Ships {
    constructor(name, length, width) {
        this.name = name;
        this.size = [length, width];
    }


    AddShip() {
        ShipCollection.push(this);
    }
    EditShip(name, length, width) {
        this.name = name;
        this.size = [length, width];
    }
    DeleteShip() {
        let index;
        for (var i = 0; i < ShipCollection.length; i++) {
            if (this.name === ShipCollection[i]) {
                index = i;
            }
        }
        ShipCollection.splice(index, 1);
    }
    static SearchShip(shipName) {
        for (let i = 0; i < ShipCollection.length; i++) {
            if (ShipCollection[i].name === shipName) {
                console.log(ShipCollection[i]);
            }
        }
    }
    static ShowAllShips() {
        for (let i = 0; i < ShipCollection.length; i++) {
            console.log(ShipCollection[i]);
        }
    }
}

module.exports = { Ships, ShipCollection }
