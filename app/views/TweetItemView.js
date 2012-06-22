Tweets.TweetItemView = M.ListItemView.design({

	isSelectable: NO,
	childViews: 'text profileImageUrl',

    text: M.LabelView.design({
		computedValue: {
			valuePattern: '<%= text %>',
			operation: function(value, label) {
				return value;
	        }
		}
	}),
	
	profileImageUrl: M.ImageView.design({
		computedValue: {
			valuePattern: '<%= profileImageUrl %>',
			operation: function(value, label) {
				return value;
	        }
		}
	})

});

