
const GITHUB_API_URL =
  "https://api.github.com/repos/divvydose/ui-coding-challenge/pulls";

export const fetchPullRequests = async (page = 1, perPage = 5) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}?per_page=${perPage}&page=${page}`, {
      method: 'GET',
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching PRs:", error);
    throw error;
  }
};