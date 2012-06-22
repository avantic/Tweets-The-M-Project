var Tweets  = Tweets || {};

Tweets.app = M.Application.design({
	entryPage : 'searchPage',

	searchPage: Tweets.SearchPage,
    tweetsPage: Tweets.TweetsPage
});