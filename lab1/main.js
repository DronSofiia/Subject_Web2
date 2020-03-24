'use strict'

console.log('Hello Node + JS')


var shipClass = require('./Ships.js')
var pirsClass = require('./Pirs.js')
var portClass = require('./Port.js')
var Task_1 = require('./Task_1.js')
var Task_2 = require("./Task_2.js")
var Task_3 = require('./Task_3.js')
var Task_4 = require('./Task_4.js')
var Task_5 = require('./Task_5.js')
var Task_6= require('./Task_6.js')


console.log('Task_1:\n'+Task_1.text_mass("Hello Word")+'\n');
console.log('Task_2:\n Start↓\n Word\n Sort↓\n '+ Task_2.mixingWord("Word")+'\n');
console.log('Task_3:\n Nummers↓\n 80 and 30\n NSD↓\n '+ Task_3.nsd(80, 30)+'\n');
console.log('Task_4:\n'+Task_4.randomMass([1,2,3,4,5])+'\n')
console.log('Task_5:\n'+Task_5.countDate(9, 2020)+'\n');
console.log('Task_6:\n'+Task_6.mass.sort(Task_6.SortName)+'\n');

var port1 = new portClass.Port('Alloxa', 'Odessa')
port1.AddPort()
var port2 = new portClass.Port('Musho', 'Odessa')
port2.AddPort()
port2.DeletePort()

portClass.Port.ShowAllPorts()
