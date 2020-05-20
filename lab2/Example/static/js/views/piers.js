'use strict'

const piersModel = new Piers() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#piers-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const piersData = {}
    formData.forEach((value, key) => {
      piersData[key] = value
    })

    piersModel.Create(piersData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#piers-list').DataTable({
    data: piersModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Number', data: 'number' },
      { title: 'Quantity', data: 'quantity' },
      { title: 'Delete', data: '' }
    ],
    columnDefs: [
      {
        "render": function(data, type, row) {
          return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
        },
        "targets": 4
      }
    ]
  })
}

function initListEvents () {
  document.addEventListener('pierssListDataChanged', function (e) {
    const dataTable = window.jQuery('#piers-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  piersModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
