/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
	const tweetData = {
		user: {
			name: 'Newton',
			avatars: 'https://i.imgur.com/73hZDYK.png',
			handle: '@SirIsaac',
		},
		content: {
			text: 'If I have seen further it is by standing on the shoulders of giants',
		},
		created_at: 1461116232227,
	};

	// const daysAgo = (createdAt) => {
	// 	const curTime = new Date().getTime();
	// 	return Math.floor((curTime - createdAt) / (60 * 60 * 24 * 1000));
	// };

	const createTweetElement = (tweetObj) => {
		return `<article class='tweet_box'>
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
	};

	const $tweet = createTweetElement(tweetData);

	$('#tweets-container').append($tweet);
});
