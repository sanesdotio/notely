import { describe, expect, test } from 'vitest';
import { getAPIKey } from 'src/api/auth';
import { IncomingHttpHeaders } from 'http';

const noHeader = {} as IncomingHttpHeaders;
const noTokenHeader: IncomingHttpHeaders = { authorization: 'ApiKey' };
const emptyKeyHeader: IncomingHttpHeaders = { authorization: '' };
const presentKeyHeader: IncomingHttpHeaders = {
  authorization: 'ApiKey present_token',
};
const bearerKeyHeader: IncomingHttpHeaders = { authorization: 'Bearer token' };

describe('Auth API', () => {
  test('getAPIKey should return null for missing API key', () => {
    const apiKey = getAPIKey(emptyKeyHeader);
    expect(apiKey).toBeNull();
  });

  test("getAPIKey should return token when it's present and scheme is ApiKey", () => {
    const apiKey = getAPIKey(presentKeyHeader);
    expect(apiKey).toBeDefined();
  });

  test("getAPIKey should return null when scheme is not 'ApiKey'", () => {
    const apiKey = getAPIKey(bearerKeyHeader);
    expect(apiKey).toBeNull();
  });

  test('returns null when header is missing', () => {
    expect(getAPIKey(noHeader)).toBeNull();
  });

  test('returns token when scheme is ApiKey', () => {
    expect(getAPIKey({ authorization: 'ApiKey present_token' })).toBe(
      'present_token'
    );
  });

  test('returns null when scheme present but no token', () => {
    expect(getAPIKey(noTokenHeader)).toBeNull();
  });
});
