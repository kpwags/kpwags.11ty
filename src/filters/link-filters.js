exports.linkContent = (link) =>  `Discovered on ${link.date}. Content by ${link.author}`;

exports.linkMostRecentDate = (links) => links[0].jsDate;