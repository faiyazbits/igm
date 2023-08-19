import Component from '@glimmer/component';

export default class DiscoverFx extends Component {
data = {
  fx: {
    row1: {
      col1: {
        name: "Majors",
        queryParams: ["FX", "MAJORS"],
        landingPage: { category: "fx", name: "majors" }
      },
      col2: {
        name: "Options",
        queryParams: ["FX", "OPTIONS"],
        landingPage: { category: "fx", name: "options" }
      },
      col3: {
        name: "Data & Events Calendar",
        queryParams: ["FX"],
        landingPage: { category: "fx", name: "dataAndEventsCalendar" }
      }
    },
    row2: {
      col1: {
        name: "Emerging Markets",
        queryParams: ["FX", "EM"],
        landingPage: { category: "fx", name: "emergingMarkets" }
      },
      col2: {
        name: "Technicals",
        queryParams: ["FX"],
        landingPage: { category: "fx", name: "technicals" }
      }
    }
  }
}
}
