// Saves options to chrome.storage
function save_options() {
  var subreddits = document.getElementById('subreddits').value;
  chrome.storage.sync.set({
    favoriteSubreddits: subreddits
  }, function() {
    // Update status to let user know options were saved.
    var status = document.createElement('div');
    status.textContent = 'Options saved.';
    document.querySelector('.options-container').appendChild(status);
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value favoriteSubreddits = ''.
  chrome.storage.sync.get({
    favoriteSubreddits: ''
  }, function(items) {
    document.getElementById('subreddits').value = items.favoriteSubreddits;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('subredditForm').addEventListener('submit', function(event){
  event.preventDefault();
  save_options();
});
