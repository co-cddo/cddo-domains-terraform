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

    if (host != "cddo.cabinetoffice.gov.uk") {
        return redirect("https://cddo.cabinetoffice.gov.uk"+uri);
    }

    if (uri.match(/^\/.well[-_]known\/(tea(pot)?|☕|%e2%98%95|coffee)/)) {
      return {
          statusCode: 418,
          statusDescription: "I'm a teapot",
          body: "I'm a teapot\nhttps://www.rfc-editor.org/rfc/rfc2324"
      };
    }

    if (uri.match(/^\/asset/)) {
      // file hosted in S3
      return request;
    }

    if (uri.match(/^\/.well[-_]known\/status/)) {
      request.uri = "/.well-known/status.html";
      // file hosted in S3
      return request;
    }

    if (uri.match(/^\/.well[-_]known\/hosting/)) {
      request.uri = "/.well-known/hosting-provider.txt";
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

    if (uri.match(/^\/(gccc|gc3)$/)) {
      return redirect("https://gc3.security.gov.uk");
    }

    if (uri.match(/^\/github$/)) {
      return redirect("https://github.com/co-cddo");
    }

    if (uri.match(/^\/ddat(profession|(-capability)?-framework)$/)) {
      return redirect("https://www.gov.uk/government/collections/digital-data-and-technology-profession-capability-framework");
    }

    if (uri.match(/^\/people\/(paul-willmott|chair)/)) {
      return redirect("https://www.gov.uk/government/people/paul-willmott");
    }

    if (uri.match(/^\/people\/(mike-potter|gcdo)/)) {
      return redirect("https://www.gov.uk/government/people/mike-potter");
    }

    if (uri.match(/^\/blog/)) {
      return redirect("https://cddo.blog.gov.uk/");
    }

    if (uri.match(/^\/about/)) {
      return redirect("https://www.gov.uk/government/organisations/central-digital-and-data-office/about");
    }

    if (uri.match(/^\/people\//)) {
      // file hosted in S3
      if (request.uri.indexOf(".html") == -1) {
        request.uri += ".html";
      }
      return request;
    }

    return redirect("https://www.gov.uk/government/organisations/central-digital-and-data-office");
}

if (typeof(module) === "object") {
    module.exports = handler;
}
