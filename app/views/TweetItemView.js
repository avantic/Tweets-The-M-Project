Tweets.TweetItemView = M.ListItemView.design({

	isSelectable: NO,
	childViews: 'text',

    text: M.LabelView.design({
		computedValue: {
			valuePattern: '<%= text %>',
			operation: function(value, label) {
				return value;
	        }
		}
	})

});

