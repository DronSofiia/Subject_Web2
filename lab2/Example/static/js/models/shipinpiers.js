class shipInPiers extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('ports')
    this.fields = this.fields.concat([
    	'name',
    	'piers'
    ])
  }
}
