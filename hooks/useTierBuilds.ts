import { useEffect, useState } from 'react'
import { metaBuild } from '@/schemas/dataSchemas'
const classNamez = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

export const useTierBuilds = (
	search: string,
	classNames: typeof classNamez,
	builds: metaBuild[]
) => {
	const [selectedClass, setSelectedClass] = useState<
		(typeof classNames)[number] | ''
	>('')
	const [filteredBuilds, setFilteredBuilds] = useState(builds)
}
