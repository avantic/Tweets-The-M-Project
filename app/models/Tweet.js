Tweets.Tweet = M.Model.create({

    __name__: 'Tweet',


    createdAt: M.Model.attr('Date',{
        isRequired:YES
    }), 
    
    fromUser: M.Model.attr('String',{
        isRequired:YES
    }),
    
    profileImageUrl: M.Model.attr('String',{
        isRequired:YES
    }),
    
    text: M.Model.attr('String',{
        isRequired:YES
    })

}, M.TweetsProvider);
