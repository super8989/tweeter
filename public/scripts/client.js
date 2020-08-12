// Client-side JS logic goes here // jQuery is already loaded // Reminder: Use (and do all your DOM work in) jQuery's document ready function

$(document).ready(function () {
	// const daysAgo = (createdAt) => {
	// 	const curTime = new Date().getTime();
	// 	return Math.floor((curTime - createdAt) / (60 * 60 * 24 * 1000));
	// };

	// loop through tweets and append the return value to tweets container
	const renderTweets = function (tweets) {
		$('#tweets-container').empty();

		for (let tweet of tweets) {
			$('#tweets-container').prepend(createTweetElement(tweet));
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

	// Fetch tweets from the server
	const loadTweets = function () {
		// $.get('/tweets', function (data, status) {renderTweets(data); });

		$.ajax({
			url: '/tweets',
			method: 'GET',
		}).then((response) => {
			renderTweets(response);
		});
	};

	// Submit a new tweet to db
	$('#new-tweet_form').submit(function (event) {
		event.preventDefault();

		if (!$('#tweet-text').val()) {
			alert('Tweet something!');
		} else if ($('#tweet-text').val().length > 140) {
			alert('Tweet exceeded maximum character count!');
		} else {
			// $.post('/tweets', form_data).done();
			$.ajax({
				url: '/tweets',
				type: 'POST',
				data: $(this).serialize(),
			}).then(function () {
				loadTweets();
			});
		}
	});

	loadTweets();
});
