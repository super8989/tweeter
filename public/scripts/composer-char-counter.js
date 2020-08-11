$(document).ready(function () {
	$('#tweet-text').keyup(function () {
		const text = $(this).val().length;
		const counter = $(this).siblings('.tweet-text_submit').children('.counter');
		const currentCount = parseInt(140 - text);

		currentCount < 0 ? counter.css('color', 'red') : counter.css('color', '#444444');
		counter.html(currentCount);
	});
});

// Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque explicabo in ab praesentium minus distinctio, odit, ducimus dolores temp
