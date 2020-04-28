class Note {
	constructor(obj) {
		this.id = obj.id || null
		this.body = obj.body || ''
	}

	isValid() {
		if (typeof this.id !== 'string') return false
		if (typeof this.body !== 'string') return false

		return true
	}
}

module.exports = { Note }
