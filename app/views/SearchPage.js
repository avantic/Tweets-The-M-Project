Tweets.SearchPage = M.PageView.design({

    childViews: 'content',

    content: M.ScrollView.design({
        childViews: 'form',
        
        form: M.FormView.design({
        	alertTitle: M.I18N.l('validation_errors'),
        	childViews: 'searchText search',
        	
        	searchText: M.TextFieldView.design({
        	}),
	        search: M.ButtonView.design({
	        	value: M.I18N.l('search'),
	        	icon: 'search',
	        	cssClass: 'b',
	        	events: {
	                tap: {
			        	target: Tweets.SearchController,
			            action: 'switchToTweets'
	                }
	            }
	        })
        })
    })

});

