class Note {
	constructor(obj) {
		this.id = obj.id || null
		this.body = obj.body || ''
		this.last_updated = obj.last_updated || ''
	}

	isValid() {
		if (typeof this.id !== 'string') return false
		if (typeof this.body !== 'string') return false
		if (typeof this.last_updated !== 'string') return false

		return true
	}
}

module.exports = { Note }
