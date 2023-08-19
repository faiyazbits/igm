import Component from '@glimmer/component';

export default class DiscoverRates extends Component {

  data={
    rates: {
      row1: {
        col1: {
          name: "Bonds",
          queryParams: ["RATES", "BONDS"],
          landingPage: { category: "rates", name: "bonds" }
        },
        col2: {
          name: "Emerging Markets",
          queryParams: ["RATES", "EM"],
          landingPage: { category: "rates", name: "emergingMarkets" }
        },
        col3: {
          name: "Data & Events Calendar",
          queryParams: ["RATES"],
          landingPage: { category: "rates", name: "dataAndEventsCalendar" }
        }
      },
      row2: {
        col1: {
          name: "Money Markets",
          queryParams: ["RATES", "STIR"],
          landingPage: { category: "rates", name: "moneyMarkets" }
        },
        col2: {
          name: "Technicals",
          queryParams: ["RATES"],
          landingPage: { category: "rates", name: "technicals" }
        }
      }
    }
  }
}
