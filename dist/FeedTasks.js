"use strict";
exports.__esModule = true;
exports.GenerateFeed = void 0;
var feed_1 = require("feed");
function GenerateFeed(config, videos) {
    var feed = new feed_1.Feed({
        title: config.title,
        description: config.description,
        id: config.link,
        link: config.link,
        copyright: "All rights reserved 2021, Ryan Poole",
        author: {
            name: "Ryan Poole"
        }
    });
    videos.forEach(function (post) {
        feed.addItem({
            title: "[" + post.user_name + "] - " + post.title,
            id: post.url,
            link: post.url,
            description: post.description,
            date: new Date(post.published_at),
            image: post.thumbnail_url.replace("%{width}", "640").replace("%{height}", "480")
        });
    });
    return feed.rss2();
}
exports.GenerateFeed = GenerateFeed;
