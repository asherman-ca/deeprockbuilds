// import { useState } from 'react'

// const useBuilds = (builds, selectedClass, search) => {
// 	const [filteredBuilds, setFilteredBuilds] = useState([])
// 	const [popularFilteredBuilds, setPopularFilteredBuilds] = useState([])

// 	return { filteredBuilds, popularFilteredBuilds }
// }

// function filterByClass(builds, selectedClass) {
// 	return builds.filter((build) => build.class.name === selectedClass)
// }

// function filterBySearchTerm(builds, searchTerm) {
// 	return builds.filter(
// 		(build) =>
// 			build.build.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 			build.build.weapons.some((weapon) =>
// 				weapon.weapon.name.toLowerCase().includes(searchTerm.toLowerCase())
// 			)
// 	)
// }

// function filterByPopularity(builds) {
// 	return builds.filter((build) => build.popular)
// }
