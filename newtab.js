document.addEventListener('DOMContentLoaded', function() {
    fetchRandomPost();
});

function fetchRandomPost() {
    // Predefined list of subreddits
    const subreddits = ['askhistorians', 'askreddit', 'askmen'];
    const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const url = `https://www.reddit.com/r/${randomSubreddit}/top/.json?limit=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const post = data.data.children[0].data;
            displayPost(post, randomSubreddit);
        })
        .catch(error => {
            console.error('Error fetching post:', error);
            displayError();
        });
}

function displayPost(post, subreddit) {
    const postContentElement = document.getElementById('postContent');
    if (postContentElement) {
        postContentElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>Subreddit: r/${subreddit}</p>
            <a href="https://www.reddit.com${post.permalink}" target="_blank">Read more</a>
        `;
    }
}

function displayError() {
    const postContentElement = document.getElementById('postContent');
    if (postContentElement) {
        postContentElement.textContent = 'Failed to load post. Please try again later.';
    }
}