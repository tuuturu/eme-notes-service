class Note {
	constructor(obj) {
		this.id = obj.id || null
		this.title = obj.title || 'untitled'
		this.content = obj.content || ''
	}

	isValid() {
		if (typeof this.id !== 'string') return false
		if (typeof this.title !== 'string') return false
		if (typeof this.content !== 'string') return false

		return true
	}
}

module.exports = { Note }
