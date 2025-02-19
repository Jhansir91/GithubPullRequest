import { fetchPullRequests } from '../services/githubService';

global.fetch = jest.fn();

describe('fetchPullRequests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch pull requests with default parameters', async () => {
    // the default API without specific parameters should return the 1st with 5 records.
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce([{ id: 1, title: 'Test PR' }]),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchPullRequests();

    expect(fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/divvydose/ui-coding-challenge/pulls?per_page=5&page=1',
      {
        method: 'GET',
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    );
    expect(result).toEqual([{ id: 1, title: 'Test PR' }]);
  });

  it('should fetch pull requests with specified parameters', async () => {
    // With specific parameters for 2nd page and 10 records
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce([{ id: 2, title: 'Another Test PR' }]),
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchPullRequests(2, 10);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/divvydose/ui-coding-challenge/pulls?per_page=10&page=2',
      {
        method: 'GET',
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    );
    expect(result).toEqual([{ id: 2, title: 'Another Test PR' }]);
  });
});