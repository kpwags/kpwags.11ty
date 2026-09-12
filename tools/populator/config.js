export const config = {
	build: '1.0.1',
	apiUrl: 'http://192.168.1.232:3030/media',
	// apiUrl: 'http://127.0.0.1:3030/media',
	outputDirectory: {
		linux: '/home/keith/Developer/kpwags.com/src/_data',
		mac: '/Users/keith/Developer/kpwags.com/src/_data',
		// For Testing
		// linux: '/home/keith/Desktop/Temporary/populator',
		// mac: '/Users/keith/Desktop/Temporary/populator',
	},
	movieDateRange: 30,
	musicDateRange: 30,
}