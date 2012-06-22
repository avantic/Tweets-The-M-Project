m_require('core/datastore/remote_storage_paginated.js');

M.TweetsProvider = M.DataProviderRemoteStoragePaginated.configure({
	'Tweet': {
		url: '/twitterApi',
		read: {
			url: {
				all: function() {
					return '/search.json';
				},
				paginated: function(firstResult, maxNumberResults, filter) {
					var page = Math.floor((firstResult + 1) / maxNumberResults) + 1;
					return "/search.json?q=" + filter.searchText + 
						"&page=" + page + "&rpp=" + maxNumberResults;
				}
			}, 
			map: function(obj) {
				return {
					createdAt: M.Date.create(obj.created_at),
					fromUser: obj.from_user,
					profileImageUrl: obj.profile_image_url,
					text: obj.text
				};
				
			}
		},
		count: {},
		beforeSend : function(xhr) {}
	}
});