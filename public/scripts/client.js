// Client-side JS logic goes here // jQuery is already loaded // Reminder: Use (and do all your DOM work in) jQuery's document ready function

$(document).ready(function () {
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

	// Render a new tweet
	const createTweetElement = (tweetObj) => {
		const $tweet = `<article class='tweet_box'>
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

	// Submit a new tweet to db
	$('#new-tweet_form').submit(function (event) {
		event.preventDefault();

		if (!$('#tweet-text').val()) {
			alert('Tweet something!');
		} else if ($('#tweet-text').val().length > 140) {
			alert('Tweet exceeded maximum character count!');
		} else {
			const form_data = $(this).serialize();

			$.post('/tweets', form_data).done((response) => {
				console.log('response:', response);
			});
		}
	});

	// This is using an ajax method
	// const post_url = $(this).attr('action');
	// const request_method = $(this).attr('method');
	// const form_data = $(this).serialize();

	// $.ajax({
	// 	url: post_url,
	// 	type: request_method,
	// 	data: form_data,
	// })
	// 	.then(function (response) {
	// 		console.log('Sucess: ', response);
	// 	})
	// 	.catch((err) => {
	// 		console.error(err);
	// 	});

	// Fetch tweets from the server
	const loadTweets = function () {
		$.get('/tweets', function (data, status) {
			renderTweets(data);
		});
	};

	loadTweets();
});
