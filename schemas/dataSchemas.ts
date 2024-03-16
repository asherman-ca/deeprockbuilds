export interface Class {
	id: string
	name: string
	image: string
}

export interface Spec {
	id: string
	name: string
	image: string
}

export interface Weapon {
	id: string
	name: string
	image: string
}

export interface Build {
	id: string
	name: string
	weapons: { weapon: Weapon }[]
	class: Class
	spec: Spec
}

export interface metaBuild {
	build: Build
	popular: boolean
	class: Class
	id: string
}
