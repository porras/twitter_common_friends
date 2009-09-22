// ==UserScript==
// @name					Twitter Common Friends
// @namespace			http://github.com/porras
// @description		Displays your common friends with the profile visited
// @include				http://twitter.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery

if (logged_in() && is_profile() && !is_locked() && !is_me()) {
  add_common_friends();
}

function is_profile() {
  return $("body#profile").length > 0;
};

function is_locked() {
  return $(".lock").length > 0 || $(".section-links img[src*='lock']").length > 0;
}

function is_me() {
  return me() == he();
}

function logged_in() {
  return me() != undefined;
}

function me() {
  return $("meta[name='session-user-screen_name']").attr("content");
}

function he() {
  return $("meta[name='page-user-screen_name']").attr("content");
}

function add_common_friends() {
	$("#side #following").after('<div id="following" class="common_friends"><h2 class="sidebar-title" id="fm_menu"><span>Common Friends</span></h2><div class="sidebar-menu"><div id="following_list"><div id="common_friends_loading">Loading...</div></div></div></div>');
	get_friends(me(), 'mine');
	get_friends(he(), 'his');
}

var friends      = {mine: [], his: []};
var pages_wanted = {mine: 0, his: 0};
var pages_got    = {mine: 0, his: 0};

function get_friends(user, whose) {
  $.getJSON("http://twitter.com/users/show/" + user + ".json", function(data) {
    pages_wanted[whose] = Math.ceil(data.friends_count / 99);
    for (var i=1;i<=pages_wanted[whose];i++)
    {
    	$.getJSON("http://twitter.com/statuses/friends/" + user + ".json?page=" + i, function(data) {
    	  friends[whose] = friends[whose].concat(data);
    	  pages_got[whose]++;
    	  render_common_friends();
  	  });
    }
  });
}

function render_common_friends() {
	if (pages_got['mine'] < pages_wanted['mine'] || pages_got['his'] < pages_wanted['his']) {
		return;
	}
	var my_friends_names = $.map(friends['mine'], function(friend) {
		return friend.screen_name;
	});
	$("#common_friends_loading").remove();
	var count = 0;
	$.each(friends['his'], function(i, friend) {
		if ($.inArray(friend.screen_name, my_friends_names) != -1) {
		  count++;
			$("#side #following.common_friends #following_list").append('<span class="vcard"><a href="/' + friend.screen_name + '" class="url" hreflang="en" rel="contact" title="' + friend.screen_name + '"><img alt="' + friend.screen_name + '" class="photo fn" src="' + friend.profile_image_url.replace('_normal.', '_mini.') + '" height="24" width="24"></a></span>');
		}
	});
	$("#side #following.common_friends h2").html("Common Friends (" + count + ")");
}
