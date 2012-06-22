m_require('app/views/TweetItemView.js');
Tweets.TweetsPage = M.PageView.design({

    events: {
		pagebeforeshow: {
            target: Tweets.TweetsController,
            action: 'init'
        }
    },

    childViews: 'header content toggleActions',

    header: M.ToolbarView.design({
        anchorLocation: M.TOP,
        childViews: 'returnButton label',
        
        returnButton: M.ButtonView.design({
        	anchorLocation: M.LEFT,
			value: M.I18N.l('return'),
			icon: 'arrow-l',
			events: {
				tap: {
					target: Tweets.TweetsController,
					action: 'switchToSearchPage'
				}
			}
		}),
		label: M.LabelView.design({
        	anchorLocation: M.CENTER,
            value: ''
        })
    }),

    content: M.ScrollView.design({
        childViews: 'otherResults toggleResults',
        
        otherResults: M.ToggleView.design({
        	childViews: 'message noMessage',
        	
        	message: M.LabelView.design({
        		cssClass: 'otherResults ui-bar-e ui-corner-all',
	            value: M.I18N.l('other_results') + ':'
	        }),
        	noMessage: M.LabelView.design({
	            value: ''
	        })
        }),
        toggleResults: M.ToggleView.design({
            
        	childViews: 'loadingResults resultsList',
        	
        	loadingResults: M.LabelView.design({
	            value: M.I18N.l('loading') + '...'
	        }),
	    	resultsList: M.ListView.design({
	    		isDividedList: YES,
	    		isInset: YES,
	    		listItemTemplateView: Tweets.TweetItemView,
	    		contentBinding: {
	    			target: Tweets.TweetsController,
	    			property: 'results'
	    		}
	    	})
        })
    }),
    
    toggleActions: M.ToggleView.design({
    
    	childViews: 'actions noActions',
    	
	    actions: M.ScrollView.design({
	    	cssClass: 'center',
	        childViews: 'line moreResults totalRemainingResultsPrefixText totalRemainingResults totalRemainingResultsSufixText lastUpdateText lastUpdate',
	        
	        line: M.LabelView.design({
	        	value: '<hr/>'
	        }),
	        
	    	moreResults: M.LabelView.design({
	    		cssClass: 'urlLabel fontLarge left',
	    		value: M.I18N.l('more_results') + '...',
	    		
	    		events: {
	        		tap: {
	        			target: Tweets.TweetsController,
	    				action: 'getMoreResults'
	    			}
	        	}
	    	}),
	    	
	    	totalRemainingResultsPrefixText: M.LabelView.design({
	    		value: '(',
	    		isInline: YES
	    	}),
	    	
	    	totalRemainingResults: M.LabelView.design({
	    		value: '0',
	    		contentBinding: {
	    			target: Tweets.TweetsController,
	    			property: 'remainingResults'
	    		},
	    		isInline: YES
	    	}),
	    	
	    	totalRemainingResultsSufixText: M.LabelView.design({
	    		value: ' ' + M.I18N.l('remaining_results') + ')<br/>',
	    		isInline: YES
	    	}),
	    	
	    	lastUpdateText: M.LabelView.design({
	    		cssClass: 'lastUpdate',
	    		isInline: YES,
	    		value: M.I18N.l('last_update') + ': ',
	    	}),
	    	
	    	lastUpdate: M.LabelView.design({
	    		cssClass: 'lastUpdate',
	    		isInline: YES,
			    computedValue: {
	    			value: M.Date.now(),
			    	contentBinding: {
			            target: Tweets.TweetsController,
			            property: 'lastUpdate'
			        },
	    			operation: function(value) {
	    				return value.format(M.I18N.l('date_format'));
	    	        }
	    		}
	    	})
	    	
	    }),
	    
	    noActions: M.ScrollView.design({
	        childViews: 'label',
	        label: M.LabelView.design({
	            value: ''
	        })  
	    })
    
    })
    
});

