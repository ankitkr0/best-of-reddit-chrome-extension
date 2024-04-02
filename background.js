// background.js

// List of subreddits to fetch top posts from
const subreddits = [
  'funny',
  'todayilearned',
  'worldnews',
  'science',
  'pics',
  'gaming',
  'AskReddit'
];

// Function to fetch a random top post from a subreddit
async function fetchRandomTopPost() {
  try {
    // Select a random subreddit from the list
    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    // Fetch top posts from the selected subreddit
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=10`);
    if (!response.ok) {
      throw new Error('Failed to fetch top posts');
    }
    const data = await response.json();
    // Select a random post from the top posts
    const posts = data.data.children;
    if (posts.length === 0) {
      throw new Error('No posts found');
    }
    const randomPost = posts[Math.floor(Math.random() * posts.length)].data;
    // Return the selected post
    return {
      title: randomPost.title,
      url: `https://reddit.com${randomPost.permalink}`,
      subreddit: subreddit
    };
  } catch (error) {
    console.error('Error fetching random top post:', error);
    return null;
  }
}

// Listen for a message from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchRandomTopPost') {
    fetchRandomTopPost().then(post => {
      sendResponse(post);
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});

// Store the initial list of subreddits in chrome.storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({subreddits: subreddits}, () => {
    console.log('Subreddits list initialized.');
  });
});
