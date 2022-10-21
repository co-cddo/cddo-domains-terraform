function redirect(url) {
    var response = {
        statusCode: 307,
        statusDescription: 'Temporary Redirect',
        headers: {
            'location': {
              value: url
            }
        }
    };
    return response;
}

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

    if (uri.match(/^\/.well[-_]known\/teapot$/)) {
      return {
          statusCode: 418,
          statusDescription: "I'm a teapot"
      };
    }

    if (uri.match(/^\/asset/)) {
      return request;
    }

    if (uri.match(/^\/people\//)) {
      if (request.uri.indexOf(".html") == -1) {
        request.uri += ".html";
      }
      return request;
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
      return redirect("https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt");
    }

    if (uri.match(/^\/sbd$/)) {
      return redirect("https://www.security.gov.uk/guidance/secure-by-design/");
    }

    if (uri.match(/^\/sbd-feedback$/)) {
      return redirect("https://docs.google.com/forms/d/e/1FAIpQLSeaVg5VAiJGTCHOSYzZ0R66LrwZZVoSjPEMb-GT-_ue4G1ohQ/viewform");
    }

    if (uri.match(/^\/gccc$/)) {
      return redirect("https://www.gov.uk/government/publications/government-cyber-security-strategy-2022-to-2030/government-cyber-security-strategy-2022-to-2030-html#pillar-2-defend-as-one");
    }

    if (uri.match(/^\/gccc-feedback$/)) {
      return redirect("https://docs.google.com/forms/d/e/1FAIpQLSdsiBksGlxz6KUXKovhZhOvRhV_eGs60aPeh_DieVwiCpizww/viewform");
    }

    if (uri.match(/^\/github$/)) {
      return redirect("https://github.com/co-cddo");
    }

    if (uri.match(/^\/ddat-framework$/)) {
      return redirect("https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework");
    }

    return redirect("https://www.gov.uk/government/organisations/central-digital-and-data-office/about");
}

if (typeof(module) === "object") {
    module.exports = handler;
}
