(function(e, t, n) {
	"use strict";

	function r(e, t, n) {
		var r = e.runtimeStyle && e.runtimeStyle[t],
			i, s = e.style;
		return !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(n) && /^-?\d/.test(n) && (i = s.left, r && (e.runtimeStyle.left =
				e.currentStyle.left), s.left = t === "fontSize" ? "1em" : n || 0, n = s.pixelLeft + "px", s
			.left = i, r && (e.runtimeStyle.left = r)), /^(thin|medium|thick)$/i.test(n) ? n : Math.round(
			parseFloat(n)) + "px"
	}

	function i(e) {
		return parseInt(e, 10)
	}

	function s(e, t, i, s) {
		e = (e || "").split(","), e = e[s || 0] || e[0] || "auto", e = f.Util.trimText(e).split(" ");
		if (i !== "backgroundSize" || !!e[0] && !e[0].match(/cover|contain|auto/)) {
			e[0] = e[0].indexOf("%") === -1 ? r(t, i + "X", e[0]) : e[0];
			if (e[1] === n) {
				if (i === "backgroundSize") return e[1] = "auto", e;
				e[1] = e[0]
			}
			e[1] = e[1].indexOf("%") === -1 ? r(t, i + "Y", e[1]) : e[1]
		}
		return e
	}

	function o(e, t, n, r, i, s) {
		var o = f.Util.getCSS(t, e, i),
			u, a, l, c;
		o.length === 1 && (c = o[0], o = [], o[0] = c, o[1] = c);
		if (o[0].toString().indexOf("%") !== -1) l = parseFloat(o[0]) / 100, a = n.width * l, e !==
			"backgroundSize" && (a -= (s || r).width * l);
		else if (e === "backgroundSize")
			if (o[0] === "auto") a = r.width;
			else if (/contain|cover/.test(o[0])) {
			var h = f.Util.resizeBounds(r.width, r.height, n.width, n.height, o[0]);
			a = h.width, u = h.height
		} else a = parseInt(o[0], 10);
		else a = parseInt(o[0], 10);
		return o[1] === "auto" ? u = a / r.width * r.height : o[1].toString().indexOf("%") !== -1 ? (l = parseFloat(
			o[1]) / 100, u = n.height * l, e !== "backgroundSize" && (u -= (s || r).height * l)) : u = parseInt(
			o[1], 10), [a, u]
	}

	function u(e, t) {
		var n = [];
		return {
			storage: n,
			width: e,
			height: t,
			clip: function() {
				n.push({
					type: "function",
					name: "clip",
					arguments: arguments
				})
			},
			translate: function() {
				n.push({
					type: "function",
					name: "translate",
					arguments: arguments
				})
			},
			fill: function() {
				n.push({
					type: "function",
					name: "fill",
					arguments: arguments
				})
			},
			save: function() {
				n.push({
					type: "function",
					name: "save",
					arguments: arguments
				})
			},
			restore: function() {
				n.push({
					type: "function",
					name: "restore",
					arguments: arguments
				})
			},
			fillRect: function() {
				n.push({
					type: "function",
					name: "fillRect",
					arguments: arguments
				})
			},
			createPattern: function() {
				n.push({
					type: "function",
					name: "createPattern",
					arguments: arguments
				})
			},
			drawShape: function() {
				var e = [];
				return n.push({
					type: "function",
					name: "drawShape",
					arguments: e
				}), {
					moveTo: function() {
						e.push({
							name: "moveTo",
							arguments: arguments
						})
					},
					lineTo: function() {
						e.push({
							name: "lineTo",
							arguments: arguments
						})
					},
					arcTo: function() {
						e.push({
							name: "arcTo",
							arguments: arguments
						})
					},
					bezierCurveTo: function() {
						e.push({
							name: "bezierCurveTo",
							arguments: arguments
						})
					},
					quadraticCurveTo: function() {
						e.push({
							name: "quadraticCurveTo",
							arguments: arguments
						})
					}
				}
			},
			drawImage: function() {
				n.push({
					type: "function",
					name: "drawImage",
					arguments: arguments
				})
			},
			fillText: function() {
				n.push({
					type: "function",
					name: "fillText",
					arguments: arguments
				})
			},
			setVariable: function(e, t) {
				return n.push({
					type: "variable",
					name: e,
					arguments: t
				}), t
			}
		}
	}

	function a(e) {
		return {
			zindex: e,
			children: []
		}
	}
	var f = {},
		l, c, h;
	f.Util = {}, f.Util.log = function(t) {
			f.logging && e.console && e.console.log && e.console.log(t)
		}, f.Util.trimText = function(e) {
			return function(t) {
				return e ? e.apply(t) : ((t || "") + "").replace(/^\s+|\s+$/g, "")
			}
		}(String.prototype.trim), f.Util.asFloat = function(e) {
			return parseFloat(e)
		},
		function() {
			var e = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,
				t = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
			f.Util.parseTextShadows = function(n) {
				if (!n || n === "none") return [];
				var r = n.match(e),
					i = [];
				for (var s = 0; r && s < r.length; s++) {
					var o = r[s].match(t);
					i.push({
						color: o[0],
						offsetX: o[1] ? o[1].replace("px", "") : 0,
						offsetY: o[2] ? o[2].replace("px", "") : 0,
						blur: o[3] ? o[3].replace("px", "") : 0
					})
				}
				return i
			}
		}(), f.Util.parseBackgroundImage = function(e) {
			var t = " \r\n	",
				n, r, i, s, o, u = [],
				a, f = 0,
				l = 0,
				c, h, p = function() {
					n && (r.substr(0, 1) === '"' && (r = r.substr(1, r.length - 2)), r && h.push(r), n.substr(0,
							1) === "-" && (s = n.indexOf("-", 1) + 1) > 0 && (i = n.substr(0, s), n = n.substr(
							s)),
						u.push({
							prefix: i,
							method: n.toLowerCase(),
							value: o,
							args: h
						})), h = [], n = i = r = o = ""
				};
			p();
			for (var d = 0, v = e.length; d < v; d++) {
				a = e[d];
				if (f === 0 && t.indexOf(a) > -1) continue;
				switch (a) {
					case '"':
						c ? c === a && (c = null) : c = a;
						break;
					case "(":
						if (c) break;
						if (f === 0) {
							f = 1, o += a;
							continue
						}
						l++;
						break;
					case ")":
						if (c) break;
						if (f === 1) {
							if (l === 0) {
								f = 0, o += a, p();
								continue
							}
							l--
						}
						break;
					case ",":
						if (c) break;
						if (f === 0) {
							p();
							continue
						}
						if (f === 1 && l === 0 && !n.match(/^url$/i)) {
							h.push(r), r = "", o += a;
							continue
						}
				}
				o += a, f === 0 ? n += a : r += a
			}
			return p(), u
		}, f.Util.Bounds = function(e) {
			var t, n = {};
			return e.getBoundingClientRect && (t = e.getBoundingClientRect(), n.top = t.top, n.bottom = t.bottom ||
				t.top + t.height, n.left = t.left, n.width = e.offsetWidth, n.height = e.offsetHeight), n
		}, f.Util.OffsetBounds = function(e) {
			var t = e.offsetParent ? f.Util.OffsetBounds(e.offsetParent) : {
				top: 0,
				left: 0
			};
			return {
				top: e.offsetTop + t.top,
				bottom: e.offsetTop + e.offsetHeight + t.top,
				left: e.offsetLeft + t.left,
				width: e.offsetWidth,
				height: e.offsetHeight
			}
		}, f.Util.getCSS = function(e, n, r) {
			l !== e && (c = t.defaultView.getComputedStyle(e, null));
			var o = c[n];
			if (/^background(Size|Position)$/.test(n)) return s(o, e, n, r);
			if (/border(Top|Bottom)(Left|Right)Radius/.test(n)) {
				var u = o.split(" ");
				return u.length <= 1 && (u[1] = u[0]), u.map(i)
			}
			return o
		}, f.Util.resizeBounds = function(e, t, n, r, i) {
			var s = n / r,
				o = e / t,
				u, a;
			return !i || i === "auto" ? (u = n, a = r) : s < o ^ i === "contain" ? (a = r, u = r * o) : (u = n, a =
				n / o), {
				width: u,
				height: a
			}
		}, f.Util.BackgroundPosition = function(e, t, n, r, i) {
			var s = o("backgroundPosition", e, t, n, r, i);
			return {
				left: s[0],
				top: s[1]
			}
		}, f.Util.BackgroundSize = function(e, t, n, r) {
			var i = o("backgroundSize", e, t, n, r);
			return {
				width: i[0],
				height: i[1]
			}
		}, f.Util.Extend = function(e, t) {
			for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
			return t
		}, f.Util.Children = function(e) {
			var t;
			try {
				t = e.nodeName && e.nodeName.toUpperCase() === "IFRAME" ? e.contentDocument || e.contentWindow
					.document : function(e) {
						var t = [];
						return e !== null && function(e, t) {
							var r = e.length,
								i = 0;
							if (typeof t.length == "number")
								for (var s = t.length; i < s; i++) e[r++] = t[i];
							else
								while (t[i] !== n) e[r++] = t[i++];
							return e.length = r, e
						}(t, e), t
					}(e.childNodes)
			} catch (r) {
				f.Util.log("html2canvas.Util.Children failed with exception: " + r.message), t = []
			}
			return t
		}, f.Util.isTransparent = function(e) {
			return e === "transparent" || e === "rgba(0, 0, 0, 0)"
		}, f.Util.Font = function() {
			var e = {};
			return function(t, r, i) {
				if (e[t + "-" + r] !== n) return e[t + "-" + r];
				var s = i.createElement("div"),
					o = i.createElement("img"),
					u = i.createElement("span"),
					a = "Hidden Text",
					f, l, c;
				return s.style.visibility = "hidden", s.style.fontFamily = t, s.style.fontSize = r, s.style
					.margin = 0, s.style.padding = 0, i.body.appendChild(s), o.src =
					"data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=", o.width = 1, o
					.height = 1, o.style.margin = 0, o.style.padding = 0, o.style.verticalAlign = "baseline", u
					.style.fontFamily = t, u.style.fontSize = r, u.style.margin = 0, u.style.padding = 0, u
					.appendChild(i.createTextNode(a)), s.appendChild(u), s.appendChild(o), f = o.offsetTop - u
					.offsetTop + 1, s.removeChild(u), s.appendChild(i.createTextNode(a)), s.style.lineHeight =
					"normal", o.style.verticalAlign = "super", l = o.offsetTop - s.offsetTop + 1, c = {
						baseline: f,
						lineWidth: 1,
						middle: l
					}, e[t + "-" + r] = c, i.body.removeChild(s), c
			}
		}(),
		function() {
			function e(e) {
				return function(t) {
					try {
						e.addColorStop(t.stop, t.color)
					} catch (r) {
						n.log(["failed to add color stop: ", r, "; tried to add: ", t])
					}
				}
			}
			var n = f.Util,
				r = {};
			f.Generate = r;
			var i = [/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
				/^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
				/^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,
				/^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,
				/^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
				/^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,
				/^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/
			];
			r.parseGradient = function(e, t) {
				var n, r, s = i.length,
					o, u, a, f, l, c, h, p, d, v;
				for (r = 0; r < s; r += 1) {
					o = e.match(i[r]);
					if (o) break
				}
				if (o) switch (o[1]) {
					case "-webkit-linear-gradient":
					case "-o-linear-gradient":
						n = {
							type: "linear",
							x0: null,
							y0: null,
							x1: null,
							y1: null,
							colorStops: []
						}, a = o[2].match(/\w+/g);
						if (a) {
							f = a.length;
							for (r = 0; r < f; r += 1) switch (a[r]) {
								case "top":
									n.y0 = 0, n.y1 = t.height;
									break;
								case "right":
									n.x0 = t.width, n.x1 = 0;
									break;
								case "bottom":
									n.y0 = t.height, n.y1 = 0;
									break;
								case "left":
									n.x0 = 0, n.x1 = t.width
							}
						}
						n.x0 === null && n.x1 === null && (n.x0 = n.x1 = t.width / 2), n.y0 === null && n
							.y1 === null && (n.y0 = n.y1 = t.height / 2), a = o[3].match(
								/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g
							);
						if (a) {
							f = a.length, l = 1 / Math.max(f - 1, 1);
							for (r = 0; r < f; r += 1) c = a[r].match(
								/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/
							), c[2] ? (u = parseFloat(c[2]), c[3] === "%" ? u /= 100 : u /= t
								.width) : u = r * l, n.colorStops.push({
								color: c[1],
								stop: u
							})
						}
						break;
					case "-webkit-gradient":
						n = {
							type: o[2] === "radial" ? "circle" : o[2],
							x0: 0,
							y0: 0,
							x1: 0,
							y1: 0,
							colorStops: []
						}, a = o[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/), a && (
							n.x0 = a[1] * t.width / 100, n.y0 = a[2] * t.height / 100, n.x1 = a[3] * t
							.width / 100, n.y1 = a[4] * t.height / 100), a = o[4].match(
							/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g
						);
						if (a) {
							f = a.length;
							for (r = 0; r < f; r += 1) c = a[r].match(
								/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/
							), u = parseFloat(c[2]), c[1] === "from" && (u = 0), c[1] === "to" && (
								u = 1), n.colorStops.push({
								color: c[3],
								stop: u
							})
						}
						break;
					case "-moz-linear-gradient":
						n = {
							type: "linear",
							x0: 0,
							y0: 0,
							x1: 0,
							y1: 0,
							colorStops: []
						}, a = o[2].match(/(\d{1,3})%?\s(\d{1,3})%?/), a && (n.x0 = a[1] * t.width /
							100, n.y0 = a[2] * t.height / 100, n.x1 = t.width - n.x0, n.y1 = t.height -
							n.y0), a = o[3].match(
							/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g
						);
						if (a) {
							f = a.length, l = 1 / Math.max(f - 1, 1);
							for (r = 0; r < f; r += 1) c = a[r].match(
									/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/
								), c[2] ? (u = parseFloat(c[2]), c[3] && (u /= 100)) : u = r * l, n
								.colorStops.push({
									color: c[1],
									stop: u
								})
						}
						break;
					case "-webkit-radial-gradient":
					case "-moz-radial-gradient":
					case "-o-radial-gradient":
						n = {
							type: "circle",
							x0: 0,
							y0: 0,
							x1: t.width,
							y1: t.height,
							cx: 0,
							cy: 0,
							rx: 0,
							ry: 0,
							colorStops: []
						}, a = o[2].match(/(\d{1,3})%?\s(\d{1,3})%?/), a && (n.cx = a[1] * t.width /
							100, n.cy = a[2] * t.height / 100), a = o[3].match(/\w+/), c = o[4].match(
							/[a-z\-]*/);
						if (a && c) switch (c[0]) {
							case "farthest-corner":
							case "cover":
							case "":
								h = Math.sqrt(Math.pow(n.cx, 2) + Math.pow(n.cy, 2)), p = Math.sqrt(Math
										.pow(n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), d = Math.sqrt(Math
										.pow(n.x1 - n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), v = Math.sqrt(
										Math.pow(n.x1 - n.cx, 2) + Math.pow(n.cy, 2)), n.rx = n.ry =
									Math.max(h, p, d, v);
								break;
							case "closest-corner":
								h = Math.sqrt(Math.pow(n.cx, 2) + Math.pow(n.cy, 2)), p = Math.sqrt(Math
										.pow(n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), d = Math.sqrt(Math
										.pow(n.x1 - n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), v = Math.sqrt(
										Math.pow(n.x1 - n.cx, 2) + Math.pow(n.cy, 2)), n.rx = n.ry =
									Math.min(h, p, d, v);
								break;
							case "farthest-side":
								a[0] === "circle" ? n.rx = n.ry = Math.max(n.cx, n.cy, n.x1 - n.cx, n
									.y1 - n.cy) : (n.type = a[0], n.rx = Math.max(n.cx, n.x1 - n
									.cx), n.ry = Math.max(n.cy, n.y1 - n.cy));
								break;
							case "closest-side":
							case "contain":
								a[0] === "circle" ? n.rx = n.ry = Math.min(n.cx, n.cy, n.x1 - n.cx, n
									.y1 - n.cy) : (n.type = a[0], n.rx = Math.min(n.cx, n.x1 - n
									.cx), n.ry = Math.min(n.cy, n.y1 - n.cy))
						}
						a = o[5].match(
							/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g
						);
						if (a) {
							f = a.length, l = 1 / Math.max(f - 1, 1);
							for (r = 0; r < f; r += 1) c = a[r].match(
								/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/
							), c[2] ? (u = parseFloat(c[2]), c[3] === "%" ? u /= 100 : u /= t
								.width) : u = r * l, n.colorStops.push({
								color: c[1],
								stop: u
							})
						}
				}
				return n
			}, r.Gradient = function(n, r) {
				if (r.width === 0 || r.height === 0) return;
				var i = t.createElement("canvas"),
					s = i.getContext("2d"),
					o, u;
				i.width = r.width, i.height = r.height, o = f.Generate.parseGradient(n, r);
				if (o) switch (o.type) {
					case "linear":
						u = s.createLinearGradient(o.x0, o.y0, o.x1, o.y1), o.colorStops.forEach(e(u)), s
							.fillStyle = u, s.fillRect(0, 0, r.width, r.height);
						break;
					case "circle":
						u = s.createRadialGradient(o.cx, o.cy, 0, o.cx, o.cy, o.rx), o.colorStops.forEach(e(
							u)), s.fillStyle = u, s.fillRect(0, 0, r.width, r.height);
						break;
					case "ellipse":
						var a = t.createElement("canvas"),
							l = a.getContext("2d"),
							c = Math.max(o.rx, o.ry),
							h = c * 2;
						a.width = a.height = h, u = l.createRadialGradient(o.rx, o.ry, 0, o.rx, o.ry, c), o
							.colorStops.forEach(e(u)), l.fillStyle = u, l.fillRect(0, 0, h, h), s
							.fillStyle = o.colorStops[o.colorStops.length - 1].color, s.fillRect(0, 0, i
								.width, i.height), s.drawImage(a, o.cx - o.rx, o.cy - o.ry, 2 * o.rx, 2 * o
								.ry)
				}
				return i
			}, r.ListAlpha = function(e) {
				var t = "",
					n;
				do n = e % 26, t = String.fromCharCode(n + 64) + t, e /= 26; while (e * 26 > 26);
				return t
			}, r.ListRoman = function(e) {
				var t = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
					n = [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
					r = "",
					i, s = t.length;
				if (e <= 0 || e >= 4e3) return e;
				for (i = 0; i < s; i += 1)
					while (e >= n[i]) e -= n[i], r += t[i];
				return r
			}
		}(), f.Parse = function(r, i) {
			function s() {
				return Math.max(Math.max(lt.body.scrollWidth, lt.documentElement.scrollWidth), Math.max(lt.body
					.offsetWidth, lt.documentElement.offsetWidth), Math.max(lt.body.clientWidth, lt
					.documentElement.clientWidth))
			}

			function o() {
				return Math.max(Math.max(lt.body.scrollHeight, lt.documentElement.scrollHeight), Math.max(lt.body
					.offsetHeight, lt.documentElement.offsetHeight), Math.max(lt.body.clientHeight, lt
					.documentElement.clientHeight))
			}

			function l(e, t) {
				var n = parseInt(vt(e, t), 10);
				return isNaN(n) ? 0 : n
			}

			function c(e, t, n, r, i, s) {
				s !== "transparent" && (e.setVariable("fillStyle", s), e.fillRect(t, n, r, i), ft += 1)
			}

			function h(e, t, n) {
				if (e.length > 0) return t + n.toUpperCase()
			}

			function p(e, t) {
				switch (t) {
					case "lowercase":
						return e.toLowerCase();
					case "capitalize":
						return e.replace(/(^|\s|:|-|\(|\))([a-z])/g, h);
					case "uppercase":
						return e.toUpperCase();
					default:
						return e
				}
			}

			function d(e) {
				return /^(normal|none|0px)$/.test(e)
			}

			function v(e, t, n, r) {
				e !== null && ct.trimText(e).length > 0 && (r.fillText(e, t, n), ft += 1)
			}

			function m(e, t, n, r) {
				var i = !1,
					s = vt(t, "fontWeight"),
					o = vt(t, "fontFamily"),
					u = vt(t, "fontSize"),
					a = ct.parseTextShadows(vt(t, "textShadow"));
				switch (parseInt(s, 10)) {
					case 401:
						s = "bold";
						break;
					case 400:
						s = "normal"
				}
				e.setVariable("fillStyle", r), e.setVariable("font", [vt(t, "fontStyle"), vt(t, "fontVariant"), s,
					u, o
				].join(" ")), e.setVariable("textAlign", i ? "right" : "left"), a.length && (e.setVariable(
					"shadowColor", a[0].color), e.setVariable("shadowOffsetX", a[0].offsetX), e.setVariable(
					"shadowOffsetY", a[0].offsetY), e.setVariable("shadowBlur", a[0].blur));
				if (n !== "none") return ct.Font(o, u, lt)
			}

			function g(e, t, n, r, i) {
				switch (t) {
					case "underline":
						c(e, n.left, Math.round(n.top + r.baseline + r.lineWidth), n.width, 1, i);
						break;
					case "overline":
						c(e, n.left, Math.round(n.top), n.width, 1, i);
						break;
					case "line-through":
						c(e, n.left, Math.ceil(n.top + r.middle + r.lineWidth), n.width, 1, i)
				}
			}

			function y(e, t, n, r, i) {
				var s;
				if (ht.rangeBounds && !i) {
					if (n !== "none" || ct.trimText(t).length !== 0) s = b(t, e.node, e.textOffset);
					e.textOffset += t.length
				} else if (e.node && typeof e.node.nodeValue == "string") {
					var o = r ? e.node.splitText(t.length) : null;
					s = w(e.node, i), e.node = o
				}
				return s
			}

			function b(e, t, n) {
				var r = lt.createRange();
				return r.setStart(t, n), r.setEnd(t, n + e.length), r.getBoundingClientRect()
			}

			function w(e, t) {
				var n = e.parentNode,
					r = lt.createElement("wrapper"),
					i = e.cloneNode(!0);
				r.appendChild(e.cloneNode(!0)), n.replaceChild(r, e);
				var s = t ? ct.OffsetBounds(r) : ct.Bounds(r);
				return n.replaceChild(i, r), s
			}

			function E(e, t, n) {
				var r = n.ctx,
					s = vt(e, "color"),
					o = vt(e, "textDecoration"),
					u = vt(e, "textAlign"),
					a, f, l = {
						node: t,
						textOffset: 0
					};
				ct.trimText(t.nodeValue).length > 0 && (t.nodeValue = p(t.nodeValue, vt(e, "textTransform")), u = u
					.replace(["-webkit-auto"], ["auto"]), f = !i.letterRendering &&
					/^(left|right|justify|auto)$/.test(u) && d(vt(e, "letterSpacing")) ? t.nodeValue.split(
						/(\b| )/) : t.nodeValue.split(""), a = m(r, e, o, s), i.chinese && f.forEach(function(e,
						t) {
						/.*[\u4E00-\u9FA5].*$/.test(e) && (e = e.split(""), e.unshift(t, 1), f.splice.apply(
							f, e))
					}), f.forEach(function(e, t) {
						var i = y(l, e, o, t < f.length - 1, n.transform.matrix);
						i && (v(e, i.left, i.bottom, r), g(r, o, i, a, s))
					}))
			}

			function S(e, t) {
				var n = lt.createElement("boundelement"),
					r, i;
				return n.style.display = "inline", r = e.style.listStyleType, e.style.listStyleType = "none", n
					.appendChild(lt.createTextNode(t)), e.insertBefore(n, e.firstChild), i = ct.Bounds(n), e
					.removeChild(n), e.style.listStyleType = r, i
			}

			function x(e) {
				var t = -1,
					n = 1,
					r = e.parentNode.childNodes;
				if (e.parentNode) {
					while (r[++t] !== e) r[t].nodeType === 1 && n++;
					return n
				}
				return -1
			}

			function T(e, t) {
				var n = x(e),
					r;
				switch (t) {
					case "decimal":
						r = n;
						break;
					case "decimal-leading-zero":
						r = n.toString().length === 1 ? n = "0" + n.toString() : n.toString();
						break;
					case "upper-roman":
						r = f.Generate.ListRoman(n);
						break;
					case "lower-roman":
						r = f.Generate.ListRoman(n).toLowerCase();
						break;
					case "lower-alpha":
						r = f.Generate.ListAlpha(n).toLowerCase();
						break;
					case "upper-alpha":
						r = f.Generate.ListAlpha(n)
				}
				return r + ". "
			}

			function N(e, t, n) {
				var r, i, s = t.ctx,
					o = vt(e, "listStyleType"),
					u;
				if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i
					.test(o)) {
					i = T(e, o), u = S(e, i), m(s, e, "none", vt(e, "color"));
					if (vt(e, "listStylePosition") !== "inside") return;
					s.setVariable("textAlign", "left"), r = n.left, v(i, r, u.bottom, s)
				}
			}

			function C(e) {
				var t = r[e];
				return t && t.succeeded === !0 ? t.img : !1
			}

			function k(e, t) {
				var n = Math.max(e.left, t.left),
					r = Math.max(e.top, t.top),
					i = Math.min(e.left + e.width, t.left + t.width),
					s = Math.min(e.top + e.height, t.top + t.height);
				return {
					left: n,
					top: r,
					width: i - n,
					height: s - r
				}
			}

			function L(e, t, n) {
				var r, i = t.cssPosition !== "static",
					s = i ? vt(e, "zIndex") : "auto",
					o = vt(e, "opacity"),
					u = vt(e, "cssFloat") !== "none";
				t.zIndex = r = a(s), r.isPositioned = i, r.isFloated = u, r.opacity = o, r.ownStacking = s !==
					"auto" || o < 1, n && n.zIndex.children.push(t)
			}

			function A(e, t, n, r, i) {
				var s = l(t, "paddingLeft"),
					o = l(t, "paddingTop"),
					u = l(t, "paddingRight"),
					a = l(t, "paddingBottom");
				R(e, n, 0, 0, n.width, n.height, r.left + s + i[3].width, r.top + o + i[0].width, r.width - (i[1]
					.width + i[3].width + s + u), r.height - (i[0].width + i[2].width + o + a))
			}

			function O(e) {
				return ["Top", "Right", "Bottom", "Left"].map(function(t) {
					return {
						width: l(e, "border" + t + "Width"),
						color: vt(e, "border" + t + "Color")
					}
				})
			}

			function M(e) {
				return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(t) {
					return vt(e, "border" + t + "Radius")
				})
			}

			function _(e, t, n, r) {
				var i = function(e, t, n) {
					return {
						x: e.x + (t.x - e.x) * n,
						y: e.y + (t.y - e.y) * n
					}
				};
				return {
					start: e,
					startControl: t,
					endControl: n,
					end: r,
					subdivide: function(s) {
						var o = i(e, t, s),
							u = i(t, n, s),
							a = i(n, r, s),
							f = i(o, u, s),
							l = i(u, a, s),
							c = i(f, l, s);
						return [_(e, o, f, c), _(c, l, a, r)]
					},
					curveTo: function(e) {
						e.push(["bezierCurve", t.x, t.y, n.x, n.y, r.x, r.y])
					},
					curveToReversed: function(r) {
						r.push(["bezierCurve", n.x, n.y, t.x, t.y, e.x, e.y])
					}
				}
			}

			function D(e, t, n, r, i, s, o) {
				t[0] > 0 || t[1] > 0 ? (e.push(["line", r[0].start.x, r[0].start.y]), r[0].curveTo(e), r[1].curveTo(
					e)) : e.push(["line", s, o]), (n[0] > 0 || n[1] > 0) && e.push(["line", i[0].start.x, i[0]
					.start.y
				])
			}

			function P(e, t, n, r, i, s, o) {
				var u = [];
				return t[0] > 0 || t[1] > 0 ? (u.push(["line", r[1].start.x, r[1].start.y]), r[1].curveTo(u)) : u
					.push(["line", e.c1[0], e.c1[1]]), n[0] > 0 || n[1] > 0 ? (u.push(["line", s[0].start.x, s[0]
						.start.y
					]), s[0].curveTo(u), u.push(["line", o[0].end.x, o[0].end.y]), o[0].curveToReversed(u)) : (u
						.push(["line", e.c2[0], e.c2[1]]), u.push(["line", e.c3[0], e.c3[1]])), t[0] > 0 || t[1] >
					0 ? (u.push(["line", i[1].end.x, i[1].end.y]), i[1].curveToReversed(u)) : u.push(["line", e.c4[
						0], e.c4[1]]), u
			}

			function H(e, t, n) {
				var r = e.left,
					i = e.top,
					s = e.width,
					o = e.height,
					u = t[0][0],
					a = t[0][1],
					f = t[1][0],
					l = t[1][1],
					c = t[2][0],
					h = t[2][1],
					p = t[3][0],
					d = t[3][1],
					v = s - f,
					m = o - h,
					g = s - c,
					y = o - d;
				return {
					topLeftOuter: yt(r, i, u, a).topLeft.subdivide(.5),
					topLeftInner: yt(r + n[3].width, i + n[0].width, Math.max(0, u - n[3].width), Math.max(0, a - n[
						0].width)).topLeft.subdivide(.5),
					topRightOuter: yt(r + v, i, f, l).topRight.subdivide(.5),
					topRightInner: yt(r + Math.min(v, s + n[3].width), i + n[0].width, v > s + n[3].width ? 0 : f -
						n[3].width, l - n[0].width).topRight.subdivide(.5),
					bottomRightOuter: yt(r + g, i + m, c, h).bottomRight.subdivide(.5),
					bottomRightInner: yt(r + Math.min(g, s + n[3].width), i + Math.min(m, o + n[0].width), Math.max(
						0, c - n[1].width), Math.max(0, h - n[2].width)).bottomRight.subdivide(.5),
					bottomLeftOuter: yt(r, i + y, p, d).bottomLeft.subdivide(.5),
					bottomLeftInner: yt(r + n[3].width, i + y, Math.max(0, p - n[3].width), Math.max(0, d - n[2]
						.width)).bottomLeft.subdivide(.5)
				}
			}

			function B(e, t, n, r, i) {
				var s = vt(e, "backgroundClip"),
					o = [];
				switch (s) {
					case "content-box":
					case "padding-box":
						D(o, r[0], r[1], t.topLeftInner, t.topRightInner, i.left + n[3].width, i.top + n[0].width),
							D(o, r[1], r[2], t.topRightInner, t.bottomRightInner, i.left + i.width - n[1].width, i
								.top + n[0].width), D(o, r[2], r[3], t.bottomRightInner, t.bottomLeftInner, i.left +
								i.width - n[1].width, i.top + i.height - n[2].width), D(o, r[3], r[0], t
								.bottomLeftInner, t.topLeftInner, i.left + n[3].width, i.top + i.height - n[2].width
							);
						break;
					default:
						D(o, r[0], r[1], t.topLeftOuter, t.topRightOuter, i.left, i.top), D(o, r[1], r[2], t
							.topRightOuter, t.bottomRightOuter, i.left + i.width, i.top), D(o, r[2], r[3], t
							.bottomRightOuter, t.bottomLeftOuter, i.left + i.width, i.top + i.height), D(o, r[
							3], r[0], t.bottomLeftOuter, t.topLeftOuter, i.left, i.top + i.height)
				}
				return o
			}

			function j(e, t, n) {
				var r = t.left,
					i = t.top,
					s = t.width,
					o = t.height,
					u, a, f, l, c, h, p = M(e),
					d = H(t, p, n),
					v = {
						clip: B(e, d, n, p, t),
						borders: []
					};
				for (u = 0; u < 4; u++)
					if (n[u].width > 0) {
						a = r, f = i, l = s, c = o - n[2].width;
						switch (u) {
							case 0:
								c = n[0].width, h = P({
										c1: [a, f],
										c2: [a + l, f],
										c3: [a + l - n[1].width, f + c],
										c4: [a + n[3].width, f + c]
									}, p[0], p[1], d.topLeftOuter, d.topLeftInner, d.topRightOuter, d
									.topRightInner);
								break;
							case 1:
								a = r + s - n[1].width, l = n[1].width, h = P({
										c1: [a + l, f],
										c2: [a + l, f + c + n[2].width],
										c3: [a, f + c],
										c4: [a, f + n[0].width]
									}, p[1], p[2], d.topRightOuter, d.topRightInner, d.bottomRightOuter, d
									.bottomRightInner);
								break;
							case 2:
								f = f + o - n[2].width, c = n[2].width, h = P({
										c1: [a + l, f + c],
										c2: [a, f + c],
										c3: [a + n[3].width, f],
										c4: [a + l - n[3].width, f]
									}, p[2], p[3], d.bottomRightOuter, d.bottomRightInner, d.bottomLeftOuter, d
									.bottomLeftInner);
								break;
							case 3:
								l = n[3].width, h = P({
										c1: [a, f + c + n[2].width],
										c2: [a, f],
										c3: [a + l, f + n[0].width],
										c4: [a + l, f + c]
									}, p[3], p[0], d.bottomLeftOuter, d.bottomLeftInner, d.topLeftOuter, d
									.topLeftInner)
						}
						v.borders.push({
							args: h,
							color: n[u].color
						})
					} return v
			}

			function F(e, t) {
				var n = e.drawShape();
				return t.forEach(function(e, t) {
					n[t === 0 ? "moveTo" : e[0] + "To"].apply(null, e.slice(1))
				}), n
			}

			function I(e, t, n) {
				n !== "transparent" && (e.setVariable("fillStyle", n), F(e, t), e.fill(), ft += 1)
			}

			function q(e, t, n) {
				var r = lt.createElement("valuewrap"),
					i = ["lineHeight", "textAlign", "fontFamily", "color", "fontSize", "paddingLeft", "paddingTop",
						"width", "height", "border", "borderLeftWidth", "borderTopWidth"
					],
					s, o;
				i.forEach(function(t) {
						try {
							r.style[t] = vt(e, t)
						} catch (n) {
							ct.log("html2canvas: Parse: Exception caught in renderFormValue: " + n.message)
						}
					}), r.style.borderColor = "black", r.style.borderStyle = "solid", r.style.display = "block", r
					.style.position = "absolute";
				if (/^(submit|reset|button|text|password)$/.test(e.type) || e.nodeName === "SELECT") r.style
					.lineHeight = vt(e, "height");
				r.style.top = t.top + "px", r.style.left = t.left + "px", s = e.nodeName === "SELECT" ? (e.options[e
						.selectedIndex] || 0).text : e.value, s || (s = e.placeholder), o = lt.createTextNode(s), r
					.appendChild(o), dt.appendChild(r), E(e, o, n), dt.removeChild(r)
			}

			function R(e) {
				e.drawImage.apply(e, Array.prototype.slice.call(arguments, 1)), ft += 1
			}

			function U(n, r) {
				var i = e.getComputedStyle(n, r);
				if (!i || !i.content || i.content === "none" || i.content === "-moz-alt-content" || i.display ===
					"none") return;
				var s = i.content + "",
					o = s.substr(0, 1);
				o === s.substr(s.length - 1) && o.match(/'|"/) && (s = s.substr(1, s.length - 2));
				var u = s.substr(0, 3) === "url",
					a = t.createElement(u ? "img" : "span");
				return a.className = mt + "-before " + mt + "-after", Object.keys(i).filter(z).forEach(function(e) {
					try {
						a.style[e] = i[e]
					} catch (t) {
						ct.log(["Tried to assign readonly property ", e, "Error:", t])
					}
				}), u ? a.src = ct.parseBackgroundImage(s)[0].args[0] : a.innerHTML = s, a
			}

			function z(t) {
				return isNaN(e.parseInt(t, 10))
			}

			function W(e, t) {
				var n = U(e, ":before"),
					r = U(e, ":after");
				if (!n && !r) return;
				n && (e.className += " " + mt + "-before", e.parentNode.insertBefore(n, e), st(n, t, !0), e
						.parentNode.removeChild(n), e.className = e.className.replace(mt + "-before", "").trim()),
					r && (e.className += " " + mt + "-after", e.appendChild(r), st(r, t, !0), e.removeChild(r), e
						.className = e.className.replace(mt + "-after", "").trim())
			}

			function X(e, t, n, r) {
				var i = Math.round(r.left + n.left),
					s = Math.round(r.top + n.top);
				e.createPattern(t), e.translate(i, s), e.fill(), e.translate(-i, -s)
			}

			function V(e, t, n, r, i, s, o, u) {
				var a = [];
				a.push(["line", Math.round(i), Math.round(s)]), a.push(["line", Math.round(i + o), Math.round(s)]),
					a.push(["line", Math.round(i + o), Math.round(u + s)]), a.push(["line", Math.round(i), Math
						.round(u + s)
					]), F(e, a), e.save(), e.clip(), X(e, t, n, r), e.restore()
			}

			function $(e, t, n) {
				c(e, t.left, t.top, t.width, t.height, n)
			}

			function J(e, t, n, r, i) {
				var s = ct.BackgroundSize(e, t, r, i),
					o = ct.BackgroundPosition(e, t, r, i, s),
					u = vt(e, "backgroundRepeat").split(",").map(ct.trimText);
				r = Q(r, s), u = u[i] || u[0];
				switch (u) {
					case "repeat-x":
						V(n, r, o, t, t.left, t.top + o.top, 99999, r.height);
						break;
					case "repeat-y":
						V(n, r, o, t, t.left + o.left, t.top, r.width, 99999);
						break;
					case "no-repeat":
						V(n, r, o, t, t.left + o.left, t.top + o.top, r.width, r.height);
						break;
					default:
						X(n, r, o, {
							top: t.top,
							left: t.left,
							width: r.width,
							height: r.height
						})
				}
			}

			function K(e, t, n) {
				var r = vt(e, "backgroundImage"),
					i = ct.parseBackgroundImage(r),
					s, o = i.length;
				while (o--) {
					r = i[o];
					if (!r.args || r.args.length === 0) continue;
					var u = r.method === "url" ? r.args[0] : r.value;
					s = C(u), s ? J(e, t, n, s, o) : ct.log("html2canvas: Error loading background:", r)
				}
			}

			function Q(e, t) {
				if (e.width === t.width && e.height === t.height) return e;
				var n, r = lt.createElement("canvas");
				return r.width = t.width, r.height = t.height, n = r.getContext("2d"), R(n, e, 0, 0, e.width, e
					.height, 0, 0, t.width, t.height), r
			}

			function G(e, t, n) {
				return e.setVariable("globalAlpha", vt(t, "opacity") * (n ? n.opacity : 1))
			}

			function Y(e) {
				return e.replace("px", "")
			}

			function Z(e, t) {
				var n = vt(e, "transform") || vt(e, "-webkit-transform") || vt(e, "-moz-transform") || vt(e,
						"-ms-transform") || vt(e, "-o-transform"),
					r = vt(e, "transform-origin") || vt(e, "-webkit-transform-origin") || vt(e,
						"-moz-transform-origin") || vt(e, "-ms-transform-origin") || vt(e, "-o-transform-origin") ||
					"0px 0px";
				r = r.split(" ").map(Y).map(ct.asFloat);
				var i;
				if (n && n !== "none") {
					var s = n.match(bt);
					if (s) switch (s[1]) {
						case "matrix":
							i = s[2].split(",").map(ct.trimText).map(ct.asFloat)
					}
				}
				return {
					origin: r,
					matrix: i
				}
			}

			function et(e, t, n, r) {
				var a = u(t ? n.width : s(), t ? n.height : o()),
					f = {
						ctx: a,
						opacity: G(a, e, t),
						cssPosition: vt(e, "position"),
						borders: O(e),
						transform: r,
						clip: t && t.clip ? ct.Extend({}, t.clip) : null
					};
				return L(e, f, t), i.useOverflow === !0 && /(hidden|scroll|auto)/.test(vt(e, "overflow")) === !0 &&
					/(BODY)/i.test(e.nodeName) === !1 && (f.clip = f.clip ? k(f.clip, n) : n), f
			}

			function tt(e, t, n) {
				var r = {
					left: t.left + e[3].width,
					top: t.top + e[0].width,
					width: t.width - (e[1].width + e[3].width),
					height: t.height - (e[0].width + e[2].width)
				};
				return n && (r = k(r, n)), r
			}

			function nt(e, t) {
				var n = t.matrix ? ct.OffsetBounds(e) : ct.Bounds(e);
				return t.origin[0] += n.left, t.origin[1] += n.top, n
			}

			function rt(e, t, n, r) {
				var i = Z(e, t),
					s = nt(e, i),
					o, u = et(e, t, s, i),
					a = u.borders,
					f = u.ctx,
					l = tt(a, s, u.clip),
					c = j(e, s, a),
					h = pt.test(e.nodeName) ? "#efefef" : vt(e, "backgroundColor");
				F(f, c.clip), f.save(), f.clip(), l.height > 0 && l.width > 0 && !r ? ($(f, s, h), K(e, l, f)) :
					r && (u.backgroundColor = h), f.restore(), c.borders.forEach(function(e) {
						I(f, e.args, e.color)
					}), n || W(e, u);
				switch (e.nodeName) {
					case "IMG":
						(o = C(e.getAttribute("src"))) ? A(f, e, o, s, a): ct.log(
							"html2canvas: Error loading <img>:" + e.getAttribute("src"));
						break;
					case "INPUT":
						/^(text|url|email|submit|button|reset)$/.test(e.type) && (e.value || e.placeholder || "")
							.length > 0 && q(e, s, u);
						break;
					case "TEXTAREA":
						(e.value || e.placeholder || "").length > 0 && q(e, s, u);
						break;
					case "SELECT":
						(e.options || e.placeholder || "").length > 0 && q(e, s, u);
						break;
					case "LI":
						N(e, u, l);
						break;
					case "CANVAS":
						A(f, e, e, s, a)
				}
				return u
			}

			function it(e) {
				return vt(e, "display") !== "none" && vt(e, "visibility") !== "hidden" && !e.hasAttribute(
					"data-html2canvas-ignore")
			}

			function st(e, t, n) {
				it(e) && (t = rt(e, t, n, !1) || t, pt.test(e.nodeName) || ot(e, t, n))
			}

			function ot(e, t, n) {
				ct.Children(e).forEach(function(r) {
					r.nodeType === r.ELEMENT_NODE ? st(r, t, n) : r.nodeType === r.TEXT_NODE && E(e, r, t)
				})
			}

			function ut() {
				var e = vt(t.documentElement, "backgroundColor"),
					n = ct.isTransparent(e) && at === t.body,
					r = rt(at, null, !1, n);
				return ot(at, r), n && (e = r.backgroundColor), dt.removeChild(gt), {
					backgroundColor: e,
					stack: r
				}
			}
			e.scroll(0, 0);
			var at = i.elements === n ? t.body : i.elements[0],
				ft = 0,
				lt = at.ownerDocument,
				ct = f.Util,
				ht = ct.Support(i, lt),
				pt = new RegExp("(" + i.ignoreElements + ")"),
				dt = lt.body,
				vt = ct.getCSS,
				mt = "___html2canvas___pseudoelement",
				gt = lt.createElement("style");
			gt.innerHTML = "." + mt + '-before:before { content: "" !important; display: none !important; }' + "." +
				mt + '-after:after { content: "" !important; display: none !important; }', dt.appendChild(gt), r =
				r || {};
			var yt = function(e) {
					return function(t, n, r, i) {
						var s = r * e,
							o = i * e,
							u = t + r,
							a = n + i;
						return {
							topLeft: _({
								x: t,
								y: a
							}, {
								x: t,
								y: a - o
							}, {
								x: u - s,
								y: n
							}, {
								x: u,
								y: n
							}),
							topRight: _({
								x: t,
								y: n
							}, {
								x: t + s,
								y: n
							}, {
								x: u,
								y: a - o
							}, {
								x: u,
								y: a
							}),
							bottomRight: _({
								x: u,
								y: n
							}, {
								x: u,
								y: n + o
							}, {
								x: t + s,
								y: a
							}, {
								x: t,
								y: a
							}),
							bottomLeft: _({
								x: u,
								y: a
							}, {
								x: u - s,
								y: a
							}, {
								x: t,
								y: n + o
							}, {
								x: t,
								y: n
							})
						}
					}
				}(4 * ((Math.sqrt(2) - 1) / 3)),
				bt = /(matrix)\((.+)\)/;
			return ut()
		}, f.Preload = function(r) {
			function i(e) {
				N.href = e, N.href = N.href;
				var t = N.protocol + N.host;
				return t === m
			}

			function s() {
				g.log("html2canvas: start: images: " + v.numLoaded + " / " + v.numTotal + " (failed: " + v
					.numFailed + ")"), !v.firstRun && v.numLoaded >= v.numTotal && (g.log(
						"Finished loading images: # " + v.numTotal + " (failed: " + v.numFailed + ")"), typeof r
					.complete == "function" && r.complete(v))
			}

			function o(t, i, o) {
				var u, a = r.proxy,
					f;
				N.href = t, t = N.href, u = "html2canvas_" + w++, o.callbackname = u, a.indexOf("?") > -1 ? a +=
					"&" : a += "?", a += "url=" + encodeURIComponent(t) + "&callback=" + u, f = S.createElement(
						"script"), e[u] = function(t) {
						t.substring(0, 6) === "error:" ? (o.succeeded = !1, v.numLoaded++, v.numFailed++, s()) : (d(
							i, o), i.src = t), e[u] = n;
						try {
							delete e[u]
						} catch (r) {}
						f.parentNode.removeChild(f), f = null, delete o.script, delete o.callbackname
					}, f.setAttribute("type", "text/javascript"), f.setAttribute("src", a), o.script = f, e.document
					.body.appendChild(f)
			}

			function u(t, n) {
				var r = e.getComputedStyle(t, n),
					i = r.content;
				i.substr(0, 3) === "url" && y.loadImage(f.Util.parseBackgroundImage(i)[0].args[0]), h(r
					.backgroundImage, t)
			}

			function a(e) {
				u(e, ":before"), u(e, ":after")
			}

			function l(e, t) {
				var r = f.Generate.Gradient(e, t);
				r !== n && (v[e] = {
					img: r,
					succeeded: !0
				}, v.numTotal++, v.numLoaded++, s())
			}

			function c(e) {
				return e && e.method && e.args && e.args.length > 0
			}

			function h(e, t) {
				var r;
				f.Util.parseBackgroundImage(e).filter(c).forEach(function(e) {
					e.method === "url" ? y.loadImage(e.args[0]) : e.method.match(/\-?gradient$/) && (r ===
						n && (r = f.Util.Bounds(t)), l(e.value, r))
				})
			}

			function p(e) {
				var t = !1;
				try {
					g.Children(e).forEach(p)
				} catch (r) {}
				try {
					t = e.nodeType
				} catch (i) {
					t = !1, g.log("html2canvas: failed to access some element's nodeType - Exception: " + i.message)
				}
				if (t === 1 || t === n) {
					a(e);
					try {
						h(g.getCSS(e, "backgroundImage"), e)
					} catch (r) {
						g.log("html2canvas: failed to get background-image - Exception: " + r.message)
					}
					h(e)
				}
			}

			function d(t, i) {
				t.onload = function() {
					i.timer !== n && e.clearTimeout(i.timer), v.numLoaded++, i.succeeded = !0, t.onerror = t
						.onload = null, s()
				}, t.onerror = function() {
					if (t.crossOrigin === "anonymous") {
						e.clearTimeout(i.timer);
						if (r.proxy) {
							var n = t.src;
							t = new Image, i.img = t, t.src = n, o(t.src, t, i);
							return
						}
					}
					v.numLoaded++, v.numFailed++, i.succeeded = !1, t.onerror = t.onload = null, s()
				}
			}
			var v = {
					numLoaded: 0,
					numFailed: 0,
					numTotal: 0,
					cleanupDone: !1
				},
				m, g = f.Util,
				y, b, w = 0,
				E = r.elements[0] || t.body,
				S = E.ownerDocument,
				x = E.getElementsByTagName("img"),
				T = x.length,
				N = S.createElement("a"),
				C = function(e) {
					return e.crossOrigin !== n
				}(new Image),
				k;
			N.href = e.location.href, m = N.protocol + N.host, y = {
				loadImage: function(e) {
					var t, s;
					e && v[e] === n && (t = new Image, e.match(/data:image\/.*;base64,/i) ? (t.src = e
						.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ""), s = v[e] = {
							img: t
						}, v.numTotal++, d(t, s)) : i(e) || r.allowTaint === !0 ? (s = v[e] = {
						img: t
					}, v.numTotal++, d(t, s), t.src = e) : C && !r.allowTaint && r.useCORS ? (t
						.crossOrigin = "anonymous", s = v[e] = {
							img: t
						}, v.numTotal++, d(t, s), t.src = e) : r.proxy && (s = v[e] = {
						img: t
					}, v.numTotal++, o(e, t, s)))
				},
				cleanupDOM: function(i) {
					var o, u;
					if (!v.cleanupDone) {
						i && typeof i == "string" ? g.log("html2canvas: Cleanup because: " + i) : g.log(
							"html2canvas: Cleanup after timeout: " + r.timeout + " ms.");
						for (u in v)
							if (v.hasOwnProperty(u)) {
								o = v[u];
								if (typeof o == "object" && o.callbackname && o.succeeded === n) {
									e[o.callbackname] = n;
									try {
										delete e[o.callbackname]
									} catch (a) {}
									o.script && o.script.parentNode && (o.script.setAttribute("src",
											"about:blank"), o.script.parentNode.removeChild(o.script)), v
										.numLoaded++, v.numFailed++, g.log(
											"html2canvas: Cleaned up failed img: '" + u + "' Steps: " + v
											.numLoaded + " / " + v.numTotal)
								}
							} e.stop !== n ? e.stop() : t.execCommand !== n && t.execCommand("Stop", !1), t
							.close !== n && t.close(), v.cleanupDone = !0, (!i || typeof i != "string") &&
							s()
					}
				},
				renderingDone: function() {
					k && e.clearTimeout(k)
				}
			}, r.timeout > 0 && (k = e.setTimeout(y.cleanupDOM, r.timeout)), g.log(
				"html2canvas: Preload starts: finding background-images"), v.firstRun = !0, p(E), g.log(
				"html2canvas: Preload: Finding images");
			for (b = 0; b < T; b += 1) y.loadImage(x[b].getAttribute("src"));
			return v.firstRun = !1, g.log("html2canvas: Preload: Done."), v.numTotal === v.numLoaded && s(), y
		}, f.Renderer = function(e, r) {
			function i(e) {
				function t(e) {
					Object.keys(e).sort().forEach(function(n) {
						var i = [],
							s = [],
							o = [],
							u = [];
						e[n].forEach(function(e) {
								e.node.zIndex.isPositioned || e.node.zIndex.opacity < 1 ? o.push(e) : e
									.node.zIndex.isFloated ? s.push(e) : i.push(e)
							}),
							function a(e) {
								e.forEach(function(e) {
									u.push(e), e.children && a(e.children)
								})
							}(i.concat(s, o)), u.forEach(function(e) {
								e.context ? t(e.context) : r.push(e.node)
							})
					})
				}
				var r = [],
					i;
				return i = function(e) {
					function t(e, r, i) {
						var s = r.zIndex.zindex === "auto" ? 0 : Number(r.zIndex.zindex),
							o = e,
							u = r.zIndex.isPositioned,
							a = r.zIndex.isFloated,
							f = {
								node: r
							},
							l = i;
						if (r.zIndex.ownStacking) o = f.context = {
							"!": [{
								node: r,
								children: []
							}]
						}, l = n;
						else if (u || a) l = f.children = [];
						s === 0 && i ? i.push(f) : (e[s] || (e[s] = []), e[s].push(f)), r.zIndex.children
							.forEach(function(e) {
								t(o, e, l)
							})
					}
					var r = {};
					return t(r, e), r
				}(e), t(i), r
			}

			function s(e) {
				var t;
				if (typeof r.renderer == "string" && f.Renderer[e] !== n) t = f.Renderer[e](r);
				else {
					if (typeof e != "function") throw new Error("Unknown renderer");
					t = e(r)
				}
				if (typeof t != "function") throw new Error("Invalid renderer defined");
				return t
			}
			return s(r.renderer)(e, r, t, i(e.stack), f)
		}, f.Util.Support = function(e, t) {
			function r() {
				var e = new Image,
					r = t.createElement("canvas"),
					i = r.getContext === n ? !1 : r.getContext("2d");
				if (i === !1) return !1;
				r.width = r.height = 10, e.src = ["data:image/svg+xml,",
					"<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>",
					"<foreignObject width='10' height='10'>",
					"<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>", "sup", "</div>",
					"</foreignObject>", "</svg>"
				].join("");
				try {
					i.drawImage(e, 0, 0), r.toDataURL()
				} catch (s) {
					return !1
				}
				return f.Util.log("html2canvas: Parse: SVG powered rendering available"), !0
			}

			function i() {
				var e, n, r, i, s = !1;
				return t.createRange && (e = t.createRange(), e.getBoundingClientRect && (n = t.createElement(
						"boundtest"), n.style.height = "123px", n.style.display = "block", t.body
					.appendChild(n), e.selectNode(n), r = e.getBoundingClientRect(), i = r.height, i ===
					123 && (s = !0), t.body.removeChild(n))), s
			}
			return {
				rangeBounds: i(),
				svgRendering: e.svgRendering && r()
			}
		}, e.html2canvas = function(t, n) {
			t = t.length ? t : [t];
			var r, i, s = {
				logging: !1,
				elements: t,
				background: "#fff",
				proxy: null,
				timeout: 0,
				useCORS: !1,
				allowTaint: !1,
				svgRendering: !1,
				ignoreElements: "IFRAME|OBJECT|PARAM",
				useOverflow: !0,
				letterRendering: !1,
				chinese: !1,
				width: null,
				height: null,
				taintTest: !0,
				renderer: "Canvas"
			};
			return s = f.Util.Extend(n, s), f.logging = s.logging, s.complete = function(e) {
				if (typeof s.onpreloaded == "function" && s.onpreloaded(e) === !1) return;
				r = f.Parse(e, s);
				if (typeof s.onparsed == "function" && s.onparsed(r) === !1) return;
				i = f.Renderer(r, s), typeof s.onrendered == "function" && s.onrendered(i)
			}, e.setTimeout(function() {
				f.Preload(s)
			}, 0), {
				render: function(e, t) {
					return f.Renderer(e, f.Util.Extend(t, s))
				},
				parse: function(e, t) {
					return f.Parse(e, f.Util.Extend(t, s))
				},
				preload: function(e) {
					return f.Preload(f.Util.Extend(e, s))
				},
				log: f.Util.log
			}
		}, e.html2canvas.log = f.Util.log, e.html2canvas.Renderer = {
			Canvas: n
		}, f.Renderer.Canvas = function(e) {
			function r(e, t) {
				e.beginPath(), t.forEach(function(t) {
					e[t.name].apply(e, t.arguments)
				}), e.closePath()
			}

			function i(e) {
				if (u.indexOf(e.arguments[0].src) === -1) {
					l.drawImage(e.arguments[0], 0, 0);
					try {
						l.getImageData(0, 0, 1, 1)
					} catch (t) {
						return a = o.createElement("canvas"), l = a.getContext("2d"), !1
					}
					u.push(e.arguments[0].src)
				}
				return !0
			}

			function s(t, n) {
				switch (n.type) {
					case "variable":
						t[n.name] = n.arguments;
						break;
					case "function":
						switch (n.name) {
							case "createPattern":
								if (n.arguments[0].width > 0 && n.arguments[0].height > 0) try {
									t.fillStyle = t.createPattern(n.arguments[0], "repeat")
								} catch (s) {
									c.log("html2canvas: Renderer: Error creating pattern", s.message)
								}
								break;
							case "drawShape":
								r(t, n.arguments);
								break;
							case "drawImage":
								n.arguments[8] > 0 && n.arguments[7] > 0 && (!e.taintTest || e.taintTest && i(n)) &&
									t.drawImage.apply(t, n.arguments);
								break;
							default:
								t[n.name].apply(t, n.arguments)
						}
				}
			}
			e = e || {};
			var o = t,
				u = [],
				a = t.createElement("canvas"),
				l = a.getContext("2d"),
				c = f.Util,
				h = e.canvas || o.createElement("canvas");
			return function(e, t, r, i, o) {
				var u = h.getContext("2d"),
					a, f, l, p = e.stack;
				return h.width = h.style.width = t.width || p.ctx.width, h.height = h.style.height = t.height ||
					p.ctx.height, l = u.fillStyle, u.fillStyle = c.isTransparent(p.backgroundColor) && t
					.background !== n ? t.background : e.backgroundColor, u.fillRect(0, 0, h.width, h.height), u
					.fillStyle = l, i.forEach(function(e) {
						u.textBaseline = "bottom", u.save(), e.transform.matrix && (u.translate(e.transform
								.origin[0], e.transform.origin[1]), u.transform.apply(u, e.transform
								.matrix), u.translate(-e.transform.origin[0], -e.transform.origin[1])), e
							.clip && (u.beginPath(), u.rect(e.clip.left, e.clip.top, e.clip.width, e.clip
								.height), u.clip()), e.ctx.storage && e.ctx.storage.forEach(function(e) {
								s(u, e)
							}), u.restore()
					}), c.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj"), t.elements
					.length === 1 && typeof t.elements[0] == "object" && t.elements[0].nodeName !== "BODY" ? (
						f = o.Util.Bounds(t.elements[0]), a = r.createElement("canvas"), a.width = Math.ceil(f
							.width), a.height = Math.ceil(f.height), u = a.getContext("2d"), u.drawImage(h, f
							.left, f.top, f.width, f.height, 0, 0, f.width, f.height), h = null, a) : h
			}
		}
})(window, document);
var detectEdge = function() {
	function e(e, t, s) {
		var o = n.createImageData(r, i),
			u = e.width,
			a = e.height,
			f = e.data,
			l = o.data,
			c = u * 4,
			h = c + 4,
			p = a - 1,
			d = u - 1,
			v = new Date;
		for (var m = 1; m < p; ++m) {
			var g = h - 4,
				y = g - c,
				b = g + c,
				w = -f[y] - f[g] - f[b],
				E = -f[++y] - f[++g] - f[++b],
				S = -f[++y] - f[++g] - f[++b],
				x = f[y += 2],
				T = f[g += 2],
				N = f[b += 2],
				C = -x - T - N,
				k = f[++y],
				L = f[++g],
				A = f[++b],
				O = -k - L - A,
				M = f[++y],
				_ = f[++g],
				D = f[++b],
				P = -M - _ - D;
			for (var H = 1; H < d; ++H) {
				g = h + 4, y = g - c, b = g + c;
				var B = t + w - x - T * -8 - N,
					j = t + E - k - L * -8 - A,
					F = t + S - M - _ * -8 - D;
				w = C, E = O, S = P, x = f[y], T = f[g], N = f[b], C = -x - T - N, k = f[++y], L = f[++g], A = f[++
					b], O = -k - L - A, M = f[++y], _ = f[++g], D = f[++b], P = -M - _ - D, s ? (factor = .3 * (
					B + C) + .59 * (j + O) + .11 * (F + P), l[h] = factor, l[++h] = factor, l[++h] = factor) : (
					l[h] = B + C, l[++h] = j + O, l[++h] = F + P), l[++h] = 255, ++h
			}
			h += 8
		}
		return o
	}

	function t(t) {
		var n = t.width,
			r = t.height,
			i = e(t, 255, 1),
			s = i.data,
			o = 0;
		for (var u = 0; u < r; ++u)
			for (var a = 0; a < n; ++a) s[o] < 240 ? (s[o] = 0, s[++o] = 0, s[++o] = 0) : (s[o] = 255, s[++o] = 255,
				s[++o] = 255), s[++o] = 255, ++o;
		return i
	}
	var n, r, i, s, o;
	return function(e) {
		r = e.width, i = e.height, o = new Array(r), s = new Array(r), n = e.getContext("2d");
		var u = n.getImageData(0, 0, r, i),
			a = t(u),
			f = a.data;
		for (var l = 0; l < r; l++) {
			s[l] = new Array(i), o[l] = new Array(i);
			for (var c = 0; c < i; c++) {
				o[l][c] = 0;
				var h = (c * r + l) * 4;
				f[h] < 255 || f[h + 1] < 255 || f[h + 2] < 255 ? (s[l][c] = !0, f[h] = f[h + 1] = f[h + 2] =
					255) : f[h] = f[h + 1] = f[h + 2] = 0
			}
		}
		return n.putImageData(a, 0, 0), {
			dropPoints: s,
			dropCount: o,
			cw: r,
			ch: i
		}
	}
}();
Animation = function() {
	"use strict";

	function e(e, t) {
		e && typeof e == "function" && (i = e, s = t)
	}

	function t(e) {
		return window.requestAnimationFrame ? function() {
			window.requestAnimationFrame(e)
		} : window.msRequestAnimationFrame ? function() {
			window.msRequestAnimationFrame(e)
		} : window.webkitRequestAnimationFrame ? function() {
			window.webkitRequestAnimationFrame(e)
		} : window.mozRequestAnimationFrame ? function() {
			window.mozRequestAnimationFrame(e)
		} : function() {
			setTimeout(e, o)
		}
	}

	function n() {
		i(s), u()
	}

	function r() {
		u = t(n), u()
	}
	var i, s, o = 16.7,
		u;
	return {
		addFrameRenderer: e,
		start: r
	}
}(), Snowflakes = function() {
	"use strict";

	function e(e, n) {
		var r = new Image;
		r.onload = function() {
			for (var i = 0; i < h; i++) {
				var s = document.createElement("canvas");
				s.width = p, s.height = d;
				var a = s.getContext("2d");
				a.drawImage(r, i * p, 0, p, d, 0, 0, p, d), c.push(s)
			}
			e && (u = e), n || (o = []);
			for (var i = 0; i < u; i++) o.push(t())
		}, r.src = l
	}

	function t() {
		var e = Math.random() * (E - w) + w,
			t = Math.random() * v.width,
			n = Math.random() * v.height;
		return {
			x: t,
			y: n,
			vv: Math.random() * (g - m) + m,
			hv: Math.random() * (b - y) + y,
			sw: e * p,
			sh: e * d,
			hsw: e * p * .5,
			hsh: e * d * .5,
			mhd: Math.random() * (x - S) + S,
			hd: 0,
			hdi: Math.random() / (b * S),
			o: Math.random() * (N - T) + T,
			oi: Math.random() / C,
			si: Math.ceil(Math.random() * (h - 1)),
			nl: !1
		}
	}

	function n(e) {
		P.globalAlpha = e.o, P.drawImage(c[e.si], 0, 0, p, d, e.x, e.y, e.sw, e.sh)
	}

	function r() {
		for (var e = 0; e < o.length; e++) {
			var t = o[e],
				r = parseInt(t.x + t.hsw),
				i = parseInt(t.y + t.hsh);
			if (j[r] && j[r][i] && !F[r][i]) {
				var s = 0;
				F[r] && F[r][i - 1] && (s += 1), F[r + 1] && F[r + 1][i - 1] && (s += 1), F[r + 1] && F[r + 1][i] &&
					(s += 1), F[r + 1] && F[r + 1][i + 1] && (s += 1), F[r] && F[r][i + 1] && (s += 1), F[r - 1] &&
					F[r - 1][i + 1] && (s += 1), F[r - 1] && F[r - 1][i] && (s += 1), F[r - 1] && F[r - 1][i - 1] &&
					(s += 1);
				if (s * Math.random() < 1) {
					F[r][i] = 1, n(t), t.y = 0, t.x = Math.random() * v.width;
					continue
				}
			}
			t.y += t.vv * A, t.x += (t.hd + t.hv) * A, t.hd += t.hdi;
			if (t.hd < -t.mhd || t.hd > t.mhd) t.hdi = -t.hdi;
			t.o += t.oi;
			if (t.o > N || t.o < T) t.oi = -t.oi;
			t.o > N && (t.o = N), t.o < T && (t.o = T);
			var u = !1;
			t.y > v.height + d / 2 && (t.y = 0, u = !0), t.y < 0 && (t.y = v.height, u = !0), t.x > v.width + p /
				2 && (t.x = 0, u = !0), t.x < 0 && (t.x = v.width, u = !0), u && (t.nl = !1)
		}
	}

	function i(e) {
		r(), e.clearRect(0, 0, e.canvas.width, e.canvas.height);
		for (var t = 0; t < o.length; t++) {
			var n = o[t];
			e.globalAlpha = n.o, e.drawImage(c[n.si], 0, 0, p, d, n.x, n.y, n.sw, n.sh)
		}
	}

	function s(t) {
		var n = "position:absolute;left:0;top:0;z-index:100001;pointer-events: none;";
		v.width = t.cw, v.height = t.ch, e(t.flakeCount), D = document.createElement("canvas"), H = document
			.createElement("canvas"), D.style.cssText = n, H.style.cssText = n, document.body.appendChild(D),
			document.body.appendChild(H), P = D.getContext("2d"), B = H.getContext("2d"), D.width = H.width = t.cw,
			D.height = H.height = t.ch, j = t.dropPoints, F = t.dropCount, I = t.maxPointDrop, Animation
			.addFrameRenderer(i, B), Animation.start()
	}
	var o = [],
		u = 1,
		a = .1,
		f = 2,
		l = "http://p8.qhimg.com/d/inn/43158a81/Snowflakes.png",
		c = [],
		h = 5,
		p = 20,
		d = 20,
		v = {},
		m = 1,
		g = 4,
		y = -1,
		b = 3,
		w = .2,
		E = 1.25,
		S = 2,
		x = 3,
		T = .2,
		N = .9,
		C = 50,
		k = 60,
		L = 0,
		A = 1,
		O = .1,
		M = 1.5,
		_ = .05,
		D, P, H, B, j, F, I;
	return {
		init: s
	}
}(), html2canvas([document.body], {
	onrendered: function(e) {
		try {
			var t = detectEdge(e);
			t.flakeCount = 200, Snowflakes.init(t)
		} catch (n) {}
	}
});