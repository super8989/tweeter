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

	const escape = function (str) {
		let div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	};

	// Render a new tweet
	const createTweetElement = (tweetObj) => {
		const $tweet = `<article class='tweet_box'>
        <header>
          <img class='tweet_avatar' src='${tweetObj.user.avatars}' alt='avatar'><span>${tweetObj.user.name}</span>
          <span class='tweet_handle'>${tweetObj.user.handle}</span>
        </header>
        <p>${escape(tweetObj.content.text)}</p>
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

	$('#tweet-text').click(function () {
		$('.error-text').empty();
	});

	// Submit a new tweet to db
	$('#new-tweet_form').submit(function (event) {
		event.preventDefault();

		if (!$('#tweet-text').val()) {
			$('.error-text').text('Tweet Something!');
		} else if ($('#tweet-text').val().length > 140) {
			$('.error-text').text("You've got too much on your mind!");
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
