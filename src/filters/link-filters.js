export const linkContent = (link) =>  `Discovered on ${link.date}. Content by ${link.author}`;

export const linkMostRecentDate = (links) => links[0].jsDate;