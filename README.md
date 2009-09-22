# Twitter Common Friends

It's a [GreaseMonkey](http://www.greasespot.net/) script which shows your common friends with any other [Twitter](http://twitter.com/) user (a la [Facebook](http://facebook.com)).

## Get started

### Prerequisites

Maybe you already meet them ;-)

1. You must use Firefox to use this script (it's said to exist some kind of hack to use GM scripts in Safari and InternetExplorer but I haven't tried it. If you do, please mail me the details and I'll update this document).

1. Install [GreaseMonkey](http://www.greasespot.net/).

### Installing

1. Install Twitter Common Friends following [this link](http://github.com/porras/twitter_common_friends/raw/master/twitter_common_friends.user.js).

2. You're done! Now visit some user's profile and you'll see your common friends in the sidebar.

## FAQ

Q. Why is it so slow?

A. It's a combinated effect of the Twitter API being paginated (so you need several requests to get a user's friends list), the poor performance of Twitter sometimes, and, of course, the lack of skills in Javscript of this poor developer ;-)

Q. I can't see the common friends with some users, why?

A. This script doesn't support authentication, so it can't access the friends list of users whose updates are private (even if they're your friends), so you won't see anything for these users.

Copyright (c) 2009 Sergio Gil, released under the MIT license
