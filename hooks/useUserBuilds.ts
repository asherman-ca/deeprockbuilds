import { useEffect, useState } from 'react'
import { Build } from '@/schemas/dataSchemas'

const classNamez = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

export const useUserBuilds = (
	search: string,
	classNames: typeof classNamez,
	builds: Build[]
) => {
	const [selectedClass, setSelectedClass] = useState<
		(typeof classNames)[number] | ''
	>('')

	const [filteredBuilds, setFilteredBuilds] = useState(builds)

	useEffect(() => {
		if (search === '') {
			if (selectedClass === '') {
				setFilteredBuilds(builds)
			} else {
				setFilteredBuilds(
					builds.filter((item) => item.class.name === selectedClass)
				)
			}
		} else {
			if (selectedClass === '') {
				setFilteredBuilds(
					builds.filter(
						(item) =>
							item.name.toLowerCase().includes(search.toLowerCase()) ||
							item.weapons.some((weapon) =>
								weapon.weapon.name.toLowerCase().includes(search.toLowerCase())
							)
					)
				)
			} else {
				setFilteredBuilds(
					builds.filter((item) => {
						let nameMatch = item.name
							.toLowerCase()
							.includes(search.toLowerCase())
						let weaponMatch = item.weapons.some((weapon) =>
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
		filteredBuilds,
		setSelectedClass,
		selectedClass,
	}
}
