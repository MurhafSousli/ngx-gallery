import { http, HttpResponse, bypass } from 'msw';

/**
 * MSW Handler for versions.json
 * Allows the fetch request to bypass MSW and go directly to the server
 * This ensures that version manifest requests are never intercepted
 */
export const versionsHandler = http.get(
  '**/versions.json',
  async ({ request }) => {
    try {
      // Bypass MSW for this request and let it go through to the real server
      const response = await fetch(bypass(request));

      if (!response.ok) {
        console.warn(`Versions API returned ${response.status}`);
        return HttpResponse.json([], { status: 404 });
      }

      const data = await response.json();
      return HttpResponse.json(data);
    } catch (error) {
      console.warn('Failed to fetch versions manifest:', error);
      // Return empty array on failure - the preview will fall back to default version
      return HttpResponse.json([], { status: 404 });
    }
  }
);


