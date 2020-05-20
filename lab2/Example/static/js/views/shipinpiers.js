'use strict'

const shipInPiersModel = new shipInPiers() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#port-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const shipInPiersData = {}
    formData.forEach((value, key) => {
      shipInPiersData[key] = value
    })

    shipInPiersModel.Create(shipInPiersData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#port-list').DataTable({
    data: shipInPiersModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Piers', data: 'piers' },
      { title: 'Delete', data: '' }
    ],
    columnDefs: [
      {
        "render": function(data, type, row) {
          return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
        },
        "targets": 3
      }
    ]
  })
}

function initListEvents () {
  document.addEventListener('portsListDataChanged', function (e) {
    const dataTable = window.jQuery('#port-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  shipInPiersModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
