import Component from '@glimmer/component';

export default class DiscoverCredit extends Component {
   data = {
     credit: {
    queryParams: ["CREDIT"],
    landingPage: "placeholder",
    row1: {
      col1: {
        name: "IIIA",
        queryParams: ["CREDIT", "IIIA"],
        landingPage: { category: "credit", name: "iiia" }
      },
      col2: {
        name: "Asia",
        queryParams: ["CREDIT", "ASIA"],
        landingPage: { category: "credit", name: "asia" }
      },
      col3: {
        name: "Structured Finance",
        queryParams: ["CREDIT", "SF"],
        landingPage: { category: "credit", name: "structuredFinance" }
      }
    },
    row2: {
      col1: {
        name: "Americas Investment Grade",
        queryParams: ["CREDIT", "AMERICAS", "IG" ],
        landingPage: { category: "credit", name: "americasInvestmentGrade" }
      },
      col2: {
        name: "High Yield",
        queryParams: ["CREDIT", "HY"],
        landingPage: { category: "credit", name: "highYield" }
      },
      col3: {
        name: "Loans",
        queryParams: ["CREDIT", "LOANS"],
        landingPage: { category: "credit", name: "loans" }
      }
    },
    row3: {
      col1: {
        name: "Europe Investment Grade",
        queryParams: ["CREDIT", "EUROPE", "IG"],
        landingPage: { category: "credit", name: "europeInvestmentGrade" }
      },
      col2: {
        name: "Emerging Markets",
        queryParams: ["CREDIT", "EM"],
        landingPage: { category: "credit", name: "emergingMarkets" }
      },
      col3: {
        name: "MTNs",
        queryParams: ["CREDIT", "MTN"],
        landingPage: { category: "credit", name: "mtns" }
      }
    },
    row4: {
      col1: {
        name: "ESG SRI Bonds",
        queryParams: ["CREDIT", "PULSE"],
        landingPage: { category: "credit", name: "esgSriBonds" }
      },
      col2: {
        name: "Premium Credit Reports",
        queryParams: ["CREDIT", "PREMIUMCREDITREPORTS"],
        landingPage: { category: "credit", name: "premiumCreditReports" }
      }
    },
  }

}

}
