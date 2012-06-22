Tweets.TweetsController = M.Controller.extend({

	results: null,
    
    firstResult: null,
    
    maxResults: null,
    
    remainingResults: null,
    
    totalResults: 100,
    
    filter: null,
    
    lastUpdate: null,
    
    preloadedResults: null,
    
    model: null,
    
    init: function(isFirstLoad) {
		M.ViewManager.getView('tweetsPage', 'otherResults').setView('noMessage');
		M.ViewManager.getView('tweetsPage', 'toggleActions').setView('noActions');
		M.ViewManager.getView('tweetsPage', 'toggleResults').setView('loadingResults');

    	this.set('maxResults', 5);
    	this.set('firstResult', 0);
    	this.set('results', {});
    	this.set('remainingResults', 0);
    	this.set('preloadedResults', {});
    	this.set('model', []);

    	var formValues = M.ViewManager.getView('searchPage', 'form').getFormValues();

    	var filter = new Object();
    	filter.searchText = formValues.searchText ? formValues.searchText : "";

    	this.set('filter', filter);

    	this._reloadResults();
    },

    switchToSearchPage: function() {
        this.switchToPage('searchPage', M.TRANSITION.SLIDE, true);
    },
    
    getMoreResults: function() {
    	this.set('firstResult', (this._getCurrentTotalResults() + this._getCurrentTotalPreloadedResults()));
    	this._reloadResults();
	},
    
    _reloadResults: function() {
    	M.LoaderView.show(M.I18N.l('loading') + '...');
    	this.set('lastUpdate', M.Date.now());
    	
    	if (this._getCurrentTotalResults() == 0)
    		Tweets.Tweet.find(this._getFindRemoteProviderObject(true));
    	else if (this._getCurrentTotalPreloadedResults() == this.maxResults)
    		this._reloadPreloadedResults(true);
    	else
    		this._reloadPreloadedResults();
	},
    
	_getFindRemoteProviderObject: function(reloadPreloadedResults) {
		var me = this;
		return	{
					firstResult: me.firstResult,
		    		maxNumberResults: (me.maxResults * 2),
		    		filter: me.filter,
		    		onSuccess: function(model) {
						me.set('model', me.model.concat(model));
		    			var preloadedResults = $.extend({}, me.preloadedResults, me._createDividedListView(model));
		    			me.set('preloadedResults', preloadedResults);
		    			if (reloadPreloadedResults)
		    				me._reloadPreloadedResults();
		    		},
		    		onError: function(error) {
		    			M.LoaderView.hide();
		    			alert(M.I18N.l('connection_problem') + ": " + error.xhr.status + " (" + error.xhr.statusText + "). " + error.xhr.responseText);
					}
	    		};
	},
	
	_reloadPreloadedResults: function(findMoreResults) {
		var i;
		var count = 0;
		var firstPreloadedResults = new Object();
		var lastPreloadedResults = new Object();
		for (i in this.preloadedResults) {
			if (count < this.maxResults)
				firstPreloadedResults[i] = this.preloadedResults[i];
			else
				lastPreloadedResults[i] = this.preloadedResults[i];
			
			count++;
		}
		
		var results = $.extend({}, this.results, firstPreloadedResults);
		M.ViewManager.getView('tweetsPage', 'toggleResults').setView('resultsList');
		this.set('results', results);
		this.set('preloadedResults', lastPreloadedResults);

		M.LoaderView.hide();
		this._updateRemainingResults();
		
		if (findMoreResults)
			Tweets.Tweet.find(this._getFindRemoteProviderObject());
	},
	
	_updateRemainingResults: function() {
		this.set('remainingResults', this.totalResults - this._getCurrentTotalResults());
		
		if (this.remainingResults < 1)
			M.ViewManager.getView('tweetsPage', 'toggleActions').setView('noActions');
		else
			M.ViewManager.getView('tweetsPage', 'toggleActions').setView('actions');
			
	},
	
	_getCurrentTotalResults: function() {
		return this._countTotalJsonElements(this.results);
	},
	
	_getCurrentTotalPreloadedResults: function() {
		return this._countTotalJsonElements(this.preloadedResults);
	},
	
	_countTotalJsonElements: function(obj) {
		var totalJsonElements = 0;
		for (element in obj)
			totalJsonElements++;
		
		return totalJsonElements;
	},
	
	_createDividedListView: function(model) {
		
		function formatHeader(itemModel, id) {
			var createdAtFormatted = itemModel.record.createdAt.format(M.I18N.l('date_format'));
			return itemModel.record.fromUser + ' ' +
				'<span id="' + id + '" class="ui-li-aside">' + createdAtFormatted + '</span>';
		}

		function getProperties(itemModel) {
			var propertiesChildItem = new Object();
			propertiesChildItem.text = itemModel.record.text;

			var properties = new Array();
			properties.push(propertiesChildItem);
			
			return properties;
		}
		
		return Tweets.ControllerUtils.createDividedListJSON(model, formatHeader, getProperties);
	}

});
