'use strict'

const shipModel = new Ship() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#ship-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const shipData = {}
    formData.forEach((value, key) => {
      shipData[key] = value
    })

    shipModel.Create(shipData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#portss-list').DataTable({
    data: shipModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Country', data: 'country' },
      { title: 'Number', data: 'number' },
      { title: 'Weight', data: 'weight' },
      { title: 'Delete', data: '' }
    ],
    columnDefs: [
      {
        "render": function(data, type, row) {
          return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
        },
        "targets": 5
      }
    ]
  })
}

function initListEvents () {
  document.addEventListener('shipsListDataChanged', function (e) {
    const dataTable = window.jQuery('#portss-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  shipModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
