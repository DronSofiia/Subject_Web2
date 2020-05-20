class Piers extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('pierss')
    this.fields = this.fields.concat([
    	'name',
    	'number',
    	'quantity'
    ])
  }
}
