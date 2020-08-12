// Client-side JS logic goes here // jQuery is already loaded // Reminder: Use (and do all your DOM work in) jQuery's document ready function

$(document).ready(function () {
	const data = [
		{
			user: {
				name: 'Newton',
				avatars: 'https://i.imgur.com/73hZDYK.png',
				handle: '@SirIsaac',
			},
			content: {
				text: 'If I have seen further it is by standing on the shoulders of giants',
			},
			created_at: 1461116232227,
		},
		{
			user: {
				name: 'Descartes',
				avatars: 'https://i.imgur.com/nlhLi3I.png',
				handle: '@rd',
			},
			content: {
				text: 'Je pense , donc je suis',
			},
			created_at: 1461113959088,
		},
	];

	// const daysAgo = (createdAt) => {
	// 	const curTime = new Date().getTime();
	// 	return Math.floor((curTime - createdAt) / (60 * 60 * 24 * 1000));
	// };

	// loop through tweets and append the return value to tweets container
	const renderTweets = function (tweets) {
		for (let tweet of tweets) {
			$('#tweets-container').append(createTweetElement(tweet));
		}
		return;
	};

	const createTweetElement = (tweetObj) => {
		let $tweet = `<article class='tweet_box'>
        <header>
          <img class='tweet_avatar' src='${tweetObj.user.avatars}' alt='avatar'><span>${tweetObj.user.name}</span>
          <span class='tweet_handle'>${tweetObj.user.handle}</span>
        </header>
        <p>${tweetObj.content.text}</p>
        <footer>
          <span class="tweet_created-at">${moment(tweetObj.created_at).fromNow()}</span>
          <div class='tweet_icons'>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`;

		return $tweet;
	};

	renderTweets(data);
});
