export const fetchTimeline = (endpoint) => {
	return new Promise((resolve, reject) => {
		fetch(endpoint).then((response) => {
			if (response.status == 200) {
				resolve(response.json());
			} else {
				reject('Pull timeline failed.');
			}
		}).catch((err) => {
			reject('An error has occurred. Please contact system administrator.');
		});
	});
}

export const pullHomeTimeline = () => {
	return fetchTimeline('http://localhost:8080/api/1.0/twitter/homeTimeline');
}


export const pullUserTimeline = () => {
	return fetchTimeline('http://localhost:8080/api/1.0/twitter/userTimeline');
}

export const fetchFilterTimeline = (endpoint) => {
	return new Promise((resolve, reject) => {
		fetch(endpoint).then((response) => {
			if (response.status == 200) {
				const resClone = response.clone();
				response.text().then((responseText) => {
					if (responseText == 'No results were found') {
						reject(responseText);
					} else {
						resolve(resClone.json());
					}
				});
			} else {
				reject('Filter timeline failed.');
			}
		}).catch((err) => {
			reject('An error has occurred. Please contact system administrator.');
		});
	});
}

export const filterHomeTimeline = (keyword) => {
	return fetchFilterTimeline(`http://localhost:8080/api/1.0/homeTimeline/filter?keyword=${keyword}`);
}

export const publishTweet = (tweet) => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/1.0/twitter/tweet', {
				method: "POST",
				 headers: new Headers({
					'Content-Type': 'application/x-www-form-urlencoded',
				}),
				body: `message=${tweet}`
			}
 		).then((response) => {
			if (response.status == 200) {
				resolve('Success');
			} else {
				reject('Post tweet failed. Try again later.');
			}
		}).catch((err) => {
			reject('An error has occurred. Please contact system administrator.');
		});
	});
}

export const replyTweet = (tweet, inReplyToId) => {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:8080/api/1.0/twitter/reply', {
				method: "POST",
				 headers: new Headers({
					'Content-Type': 'application/x-www-form-urlencoded',
				}),
				body: `message=${tweet}&inReplyToId=${inReplyToId}`
			}
 		).then((response) => {
			if (response.status == 200) {
				resolve('Success');
			} else {
				reject('Reply tweet failed. Try again later.');
			}
		}).catch((err) => {
			reject('An error has occurred. Please contact system administrator.');
		});
	});
}