/**
 * @File   : HTMLAnchorElement.js
 * @Author :dtysky (dtysky@outlook.com)
 * @Date   : 7/26/2019, 1:58:46 PM
 * @Description:
 */
import HTMLElement from './HTMLElement'

export default class HTMLAnchorElement extends HTMLElement {
	_href = ''
	_protocol = ''
	_host = ''
	_search = ''
	_hash = ''
	_port = ''
	_pathname = ''
	_origin = ''

	set href(value) {
		if (value.substring(0, 2) == '//') {
			value = 'https:' + value;
		}

		if (/^http/.test(value)) {
			let res = /^(http:|https:)\/\/(.*)/.exec(value)
			this._origin = this._protocol = res[1]
			value = res[2]

			res = /(.+?)\/(.+)/.exec(value)

			if (res) {
				this._host = value[1]
				this._origin += this._host
				value = res[2]

				res = /(:*)\/(.*)/.exec(value)

				if (res) {
					this._port = res[2]
					value = res[1]
				}
			}
		}

		let res = /(.*)(#.*)/.exec(value)

		if (res) {
			this._hash = res[2]
			value = res[1]
		}

		res = /(.*)(\?.*)/.exec(value)

		if (res) {
			this.search = res[2]
			value = res[1]
		}

		if (value[0] !== '/') {
			value = '/' + value
		}

		this._pathname = value + this._search + this._hash
		this._href = this._origin + this._pathname
	}

	get href() {
		return this._href
	}

	get protocol() {
		return this._protocol
	}

	get host() {
		return this._host
	}

	get search() {
		return this._search
	}

	get hash() {
		return this._hash
	}

	get port() {
		return this._port
	}

	get pathname() {
		return this._pathname
	}

	get origin() {
		return this._origin ? this._origin : 'null'
	}
}
