export const linkContent = (link) => `Discovered on ${link.linkDate}. Content by ${link.author}`;

export const linkMostRecentDate = (links) => links[0].linkDate;