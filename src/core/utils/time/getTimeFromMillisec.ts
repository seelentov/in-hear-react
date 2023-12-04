export const getTimeFromMilliseconds = (milliseconds: number): string => {
	const seconds = milliseconds / 100
	const minutes = Math.floor(seconds / 60)

	const lastSeconds = Math.floor(seconds - minutes * 60)

	const resultSeconds =
		lastSeconds < 10 ? `0${lastSeconds}` : `${lastSeconds}`

	const result = `${minutes}:${resultSeconds}`

	return result
}
