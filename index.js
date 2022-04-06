/**
 * Your Genesis Go token
 * Should be client_id + ":" + secret BASE64 ENCODED!
 */
const tokenBase64 = "";

/**
 * Genesys Go URL
 */
const URL =
  "https://auth.genesysgo.net/auth/realms/RPCs/protocol/openid-connect/token";

/**
 * CORS Headers
 * Change this for production
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method === "OPTIONS") {
    event.respondWith(handleOptions(request));
  } else if (request.method === "GET") {
    event.respondWith(handleRequest(request));
  }
});

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers"
      ),
    };

    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, OPTIONS",
      },
    });
  }
}

async function handleRequest(request) {
  const isHttps = request.url.startsWith("https:");

  // In the case of a Basic authentication, the exchange
  // MUST happen over an HTTPS (TLS) connection to be secure.
  if (!isHttps) {
    return new Response("Please use a HTTPS connection.", { status: 403 });
  }

  try {
    const resp = await fetch(URL, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${tokenBase64}`,
      },
    });

    const { access_token } = await resp.json();

    const response = new Response(
      JSON.stringify({ access_token }),
      // Headers
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*", // Change this for production
        },
      }
    );

    return response;
  } catch {
    return new Response("Error getting token.", { status: 400 });
  }
}
