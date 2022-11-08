const expect         = require("chai").expect;
const viewer_request = require("./router.js");

fixture_1 = {
  context: {
    distributionDomainName:'d123.cloudfront.net',
    eventType:'viewer-request',
  },
  viewer: {
    ip:'1.2.3.4'
  },
  request: {
    method: 'GET',
    uri: '/index.php',
    querystring: {},
    headers: {
      host: {
        value:'invalid.gov.uk'
      }
    },
    cookies: {}
  }
}

fixture_2 = {
  context: {
    distributionDomainName:'d123.cloudfront.net',
    eventType:'viewer-request',
  },
  viewer: {
    ip:'1.2.3.4'
  },
  request: {
    method: 'GET',
    uri: '/',
    querystring: {},
    headers: {
      host: {
        value:'cddo.cabinetoffice.gov.uk'
      }
    },
    cookies: {}
  }
}

fixture_3 = {
  context: {
    distributionDomainName:'d123.cloudfront.net',
    eventType:'viewer-request',
  },
  viewer: {
    ip:'1.2.3.4'
  },
  request: {
    method: 'GET',
    uri: '/.well-known/security.txt',
    querystring: {},
    headers: {
      host: {
        value:'cddo.cabinetoffice.gov.uk'
      }
    },
    cookies: {}
  }
}

fixture_4 = {
  context: {
    distributionDomainName:'d123.cloudfront.net',
    eventType:'viewer-request',
  },
  viewer: {
    ip:'1.2.3.4'
  },
  request: {
    method: 'GET',
    uri: '/.well-known/status',
    querystring: {},
    headers: {
      host: {
        value:'cddo.cabinetoffice.gov.uk'
      }
    },
    cookies: {}
  }
}

fixture_5 = {
  context: {
    distributionDomainName:'d123.cloudfront.net',
    eventType:'viewer-request',
  },
  viewer: {
    ip:'1.2.3.4'
  },
  request: {
    method: 'GET',
    uri: '/index.php',
    querystring: {},
    headers: {
      host: {
        value:'cddo.cabinetoffice.gov.uk'
      }
    },
    cookies: {}
  }
}

describe("origin_request", function() {
  it('fixture_1', function(done) {
    var res = viewer_request(fixture_1);

    expect(res).to.not.equal(fixture_1.request);
    expect(res.statusCode).to.equal(307);
    expect(Object.keys(res["headers"])).to.have.members(["location"]);
    expect(res["headers"]["location"].value).to.equal('https://cddo.cabinetoffice.gov.uk/index.php');

    done();
  });

  it('fixture_2', function(done) {
    var res = viewer_request(fixture_2);

    expect(res).to.not.equal(fixture_2.request);
    expect(res.statusCode).to.equal(307);
    expect(Object.keys(res["headers"])).to.have.members(["location"]);
    expect(res["headers"]["location"].value).to.equal('https://www.gov.uk/government/organisations/central-digital-and-data-office/about');

    done();
  });

  it('fixture_3', function(done) {
    var res = viewer_request(fixture_3);

    expect(res).to.not.equal(fixture_3.request);
    expect(res.statusCode).to.equal(307);
    expect(Object.keys(res["headers"])).to.have.members(["location"]);
    expect(res["headers"]["location"].value).to.equal('https://vulnerability-reporting.service.security.gov.uk/.well-known/security.txt');

    done();
  });

  it('fixture_4', function(done) {
    var res = viewer_request(fixture_4);

    expect(res).to.equal(fixture_4.request);

    done();
  });

  it('fixture_5', function(done) {
    var res = viewer_request(fixture_5);

    expect(res).to.not.equal(fixture_5.request);
    expect(res.statusCode).to.equal(307);
    expect(Object.keys(res["headers"])).to.have.members(["location"]);
    expect(res["headers"]["location"].value).to.equal('https://www.gov.uk/government/organisations/central-digital-and-data-office/about');

    done();
  });
});
