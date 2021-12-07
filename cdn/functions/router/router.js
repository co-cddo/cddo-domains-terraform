function handler(event) {
    var request = event.request;
    var headerKeys = Object.keys(request.headers);
    var uri = request.uri;

    var host = '';
    if (headerKeys.indexOf('host') > -1) {
        host = request.headers.host.value;
    } else if (headerKeys.indexOf(':authority') > -1) {
        host = request.headers[':authority'].value;
    }

    var prefix = 'https://www.gov.uk';
    var new_uri = null;

    if (uri.match(/^\/.well[-_]known\/teapot$/)) {
      return {
          statusCode: 418,
          statusDescription: "I'm a teapot"
      };
    }

    if (uri.match(/^\/.well[-_]known\/status$/)) {
      request.uri = "/.well-known/status";
      // file hosted in S3
      return request;
    }

    if (uri.match(/^\/.well[-_]known\/hosting-provider$/)) {
      request.uri = "/.well-known/hosting-provider";
      // file hosted in S3
      return request;
    }

    if (uri.match(/^(\/.well[-_]known)?\/security\.txt$/)) {
      prefix = 'https://vdp.cabinetoffice.gov.uk';
      new_uri = '/.well-known/security.txt';
    }

    if (host == 'cddo.cabinetoffice.gov.uk') {
      // default
      new_uri = '/government/organisations/central-digital-and-data-office/about';

      if (uri.indexOf('/github') == 0) {
        prefix = 'https://github.com';
        new_uri = '/co-cddo';
      }
      if (uri.indexOf('/ddat-framework') == 0) {
        new_uri = '/government/collections/digital-data-and-technology-profession-capability-framework';
      }
    }

    var response = {
        statusCode: 307,
        statusDescription: 'Temporary Redirect',
        headers: {
            'location': {
              value: `${prefix}${new_uri != null ? new_uri : ''}`
            }
        }
    };
    return response;
}

if (typeof(module) === "object") {
    module.exports = handler;
}
