export interface Class {
	id: string
	name: string
	image: string
}

export interface Spec {
	id: string
	name: string
	image: string
	weapons: Weapon[]
	primaryWeapon: Weapon
}

export interface Weapon {
	id: string
	name: string
	image: string
	description: string
	stats: string
	overclocks: Overclock[]
}

export interface Overclock {
	id: string
	name: string
	image: string
	description: string
	unstable: boolean
}

export interface Build {
	id: string
	name: string
	weapons: { weapon: Weapon; position: number }[]
	class: Class
	spec: Spec
	artifacts: Artifact[]
	position: string
}

export interface metaBuild {
	build: Build
	popular: boolean
	class: Class
	id: string
	position: string
}

export interface Artifact {
	id: string
	name: string
	image: string
	description: string
}

export type ClassesSpecsAndWeapons = Class[]

export interface BuildResponse {
	id: string
	name: string
	spec: Spec
	class: Class
	weapons: {
		weapon: Weapon
		overclocks: { overclock: Overclock }[]
		position: number
	}[]
	userId: string
	artifacts: Artifact[]
	position: number
	updatedAt: string
	specId: string
}

export interface WeaponResponse {
	id: string
	name: string
	image: string
	description: string
	stats: string
	overclocks: Overclock[]
}
