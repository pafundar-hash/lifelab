export function generateAPA(article) {
  const authors = article.author || [];

  const formatAuthor = (author) => {
    const surname = author.family || "";
    const initials = (author.given || "")
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => name.charAt(0).toUpperCase() + ".")
      .join(" ");

    return surname ? ${surname}, ${initials} : initials;
  };

  let authorText = "Author unknown";

  if (authors.length === 1) {
    authorText = formatAuthor(authors[0]);
  } else if (authors.length === 2) {
    authorText = ${formatAuthor(authors[0])} & ${formatAuthor(authors[1])};
  } else if (authors.length > 2) {
    authorText =
      authors.slice(0, 19).map(formatAuthor).join(", ") +
      ", ... " +
      formatAuthor(authors[authors.length - 1]);
  }

  const year =
    article.published?.["date-parts"]?.[0]?.[0] || "n.d.";

  const title = article.title?.[0] || "Untitled publication";
  const journal = article["container-title"]?.[0] || "";
  const volume = article.volume ? , ${article.volume} : "";
  const issue = article.issue ? (${article.issue}) : "";
  const pages = article.page ? , ${article.page} : "";

  let reference = ${authorText} (${year}). ${title}.;

  if (journal) {
    reference +=  ${journal}${volume}${issue}${pages}.;
  }

  if (article.DOI) {
    reference +=  https://doi.org/${article.DOI};
  }

  return reference;
}export function generateAPA(article) {
  const authors = article.author || [];

  const formatAuthor = (author) => {
    const surname = author.family || "";
    const initials = (author.given || "")
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => name.charAt(0).toUpperCase() + ".")
      .join(" ");

    return surname ? ${surname}, ${initials} : initials;
  };

  let authorText = "Author unknown";

  if (authors.length === 1) {
    authorText = formatAuthor(authors[0]);
  } else if (authors.length === 2) {
    authorText = ${formatAuthor(authors[0])} & ${formatAuthor(authors[1])};
  } else if (authors.length > 2) {
    authorText =
      authors.slice(0, 19).map(formatAuthor).join(", ") +
      ", ... " +
      formatAuthor(authors[authors.length - 1]);
  }

  const year =
    article.published?.["date-parts"]?.[0]?.[0] || "n.d.";

  const title = article.title?.[0] || "Untitled publication";
  const journal = article["container-title"]?.[0] || "";
  const volume = article.volume ? , ${article.volume} : "";
  const issue = article.issue ? (${article.issue}) : "";
  const pages = article.page ? , ${article.page} : "";

  let reference = ${authorText} (${year}). ${title}.;

  if (journal) {
    reference +=  ${journal}${volume}${issue}${pages}.;
  }

  if (article.DOI) {
    reference +=  https://doi.org/${article.DOI};
  }

  return reference;
}