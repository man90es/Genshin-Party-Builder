const ROLE_DAMAGE = {
	id: 'ROLE_DAMAGE'
}
const ROLE_SUPPORT = {
	id: 'ROLE_SUPPORT'
}
const ROLE_HEALER = {
	id: 'ROLE_HEALER'
}

const ELEMENT_ANEMO = {
	name: 'Anemo',
	id: 'ELEMENT_ANEMO',
	colour: 'lightgreen'
}

const ELEMENT_PYRO = {
	name: 'Pyro',
	id: 'ELEMENT_PYRO',
	colour: 'red'
}

const ELEMENT_ELECTRO = {
	name: 'Electro',
	id: 'ELEMENT_ELECTRO',
	colour: 'darkviolet'
}

const ELEMENT_HYDRO = {
	name: 'Hydro',
	id: 'ELEMENT_HYDRO',
	colour: 'blue'
}

const ELEMENT_CRYO = {
	name: 'Cryo',
	id: 'ELEMENT_CRYO',
	colour: 'lightblue'
}

const ELEMENT_GEO = {
	name: 'Geo',
	id: 'ELEMENT_GEO',
	colour: 'yellow'
}

// eslint-disable-next-line no-unused-vars
const ELEMENT_DENDRO = {
	name: 'Dendro',
	id: 'ELEMENT_DENDRO',
	colour: 'green'
}

const CHARACTER_XIAO = {
	name: 'Xiao',
	id: 'CHARACTER_XIAO',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ANEMO,
	rating: {
		ROLE_DAMAGE: [5, 5, 5, 5, 5, 5, 5],
		ROLE_SUPPORT: [1, 1, 1, 1, 1, 1, 1],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_SUCROSE = {
	name: 'Sucrose',
	id: 'CHARACTER_SUCROSE',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_ANEMO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 2, 2, 2, 2],
		ROLE_SUPPORT: [3, 4, 4, 4, 4, 4, 4],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_JEAN = {
	name: 'Jean',
	id: 'CHARACTER_JEAN',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ANEMO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 3, 3, 3],
		ROLE_SUPPORT: [4, 4, 4, 4, 4, 4, 4],
		ROLE_HEALER: [4, 4, 4, 4, 4, 4, 4],
	},
}

const CHARACTER_VENTI = {
	name: 'Venti',
	id: 'CHARACTER_VENTI',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ANEMO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 3, 3, 3],
		ROLE_SUPPORT: [5, 5, 5, 5, 5, 5, 5],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_TRAVELLER_ANEMO = {
	name: 'Traveller',
	id: 'CHARACTER_TRAVELLER_ANEMO',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ANEMO,
	rating: {
		ROLE_DAMAGE: [0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5],
		ROLE_SUPPORT: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_KEQING = {
	name: 'Keqing',
	id: 'CHARACTER_KEQING',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE: [4, 4, 4, 4, 4, 4, 4],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_BENNETT = {
	name: 'Bennett',
	id: 'CHARACTER_BENNETT',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 3, 3, 3],
		ROLE_SUPPORT: [5, 5, 5, 5, 5, 5, 5],
		ROLE_HEALER: [4, 5, 5, 5, 5, 5, 5],
	},
}

const CHARACTER_DILUC = {
	name: 'Diluc',
	id: 'CHARACTER_DILUC',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [5, 5, 5, 5, 5, 5, 5],
		ROLE_SUPPORT: [2, 2, 2, 2, 2, 2, 2],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_GANYU = {
	name: 'Ganyu',
	id: 'CHARACTER_GANYU',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [5, 5, 5, 5, 5, 5, 5],
		ROLE_SUPPORT: [5, 5, 5, 5, 5, 5, 5],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_KLEE = {
	name: 'Klee',
	id: 'CHARACTER_KLEE',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [5, 5, 5, 5, 5, 5, 5],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_MONA = {
	name: 'Mona',
	id: 'CHARACTER_MONA',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_HYDRO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 3, 3, 3],
		ROLE_SUPPORT: [5, 5, 5, 5, 5, 5, 5],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_TARTAGLIA = {
	name: 'Tartaglia',
	id: 'CHARACTER_TARTAGLIA',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_HYDRO,
	rating: {
		ROLE_DAMAGE: [4, 4, 4, 4, 4, 4, 5],
		ROLE_SUPPORT: [1, 1, 1, 1, 1, 1, 1],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_XINGQIU = {
	name: 'Xingqiu',
	id: 'CHARACTER_XINGQIU',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_HYDRO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 2, 2, 2, 2],
		ROLE_SUPPORT: [4, 4, 4, 4, 4, 4, 5],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_ZHONGLI = {
	name: 'Zhongli',
	id: 'CHARACTER_ZHONGLI',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_GEO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 3, 3, 3],
		ROLE_SUPPORT: [5, 5, 5, 5, 5, 5, 5],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_ALBEDO = {
	name: 'Albedo',
	id: 'CHARACTER_ALBEDO',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_GEO,
	rating: {
		ROLE_DAMAGE: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5],
		ROLE_SUPPORT: [4, 4, 4, 4, 4, 4, 4],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_NINGGUANG = {
	name: 'Ningguang',
	id: 'CHARACTER_NINGGUANG',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_GEO,
	rating: {
		ROLE_DAMAGE: [3, 4, 4, 4, 4, 4, 4],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_DIONA = {
	name: 'Diona',
	id: 'CHARACTER_DIONA',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 2, 2, 2, 2],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [3, 4, 4, 4, 4, 4, 4],
	},
}

const CHARACTER_QIQI = {
	name: 'Qiqi',
	id: 'CHARACTER_QIQI',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 2, 2, 2, 2],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [4, 4, 4, 4, 4, 4, 4],
	},
}

const CHARACTER_FISCHL = {
	name: 'Fischl',
	id: 'CHARACTER_FISCHL',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 3, 3, 4],
		ROLE_SUPPORT: [4, 4, 4, 4, 4, 4, 4],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_RAZOR = {
	name: 'Razor',
	id: 'CHARACTER_RAZOR',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 4, 4, 4],
		ROLE_SUPPORT: [1, 1, 1, 1, 1, 1, 1],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_XIANGLING = {
	name: 'Xiangling',
	id: 'CHARACTER_XIANGLING',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [3, 3, 3, 3, 3, 3, 3],
		ROLE_SUPPORT: [3, 4, 4, 4, 4, 4, 4],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_CHONGYUN = {
	name: 'Chongyun',
	id: 'CHARACTER_CHONGYUN',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 2, 2, 2, 2],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_KAEYA = {
	name: 'Kaeya',
	id: 'CHARACTER_KAEYA',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [1, 1, 1, 1, 1, 1, 1],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_BARBARA = {
	name: 'Barbara',
	id: 'CHARACTER_BARBARA',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_HYDRO,
	rating: {
		ROLE_DAMAGE: [1, 1, 1, 1, 1, 1, 1],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 4],
	},
}

const CHARACTER_BEIDOU = {
	name: 'Beidou',
	id: 'CHARACTER_BEIDOU',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 2, 3, 3, 3],
		ROLE_SUPPORT: [2, 2, 2, 2, 2, 2, 2],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_XINYAN = {
	name: 'Xinyan',
	id: 'CHARACTER_XINYAN',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 3, 3, 3, 3],
		ROLE_SUPPORT: [2, 2, 2, 2, 2, 2, 2],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_LISA = {
	name: 'Lisa',
	id: 'CHARACTER_LISA',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE: [1, 1, 1, 1, 1, 1, 1],
		ROLE_SUPPORT: [2, 2, 2, 2, 2, 2, 2],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_NOELLE = {
	name: 'Noelle',
	id: 'CHARACTER_NOELLE',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_GEO,
	rating: {
		ROLE_DAMAGE: [2, 2, 2, 2, 2, 2, 2],
		ROLE_SUPPORT: [1, 2, 2, 2, 2, 2, 2],
		ROLE_HEALER: [1, 1, 1, 1, 1, 1, 1],
	},
}

const CHARACTER_TRAVELLER_GEO = {
	name: 'Traveller',
	id: 'CHARACTER_TRAVELLER_GEO',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_GEO,
	rating: {
		ROLE_DAMAGE: [0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5],
		ROLE_SUPPORT: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_AMBER = {
	name: 'Amber',
	id: 'CHARACTER_AMBER',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [1, 1, 1, 1, 1, 1, 1],
		ROLE_SUPPORT: [1, 1, 1, 1, 1, 1, 1],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_HU_TAO = {
	name: 'Hu Tao',
	id: 'CHARACTER_HU_TAO',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [4, 5, 5, 5, 5, 5, 5],
		ROLE_SUPPORT: [3, 3, 3, 3, 3, 3, 3],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_ROSARIA = {
	name: 'Rosaria',
	id: 'CHARACTER_ROSARIA',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [3, 3.2, 4, 4.1, 4.2, 4.3, 4.4],
		ROLE_SUPPORT: [3, 3.2, 4, 4.1, 4.3, 4.4, 4.4],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_YANFEI = {
	name: 'Yanfei',
	id: 'CHARACTER_YANFEI',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [2, 3, 3.1, 3.2, 3.3, 3.4, 3.5],
		ROLE_SUPPORT: [3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_EULA = {
	name: 'Eula',
	id: 'CHARACTER_EULA',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6],
		ROLE_SUPPORT: [3, 3, 3.2, 3.2, 3.3, 3.4, 3.5],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_KAZUHA = {
	name: 'Kazuha',
	id: 'CHARACTER_KAZUHA',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ANEMO,
	rating: {
		ROLE_DAMAGE: [3.9, 4, 4.1, 4.2, 4.2, 4.3, 4.4],
		ROLE_SUPPORT: [4, 4.1, 4.2, 4.2, 4.3, 4.3, 4.3],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_AYAKA = {
	name: 'Ayaka',
	id: 'CHARACTER_AYAKA',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_CRYO,
	rating: {
		ROLE_DAMAGE: [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6],
		ROLE_SUPPORT: [5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.5],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_TRAVELLER_ELECTRO = {
	name: 'Traveller',
	id: 'CHARACTER_TRAVELLER_ELECTRO',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE: [2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6],
		ROLE_SUPPORT: [3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_YOIMIYA = {
	name: 'Yoimiya',
	id: 'CHARACTER_YOIMIYA',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_PYRO,
	rating: {
		ROLE_DAMAGE: [4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.5],
		ROLE_SUPPORT: [3.9, 4.0, 4.1, 4.2, 4.3, 4.4],
		ROLE_HEALER: [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_SAYU = {
	name: 'Sayu',
	id: 'CHARACTER_SAYU',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_ANEMO,
	rating: {
		ROLE_DAMAGE: [3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6],
		ROLE_SUPPORT: [3.5, 3.6, 3.7, 3.8, 3.9, 4],
		ROLE_HEALER: [3.5, 3.6, 3.7, 3.8, 3.9, 4],
	},
}

const CHARACTER_RAIDEN_SHOGUN = {
	name: 'Shogun',
	id: 'CHARACTER_RAIDEN_SHOGUN',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE:  [4, 4, 4, 4, 4, 4, 4],
		ROLE_SUPPORT: [4, 4, 4, 4, 4, 4, 4],
		ROLE_HEALER:  [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_KUJOU_SARA = {
	name: 'Sara',
	id: 'CHARACTER_KUJOU_SARA',
	stars: 4,
	colour: 'purple',
	element: ELEMENT_ELECTRO,
	rating: {
		ROLE_DAMAGE:  [1, 1, 1, 1, 1, 1, 1],
		ROLE_SUPPORT: [2, 2, 2, 2, 2, 2, 2],
		ROLE_HEALER:  [0, 0, 0, 0, 0, 0, 0],
	},
}

const CHARACTER_SANGONOMIYA_KOKOMI = {
	name: 'Kokomi',
	id: 'CHARACTER_SANGONOMIYA_KOKOMI',
	stars: 5,
	colour: 'yellow',
	element: ELEMENT_HYDRO,
	rating: {
		ROLE_DAMAGE:  [1, 1, 1, 1, 1, 1, 1],
		ROLE_SUPPORT: [2, 2, 2, 2, 2, 2, 2],
		ROLE_HEALER:  [2, 2, 2, 2, 2, 2, 2],
	},
}

export const ALL_CHARACTERS = {
	CHARACTER_ALBEDO,
	CHARACTER_AMBER,
	CHARACTER_AYAKA,
	CHARACTER_BARBARA,
	CHARACTER_BEIDOU,
	CHARACTER_BENNETT,
	CHARACTER_CHONGYUN,
	CHARACTER_DILUC,
	CHARACTER_DIONA,
	CHARACTER_EULA,
	CHARACTER_FISCHL,
	CHARACTER_GANYU,
	CHARACTER_HU_TAO,
	CHARACTER_JEAN,
	CHARACTER_KAEYA,
	CHARACTER_KAZUHA,
	CHARACTER_KEQING,
	CHARACTER_KLEE,
	CHARACTER_SANGONOMIYA_KOKOMI,
	CHARACTER_LISA,
	CHARACTER_MONA,
	CHARACTER_NINGGUANG,
	CHARACTER_NOELLE,
	CHARACTER_QIQI,
	CHARACTER_RAIDEN_SHOGUN,
	CHARACTER_RAZOR,
	CHARACTER_ROSARIA,
	CHARACTER_KUJOU_SARA,
	CHARACTER_SAYU,
	CHARACTER_SUCROSE,
	CHARACTER_TARTAGLIA,
	CHARACTER_TRAVELLER_ANEMO,
	CHARACTER_TRAVELLER_ELECTRO,
	CHARACTER_TRAVELLER_GEO,
	CHARACTER_VENTI,
	CHARACTER_XIANGLING,
	CHARACTER_XIAO,
	CHARACTER_XINGQIU,
	CHARACTER_XINYAN,
	CHARACTER_YANFEI,
	CHARACTER_YOIMIYA,
	CHARACTER_ZHONGLI,
}

export const ALL_ROLES = {
	ROLE_DAMAGE,
	ROLE_SUPPORT,
	ROLE_HEALER
}
