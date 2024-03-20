import { useEffect, useState } from 'react'
import { metaBuild } from '@/schemas/dataSchemas'

const classNamez = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

export const useBuilds = (
	search: string,
	classNames: typeof classNamez,
	builds: metaBuild[]
) => {
	const [selectedClass, setSelectedClass] = useState<
		(typeof classNames)[number] | ''
	>('')
	const popularBuilds = builds.filter((item) => item.popular)
	builds = builds.filter((item) => !item.popular)
	const [filteredBuilds, setFilteredBuilds] = useState(
		builds.filter((item) => !item.popular)
	)
	const [popularFilteredBuilds, setPopularFilteredBuilds] =
		useState(popularBuilds)

	useEffect(() => {
		if (search === '') {
			if (selectedClass === '') {
				setFilteredBuilds(builds.filter((item) => !item.popular))
				setPopularFilteredBuilds(popularBuilds)
			} else {
				setFilteredBuilds(
					builds.filter(
						(item) => item.class.name === selectedClass && !item.popular
					)
				)
				setPopularFilteredBuilds(
					popularBuilds.filter(
						(item) => item.class.name === selectedClass && item.popular
					)
				)
			}
		} else {
			if (selectedClass === '') {
				setFilteredBuilds(
					builds.filter(
						(item) =>
							item.build.name.toLowerCase().includes(search.toLowerCase()) ||
							item.build.weapons.some((weapon) =>
								weapon.weapon.name.toLowerCase().includes(search.toLowerCase())
							)
					)
				)
				setPopularFilteredBuilds(
					popularBuilds.filter(
						(item) =>
							item.build.name.toLowerCase().includes(search.toLowerCase()) ||
							item.build.weapons.some((weapon) =>
								weapon.weapon.name.toLowerCase().includes(search.toLowerCase())
							)
					)
				)
			} else {
				setFilteredBuilds(
					builds.filter((item) => {
						let nameMatch = item.build.name
							.toLowerCase()
							.includes(search.toLowerCase())
						let weaponMatch = item.build.weapons.some((weapon) =>
							weapon.weapon.name.toLowerCase().includes(search.toLowerCase())
						)
						let classMatch = item.class.name === selectedClass
						if (classMatch && (nameMatch || weaponMatch)) {
							return true
						}
						return false
					})
				)
				setPopularFilteredBuilds(
					popularBuilds.filter((item) => {
						let nameMatch = item.build.name
							.toLowerCase()
							.includes(search.toLowerCase())
						let weaponMatch = item.build.weapons.some((weapon) =>
							weapon.weapon.name.toLowerCase().includes(search.toLowerCase())
						)
						let classMatch = item.class.name === selectedClass
						if (classMatch && (nameMatch || weaponMatch)) {
							return true
						}
						return false
					})
				)
			}
		}
	}, [search, selectedClass])

	return {
		popularBuilds,
		filteredBuilds,
		popularFilteredBuilds,
		setSelectedClass,
		selectedClass,
	}
}
